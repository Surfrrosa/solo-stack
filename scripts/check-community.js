#!/usr/bin/env node

/**
 * Community question monitor.
 * Checks Reddit RSS feeds for posts matching keywords relevant to solo-stack.
 * Creates a markdown digest of relevant posts for review.
 *
 * Run: node scripts/check-community.js
 * No API keys needed -- uses Reddit's public RSS feeds.
 */

const fs = require("fs");
const path = require("path");

const DIGEST_DIR = path.join(__dirname, "..", "data");
const DIGEST_FILE = path.join(DIGEST_DIR, "community-digest.md");

const SUBREDDITS = [
  "SaaS",
  "indiehackers",
  "nextjs",
  "webdev",
  "sideproject",
  "selfhosted",
  "startups",
];

const KEYWORDS = [
  "saas stack",
  "tech stack",
  "solo founder",
  "indie hacker",
  "what tools",
  "which tools",
  "best stack",
  "authentication",
  "auth provider",
  "clerk vs",
  "supabase vs",
  "vercel vs",
  "stripe vs",
  "lemon squeezy",
  "hosting cost",
  "self host",
  "coolify",
  "background jobs",
  "payment processor",
  "merchant of record",
  "boilerplate",
  "starter kit",
  "ai coding",
  "cursor vs",
  "copilot vs",
];

async function fetchRSS(subreddit) {
  const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=50`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "solo-stack-community-monitor/1.0",
      },
    });

    if (!response.ok) {
      console.error(
        `  Failed to fetch r/${subreddit}: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const data = await response.json();
    return data.data.children.map((child) => ({
      title: child.data.title,
      url: `https://reddit.com${child.data.permalink}`,
      subreddit: child.data.subreddit,
      score: child.data.score,
      num_comments: child.data.num_comments,
      created: new Date(child.data.created_utc * 1000),
      selftext: (child.data.selftext || "").slice(0, 500),
    }));
  } catch (e) {
    console.error(`  Error fetching r/${subreddit}: ${e.message}`);
    return [];
  }
}

function matchesKeywords(post) {
  const text = `${post.title} ${post.selftext}`.toLowerCase();
  const matched = KEYWORDS.filter((kw) => text.includes(kw));
  return matched.length > 0 ? matched : null;
}

async function main() {
  console.log("Scanning Reddit for relevant community questions...\n");

  const allPosts = [];

  for (const sub of SUBREDDITS) {
    console.log(`  Checking r/${sub}...`);
    const posts = await fetchRSS(sub);
    console.log(`    Found ${posts.length} recent posts`);

    for (const post of posts) {
      const matched = matchesKeywords(post);
      if (matched) {
        allPosts.push({ ...post, matched_keywords: matched });
      }
    }

    // Be polite to Reddit's rate limiting
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Sort by score (most engagement first)
  allPosts.sort((a, b) => b.score - a.score);

  // Filter to last 7 days
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentPosts = allPosts.filter((p) => p.created > weekAgo);

  console.log(
    `\nFound ${recentPosts.length} relevant posts from the last 7 days.\n`
  );

  // Generate digest
  const now = new Date().toISOString().split("T")[0];
  let digest = `# Community Question Digest\n\n`;
  digest += `*Generated: ${now}*\n\n`;
  digest += `Found ${recentPosts.length} relevant posts across ${SUBREDDITS.length} subreddits.\n\n`;
  digest += `---\n\n`;

  if (recentPosts.length === 0) {
    digest += `No relevant posts found this week.\n`;
  } else {
    for (const post of recentPosts.slice(0, 30)) {
      digest += `### [${post.title}](${post.url})\n`;
      digest += `**r/${post.subreddit}** | ${post.score} points | ${post.num_comments} comments | ${post.created.toISOString().split("T")[0]}\n`;
      digest += `Keywords: ${post.matched_keywords.join(", ")}\n`;
      if (post.selftext) {
        digest += `\n> ${post.selftext.replace(/\n/g, "\n> ").slice(0, 200)}...\n`;
      }
      digest += `\n---\n\n`;
    }
  }

  fs.writeFileSync(DIGEST_FILE, digest);
  console.log(`Digest written to ${DIGEST_FILE}`);

  // Output for GitHub Actions
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(
      outputPath,
      `found_posts=${recentPosts.length > 0 ? "true" : "false"}\n`
    );
    fs.appendFileSync(
      outputPath,
      `post_count=${recentPosts.length}\n`
    );
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
