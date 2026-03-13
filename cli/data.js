const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadData() {
  const root = path.resolve(__dirname, '..');
  const toolsDir = path.join(root, 'data', 'tools');
  const stacksDir = path.join(root, 'data', 'stacks');

  function readYamlDir(dir) {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.yml') || f.endsWith('.yaml'))
      .map(f => {
        const raw = fs.readFileSync(path.join(dir, f), 'utf8');
        return { ...yaml.load(raw), _file: f.replace(/\.ya?ml$/, '') };
      });
  }

  const tools = readYamlDir(toolsDir);
  const stacks = readYamlDir(stacksDir);

  const toolsByCategory = {};
  for (const tool of tools) {
    const cat = tool.category || 'other';
    if (!toolsByCategory[cat]) toolsByCategory[cat] = [];
    toolsByCategory[cat].push(tool);
  }

  return { tools, toolsByCategory, stacks };
}

module.exports = { loadData };
