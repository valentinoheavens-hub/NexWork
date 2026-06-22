# RendaHQ — send email from rendahq.com (Resend + Supabase SMTP)

Makes both **app emails** (invoices/contracts/proposals) and **auth emails**
(verification/reset/etc.) send from `@rendahq.com` instead of the
`onboarding@resend.dev` / Supabase default sender.

**Current status (checked 2026-06-19):** `rendahq.com` is live on Netlify
(HTTP 200) and uses **Netlify DNS** (NS1 nameservers). No Resend DNS records
exist yet. Because you're on Netlify DNS, the records below go in
**Netlify → Domains → rendahq.com → DNS records**, NOT your original registrar.

---

## Step 1 — Add the domain in Resend
1. Resend dashboard → **Domains → Add Domain**.
2. Enter `rendahq.com` (apex) — or `send.rendahq.com` if you prefer to protect
   the apex's sending reputation (then your From must be `@send.rendahq.com`).
3. Resend shows ~3–4 DNS records to add (values are unique to your account):
   - **MX** on the `send` subdomain → `feedback-smtp.<region>.amazonses.com` (priority 10)
   - **TXT (SPF)** on `send` → `v=spf1 include:amazonses.com ~all`
   - **TXT (DKIM)** on `resend._domainkey` → a long `p=…` key
   - **TXT (DMARC, optional)** on `_dmarc` → `v=DMARC1; p=none;`

## Step 2 — Add those records in Netlify DNS
Netlify → **Domains → rendahq.com → DNS records → Add new record**. Add each
record exactly as Resend shows it (type, name/host, value, priority for MX).
> Tip: Netlify's "name" field is just the subdomain part (e.g. `send`,
> `resend._domainkey`, `_dmarc`) — don't append `.rendahq.com`.

## Step 3 — Verify in Resend
Back in Resend, click **Verify**. DNS usually propagates in minutes (can take up
to a few hours). Status flips to **Verified** when done.

---

## Step 4a — App transactional emails (invoices, contracts, proposals)
These go through the `send-email` Edge Function, which already reads a
`RESEND_FROM` env var. In **Supabase → Edge Functions → Secrets**, set:

```
RESEND_FROM = hello@rendahq.com      (any address on the verified domain)
RESEND_API_KEY = re_…                (if not already set)
```

The app prepends the sender name automatically, e.g. `RendaHQ Billing <hello@rendahq.com>`.
No code change needed.

## Step 4b — Auth emails (verification, reset, magic link, change email)
These are sent by Supabase Auth, so point Supabase at Resend's SMTP.
**Project Settings → Authentication → SMTP Settings → Enable custom SMTP:**

| Field         | Value                          |
|---------------|--------------------------------|
| Host          | `smtp.resend.com`              |
| Port          | `465` (or `587`)               |
| Username      | `resend`                       |
| Password      | your Resend API key (`re_…`)   |
| Sender email  | `no-reply@rendahq.com`         |
| Sender name   | `RendaHQ`                      |

Then paste the templates from `supabase/email-templates/` (see that README).

---

## Step 5 — Test
- App email: trigger an invoice reminder / proposal from the app and confirm the
  From address is `@rendahq.com`.
- Auth email: do a password reset; confirm it arrives from `@rendahq.com` with
  the branded template.
