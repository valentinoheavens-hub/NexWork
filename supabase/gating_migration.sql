-- ============================================================
-- RendaHQ — Server-side plan-limit enforcement (bypass-proof)
-- Run AFTER schema.sql + subscriptions_migration.sql.
-- Already applied to the live project (migration: server_side_plan_gating).
-- ============================================================

-- Resolve a user's effective plan (a lapsed trial resolves to 'free').
CREATE OR REPLACE FUNCTION public.effective_plan(uid uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE((
    SELECT CASE
      WHEN s.status = 'active' THEN s.plan
      WHEN s.status = 'trialing' AND s.trial_ends_at > now() THEN s.plan
      ELSE 'free'
    END
    FROM public.subscriptions s
    WHERE s.user_id = uid
    LIMIT 1
  ), 'free');
$$;
REVOKE EXECUTE ON FUNCTION public.effective_plan(uuid) FROM PUBLIC, anon, authenticated;

-- Enforce the Free-tier client cap (3) at insert time — blocks even direct API inserts.
CREATE OR REPLACE FUNCTION public.enforce_client_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_plan text;
  v_cnt int;
BEGIN
  v_plan := public.effective_plan(NEW.user_id);
  IF v_plan = 'free' THEN
    SELECT count(*) INTO v_cnt FROM public.clients WHERE user_id = NEW.user_id;
    IF v_cnt >= 3 THEN
      RAISE EXCEPTION 'CLIENT_LIMIT_REACHED'
        USING ERRCODE = 'check_violation',
              DETAIL = 'Free plan is limited to 3 clients. Upgrade to Agency for unlimited.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.enforce_client_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enforce_client_limit_trg ON public.clients;
CREATE TRIGGER enforce_client_limit_trg
  BEFORE INSERT ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.enforce_client_limit();

-- Server-authoritative monthly usage counters (can't be reset client-side).
CREATE TABLE IF NOT EXISTS public.usage_counters (
  user_id    uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  metric     text NOT NULL,
  period     text NOT NULL,
  count      int NOT NULL DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, metric, period)
);
ALTER TABLE public.usage_counters ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS usage_counters_select ON public.usage_counters;
CREATE POLICY usage_counters_select ON public.usage_counters
  FOR SELECT USING (auth.uid() = user_id);

-- Atomic check-and-increment for the Free-tier 5 AI contracts / month cap.
CREATE OR REPLACE FUNCTION public.consume_ai_contract()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v_plan   text;
  v_period text := to_char(now(), 'YYYY-MM');
  v_limit  int;
  v_used   int;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated' USING ERRCODE = '28000';
  END IF;

  v_plan := public.effective_plan(v_uid);
  IF v_plan = 'free' THEN v_limit := 5; ELSE v_limit := NULL; END IF;

  SELECT uc.count INTO v_used
  FROM public.usage_counters uc
  WHERE uc.user_id = v_uid AND uc.metric = 'ai_contracts' AND uc.period = v_period;
  v_used := COALESCE(v_used, 0);

  IF v_limit IS NOT NULL AND v_used >= v_limit THEN
    RAISE EXCEPTION 'AI_LIMIT_REACHED'
      USING ERRCODE = 'check_violation',
            DETAIL = 'Free plan allows 5 AI contracts per month. Upgrade to Agency for unlimited.';
  END IF;

  INSERT INTO public.usage_counters (user_id, metric, period, count)
  VALUES (v_uid, 'ai_contracts', v_period, 1)
  ON CONFLICT (user_id, metric, period)
  DO UPDATE SET count = public.usage_counters.count + 1, updated_at = now()
  RETURNING count INTO v_used;

  RETURN jsonb_build_object('ok', true, 'plan', v_plan, 'used', v_used, 'limit', v_limit);
END;
$$;
REVOKE EXECUTE ON FUNCTION public.consume_ai_contract() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_ai_contract() TO authenticated;
