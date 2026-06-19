// Opens a Stripe Billing Portal session so an active subscriber can update
// their card, view invoices, or cancel. Identifies the user from their JWT.
import Stripe from "https://esm.sh/stripe@14?target=deno";
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

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "Not authenticated." }, 401);

    const { returnUrl } = await req.json();

    const admin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: sub } = await admin
      .from("subscriptions")
      .select("provider_customer_id, provider")
      .eq("user_id", user.id)
      .maybeSingle();

    if (sub?.provider !== "stripe" || !sub?.provider_customer_id) {
      return json({ error: "No Stripe billing account found for this user." }, 400);
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: sub.provider_customer_id,
      return_url: returnUrl,
    });

    return json({ url: session.url });
  } catch (err) {
    console.error("billing-portal error:", err);
    return json({ error: (err as Error).message }, 500);
  }
});
