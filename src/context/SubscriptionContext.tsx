import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { PLANS, type Plan, type PlanId, type SubStatus, type Provider } from "@/lib/plans";

export interface Subscription {
  id: string;
  user_id: string;
  plan: PlanId;
  status: SubStatus;
  provider: Provider | null;
  provider_customer_id: string | null;
  provider_subscription_id: string | null;
  trial_ends_at: string | null;
  current_period_end: string | null;
}

interface SubscriptionContextType {
  subscription: Subscription | null;
  plan: Plan; // effective plan (a lapsed trial resolves to Freelancer)
  effectivePlanId: PlanId;
  status: SubStatus;
  isTrialing: boolean;
  trialDaysLeft: number;
  isActive: boolean; // a paid, active subscription
  loading: boolean;
  refresh: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const dayMs = 1000 * 60 * 60 * 24;

// Resolve what the user can actually use right now from their raw row.
const resolveEffectivePlan = (sub: Subscription | null): PlanId => {
  if (!sub) return "free";
  if (sub.status === "active") return sub.plan;
  if (sub.status === "trialing") {
    const ends = sub.trial_ends_at ? new Date(sub.trial_ends_at).getTime() : 0;
    return ends > Date.now() ? sub.plan : "free";
  }
  return "free"; // past_due, canceled, free
};

const trialDaysRemaining = (sub: Subscription | null): number => {
  if (!sub || sub.status !== "trialing" || !sub.trial_ends_at) return 0;
  const diff = new Date(sub.trial_ends_at).getTime() - Date.now();
  return diff > 0 ? Math.ceil(diff / dayMs) : 0;
};

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (uid: string | null) => {
    if (!uid) {
      setSubscription(null);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", uid)
      .maybeSingle();

    if (error) {
      // Table may not exist yet (migration not run) — fail soft to free.
      console.warn("Subscription load failed:", error.message);
      setSubscription(null);
    } else {
      setSubscription((data as Subscription) ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    load(user?.id ?? null);
  }, [user?.id, load]);

  const refresh = useCallback(() => load(user?.id ?? null), [user?.id, load]);

  const effectivePlanId = resolveEffectivePlan(subscription);
  const status: SubStatus = subscription?.status ?? "free";
  const isTrialing = effectivePlanId !== "free" && status === "trialing";

  const value: SubscriptionContextType = {
    subscription,
    plan: PLANS[effectivePlanId],
    effectivePlanId,
    status,
    isTrialing,
    trialDaysLeft: trialDaysRemaining(subscription),
    isActive: status === "active",
    loading,
    refresh,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
};

// Convenience hook for gating: usePlan().can.whiteLabel, usePlan().limits.maxClients, etc.
export const usePlan = () => {
  const { plan, effectivePlanId, isTrialing, trialDaysLeft, isActive, status } = useSubscription();
  return {
    id: effectivePlanId,
    plan,
    can: plan.limits,
    limits: plan.limits,
    isFree: effectivePlanId === "free",
    isAgency: effectivePlanId === "agency",
    isTrialing,
    trialDaysLeft,
    isActive,
    status,
  };
};
