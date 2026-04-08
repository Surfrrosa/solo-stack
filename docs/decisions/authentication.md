# How to Handle Authentication

Auth is one of those things that feels simple until you look at the pricing page at scale. The tools are all good. The cost structures are wildly different.

## The Decision

```
Are you already using Supabase for your database?
|
+-- YES --> Use Supabase Auth. It's included. Free up to 50K MAU.
|
+-- NO --> How fast do you need to ship?
    |
    +-- "I need auth working today" --> Use Clerk. Best DX. Pre-built components.
    |                                   But know that you'll pay $0.02/MAU past 10K.
    |
    +-- "I can spend a week on auth" --> Use Auth.js. $0 forever. You build the UI.
    |
    +-- "I want modern + self-hosted" --> Use Better-Auth. Newer but growing fast.
```

## The Cost Cliff Nobody Talks About

This is the table that should scare you:

| Users | Supabase Auth | Clerk | Auth0 |
|---|---|---|---|
| 1,000 | $0 | $0 | $0 |
| 10,000 | $0 | $0 | $230/mo |
| 50,000 | $25/mo (Supabase Pro) | $0 | $1,750/mo |
| 100,000 | $25/mo | $600-1,000/mo | $3,500/mo |

Clerk expanded their free tier to 50K users in Feb 2026 (was 10K), which is a big improvement. But at 100K users, Clerk still costs **$600-1,000/month** while Supabase Auth costs **$25/month**. Auth.js costs $0 at any scale.

This doesn't mean Clerk is bad. It's excellent, and the free tier is now generous. But you should still know the cost trajectory before you commit.

## The Trade-Off Matrix

| Factor | Supabase Auth | Clerk | Auth.js | Better-Auth |
|---|---|---|---|---|
| Time to integrate | 1-2 days | 1-2 hours | 1-2 weeks | 1-2 weeks |
| Pre-built UI | Basic | Excellent | None (you build it) | None (you build it) |
| Cost at 100K users | $25/mo | $600-1,000/mo | $0 | $0 |
| Vendor lock-in | Medium (tied to Supabase) | High (pre-built components) | None | None |
| SSO / Enterprise auth | No | Yes | Community plugins | Growing support |
| Self-hosted option | No | No | Yes | Yes |

## Migration Difficulty

Moving auth is one of the hardest migrations in a SaaS product. Every protected route, every session check, every user profile touches auth.

**Clerk to Auth.js:** Plan 2-4 weeks. You're rebuilding all auth UI (sign in, sign up, profile, org management). The pre-built components that made Clerk fast to integrate are the same thing that makes it hard to leave.

**Supabase Auth to Clerk:** Plan 1-2 weeks. Simpler because Supabase Auth has less custom UI to replace. Note: Clerk's free tier now covers 50K users, making this switch more affordable than it used to be.

**Supabase Auth to Auth.js:** Plan 2-3 weeks. You're building new UI and moving session management.

**Auth.js to anything:** Relatively easy. You already own all the UI and logic.

## Our Recommendation

**Using Supabase?** Use Supabase Auth. It's included, it's cheap at scale, and it covers 90% of what solo founders need. Upgrade to Clerk only if you specifically need pre-built UI components or enterprise auth features.

**Not using Supabase and need to ship fast?** Use Clerk. Accept the cost trade-off. If your product works and grows, the auth bill at scale is a good problem to have. You can migrate later.

**Not using Supabase and building for the long term?** Use Auth.js. Invest the 1-2 weeks upfront. Your future self at 50K users will thank you.

**Exploring alternatives?** Better-Auth is worth watching. Modern API design, self-hosted, growing community. Still newer and less battle-tested than Auth.js.

---

*Pricing verified March 2026. [Report outdated info.](../../issues)*
