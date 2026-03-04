# solo-stack

```
               _                _                 _
              | |              | |               | |
  ___   ___   | |  ___    ___  | |_   __ _   ___ | | __
 / __| / _ \  | | / _ \  / __| | __| / _` | / __|| |/ /
 \__ \| (_) | | || (_) | \__ \ | |_ | (_| || (__ |   <
 |___/ \___/  |_| \___/  |___/  \__| \__,_| \___||_|\_\

         pick your stack. ship your thing. grow from there.
```

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![No Affiliate Links](https://img.shields.io/badge/affiliate%20links-none-blue.svg)](#contributing)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Last Updated](https://img.shields.io/badge/updated-March%202026-orange.svg)](#)

**Opinionated stack guide for solo founders. Real costs. Real trade-offs. No affiliate links.**

You don't need another comparison article with 15 options. You need someone to tell you what works, what it actually costs, and when you'll outgrow it.

This guide is community-maintained, has zero affiliate links, and every pricing number is verified with a date stamp. If something is wrong, [open a PR](CONTRIBUTING.md).

---

## How to Use This Guide

1. **Start here.** The [default stack](#if-you-just-want-the-answer) is the right choice for most solo founders. Use it unless you have a specific reason not to.
2. **Got a specific question?** The [Decision Guides](#decision-guides) walk you through trade-offs for payments, auth, hosting, databases, and AI tools with flowcharts.
3. **Want to see the numbers?** The [Cost Calculator](#cost-calculator) shows what each stack costs at 100, 1K, 10K, and 100K users.
4. **Outgrowing a tool?** The [Graduation Guides](#graduation-guides) tell you when to leave and where to go.

---

## Table of Contents

- [If You Just Want the Answer](#if-you-just-want-the-answer)
- [Stack Recipes](#stack-recipes)
- [Decision Guides](#decision-guides)
- [Cost Calculator](#cost-calculator)
- [Graduation Guides](#graduation-guides)
- [Tool Directory](#tool-directory)
- [Contributing](#contributing)
- [License](#license)

---

## If You Just Want the Answer

You're a solo founder. You have a SaaS idea. You want to ship it. Here's what to use:

| Layer | Tool | Why |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) + TypeScript + Tailwind + [shadcn/ui](https://ui.shadcn.com) | Most AI training data, largest ecosystem, one language front-to-back |
| Database | [Supabase](https://supabase.com) | Postgres + Auth + Storage + Realtime in one. Generous free tier |
| Auth | [Supabase Auth](https://supabase.com/auth) | Free up to 50K MAU. Already included with Supabase |
| Payments | [Stripe](https://stripe.com) | Industry standard. If selling globally, [read the payments guide](#payments) first |
| Hosting | [Vercel](https://vercel.com) | Best Next.js DX. Free tier works until ~33K pageviews/mo |
| Email | [Resend](https://resend.com) | Modern DX, React Email integration. Free 3K emails/mo |
| Analytics | [PostHog](https://posthog.com) | Product analytics + session replay + feature flags. Free 1M events/mo |

**Total cost: $0/month** to validate. ~$50-85/month once you have paying customers.

This is not the only valid stack. But if you're stuck choosing, use this and start building. You can always swap pieces later. The best stack is the one that ships.

> **Why this stack?** It's the most common combination among solo founders making $1K-10K MRR in 2025-2026. It has the deepest AI coding tool support (Cursor, Claude Code, and Copilot all understand it well). Every piece has a clear graduation path when you outgrow it.

> *The maintainer of this repo builds with tools from every tier of this guide: Supabase, Vercel, Railway, Resend, Sentry, Claude Code, and more. Different projects, different stacks. The recommendations here come from real usage, not research.*

---

## Stack Recipes

### The $0/month MVP Stack

For validating ideas. Pre-revenue. Getting your first 100 users.

| Layer | Tool | Free Tier Limit |
|---|---|---|
| Framework | Next.js + TypeScript + Tailwind + shadcn/ui | Open source |
| Database | Supabase | 500MB DB, 1GB storage, 50K auth MAUs |
| Auth | Supabase Auth | Included with Supabase free tier |
| Payments | Stripe | No monthly fee. 2.9% + $0.30 per transaction |
| Hosting | Vercel | 100GB bandwidth (~33K pageviews with images) |
| Email | Resend | 3,000 emails/month |
| Analytics | PostHog | 1M events/month, 5K session replays |

**Total: $0/month.** You pay nothing until you have real traffic and real revenue.

**When to graduate:** When you hit Vercel's bandwidth cap, need a custom domain email, or want team collaboration features.

---

### The ~$50/month Production Stack

For launched products with paying customers. Under 10K users.

| Layer | Tool | Cost |
|---|---|---|
| Framework | Next.js + TypeScript + Tailwind + shadcn/ui | Open source |
| Database | Supabase Pro | $25/mo (8GB DB, 100GB storage) |
| Auth | Supabase Auth | Included with Supabase Pro |
| Payments | Lemon Squeezy | No monthly fee. 5% + $0.50 per transaction (handles all taxes) |
| Hosting | Railway | ~$5-15/mo (usage-based, predictable) |
| Email | Resend | $20/mo (50K emails) |
| Analytics | PostHog | $0 (free tier is enough for most solo products) |

**Total: ~$50-60/month.** The sweet spot for solo SaaS making $500-5K MRR.

**Why Lemon Squeezy here?** At this revenue level, the 2% fee premium over Stripe is worth it because they handle all global tax compliance. You don't want to think about VAT when you have 200 customers.

**Why Railway over Vercel?** Railway runs your frontend, backend, database, and background workers in one place with predictable pricing. No surprise bandwidth bills.

**When to graduate:** When auth costs start climbing (Supabase Auth is cheap but limited in features), or when you need enterprise-grade observability.

---

### The ~$100/month Scale Stack

For products with 10K+ users approaching or past product-market fit.

| Layer | Tool | Cost |
|---|---|---|
| Framework | Next.js + TypeScript + Tailwind + shadcn/ui | Open source |
| Database | Supabase Pro | $25/mo |
| Auth | Auth.js (self-managed) | $0 (you own it) |
| Payments | Stripe + [Stripe Tax](https://stripe.com/tax) | 2.9% + $0.30 + 0.5% tax automation |
| Hosting | Hetzner VPS + [Coolify](https://coolify.io) | ~$10-20/mo (own your infrastructure) |
| Email | Postmark | $15/mo (10K emails, best deliverability) |
| Analytics | PostHog | ~$0-50/mo depending on volume |
| Monitoring | [Sentry](https://sentry.io) | $0 (free tier: 5K errors/mo) |

**Total: ~$50-110/month** depending on usage. But you own your infrastructure and have zero per-user cost cliffs.

**Why the switch to Auth.js?** Self-managed auth costs $0 forever, regardless of user count. At 100K users, Clerk would cost $1,800/mo. Auth.js costs $0. The migration takes effort, but it removes the biggest cost cliff in the entire stack.

**Why Hetzner + Coolify?** A $10/mo Hetzner VPS with Coolify gives you Vercel-like DX (git push deploy, preview URLs, automatic SSL) on infrastructure you own. Teams report 50-70% savings vs Vercel/Railway.

---

## Decision Guides

When the default answer doesn't fit your situation, these guides walk you through the trade-offs:

### [How to Handle Payments (and Taxes)](docs/decisions/payments.md)
The single most confusing decision for new founders. Stripe vs Merchant of Record, when you need to care about sales tax, and what to do about it.

### [How to Handle Authentication](docs/decisions/authentication.md)
Clerk vs Supabase Auth vs Auth.js. Speed vs cost vs lock-in. The 20x price difference at 100K users that nobody talks about.

### [Where to Host (and When to Migrate)](docs/decisions/hosting.md)
Vercel's free tier ceiling, Railway's sweet spot, and when self-hosting saves you thousands.

### [How to Handle AI Tools (and What They Actually Cost)](docs/decisions/ai-tools.md)
AI coding assistants vs LLM APIs in your product. What Cursor, Copilot, and Claude Code actually cost. How to estimate your AI feature bill at 1K, 10K, and 100K users.

### [How to Pick a Database](docs/decisions/database.md)
Supabase (platform) vs Neon (serverless) vs PocketBase (simple) vs just Postgres. When SQLite is enough and when it isn't.

---

## Cost Calculator

What your stack actually costs as you grow. These are real numbers, not marketing-page pricing.

### The Default Stack ($0 MVP) at Scale

| Component | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Supabase (DB + Auth) | $0 | $0 | $25 | $75+ |
| Vercel | $0 | $0 | $20 | $150+ |
| Stripe (2.9% on $10 avg*) | $29 | $290 | $2,900 | $29,000 |
| Resend | $0 | $0 | $0 | $20 |
| PostHog | $0 | $0 | $0 | ~$50 |
| **Infrastructure total** | **$0** | **$0** | **$45** | **$295+** |
| **Payment processing** | **$29** | **$290** | **$2,900** | **$29,000** |

> *\*Assumes $10/mo average revenue per user (typical B2C SaaS). B2B products at $50-200/mo ARPU will see 5-20x higher Stripe costs, but also 5-20x higher revenue. The ratio stays healthy.*

> **The cost cliff to watch:** Infrastructure stays cheap. Payment processing scales linearly with revenue (which is fine, it means you're making money). The real surprise is **auth**. If you're on Clerk instead of Supabase Auth, add $0 / $0 / $0 / $1,800 to the auth row.

For the full breakdown with multiple stack combinations, see [docs/cost-calculator.md](docs/cost-calculator.md).

---

## Graduation Guides

Every tool has a ceiling. Here's when you'll hit it and what to do.

### When to Leave Vercel
**Signs:** Bandwidth bills exceeding $50/mo. Need for long-running background jobs. Adding a second team member doubles your bill.
**Switch to:** Railway ($5-15/mo) or Hetzner + Coolify ($4-10/mo).
**Migration difficulty:** Low. Next.js runs anywhere.

### When to Leave Supabase Auth
**Signs:** Need for advanced flows (SAML SSO, organization management, custom MFA). Not really a cost issue. Supabase Auth stays cheap.
**Switch to:** Clerk (fast, managed) or Auth.js (free, self-managed).
**Migration difficulty:** Medium. Auth migrations always touch every protected route.

### When to Leave Clerk
**Signs:** Approaching 50K+ MAU and the per-user cost is becoming significant relative to revenue.
**Switch to:** Auth.js or Better-Auth (self-hosted, $0 forever).
**Migration difficulty:** High. Clerk's pre-built components mean you'll rebuild UI. Plan 2-4 weeks.

### When to Switch from Lemon Squeezy to Stripe
**Signs:** Processing $50K+ MRR where the 2% fee premium costs more than hiring a tax automation tool.
**Switch to:** Stripe + Stripe Tax (2.9% + 0.5% tax automation vs 5% all-in).
**Migration difficulty:** Medium. Subscription migration requires customer communication.

### When to Leave Firebase
**Signs:** Monthly bill unpredictable. Need for relational data. Vendor lock-in anxiety.
**Switch to:** Supabase (closest migration path, Postgres-based).
**Migration difficulty:** High. NoSQL to SQL requires data model rethinking. Plan 4-6 weeks.

For detailed migration steps, see [docs/graduation-guides.md](docs/graduation-guides.md).

---

## Tool Directory

Every tool listed here has been used by real solo founders in production. Entries include concrete pricing, verified free tier limits, and honest gotchas.

<details>
<summary><strong>Payments</strong>: Stripe, Lemon Squeezy, Paddle</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Stripe](https://stripe.com) | No monthly fee | 2.9% + $0.30/tx | None | You handle tax compliance. Non-trivial outside the US. |
| [Lemon Squeezy](https://lemonsqueezy.com) | No monthly fee | 5% + $0.50/tx | ~$50K MRR before fee premium hurts | Acquired by Stripe (Jul 2024). Still operating as of Mar 2026 but no major updates since. Expected to fold into Stripe's MoR. |
| [Paddle](https://paddle.com) | No monthly fee | 5% + $0.50/tx | Enterprise-ready | Less indie-focused. Chargeback handling criticized. |

</details>

<details>
<summary><strong>Authentication</strong>: Supabase Auth, Clerk, Auth.js, Better-Auth</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Supabase Auth](https://supabase.com/auth) | 50K MAU | $0.00325/MAU (Pro plan) | Feature-limited (no SSO, basic MFA) | Tied to Supabase ecosystem. Auth UI less polished than Clerk. |
| [Clerk](https://clerk.com) | 10K MAU | $0.02/MAU after 10K | ~50K MAU before costly | Vendor lock-in. Pre-built components make migration hard. |
| [Auth.js](https://authjs.dev) | Unlimited (self-hosted) | $0 | None | You build the UI. More dev time upfront. Worth it at scale. |
| [Better-Auth](https://better-auth.com) | Unlimited (self-hosted) | $0 | None | Newer project. Smaller community. Growing fast. |

</details>

<details>
<summary><strong>Hosting</strong>: Vercel, Railway, Hetzner + Coolify</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Vercel](https://vercel.com) | 100GB bandwidth | $20/mo (Pro) | ~33K pageviews with images on free tier | Bandwidth overages add up. Each team member is $20/mo. |
| [Railway](https://railway.app) | $5 credit/mo | ~$5-15/mo (usage) | Predictable scaling | Less edge optimization than Vercel. |
| [Hetzner](https://hetzner.com) + [Coolify](https://coolify.io) | None | ~$4-10/mo | You control the ceiling | You manage the server. Coolify handles most DevOps. |

</details>

<details>
<summary><strong>Database</strong>: Supabase, Neon, PocketBase</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Supabase](https://supabase.com) | 500MB DB, 1GB storage | $25/mo (Pro) | Handles most solo SaaS needs | RLS learning curve. Vendor-specific features. |
| [Neon](https://neon.tech) | 0.5GB storage | $19/mo | Serverless Postgres, scales to zero | Newer. Cold starts on free tier. |
| [PocketBase](https://pocketbase.io) | Unlimited (self-hosted) | $0 + VPS cost | ~10K concurrent users | SQLite-based. Single binary. No managed cloud option. |

</details>

<details>
<summary><strong>Email</strong>: Resend, Postmark</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Resend](https://resend.com) | 3K emails/mo | $20/mo (50K emails) | Cost scales with volume | No built-in template editor. You build templates in code. |
| [Postmark](https://postmarkapp.com) | None | $15/mo (10K emails) | Best deliverability | No free tier. More expensive at volume. |

</details>

<details>
<summary><strong>Analytics</strong>: PostHog, Plausible, Umami</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [PostHog](https://posthog.com) | 1M events/mo, 5K replays | Usage-based after | Full product analytics suite | Complex for simple website analytics. |
| [Plausible](https://plausible.io) | None | $9/mo | Simple, privacy-first | No product analytics (funnels, cohorts). Website traffic only. |
| [Umami](https://umami.is) | 100K events/mo | $9/mo | Plausible alternative with free tier | Smaller ecosystem. |

</details>

<details>
<summary><strong>AI / LLM Tools</strong>: Cursor, GitHub Copilot, Claude Code, OpenAI API, Anthropic API</summary>

**For building faster (AI coding assistants):**

| Tool | Free Tier | Solo Price | Best For | Gotchas |
|---|---|---|---|---|
| [GitHub Copilot](https://github.com/features/copilot) | 2K completions + 50 chats/mo | $10/mo (Pro) | Inline completions, lowest cost | Less capable for large refactors. |
| [Cursor](https://cursor.com) | Limited (Hobby plan) | $20/mo (Pro) | Multi-file editing, codebase-aware | 500 premium requests/mo burn fast on complex tasks. |
| [Claude Code](https://claude.ai/code) | Included with Claude Pro ($20/mo) | $20/mo or API billing | Agentic multi-step tasks, terminal-native | API billing can spike during heavy sessions. Pro has daily caps. |

**For your product's AI features (LLM APIs):**

| Provider | Cheapest Model | Mid-Tier Model | Cost at 1K Users | Cost at 100K Users |
|---|---|---|---|---|
| [OpenAI](https://openai.com/api) | GPT-4o-mini ($0.15/1M in) | GPT-4o ($2.50/1M in) | ~$50-200/mo | ~$5K-20K/mo |
| [Anthropic](https://anthropic.com/api) | Claude Haiku ($0.80/1M in) | Claude Sonnet ($3/1M in) | ~$50-200/mo | ~$5K-20K/mo |

> **The meta-recommendation:** Use the smallest model that works. GPT-4o-mini and Claude Haiku handle 80% of use cases at 1/20th the cost of frontier models. See the [full AI tools decision guide](docs/decisions/ai-tools.md) for cost estimation formulas.

</details>

<details>
<summary><strong>Monitoring / Error Tracking</strong>: Sentry, BetterStack, Highlight.io</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Sentry](https://sentry.io) | 5K errors/mo | $29/mo (Team) | Free tier covers most solo products | Free tier has 24-hour data retention. |
| [BetterStack](https://betterstack.com) | 10 monitors, 1-min checks | $29/mo (with logging) | Free tier handles basic uptime | Logging requires paid plan. |
| [Highlight.io](https://highlight.io) | 500 sessions/mo | $150/mo (Essentials) | Self-hostable (open source) | Steep jump from free to paid. Best value self-hosted. |

> **When do you need monitoring?** The moment you have paying customers, set up Sentry (free, 30 minutes). Add uptime monitoring (BetterStack free tier) when you hit 100 customers. That's it for most solo products.

</details>

<details>
<summary><strong>Background Jobs / Cron</strong>: Inngest, Trigger.dev, QStash</summary>

| Tool | Free Tier | Solo Price | Scale Ceiling | Gotchas |
|---|---|---|---|---|
| [Inngest](https://inngest.com) | 25K runs/mo | $50/mo (100K runs) | Generous free tier | Vendor lock-in to Inngest's event model. |
| [Trigger.dev](https://trigger.dev) | 50K runs/mo | $50/mo (500K runs) | Open source, self-hostable | Free tier has 30-second duration limit. |
| [QStash](https://upstash.com/docs/qstash) | 500 messages/day | ~$1/100K messages | Serverless, works everywhere | 500 messages/day is tight for active products. |

> **Why this matters:** Vercel has no native support for long-running tasks. The moment you need a background job, cron, or anything that runs longer than 10 seconds, you need one of these. If you're on Railway or Hetzner, you can also just use BullMQ + Redis.

</details>

<details>
<summary><strong>Boilerplates</strong>: Open SaaS, ShipFast, Supastarter</summary>

| Tool | Price | Best For | Gotchas |
|---|---|---|---|
| [Open SaaS (Wasp)](https://opensaas.sh) | Free | Zero vendor lock-in, full ownership | Requires learning Wasp framework |
| [ShipFast](https://shipfa.st) | $199 one-time | Speed to first deploy, active community | Uses MongoDB (not ideal for relational SaaS data) |
| [Supastarter](https://supastarter.dev) | $349 one-time | Most complete feature set, multi-tenancy | Most expensive. Monorepo architecture. |

> **Our take on boilerplates:** A boilerplate saves you 1-2 weeks of setup. That's real value. But none of them save you from understanding your own codebase. If you buy one, read every line before you ship. If you use AI coding tools heavily, you might not need one. Claude Code or Cursor can scaffold a production-ready setup in a few hours.

</details>

---

## What This Guide Doesn't Cover (Yet)

This guide focuses on the core decisions that trip up solo web SaaS founders. Here's what we don't cover yet, and where you can help:

- **Mobile stacks** (React Native/Expo, Flutter) | [contribute](CONTRIBUTING.md)
- **State management** (Redux, Zustand, Jotai) | most solo products don't need a guide for this
- **Testing frameworks** | worth covering, not yet written
- **Domain registration / DNS** | short answer: Cloudflare for DNS, Porkbun or Namecheap for domains
- **CMS / content management** | Sanity, Keystatic, Payload. Relevant for content-heavy products.
- **File storage / CDN** | [issue #1](../../issues/1)
- **Search** | [issue #2](../../issues/2)
- **Customer support** | [issue #3](../../issues/3)

Want to write one of these? See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Contributing

This guide stays useful because people like you keep it honest. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to:

- Add a new tool (with the required YAML format)
- Update pricing data (include your verification date)
- Share a production gotcha or graduation story
- Fix something that's wrong

**Our promise:** No affiliate links. No sponsored placements. No marketing language. Every tool earns its spot by being genuinely useful to solo founders.

---

## License

[MIT](LICENSE). Use this however you want.

---

*All pricing data verified as of March 2026. If you find something outdated, [open an issue](../../issues) or submit a PR.*
