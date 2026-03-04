# Community Monitor Setup

solo-stack includes automated tools to find people asking the exact questions this repo answers. This helps you engage genuinely (not spam) in places where solo-stack adds real value.

## Automated: GitHub Actions Community Scanner

The `community-monitor.yml` workflow runs every Wednesday and:

1. Scans 7 subreddits via Reddit's public JSON API (no API key needed)
2. Matches posts against relevant keywords (saas stack, solo founder tools, auth pricing, etc.)
3. Generates a digest at `data/community-digest.md`
4. Creates a GitHub issue if 5+ relevant posts are found that week

**Subreddits monitored:** r/SaaS, r/indiehackers, r/nextjs, r/webdev, r/sideproject, r/selfhosted, r/startups

**To run manually:** `npm run check:community` or trigger the workflow from GitHub Actions.

## Manual: F5Bot Keyword Alerts

[F5Bot](https://f5bot.com) is a free service that emails you when specific keywords appear on Reddit or Hacker News. Set it up once, get alerts forever.

### Setup (5 minutes)

1. Go to [f5bot.com](https://f5bot.com) and create an account
2. Add these keyword alerts:

| Keyword | Why |
|---|---|
| `saas stack` | People choosing their tech stack |
| `solo founder tools` | Direct audience match |
| `tech stack solo` | Variation of the above |
| `indie hacker tools` | Same audience, different term |
| `what tools for saas` | Question format, high intent |
| `clerk vs` | Auth comparison (we have a guide for this) |
| `supabase vs` | Database/auth comparison |
| `vercel alternative` | Hosting decision (we have a guide) |
| `stripe vs lemon` | Payments decision (we have a guide) |
| `merchant of record` | Tax/payments question |

3. F5Bot will email you when these keywords appear in new Reddit posts or HN submissions.

### How to Engage (Without Being Spammy)

1. **Answer the question first.** Give a genuinely helpful response.
2. **Link to specific sections.** Don't say "check out solo-stack." Say "here's a cost comparison at different user scales" and link directly to the relevant decision guide.
3. **Only link when it's relevant.** If someone is asking about a topic we cover in depth, link. If it's tangential, just help.
4. **Disclose.** If someone asks, be upfront that you maintain the repo.

## Keyword Reference

These are the keywords the automated scanner checks. Update them in `scripts/check-community.js`:

**Stack/tool selection:** saas stack, tech stack, solo founder, indie hacker, what tools, which tools, best stack, boilerplate, starter kit

**Specific comparisons:** clerk vs, supabase vs, vercel vs, stripe vs, cursor vs, copilot vs

**Category-specific:** authentication, auth provider, hosting cost, self host, coolify, background jobs, payment processor, merchant of record, lemon squeezy, ai coding
