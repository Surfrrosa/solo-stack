# Contributing to solo-stack

Thanks for helping keep this guide honest and useful. Here's how to contribute.

## Our Values

1. **No affiliate links. Ever.** If your PR contains an affiliate link, it will be closed.
2. **No sponsored placements.** Tools earn their spot by being genuinely useful, not by paying.
3. **Concrete numbers required.** "Affordable pricing" is not acceptable. "$25/month for 8GB storage" is.
4. **Honest about trade-offs.** Every tool has downsides. Include them.
5. **Verified data.** Include the date you verified pricing. Link to the pricing page.

## How to Add a New Tool

1. Create a YAML file in `data/tools/` following the schema below.
2. Add the tool to the appropriate table in `README.md`.
3. Include a "last verified" date.
4. Open a PR using the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

### YAML Schema for Tools

```yaml
name: "Tool Name"
url: "https://example.com"
category: "authentication"  # One of: payments, authentication, hosting, database, email, analytics, boilerplate, monitoring
description: "One sentence. What it does and who it's for."

free_tier: "10K MAU"  # Be specific. "Generous free tier" is not acceptable.
solo_price: "$0.02/MAU after 10K"  # The price a solo founder actually pays
pricing_url: "https://example.com/pricing"  # Direct link to pricing page

scale_ceiling: "~50K MAU before costs become significant"
graduation_to: "Auth.js or Better-Auth (self-hosted)"

cost_at_scale:
  100_users: "$0"
  1000_users: "$0"
  10000_users: "$0"
  100000_users: "$1,800/mo"

gotchas:
  - "Vendor lock-in: migrating away requires rebuilding auth UI"
  - "No self-hosted option"

last_verified: "2026-03-04"
verified_by: "github-username"  # Optional but appreciated
```

### Categories

| Category | What belongs here |
|---|---|
| `payments` | Payment processing, billing, subscription management, tax compliance |
| `authentication` | User auth, SSO, session management |
| `hosting` | Web hosting, deployment, CDN, serverless |
| `database` | Databases, BaaS, ORMs (only if they include hosting) |
| `email` | Transactional email, marketing email for developers |
| `analytics` | Web analytics, product analytics, session replay |
| `boilerplate` | SaaS starter kits, templates, scaffolding tools |
| `monitoring` | Error tracking, uptime monitoring, logging |

## How to Update Pricing

Pricing changes constantly. If you notice outdated numbers:

1. Update the YAML file in `data/tools/`.
2. Update the corresponding table row in `README.md`.
3. Update the `last_verified` date.
4. If the change is significant (e.g., a free tier was removed), mention it in your PR description.

## How to Add a Stack Recipe

Stack recipes live in `data/stacks/`. A good stack recipe:

- Has a clear use case ("pre-revenue MVP" not "general purpose")
- Includes total monthly cost
- Lists every component with its specific plan/tier
- Explains when to graduate to the next recipe
- Has been used by at least one real person in production (ideally you)

## How to Add a Production Gotcha

The most valuable contributions are real-world experiences:

- "We hit Vercel's bandwidth cap at 25K pageviews because our images weren't optimized"
- "Clerk's migration path to Auth.js took us 3 weeks, not the 3 days we estimated"
- "Supabase RLS rules became unmanageable past 30 tables"

Add gotchas to the relevant tool's YAML file under the `gotchas` array, or to the appropriate decision guide in `docs/decisions/`.

## How to Write a Decision Guide

Decision guides live in `docs/decisions/`. They follow a flowchart structure:

1. Start with the decision the founder is facing (not the tools)
2. Ask yes/no questions that narrow the options
3. End with a clear recommendation for each path
4. Include concrete cost comparisons
5. Be honest about trade-offs -- no tool is perfect

## Quality Standards

Your PR will be reviewed for:

- [ ] **Specificity**: Concrete numbers, not vague descriptions
- [ ] **Honesty**: Trade-offs included, not just benefits
- [ ] **Verification**: Pricing data has a date and links to source
- [ ] **Relevance**: The tool is genuinely useful to solo founders (not enterprise-only)
- [ ] **No marketing language**: Write like a developer, not a sales page
- [ ] **No affiliate links**: This is non-negotiable

## What We Don't Include

- Tools that require a sales call to get pricing
- Tools with no publicly listed pricing
- Tools that are primarily enterprise-focused with no solo/indie tier
- Defunct or abandoned tools
- Anything that requires us to use marketing language to describe

## Questions?

Open an issue. We're here to help.
