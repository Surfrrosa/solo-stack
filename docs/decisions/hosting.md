# Where to Host (and When to Migrate)

Hosting is where solo founders get their first surprise bill. The free tiers are generous until they're not.

## The Decision

```
Are you pre-revenue and just need to ship?
|
+-- YES --> Use Vercel (free tier). Best DX for Next.js. Don't overthink it.
|
+-- NO --> Do you need backend services (workers, cron jobs, background tasks)?
    |
    +-- YES --> Use Railway ($5-15/mo). Everything in one place.
    |
    +-- NO --> Are you comfortable managing a server?
        |
        +-- YES --> Use Hetzner + Coolify ($4-10/mo). Own your infrastructure.
        |
        +-- NO --> Use Railway. Managed, predictable, no server admin.
```

## The Vercel Bandwidth Trap

Vercel's free tier gives you 100GB of bandwidth. That sounds like a lot. Here's the math:

- Average Next.js page with images: ~3MB
- 100GB / 3MB = **~33,000 pageviews per month**
- That's about **1,100 pageviews per day**

If your product gets any traction at all, you'll hit this within months. Then you're on the Pro plan at $20/month, which is fine -- but be aware.

The real cost issue is team scaling. Vercel Pro charges **per seat**:
- 1 developer: $20/mo
- 2 developers: $40/mo
- 5 developers: $100/mo

Railway charges per usage, not per seat. A team of 5 on Railway might pay $15-30/mo total.

## Cost Comparison at Scale

| Users | Vercel (Hobby) | Vercel (Pro) | Railway | Hetzner + Coolify |
|---|---|---|---|---|
| 100 | $0 | $20/mo | $5/mo | $4/mo |
| 1,000 | $0 | $20/mo | $8-15/mo | $4-6/mo |
| 10,000 | Over free tier | $20-50/mo | $15-30/mo | $10-20/mo |
| 100,000 | Over free tier | $150+/mo | $50-100/mo | $30-80/mo |

The savings from self-hosting compound as you grow. Teams report **50-70% lower costs** on Hetzner + Coolify compared to Vercel.

## The Self-Hosting Trade-Off

**Hetzner + Coolify** gives you:
- Git push deploys (like Vercel)
- Preview URLs for PRs (like Vercel)
- Automatic SSL certificates (like Vercel)
- One-click databases (Postgres, Redis, MongoDB)
- All for $4-10/month on a Hetzner VPS

What you give up:
- Edge network (your site is served from one region, not globally)
- Zero-config scaling (you manually upgrade your VPS)
- "It just works" reliability (you're responsible for uptime)

The edge network gap is solvable: put Cloudflare (free tier) in front of your VPS for global CDN and DDoS protection.

## When to Migrate

### Vercel Free to Railway
**When:** You need backend workers, cron jobs, or a database alongside your frontend. Or your bandwidth is consistently over 80GB/month.
**How:** Next.js runs on Railway with minimal config changes. Deploy, point your domain, done.
**Time:** 1-2 hours.

### Vercel/Railway to Hetzner + Coolify
**When:** You're spending $50+/month on hosting and want to cut costs by 50-70%. Or you want to own your infrastructure on principle.
**How:** Spin up a Hetzner VPS ($4-10/mo), install Coolify (one command), connect your GitHub repo.
**Time:** 2-4 hours for initial setup. Add Cloudflare CDN in front for global performance.

### Railway to Vercel
**When:** You need edge performance globally and are willing to pay for it. Rare for solo founders.
**How:** Deploy to Vercel, move database to Supabase or Neon if it was on Railway.
**Time:** 1-2 hours.

## Our Recommendation

**Starting out?** Vercel free tier. Zero config, best DX, ships in minutes. Don't overthink it.

**Have paying customers?** Railway. Everything in one place, predictable pricing, no bandwidth surprises.

**Past product-market fit?** Hetzner + Coolify. Own your infrastructure. The 2-4 hours of setup saves you thousands over the life of your product.

**All stages:** Put Cloudflare's free tier in front of whatever you choose. Free SSL, free CDN, free DDoS protection.

---

*Pricing verified March 2026. [Report outdated info.](../../issues)*
