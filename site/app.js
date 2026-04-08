let DATA = null;
let answers = {};
let currentStep = 0;

async function init() {
  const res = await fetch('data.json');
  DATA = await res.json();
  restoreFromHash();
}

init();

function encodeAnswersToHash() {
  const params = new URLSearchParams(answers);
  return '#' + params.toString();
}

function restoreFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const params = new URLSearchParams(hash);
  const validKeys = DATA.questions.map(q => q.id);
  const restored = {};
  for (const key of validKeys) {
    if (params.has(key)) restored[key] = params.get(key);
  }
  if (Object.keys(restored).length === validKeys.length) {
    answers = restored;
    currentStep = DATA.questions.length;
    showResults();
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startBuilder() {
  currentStep = 0;
  answers = {};
  showScreen('screen-questions');
  renderQuestion();
}

function resetBuilder() {
  currentStep = 0;
  answers = {};
  history.replaceState(null, '', window.location.pathname);
  showScreen('screen-landing');
}

function renderQuestion() {
  const stack = document.getElementById('windows-stack');
  const q = DATA.questions[currentStep];

  const dots = DATA.questions.map((_, i) => {
    const cls = i < currentStep ? 'done' : i === currentStep ? 'current' : '';
    return `<div class="progress-dot ${cls}"></div>`;
  }).join('');

  const opts = q.options.map(o =>
    `<button class="option-btn" onclick="selectOption('${q.id}', '${o.value}')">${o.label}</button>`
  ).join('');

  const backBtn = currentStep > 0
    ? `<button class="back-btn" onclick="goBack()">Back</button>`
    : '';

  const title = 'solo-stack.exe - ' + q.id.charAt(0).toUpperCase() + q.id.slice(1);

  const win = document.createElement('div');
  win.className = 'retro-window';
  win.innerHTML = `
    <div class="window-titlebar">
      <span class="window-titlebar-text">${title}</span>
      <div class="window-controls">
        <div class="window-ctrl">_</div>
        <div class="window-ctrl">[]</div>
        <div class="window-ctrl">x</div>
      </div>
    </div>
    <div class="window-body">
      <div class="progress-bar">${dots}</div>
      <p>${q.question}</p>
      <div class="options">${opts}</div>
      ${backBtn}
    </div>
  `;

  if (currentStep === 0) {
    stack.innerHTML = '';
  } else {
    const prevWindows = stack.querySelectorAll('.retro-window');
    prevWindows.forEach(w => {
      w.style.opacity = '0.4';
      w.style.pointerEvents = 'none';
    });
  }

  stack.appendChild(win);
  win.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function goBack() {
  if (currentStep <= 0) return;
  const stack = document.getElementById('windows-stack');
  stack.removeChild(stack.lastElementChild);
  currentStep--;
  delete answers[DATA.questions[currentStep].id];
  if (stack.lastElementChild) {
    stack.removeChild(stack.lastElementChild);
  }
  renderQuestion();
}

function selectOption(questionId, value) {
  answers[questionId] = value;

  const stack = document.getElementById('windows-stack');
  const currentWindow = stack.lastElementChild;
  const buttons = currentWindow.querySelectorAll('.option-btn');
  buttons.forEach(btn => {
    if (btn.textContent.includes(value) || btn.onclick.toString().includes(value)) {
      btn.classList.add('selected');
    }
    btn.style.pointerEvents = 'none';
  });

  currentStep++;

  if (currentStep < DATA.questions.length) {
    setTimeout(renderQuestion, 300);
  } else {
    setTimeout(showResults, 500);
  }
}

function showResults() {
  const rec = SoloStack.buildRecommendation(answers, DATA);

  const terminal = document.getElementById('results-terminal');
  const labels = DATA.labels;

  let rows = '';
  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = labels[layer] || layer;
    rows += `
      <div class="result-row">
        <span class="result-label">${label}</span>
        <span class="result-dots"></span>
        <span class="result-value">${comp.tool}</span>
      </div>`;
  }

  terminal.innerHTML = `
    <div class="result-header">$ solo-stack recommend</div>
    <div class="result-stack-name">${rec.stack ? rec.stack.name : 'Your Custom Stack'}</div>
    <div class="result-description">${rec.description}</div>
    ${rows}
    <div class="result-total">
      <div class="result-row">
        <span class="result-label">Total</span>
        <span class="result-dots"></span>
        <span class="result-value">${rec.totalCost}</span>
      </div>
    </div>
  `;

  const detail = document.getElementById('results-detail');
  detail.innerHTML = '';

  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = labels[layer] || layer;
    const toolData = comp._toolData || DATA.tools.find(t => t.name === comp.tool);

    let gotchas = '';
    if (toolData && toolData.gotchas) {
      gotchas = toolData.gotchas.slice(0, 2).map(g =>
        `<div class="detail-gotcha">${g}</div>`
      ).join('');
    }

    let scaleInfo = '';
    if (toolData && toolData.cost_at_scale) {
      const cs = toolData.cost_at_scale;
      scaleInfo = `
        <div class="detail-scale">
          <div class="scale-row"><span>100 users</span><span>${cs['100_users']}</span></div>
          <div class="scale-row"><span>1K users</span><span>${cs['1000_users']}</span></div>
          <div class="scale-row"><span>10K users</span><span>${cs['10000_users']}</span></div>
          <div class="scale-row"><span>100K users</span><span>${cs['100000_users']}</span></div>
        </div>`;
    }

    const card = document.createElement('div');
    card.className = 'detail-card retro-window';
    card.style.animationDelay = `${Object.keys(rec.components).indexOf(layer) * 0.1}s`;
    card.innerHTML = `
      <div class="window-titlebar">
        <span class="window-titlebar-text">${label}</span>
        <div class="window-controls">
          <div class="window-ctrl">_</div>
          <div class="window-ctrl">[]</div>
          <div class="window-ctrl">x</div>
        </div>
      </div>
      <div class="window-body">
        <div class="detail-tool-name">${toolData && toolData.url ? `<a href="${toolData.url}" target="_blank" rel="noopener" class="tool-link">${comp.tool}</a>` : comp.tool}</div>
        <div class="detail-meta">${comp.cost}${comp.limits ? ' | ' + comp.limits : ''}</div>
        <div>${comp.why}</div>
        ${gotchas}
        ${scaleInfo}
      </div>
    `;
    detail.appendChild(card);
  }

  window.location.hash = encodeAnswersToHash().slice(1);
  showScreen('screen-results');
}

function copyLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('copy-link-btn');
    const original = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = original; }, 2000);
  });
}

function shareOnX() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent('Just built my SaaS stack with solo-stack. Real costs, no affiliate links.');
  window.open('https://x.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
}

window.startBuilder = startBuilder;
window.resetBuilder = resetBuilder;
window.copyLink = copyLink;
window.shareOnX = shareOnX;
window.goBack = goBack;
