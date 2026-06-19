// Initializes a Paystack transaction tied to the Agency PLAN so it recurs
// monthly. Returns the hosted authorization_url to redirect the user to.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const secretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    const planCode = Deno.env.get("PAYSTACK_AGENCY_PLAN");
    if (!secretKey) return json({ error: "Paystack is not configured." }, 500);
    if (!planCode) return json({ error: "Paystack Agency plan is not configured." }, 500);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "Not authenticated." }, 401);
    if (!user.email) return json({ error: "Account has no email." }, 400);

    const { callbackUrl } = await req.json();

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        plan: planCode,
        callback_url: callbackUrl,
        metadata: { user_id: user.id, purpose: "rendahq_subscription" },
      }),
    });

    const data = await res.json();
    if (!data.status) return json({ error: data.message || "Paystack init failed." }, 502);

    // Mark provider so the webhook/portal know where to look.
    const admin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    await admin.from("subscriptions").update({ provider: "paystack" }).eq("user_id", user.id);

    return json({ url: data.data.authorization_url });
  } catch (err) {
    console.error("subscribe-paystack error:", err);
    return json({ error: (err as Error).message }, 500);
  }
});
