#!/usr/bin/env node

/**
 * Reads YAML tool and stack data, outputs site/data.json for the static site.
 * Also copies shared modules (recommend.js) to site/ for browser use.
 */

const fs = require('fs');
const path = require('path');
const { loadData } = require('../cli/data');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'site', 'data.json');

const { tools, toolsByCategory, stacks } = loadData();

const questions = require('../shared/questions.json');
const labels = require('../shared/labels.json');

const data = { tools, toolsByCategory, stacks, questions, labels };

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(data, null, 2));

fs.copyFileSync(
  path.join(ROOT, 'shared', 'recommend.js'),
  path.join(ROOT, 'site', 'recommend.js')
);

console.log(`Built site/data.json (${tools.length} tools, ${stacks.length} stacks)`);
console.log('Copied shared/recommend.js to site/recommend.js');
