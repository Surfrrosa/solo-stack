# Launch Playbook

A concrete, step-by-step plan for launching solo-stack and building initial traction. The goal: 100+ stars in the first 48 hours to hit GitHub Trending.

---

## Pre-Launch Checklist (Before Launch Day)

- [ ] Social preview image uploaded (Settings > Social Preview, 1280x640px)
- [ ] GitHub Discussions enabled and categories created
- [ ] All issue templates working (test by clicking "New Issue")
- [ ] README renders correctly (check tables, collapsible sections, badges, links)
- [ ] All YAML files pass validation (`npm run validate`)
- [ ] F5Bot account created with keyword alerts (see below)
- [ ] Draft all posts (HN, Reddit, Twitter) in advance
- [ ] Identify 10-15 people to ask for early stars (friends, colleagues, fellow founders)

## F5Bot Setup (5 minutes, do this first)

1. Go to [f5bot.com](https://f5bot.com) and create an account
2. Add these keyword alerts:
   - `saas stack`
   - `solo founder tools`
   - `tech stack solo`
   - `indie hacker tools`
   - `clerk vs`
   - `supabase vs`
   - `vercel alternative`
   - `stripe vs lemon`
   - `merchant of record`
   - `what tools for saas`

This starts working immediately. You'll get emails whenever these keywords appear on Reddit or Hacker News.

---

## Launch Day (Tuesday or Wednesday, 8-10 AM EST)

### Why Tuesday/Wednesday?

Best overlap between European afternoon traffic and US East Coast morning. Highest engagement on both HN and Reddit. Avoid Mondays (catching up from weekend) and Fridays (checking out).

### Step 1: Hacker News (8 AM EST)

**Title:** `Show HN: Solo-Stack -- Opinionated stack guide for solo founders with real pricing`

**First comment (post immediately after submitting):**

```
I built this because I kept seeing the same "what stack should I use?" posts
with 47 different answers and no pricing data.

solo-stack is a community-maintained guide with:
- Opinionated default stack ($0/month to start)
- Real cost projections at 100, 1K, 10K, and 100K users
- Decision flowcharts for payments, auth, hosting, databases, and AI tools
- Graduation guides (when to leave a tool and what to switch to)
- Zero affiliate links, zero sponsored placements

Every pricing number has a verification date. The whole thing is automated --
weekly pricing page monitors, schema validation on PRs, stale data alerts.

What's missing? What would make this more useful for you?
```

**Critical:** Do NOT share the HN link and ask for upvotes. HN detects voting rings. Instead, ask 10-15 people to go to `news.ycombinator.com/newest`, find the post, and upvote organically.

### Step 2: Reddit (9 AM EST)

Post to these subreddits in order, 15 minutes apart:

**r/SaaS** (highest fit):

Title: `I built an open-source stack guide for solo founders with real pricing data and zero affiliate links`

Body:
```
I got tired of seeing the same "what stack should I use" posts where everyone
recommends different things and nobody mentions what it actually costs at scale.

So I built solo-stack -- a community-maintained guide with:

- A default $0/month stack recommendation (Next.js + Supabase + Vercel + Stripe)
- Cost projections at 100, 1K, 10K, and 100K users
- Decision flowcharts for the confusing stuff (payments/taxes, auth, hosting)
- The cost cliff nobody talks about (Clerk: $1,800/mo at 100K users vs
  Supabase Auth: $25/mo)
- Graduation guides for when you outgrow each tool

No affiliate links. No sponsored placements. Every price has a verification date.

GitHub: [link]

What am I missing? What tools should be added?
```

**r/sideproject:**

Title: `Open-source stack guide for solo founders -- real pricing, no affiliate links`

(Same body, slightly shorter)

**r/webdev (Showoff Saturday only, if launch is Tue/Wed save this for Saturday):**

Title: `I built an opinionated stack guide for solo founders with cost calculators and migration guides`

### Step 3: Twitter/X (10 AM EST)

**Launch tweet:**

```
I built an open-source guide for solo founders choosing their tech stack.

Real pricing at 100, 1K, 10K, and 100K users.
Decision flowcharts for payments, auth, and hosting.
Migration guides for when you outgrow a tool.
Zero affiliate links.

The cost cliff nobody talks about:
Auth at 100K users:
- Clerk: $1,800/mo
- Supabase Auth: $25/mo
- Auth.js: $0/mo

[link to repo]
```

Attach a screenshot of the README cost calculator table as an image (visual hook).

**Who to tag/mention (they frequently retweet projects that reference their tools):**
- @suaborern / @kiwicopple (Supabase founders)
- @jaborernard / PostHog team
- @zelodev / Resend team
- Indie hacker accounts with 5K-50K followers who discuss stacks

**Follow-up thread (post 2 hours later):**

Thread breaking down the payments decision guide. The tax/MoR comparison is the most shareable content because everyone cares about money.

### Step 4: Engage (All Day)

- Reply to every comment on HN, Reddit, and Twitter
- Be genuinely helpful, not defensive
- If someone suggests a tool to add, thank them and create a GitHub issue
- If someone finds an error, fix it immediately and reply with the commit link

---

## Week 1: Post-Launch

### Newsletter Submissions

| Newsletter | How to Submit | Audience |
|---|---|---|
| [TLDR](https://tldr.tech) | Email links@tldr.tech or use submission form | 1.2M+ devs |
| [Console.dev](https://console.dev) | Submit at console.dev (features open source tools weekly) | ~60K devs |
| [Bytes](https://bytes.dev) | Contact form, pitch the Next.js angle | ~200K JS devs |
| [Hacker Newsletter](https://hackernewsletter.com) | Automatic if you hit HN front page | ~60K HN readers |
| [TLDR Web Dev](https://tldr.tech/webdev) | Same as TLDR, more targeted | TLDR subset |
| [Pointer.io](https://pointer.io) | Email submissions | ~30K devs |

**Template for newsletter submission:**

```
Subject: Open-source stack guide for solo founders (with real pricing)

Hi [name],

I built solo-stack -- a community-maintained guide that tells solo founders
what tech stack to use, what it actually costs at scale, and when to migrate.

Key data: we show auth costs at 100K users ranging from $0 (Auth.js) to
$1,800/mo (Clerk). Every number is verified with a date stamp. Zero
affiliate links.

GitHub: [link]
Stars: [current count]

Thought your readers might find it useful.

[Your name]
```

### Awesome List Submissions

Submit PRs to these repos:
- `awesome-nextjs` -- for the Next.js stack focus
- `awesome-selfhosted` -- for the Hetzner+Coolify content
- `thedaviddias/indie-dev-toolkit` -- directly relevant
- Any `awesome-saas` or `awesome-startup-tools` lists

Follow each list's contribution guidelines exactly. Include a one-line description matching the list's style.

### r/webdev Showoff Saturday

If you launched on Tuesday/Wednesday, post to r/webdev on Saturday using their Showoff Saturday format.

---

## Ongoing: Community Growth

### Weekly Routine (30 minutes/week)

1. Check the community digest (`data/community-digest.md`) for engagement opportunities
2. Check F5Bot email alerts and reply to relevant posts
3. Review any GitHub issues or PRs
4. Check if any pricing monitor issues were created

### Monthly Routine (1 hour/month)

1. Review stale data checker results
2. Update any tools with changed pricing
3. Create a "What's New" discussion post highlighting recent changes
4. Look for trending discussions about tools we cover and engage

### Content That Gets Shared

Based on what performed well in similar projects:

1. **Cost comparisons** -- the auth pricing cliff ($0 vs $1,800) is the single most shareable data point
2. **"I switched from X to Y"** stories -- graduation stories from the community
3. **Updated pricing data** -- "Clerk just changed their pricing, here's the updated comparison"
4. **New decision guides** -- each one is a standalone piece that can be posted to relevant subreddits

### Star Milestones and What They Mean

| Stars | Meaning | Unlocks |
|---|---|---|
| 50-100 | Can hit GitHub Daily Trending | Snowball effect begins |
| 500 | Credibility threshold | People take the repo seriously |
| 1,000 | Newsletter-worthy | Easier to get featured |
| 5,000 | Reference status | People link to it in discussions |
| 10,000+ | Definitive resource | Self-sustaining growth |

The first 100 stars matter disproportionately. They create the social proof that drives the next 1,000.

---

## What NOT to Do

1. **Don't spam.** Never post a bare repo link without context.
2. **Don't ask for stars.** Provide value and stars follow.
3. **Don't be defensive.** If someone criticizes a recommendation, engage honestly.
4. **Don't post to subreddits where self-promotion isn't welcome.** Check each sub's rules first.
5. **Don't share the HN link for coordinated upvoting.** HN detects this and will penalize you.
6. **Don't launch on a Friday or weekend.** Traffic is lower and your post gets buried faster.
