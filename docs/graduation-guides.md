# Graduation Guides

Every tool has a ceiling. The smart move is knowing when you'll hit it and having a plan before you do.

---

## When to Leave Vercel

### Signs It's Time
- Bandwidth bills exceeding $50/month
- Need for long-running background jobs (Vercel functions have execution time limits)
- Adding team members at $20/seat is becoming expensive
- You want predictable pricing instead of usage-based surprises

### Where to Go
- **Railway** ($5-15/mo): Managed platform, everything in one place, usage-based pricing without per-seat costs
- **Hetzner + Coolify** ($4-10/mo): Self-hosted, maximum cost control, Vercel-like DX

### Migration Steps
1. Next.js runs anywhere. No code changes needed for the framework itself.
2. Move environment variables to your new platform.
3. Update DNS to point to the new host.
4. If using Vercel-specific features (Edge Config, KV, Cron), find alternatives:
   - Edge Config: use environment variables or a database
   - Vercel KV: use Upstash Redis (has a free tier)
   - Vercel Cron: use Railway's built-in cron or a cron service

### Migration Difficulty: Low
**Time estimate:** 1-4 hours depending on Vercel-specific feature usage.

---

## When to Leave Clerk

### Signs It's Time
- Approaching 50K MAU and the monthly bill is becoming significant relative to revenue
- At $0.02/MAU, 50K users = $800/mo. 100K users = $1,800/mo.
- You don't use Clerk's advanced features (org management, SAML SSO) and are paying for pre-built UI you could replace

### Where to Go
- **Auth.js** (free, self-hosted): Most mature self-hosted option. You build the UI.
- **Better-Auth** (free, self-hosted): Modern alternative. Growing fast.
- **Supabase Auth** ($0 with Supabase Pro): If you're already on Supabase.

### Migration Steps
1. Set up your new auth provider alongside Clerk (don't rip it out yet).
2. Build replacement UI for sign-in, sign-up, profile, and any org management flows.
3. Migrate user data: export from Clerk, import to your new auth database.
4. Update every protected route and middleware to use the new auth check.
5. Run both in parallel for a week. Monitor for edge cases.
6. Remove Clerk.

### Migration Difficulty: High
**Time estimate:** 2-4 weeks. Auth touches everything. The pre-built components that made Clerk fast to adopt are the same thing that makes it slow to leave. Every `<SignIn />`, `<UserButton />`, and `useUser()` hook needs to be replaced with your own implementation.

### How to Prepare
- Wrap Clerk's hooks in your own abstraction layer from day one. Instead of `useUser()` from Clerk everywhere, create a `useAuth()` hook that wraps it. When you migrate, you change one file instead of fifty.

---

## When to Leave Firebase

### Signs It's Time
- Monthly bills are unpredictable (Firestore's per-read pricing makes costs hard to forecast)
- Need for relational data (Firestore is NoSQL and doesn't do joins)
- Vendor lock-in anxiety (Firebase proprietary APIs don't have equivalents elsewhere)
- Want to use Postgres and benefit from the larger ecosystem

### Where to Go
- **Supabase**: Closest migration path. Postgres-based. Has similar features (auth, storage, realtime).

### Migration Steps
1. Design your Postgres schema. This is the hard part: NoSQL to SQL requires rethinking your data model.
2. Write migration scripts to transform Firestore documents into Postgres rows.
3. Set up Supabase project and configure RLS policies.
4. Migrate Auth: Supabase can import Firebase Auth users, but passwords need to be re-hashed or users need to reset passwords.
5. Update all database queries from Firestore SDK to Supabase client.
6. Migrate file storage from Firebase Storage to Supabase Storage.
7. Test thoroughly. Data model changes surface bugs in unexpected places.

### Migration Difficulty: High
**Time estimate:** 4-6 weeks for a medium-sized app. The NoSQL-to-SQL data model rethinking is the bottleneck, not the code changes.

---

## When to Switch from Lemon Squeezy to Stripe

### Signs It's Time
- Processing $50K+ MRR and the fee difference is becoming material ($1,270/mo at $50K MRR)
- Need for Stripe's advanced features (Connect for marketplaces, advanced fraud protection, custom checkout flows)
- Lemon Squeezy quality issues are affecting your customers (bugs, support delays)

### Where to Go
- **Stripe + Stripe Tax**: 2.9% + $0.30 + 0.5% for tax automation. Total ~3.4% vs Lemon Squeezy's 5%.

### Migration Steps
1. Set up Stripe account and configure products/prices to match your Lemon Squeezy setup.
2. Set up Stripe Tax for automated tax collection.
3. Register for tax remittance in jurisdictions where you have obligations (Stripe Tax calculates and collects, but you may still need to file).
4. Migrate active subscriptions: this is the hardest part. Options:
   - **Gradual:** New customers go to Stripe. Existing customers stay on Lemon Squeezy until they churn or renew.
   - **Full migration:** Export customer data, create Stripe subscriptions, communicate the change to customers, handle payment method re-collection.
5. Update webhooks and billing logic in your app.
6. Cancel Lemon Squeezy account once all subscriptions are migrated.

### Migration Difficulty: Medium
**Time estimate:** 2-3 weeks. The gradual approach (new customers on Stripe, existing on Lemon Squeezy) reduces risk and can be done in a few days, but you'll run two systems in parallel until the old subscriptions drain.

---

## General Migration Advice

1. **Don't migrate prematurely.** If a tool works and the cost is manageable relative to your revenue, keep using it. Migration has hidden costs (your time, potential bugs, customer disruption).

2. **Wrap external services in abstraction layers.** A thin wrapper around your auth, payments, and database client means migration changes one file instead of fifty.

3. **Run parallel for a week before cutting over.** Especially for auth and payments. The cost of running both services for a week is nothing compared to the cost of a botched migration.

4. **Communicate with customers for payment migrations.** If you're changing payment processors, tell your customers. Nobody likes a surprise charge from a company they don't recognize.

5. **The best time to plan your graduation is when you pick the tool.** Not when you're at 90% of the ceiling, panicking. Read this guide before you commit to anything.

---

*Last updated March 2026. [Report outdated info.](../../issues)*
