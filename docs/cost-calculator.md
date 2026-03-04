# Cost Calculator

What your stack actually costs as you grow. Real numbers from real pricing pages, not marketing estimates.

## How to Read This

- **Infrastructure costs** are what you pay regardless of revenue (hosting, database, email, analytics)
- **Transaction costs** scale with revenue (payment processing)
- **Per-user costs** scale with users, not revenue (auth services with MAU pricing)

The dangerous category is **per-user costs**. They can grow faster than your revenue.

> **ARPU assumption:** All payment processing estimates below assume **$10/mo average revenue per user**, which is typical for B2C SaaS. If you're building B2B at $50-200/mo ARPU, multiply the Stripe/Lemon Squeezy rows by 5-20x. The infrastructure rows stay the same.

---

## Stack A: The $0 MVP (Supabase + Vercel + Stripe)

| Component | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Supabase (Free) | $0 | $0 | $0 | $0 |
| Supabase Auth (Free) | $0 | $0 | $0 | $0 |
| Vercel (Hobby) | $0 | $0 | $0 | Over limit |
| Resend (Free) | $0 | $0 | $0 | $0 |
| PostHog (Free) | $0 | $0 | $0 | $0 |
| **Infrastructure** | **$0** | **$0** | **$0** | **Free tier exceeded** |
| Stripe (2.9% + $0.30) | $29 | $290 | $2,900 | $29,000 |

Free tier limits you'll hit first: Vercel bandwidth (~33K pageviews), then Supabase storage (500MB), then Resend emails (3K/mo).

---

## Stack B: The $50 Production (Supabase Pro + Railway + Lemon Squeezy)

| Component | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Supabase Pro | $25 | $25 | $25 | $75 |
| Supabase Auth (included) | $0 | $0 | $0 | $0 |
| Railway | $5 | $10 | $15 | $50 |
| Resend Pro | $20 | $20 | $20 | $20 |
| PostHog (Free) | $0 | $0 | $0 | $50 |
| **Infrastructure** | **$50** | **$55** | **$60** | **$195** |
| Lemon Squeezy (5% + $0.50) | $55 | $550 | $5,500 | $55,000 |

Infrastructure stays flat and cheap. Payment processing scales linearly with revenue. No surprises.

---

## Stack C: The $100 Scale (Self-hosted + Auth.js + Stripe)

| Component | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Supabase Pro | $25 | $25 | $25 | $75 |
| Auth.js (self-hosted) | $0 | $0 | $0 | $0 |
| Hetzner + Coolify | $6 | $6 | $10 | $30 |
| Postmark | $15 | $15 | $15 | $85 |
| PostHog | $0 | $0 | $0 | $50 |
| Sentry (Free) | $0 | $0 | $0 | $0 |
| **Infrastructure** | **$46** | **$46** | **$50** | **$240** |
| Stripe + Tax (3.4%) | $37 | $370 | $3,700 | $37,000 |

Lowest infrastructure cost at scale. Self-hosted auth means zero per-user cost cliffs.

---

## The Danger Zone: What Happens If You Pick Clerk

To be clear: Clerk is excellent. But you need to see this math before you commit.

| Component | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Clerk Auth | $0 | $0 | $0 | **$1,800** |
| Rest of Stack B | $50 | $55 | $60 | $195 |
| **Infrastructure** | **$50** | **$55** | **$60** | **$1,995** |

At 100K users, Clerk alone costs more than all other infrastructure combined. By a factor of 9.

This doesn't mean you shouldn't use Clerk. It means you should **plan your graduation path** before you hit 50K users. See the [Graduation Guides](graduation-guides.md).

---

## Revenue Required to Sustain Each Stack

A healthy SaaS business keeps infrastructure under 10-15% of revenue.

| Stack | Monthly Infra at 10K Users | Revenue Needed (at 10% target) |
|---|---|---|
| $0 MVP | $0 (free tier) | $0 (but you'll outgrow it) |
| $50 Production | $60 | $600/mo MRR |
| $100 Scale | $50 | $500/mo MRR |
| $50 Production + Clerk | $60 at 10K, but $1,995 at 100K | $20,000/mo MRR at 100K users |

The Scale Stack is paradoxically cheaper than the Production Stack at high volume because self-hosted auth eliminates the per-user cost cliff.

---

## Key Takeaways

1. **Infrastructure is cheap.** You can run a real SaaS for $50-60/month.
2. **Payment processing is your biggest cost** -- and that's fine because it scales with revenue.
3. **Per-user auth pricing is the hidden trap.** Plan for it or avoid it.
4. **Self-hosting saves 50-70%** at scale but requires upfront investment in setup.
5. **Free tiers are for validation, not production.** Graduate when you have paying customers.

---

*All pricing verified March 2026. [Report outdated info.](../../issues)*
