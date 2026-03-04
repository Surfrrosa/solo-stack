#!/usr/bin/env node

/**
 * Checks for tool entries with stale pricing data (>90 days since last_verified).
 * Run: node scripts/check-stale.js
 * Outputs JSON list of stale tools for GitHub Actions to create issues.
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const TOOLS_DIR = path.join(__dirname, "..", "data", "tools");
const STALE_THRESHOLD_DAYS = 90;

const staleTools = [];
const now = new Date();

if (!fs.existsSync(TOOLS_DIR)) {
  console.error("data/tools/ directory not found.");
  process.exit(1);
}

const files = fs
  .readdirSync(TOOLS_DIR)
  .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));

for (const file of files) {
  const filePath = path.join(TOOLS_DIR, file);
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(content);

    if (!data || !data.last_verified) {
      staleTools.push({
        file,
        name: data?.name || file,
        reason: "No last_verified date",
        days_old: "unknown",
      });
      continue;
    }

    const verified = new Date(data.last_verified);
    const daysSince = Math.floor((now - verified) / (1000 * 60 * 60 * 24));

    if (daysSince > STALE_THRESHOLD_DAYS) {
      staleTools.push({
        file,
        name: data.name,
        last_verified: data.last_verified,
        days_old: daysSince,
        pricing_url: data.pricing_url || data.url,
      });
    }
  } catch (e) {
    console.error(`Error reading ${file}: ${e.message}`);
  }
}

if (staleTools.length === 0) {
  console.log("All tool data is fresh (verified within the last 90 days).");
  process.exit(0);
} else {
  console.log(`Found ${staleTools.length} stale tool(s):\n`);
  for (const tool of staleTools) {
    console.log(
      `  - ${tool.name} (${tool.file}): ${tool.days_old} days since last verification`
    );
  }

  // Output JSON for GitHub Actions
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(outputPath, `stale=true\n`);
    fs.appendFileSync(
      outputPath,
      `stale_tools=${JSON.stringify(staleTools)}\n`
    );
  }

  process.exit(0);
}
