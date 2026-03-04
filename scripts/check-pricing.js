#!/usr/bin/env node

/**
 * Pricing page change detector.
 * Uses Playwright to visit each tool's pricing page, extracts text content,
 * hashes it, and compares against stored hashes. When a page changes,
 * it flags the tool for manual review.
 *
 * Run: node scripts/check-pricing.js
 * Requires: npx playwright install --with-deps chromium
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const yaml = require("js-yaml");

const TOOLS_DIR = path.join(__dirname, "..", "data", "tools");
const HASHES_FILE = path.join(__dirname, "..", "data", "pricing-hashes.json");

async function loadHashes() {
  try {
    const content = fs.readFileSync(HASHES_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function saveHashes(hashes) {
  fs.writeFileSync(HASHES_FILE, JSON.stringify(hashes, null, 2) + "\n");
}

function hashContent(text) {
  return crypto.createHash("sha256").update(text).digest("hex").slice(0, 16);
}

async function main() {
  let chromium;
  try {
    const pw = require("playwright");
    chromium = pw.chromium;
  } catch {
    console.error(
      "Playwright not installed. Run: npm install playwright && npx playwright install --with-deps chromium"
    );
    process.exit(1);
  }

  // Load tool files and extract pricing URLs
  const tools = [];
  const files = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(TOOLS_DIR, file), "utf8");
      const data = yaml.load(content);
      if (data && (data.pricing_url || data.url)) {
        tools.push({
          file,
          name: data.name,
          url: data.pricing_url || data.url,
        });
      }
    } catch (e) {
      console.error(`Error reading ${file}: ${e.message}`);
    }
  }

  console.log(`Checking ${tools.length} pricing pages...\n`);

  const storedHashes = await loadHashes();
  const newHashes = {};
  const changed = [];
  const newTools = [];
  const errors = [];

  const browser = await chromium.launch({ headless: true });

  for (const tool of tools) {
    const page = await browser.newPage();
    try {
      console.log(`  Checking ${tool.name} (${tool.url})...`);
      await page.goto(tool.url, {
        waitUntil: "networkidle",
        timeout: 30000,
      });

      // Wait a moment for any JS rendering
      await page.waitForTimeout(2000);

      // Extract main content text (skip nav/footer)
      const text = await page.evaluate(() => {
        const main =
          document.querySelector("main") ||
          document.querySelector('[role="main"]') ||
          document.querySelector("#main") ||
          document.body;

        return main.innerText
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();
      });

      const hash = hashContent(text);
      newHashes[tool.file] = hash;

      if (!storedHashes[tool.file]) {
        newTools.push(tool);
        console.log(`    -> NEW (first check, hash: ${hash})`);
      } else if (storedHashes[tool.file] !== hash) {
        changed.push(tool);
        console.log(
          `    -> CHANGED (was: ${storedHashes[tool.file]}, now: ${hash})`
        );
      } else {
        console.log(`    -> unchanged`);
      }
    } catch (e) {
      errors.push({ ...tool, error: e.message });
      console.log(`    -> ERROR: ${e.message}`);
      // Keep old hash if we can't check
      if (storedHashes[tool.file]) {
        newHashes[tool.file] = storedHashes[tool.file];
      }
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Save updated hashes
  saveHashes(newHashes);

  // Summary
  console.log("\n---");
  console.log(`Checked: ${tools.length}`);
  console.log(`Changed: ${changed.length}`);
  console.log(`New: ${newTools.length}`);
  console.log(`Errors: ${errors.length}`);

  if (changed.length > 0) {
    console.log("\nPricing pages that changed:");
    for (const tool of changed) {
      console.log(`  - ${tool.name}: ${tool.url}`);
    }
  }

  // Output for GitHub Actions
  const outputPath = process.env.GITHUB_OUTPUT;
  if (outputPath) {
    fs.appendFileSync(
      outputPath,
      `changed=${changed.length > 0 ? "true" : "false"}\n`
    );
    fs.appendFileSync(
      outputPath,
      `changed_tools=${JSON.stringify(changed)}\n`
    );
    if (errors.length > 0) {
      fs.appendFileSync(
        outputPath,
        `check_errors=${JSON.stringify(errors)}\n`
      );
    }
  }

  process.exit(0);
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
