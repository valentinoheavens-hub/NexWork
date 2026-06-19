// Paystack webhook for PLATFORM SUBSCRIPTIONS. Verifies the
// x-paystack-signature (HMAC-SHA512 of the raw body with the secret key),
// then activates / expires the user's subscription row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const toHex = (buf: ArrayBuffer) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

const verify = async (rawBody: string, signature: string, secret: string) => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  return toHex(mac) === signature;
};

// Find the user's row by email (profiles) or by stored subscription code.
const userIdByEmail = async (email?: string): Promise<string | null> => {
  if (!email) return null;
  const { data } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  return data?.id ?? null;
};

Deno.serve(async (req) => {
  const secret = Deno.env.get("PAYSTACK_SECRET_KEY");
  const signature = req.headers.get("x-paystack-signature") ?? "";
  if (!secret) return new Response("Not configured", { status: 500 });

  const raw = await req.text();
  if (!(await verify(raw, signature, secret))) {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    const event = JSON.parse(raw);
    const d = event.data ?? {};

    switch (event.event) {
      case "charge.success": {
        const userId = d.metadata?.user_id ?? (await userIdByEmail(d.customer?.email));
        if (userId) {
          await admin
            .from("subscriptions")
            .update({
              plan: "agency",
              status: "active",
              provider: "paystack",
              provider_customer_id: d.customer?.customer_code ?? null,
            })
            .eq("user_id", userId);
        }
        break;
      }
      case "subscription.create": {
        const userId = await userIdByEmail(d.customer?.email);
        if (userId) {
          await admin
            .from("subscriptions")
            .update({
              plan: "agency",
              status: "active",
              provider: "paystack",
              provider_subscription_id: d.subscription_code ?? null,
              provider_customer_id: d.customer?.customer_code ?? null,
              current_period_end: d.next_payment_date ?? null,
            })
            .eq("user_id", userId);
        }
        break;
      }
      case "invoice.payment_failed": {
        if (d.subscription?.subscription_code) {
          await admin
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("provider_subscription_id", d.subscription.subscription_code);
        }
        break;
      }
      case "subscription.disable":
      case "subscription.not_renew": {
        if (d.subscription_code) {
          await admin
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("provider_subscription_id", d.subscription_code);
        }
        break;
      }
      default:
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("paystack-sub-webhook error:", err);
    return new Response("Handler error", { status: 500 });
  }
});
