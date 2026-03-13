#!/usr/bin/env node

/**
 * Reads YAML tool and stack data, outputs site/data.json for the static site.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'data', 'tools');
const STACKS_DIR = path.join(ROOT, 'data', 'stacks');
const OUT = path.join(ROOT, 'site', 'data.json');

function readYamlDir(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      return { ...yaml.load(raw), _file: f.replace(/\.ya?ml$/, '') };
    });
}

const tools = readYamlDir(TOOLS_DIR);
const stacks = readYamlDir(STACKS_DIR);

// Group tools by category
const toolsByCategory = {};
for (const tool of tools) {
  const cat = tool.category || 'other';
  if (!toolsByCategory[cat]) toolsByCategory[cat] = [];
  toolsByCategory[cat].push(tool);
}

const data = { tools, toolsByCategory, stacks };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`Built site/data.json (${tools.length} tools, ${stacks.length} stacks)`);
