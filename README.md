# MailCraft AI

An AI-powered email generator built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. Users describe what they need, pick a recipient, tone, length, and language, and get a ready-to-send email in seconds.

## Stack

- Next.js 15 (App Router) + TypeScript (strict mode)
- Tailwind CSS with a small custom design-token layer (see `app/globals.css`)
- Hand-built, shadcn/ui-style components in `components/ui/` — no Radix dependency, so the install stays light and dependency-free
- Mistral AI (`mistral-small-latest`) via the official `openai` SDK pointed at Mistral's OpenAI-compatible endpoint, called only from a server-side API route
- `next-themes` for dark mode

## Project structure

```
app/
  api/generate-email/route.ts   # server-side Mistral AI call
  layout.tsx, page.tsx, globals.css
components/
  navbar.tsx, hero.tsx, email-form.tsx, result-card.tsx,
  features.tsx, pricing-placeholder.tsx, footer.tsx,
  theme-provider.tsx, theme-toggle.tsx
  ui/                           # button, card, input, textarea, select, label, checkbox, toaster
hooks/
  use-toast.ts
lib/
  utils.ts                      # cn() class merge helper, downloadTextFile()
  prompt.ts                     # builds the system/user prompt from form values
types/
  index.ts                      # shared form + API types
```

---

## 1. Add your Mistral API key

1. Copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Open `.env.local` and paste your key from https://console.mistral.ai/api-keys:
   ```
   MISTRAL_API_KEY=...
   ```
3. Restart the dev server after adding or changing this file — Next.js only reads `.env.local` on startup.

The key is only ever read inside `app/api/generate-email/route.ts`, which runs on the server. It is never sent to the browser.

## 2. Run the project locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The generator is under the "Generate Email" CTA / `#generator` section.

If you see "No Mistral API key is configured on the server," it means `.env.local` is missing or the dev server hasn't been restarted since you added it.

## 3. Deploy to Vercel

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to https://vercel.com/new and import the repo.
3. In the project's **Settings → Environment Variables**, add:
   - `MISTRAL_API_KEY` = your key (set it for Production, Preview, and Development as needed)
4. Deploy. Vercel auto-detects Next.js — no extra config needed.
5. Every push to your main branch redeploys automatically.

## 4. Connect Stripe later for a $5/month subscription

The project is intentionally structured so this drops in cleanly:

1. `npm install stripe @stripe/stripe-js`
2. Create a Product + a recurring €5/$5 Price in the [Stripe Dashboard](https://dashboard.stripe.com/products).
3. Add a server route, e.g. `app/api/create-checkout-session/route.ts`, that creates a Stripe Checkout Session with `mode: "subscription"` and your Price ID, then redirects the user to `session.url`.
4. Add a webhook route, e.g. `app/api/webhooks/stripe/route.ts`, to listen for `checkout.session.completed` / `customer.subscription.updated` and mark the user as "Pro" in your database.
5. Wire the "Coming soon" button in `components/pricing-placeholder.tsx` to call your checkout route.
6. Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` to `.env.local` and to Vercel's environment variables — never expose the secret key to the client, only `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe client-side.

This will naturally pair with the auth step below, so a subscription can be tied to a specific user account.

## 5. Keep API keys secure

- Never prefix a secret key with `NEXT_PUBLIC_` — that prefix tells Next.js to bundle it into client-side JavaScript, which exposes it to anyone visiting the site.
- `MISTRAL_API_KEY` and (later) `STRIPE_SECRET_KEY` should only be read inside files under `app/api/**/route.ts` (or other server-only code), never inside a `"use client"` component.
- `.env.local` is already in `.gitignore` — never commit it. Commit `.env.local.example` instead, with placeholder values only.
- In production, set environment variables through your host's dashboard (e.g. Vercel Project Settings), not in code.
- Consider adding basic rate limiting (e.g. Vercel's `@upstash/ratelimit` or a simple IP-based counter) to `app/api/generate-email/route.ts` before opening this up publicly, so a single user can't run up your Mistral bill.
- Rotate keys immediately if one is ever accidentally committed or shared.

## 6. Where the project is already set up for future features

Nothing below is implemented, but the structure makes each of these a focused addition rather than a rewrite:

- **Authentication** — drop in Auth.js (NextAuth) or Clerk; `types/index.ts` and the API route are already shaped to accept a `userId` if you add one.
- **User accounts / email history** — add a database (Postgres via Prisma, or Supabase) and a `history` table keyed by user; save each `GenerateEmailResponse` after generation.
- **Saved templates** — a `templates` table plus a "Save as template" button in `result-card.tsx`.
- **Stripe subscriptions** — see section 4 above.
- **Usage limits** — track a `generationsThisMonth` counter per user (or per IP for anonymous users) and check it in `app/api/generate-email/route.ts` before calling Mistral.
- **Admin dashboard** — a `/admin` route gated by a role check, reading from the same database.

## Ideas that would make this worth paying for

- **Usage limits + Pro tier**: free tier capped at a small number of emails/month; unlimited on Pro. This is the simplest lever tied to the $5/month plan already on the pricing section.
- **Saved templates & snippets**: let frequent senders (recruiters, sales, support) save a phrasing they like and reuse it as a starting point.
- **Email history with search**: quietly valuable — people re-send similar emails constantly and rarely keep a paper trail.
- **Brand voice / tone memory**: let a user paste 2-3 emails they've written so future generations sound more like them, not a generic AI voice.
- **Team/shared templates**: a small team plan where a company standardizes tone across support or sales replies.
- **Browser extension or Gmail/Outlook add-in**: generate directly inside the compose window — removes the copy/paste step entirely, which is the biggest friction point in the current flow.
- **Multi-turn refinement**: "make it shorter," "make it warmer" as follow-up chat turns instead of only a single-shot regenerate.
