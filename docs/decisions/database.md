# How to Pick a Database

For 95% of solo SaaS products, the answer is Postgres. The question is how you want to run it.

## The Decision

```
Do you need relational data (users, subscriptions, invoices, etc.)?
|
+-- YES (most SaaS products) --> Are you already using Supabase for auth or storage?
|   |
|   +-- YES --> Use Supabase. Database is included. Don't overthink it.
|   |
|   +-- NO --> Do you need scale-to-zero (pay nothing when nobody's using it)?
|       |
|       +-- YES --> Use Neon. Serverless Postgres, scales to zero on free tier.
|       |
|       +-- NO --> Use Supabase. The all-in-one platform saves you integration time.
|
+-- NO --> Is your app simple (blog, todo app, internal tool, <10K users)?
    |
    +-- YES --> Consider PocketBase. Single binary, SQLite, zero config. Delightfully simple.
    |
    +-- NO --> Use Postgres (Supabase or Neon). You'll need it eventually anyway.
```

## The Options

### Supabase: The Platform Play

**What it is:** Managed Postgres + Auth + Storage + Realtime + Edge Functions in one platform.

**Why solo founders love it:** One dashboard, one bill, one SDK. Auth is included. File storage is included. Realtime subscriptions are included. You can build a complete app without integrating 5 different services.

**The trade-off:** You're buying into the Supabase ecosystem. Their RLS (Row Level Security) model has a learning curve. Some features (Edge Functions, Realtime) are Supabase-specific and won't transfer if you leave. But the underlying database is standard Postgres. Your data and SQL are portable.

**Cost:**
- Free: 500MB database, 1GB storage, 50K auth MAUs
- Pro: $25/mo (8GB database, 100GB storage)
- That covers most solo SaaS products well past product-market fit.

### Neon: The Serverless Play

**What it is:** Serverless Postgres that scales to zero. You pay for compute time, not a running server.

**Why it's interesting:** On the free tier, your database literally turns off when nobody's using it. No idle costs. Cold starts are ~500ms (noticeable but acceptable for most apps). The branching feature lets you create database copies for testing, which is powerful.

**The trade-off:** It's just a database. No auth, no storage, no realtime. You integrate those separately. Cold starts on the free tier can add latency. Newer company than Supabase, smaller community.

**Cost:**
- Free: 0.5GB storage, 190 compute hours/mo
- Launch: $19/mo (10GB storage, 300 compute hours)
- Scale: $69/mo (50GB, unlimited compute)

### PocketBase: The Simple Play

**What it is:** An open-source backend in a single binary. SQLite database + auth + file storage + realtime. Download it, run it, done.

**Why it's interesting:** Zero external dependencies. No cloud account needed. Deploy it on a $4/mo VPS and you have a complete backend. The admin UI is built in. It's delightful for small projects.

**The trade-off:** SQLite doesn't do concurrent writes well. One server, one database file. No horizontal scaling. No managed cloud option (you run it yourself). If your product grows past ~10K concurrent users, you'll need to migrate to Postgres.

**Cost:**
- Free (open source) + whatever your VPS costs ($4-10/mo on Hetzner)

## Cost Comparison

| | 100 users | 1K users | 10K users | 100K users |
|---|---|---|---|---|
| Supabase (Free) | $0 | $0 | $0 | Over free tier |
| Supabase (Pro) | $25 | $25 | $25 | $75+ |
| Neon (Free) | $0 | $0 | $0 | Over free tier |
| Neon (Launch) | $19 | $19 | $19 | $69+ |
| PocketBase + VPS | $4 | $4 | $6 | Need to migrate |

All three options are cheap. The database itself is rarely the cost problem in a solo SaaS stack. The cost differences between these options are dwarfed by auth and payment processing costs.

## What About Firebase / Firestore?

If you're coming from the Firebase world: Firestore is a NoSQL document database. It works differently from everything above. The per-read pricing model makes costs unpredictable at scale, and the lack of joins makes complex queries painful.

If you're starting fresh, don't choose Firestore for a SaaS product. If you're already on Firebase, see the [graduation guide for migrating to Supabase](../graduation-guides.md#when-to-leave-firebase).

## What About MongoDB?

MongoDB is a fine database, but it's not the best fit for most SaaS products. SaaS data is inherently relational (users have subscriptions, subscriptions have invoices, invoices have line items). Postgres handles this natively. MongoDB requires you to denormalize or use $lookup aggregations, which adds complexity.

If you're using a boilerplate that comes with MongoDB (like ShipFast), it'll work fine for an MVP. But know that you're swimming upstream for relational data.

## Our Recommendation

**Building a SaaS product?** Use Supabase. The all-in-one platform saves you integration time, the free tier is generous, and the Pro plan at $25/mo covers most solo products through product-market fit and beyond.

**Need serverless / scale-to-zero?** Use Neon. Great for projects with variable traffic where you don't want to pay for idle compute.

**Building something small and simple?** Try PocketBase. The single-binary simplicity is hard to beat for internal tools, side projects, and MVPs where you want zero cloud dependencies.

**Already have a VPS?** You can also just run Postgres directly. It's free, it's the most battle-tested database in existence, and every ORM and tool supports it. Supabase and Neon are convenience layers on top of Postgres. You don't strictly need them.

---

*Pricing verified March 2026. [Report outdated info.](../../issues)*
