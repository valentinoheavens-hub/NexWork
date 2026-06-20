// Flutterwave webhook for PLATFORM SUBSCRIPTIONS. Verifies the verif-hash
// header against the secret hash configured in the Flutterwave dashboard,
// then activates / cancels the user's subscription row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const userIdByEmail = async (email?: string): Promise<string | null> => {
  if (!email) return null;
  const { data } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  return data?.id ?? null;
};

Deno.serve(async (req) => {
  const expected = Deno.env.get("FLW_WEBHOOK_HASH");
  const signature = req.headers.get("verif-hash") ?? "";
  if (!expected) return new Response("Not configured", { status: 500 });
  if (signature !== expected) return new Response("Invalid signature", { status: 401 });

  try {
    const event = await req.json();
    const d = event.data ?? {};
    const eventType = event.event ?? event["event.type"];

    // Successful (recurring) charge → activate.
    if (eventType === "charge.completed" && d.status === "successful") {
      const userId = d.meta?.user_id ?? (await userIdByEmail(d.customer?.email));
      if (userId) {
        await admin
          .from("subscriptions")
          .update({
            plan: "agency",
            status: "active",
            provider: "flutterwave",
            provider_customer_id: d.customer?.id ? String(d.customer.id) : null,
            provider_subscription_id: d.payment_plan ? String(d.payment_plan) : null,
          })
          .eq("user_id", userId);
      }
    }

    // Subscription cancelled/deactivated → mark canceled.
    if (eventType === "subscription.cancelled") {
      const userId = await userIdByEmail(d.customer?.email ?? d.email);
      if (userId) {
        await admin.from("subscriptions").update({ status: "canceled" }).eq("user_id", userId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("flutterwave-sub-webhook error:", err);
    return new Response("Handler error", { status: 500 });
  }
});
