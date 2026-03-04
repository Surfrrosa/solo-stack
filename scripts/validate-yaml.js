#!/usr/bin/env node

/**
 * Validates all YAML tool and stack files against the required schema.
 * Run: node scripts/validate-yaml.js
 * Exit code 0 = all valid, 1 = errors found
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const TOOLS_DIR = path.join(__dirname, "..", "data", "tools");
const STACKS_DIR = path.join(__dirname, "..", "data", "stacks");

const TOOL_REQUIRED_FIELDS = [
  "name",
  "url",
  "category",
  "description",
  "free_tier",
  "solo_price",
  "scale_ceiling",
  "gotchas",
  "last_verified",
];

const TOOL_CATEGORIES = [
  "payments",
  "authentication",
  "hosting",
  "database",
  "email",
  "analytics",
  "boilerplate",
  "monitoring",
  "ai-tools",
  "background-jobs",
];

const STACK_REQUIRED_FIELDS = [
  "name",
  "description",
  "total_cost",
  "when_to_use",
  "components",
];

let errors = 0;
let warnings = 0;
let filesChecked = 0;

function error(file, msg) {
  console.error(`  ERROR: ${path.basename(file)}: ${msg}`);
  errors++;
}

function warn(file, msg) {
  console.warn(`  WARN:  ${path.basename(file)}: ${msg}`);
  warnings++;
}

function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

function isValidDate(str) {
  const date = new Date(str);
  return !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(str);
}

function validateToolFile(filePath) {
  filesChecked++;
  let data;

  try {
    const content = fs.readFileSync(filePath, "utf8");
    data = yaml.load(content);
  } catch (e) {
    error(filePath, `Failed to parse YAML: ${e.message}`);
    return;
  }

  if (!data || typeof data !== "object") {
    error(filePath, "File is empty or not a valid YAML object");
    return;
  }

  // Check required fields
  for (const field of TOOL_REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      error(filePath, `Missing required field: ${field}`);
    }
  }

  // Validate URL
  if (data.url && !isValidUrl(data.url)) {
    error(filePath, `Invalid URL: ${data.url}`);
  }

  // Validate pricing URL if present
  if (data.pricing_url && !isValidUrl(data.pricing_url)) {
    error(filePath, `Invalid pricing URL: ${data.pricing_url}`);
  }

  // Validate category
  if (data.category && !TOOL_CATEGORIES.includes(data.category)) {
    error(
      filePath,
      `Invalid category: "${data.category}". Must be one of: ${TOOL_CATEGORIES.join(", ")}`
    );
  }

  // Validate last_verified date
  if (data.last_verified && !isValidDate(String(data.last_verified))) {
    error(
      filePath,
      `Invalid last_verified date: "${data.last_verified}". Must be YYYY-MM-DD format.`
    );
  }

  // Check for stale data (warn only)
  if (data.last_verified && isValidDate(String(data.last_verified))) {
    const verified = new Date(data.last_verified);
    const now = new Date();
    const daysSince = Math.floor((now - verified) / (1000 * 60 * 60 * 24));
    if (daysSince > 90) {
      warn(
        filePath,
        `Data is ${daysSince} days old (last verified: ${data.last_verified})`
      );
    }
  }

  // Validate gotchas is an array
  if (data.gotchas && !Array.isArray(data.gotchas)) {
    error(filePath, "gotchas must be a YAML array (list)");
  }

  // Validate cost_at_scale if present
  if (data.cost_at_scale) {
    if (typeof data.cost_at_scale !== "object") {
      error(filePath, "cost_at_scale must be a YAML object");
    }
  }
}

function validateStackFile(filePath) {
  filesChecked++;
  let data;

  try {
    const content = fs.readFileSync(filePath, "utf8");
    data = yaml.load(content);
  } catch (e) {
    error(filePath, `Failed to parse YAML: ${e.message}`);
    return;
  }

  if (!data || typeof data !== "object") {
    error(filePath, "File is empty or not a valid YAML object");
    return;
  }

  for (const field of STACK_REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      error(filePath, `Missing required field: ${field}`);
    }
  }

  if (data.components && typeof data.components !== "object") {
    error(filePath, "components must be a YAML object");
  }
}

// --- Main ---

console.log("Validating solo-stack YAML files...\n");

// Validate tool files
if (fs.existsSync(TOOLS_DIR)) {
  console.log("Tools:");
  const toolFiles = fs
    .readdirSync(TOOLS_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));

  if (toolFiles.length === 0) {
    console.log("  No tool files found.\n");
  } else {
    for (const file of toolFiles) {
      validateToolFile(path.join(TOOLS_DIR, file));
    }
    console.log("");
  }
} else {
  console.log("  data/tools/ directory not found.\n");
}

// Validate stack files
if (fs.existsSync(STACKS_DIR)) {
  console.log("Stacks:");
  const stackFiles = fs
    .readdirSync(STACKS_DIR)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"));

  if (stackFiles.length === 0) {
    console.log("  No stack files found.\n");
  } else {
    for (const file of stackFiles) {
      validateStackFile(path.join(STACKS_DIR, file));
    }
    console.log("");
  }
} else {
  console.log("  data/stacks/ directory not found.\n");
}

// Summary
console.log("---");
console.log(
  `Checked ${filesChecked} files. ${errors} error(s), ${warnings} warning(s).`
);

if (errors > 0) {
  console.log("\nValidation FAILED.");
  process.exit(1);
} else if (warnings > 0) {
  console.log("\nValidation passed with warnings.");
  process.exit(0);
} else {
  console.log("\nValidation passed.");
  process.exit(0);
}
