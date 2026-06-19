// Stripe webhook for PLATFORM SUBSCRIPTIONS (RendaHQ's own billing).
// Keep this separate from the invoice-payment webhook — it has its own
// signing secret (STRIPE_SUB_WEBHOOK_SECRET) and only touches `subscriptions`.
import Stripe from "https://esm.sh/stripe@14?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Stripe subscription status -> our status enum.
const mapStatus = (s: string): string => {
  if (s === "active" || s === "trialing") return "active";
  if (s === "past_due" || s === "unpaid" || s === "incomplete") return "past_due";
  if (s === "canceled" || s === "incomplete_expired") return "canceled";
  return "past_due";
};

const applySubscription = async (sub: Stripe.Subscription) => {
  const userId = sub.metadata?.user_id;
  const patch = {
    plan: "agency",
    status: mapStatus(sub.status),
    provider: "stripe",
    provider_subscription_id: sub.id,
    provider_customer_id: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
  };
  // Prefer matching by user_id; fall back to the Stripe customer id.
  if (userId) {
    await admin.from("subscriptions").update(patch).eq("user_id", userId);
  } else {
    await admin.from("subscriptions").update(patch).eq("provider_customer_id", patch.provider_customer_id);
  }
};

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const secret = Deno.env.get("STRIPE_SUB_WEBHOOK_SECRET");
  if (!sig || !secret) return new Response("Missing signature/secret", { status: 400 });

  let event: Stripe.Event;
  try {
    const body = await req.text();
    event = await stripe.webhooks.constructEventAsync(body, sig, secret);
  } catch (err) {
    console.error("Signature verification failed:", (err as Error).message);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription" && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription as string);
          if (!sub.metadata?.user_id && session.metadata?.user_id) {
            sub.metadata = { ...sub.metadata, user_id: session.metadata.user_id };
          }
          await applySubscription(sub);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await applySubscription(event.data.object as Stripe.Subscription);
        break;
      }
      default:
        break;
    }
    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("stripe-sub-webhook handler error:", err);
    return new Response("Handler error", { status: 500 });
  }
});
