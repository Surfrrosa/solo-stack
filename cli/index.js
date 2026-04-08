#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');
const { loadData } = require('./data');
const { QUESTIONS } = require('./questions');
const { buildRecommendation } = require('./recommend');
const LAYER_LABELS = require('../shared/labels.json');

const LOGO = `
               _                _                 _
              | |              | |               | |
  ___   ___   | |  ___    ___  | |_   __ _   ___ | | __
 / __| / _ \\  | | / _ \\  / __| | __| / _\` | / __|| |/ /
 \\__ \\| (_) | | || (_) | \\__ \\ | |_ | (_| || (__ |   <
 |___/ \\___/  |_| \\___/  |___/  \\__| \\__,_| \\___||_|\\_\\
`;

function formatResult(rec) {
  const lines = [];
  const maxLabel = 12;
  const maxTool = 54;
  const totalWidth = maxLabel + 3 + maxTool;

  lines.push('');
  lines.push(chalk.green.bold(rec.stack ? rec.stack.name : 'Your Custom Stack'));
  lines.push(chalk.green.dim(rec.description));
  lines.push('');

  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = LAYER_LABELS[layer] || layer;
    const padded = label.padEnd(maxLabel);
    const dotsLen = totalWidth - padded.length - comp.tool.length;
    const dots = dotsLen > 2 ? ' ' + '.'.repeat(dotsLen - 2) + ' ' : ' ';
    lines.push(chalk.green.dim(padded) + chalk.green.dim(dots) + chalk.green.bold(comp.tool));
  }

  lines.push(chalk.green.dim('\u2500'.repeat(totalWidth)));

  const totalLabel = 'Total'.padEnd(maxLabel);
  const totalDotsLen = totalWidth - totalLabel.length - rec.totalCost.length;
  const totalDots = totalDotsLen > 2 ? ' ' + '.'.repeat(totalDotsLen - 2) + ' ' : ' ';
  lines.push(chalk.green.bold(totalLabel) + chalk.green(totalDots) + chalk.green.bold(rec.totalCost));
  lines.push('');

  lines.push(chalk.green.dim('\u2500'.repeat(totalWidth)));
  lines.push('');

  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = LAYER_LABELS[layer] || layer;
    lines.push(chalk.green.bold(label) + chalk.green.dim(' | ') + chalk.green(comp.cost));
    lines.push(chalk.dim('  ' + comp.why));
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  console.log(chalk.green.bold(LOGO));
  console.log(chalk.green.dim('  pick your stack. ship your thing. grow from there.'));
  console.log(chalk.green.dim('  no affiliate links. real costs. community-maintained.'));
  console.log('');

  const data = loadData();
  const answers = await inquirer.prompt(QUESTIONS);
  const rec = buildRecommendation(answers, data);

  console.log(formatResult(rec));
  console.log(chalk.dim('  Web version: https://surfrrosa.github.io/solo-stack/'));
  console.log(chalk.dim('  Full guide:  https://github.com/surfrrosa/solo-stack'));
  console.log('');
}

main().catch(err => {
  console.error(chalk.red(err.message));
  process.exit(1);
});
