/* ============================================
   solo-stack interactive builder
   Question flow -> recommendation engine
   ============================================ */

let DATA = null;
let answers = {};
let currentStep = 0;

const QUESTIONS = [
  {
    id: 'stage',
    title: 'solo-stack.exe - Stage',
    question: 'What stage is your project at?',
    options: [
      { value: 'idea', label: 'Idea / pre-revenue -- I want to validate without spending money' },
      { value: 'launched', label: 'Launched with paying customers -- I need reliability' },
      { value: 'scaling', label: 'Scaling (10K+ users) -- I need cost control' },
    ]
  },
  {
    id: 'auth',
    title: 'solo-stack.exe - Auth',
    question: 'Do you need user authentication?',
    options: [
      { value: 'yes-fast', label: 'Yes, and I want it working in an hour (managed)' },
      { value: 'yes-cheap', label: 'Yes, and I want it free forever (self-managed)' },
      { value: 'yes-default', label: 'Yes, just give me the default' },
      { value: 'no', label: 'No, this is a public tool / landing page' },
    ]
  },
  {
    id: 'payments',
    title: 'solo-stack.exe - Payments',
    question: 'Are you selling something?',
    options: [
      { value: 'not-yet', label: 'Not yet' },
      { value: 'global', label: 'Yes, selling globally (I don\'t want to think about taxes)' },
      { value: 'us', label: 'Yes, primarily US customers' },
      { value: 'high-volume', label: 'Yes, processing $50K+ MRR' },
    ]
  },
  {
    id: 'hosting',
    title: 'solo-stack.exe - Hosting',
    question: 'How do you feel about infrastructure?',
    options: [
      { value: 'easy', label: 'Git push and forget. I\'ll pay for convenience.' },
      { value: 'balanced', label: 'I want good DX but predictable pricing' },
      { value: 'own', label: 'I want to own my infrastructure and minimize costs' },
    ]
  },
  {
    id: 'ai',
    title: 'solo-stack.exe - AI',
    question: 'Does your product have AI features?',
    options: [
      { value: 'no', label: 'No' },
      { value: 'cheap', label: 'Yes, and cost-efficiency matters most' },
      { value: 'quality', label: 'Yes, and I need the best model quality' },
    ]
  },
];

// --- Init ---
async function init() {
  const res = await fetch('data.json');
  DATA = await res.json();
  restoreFromHash();
}

init();

// --- URL Hash (shareable results) ---
function encodeAnswersToHash() {
  const params = new URLSearchParams(answers);
  return '#' + params.toString();
}

function restoreFromHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const params = new URLSearchParams(hash);
  const validKeys = QUESTIONS.map(q => q.id);
  const restored = {};
  for (const key of validKeys) {
    if (params.has(key)) restored[key] = params.get(key);
  }
  if (Object.keys(restored).length === validKeys.length) {
    answers = restored;
    currentStep = QUESTIONS.length;
    showResults();
  }
}

// --- Navigation ---
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

// --- Questions ---
function renderQuestion() {
  const stack = document.getElementById('windows-stack');
  const q = QUESTIONS[currentStep];

  // Build progress dots
  const dots = QUESTIONS.map((_, i) => {
    const cls = i < currentStep ? 'done' : i === currentStep ? 'current' : '';
    return `<div class="progress-dot ${cls}"></div>`;
  }).join('');

  // Build option buttons
  const opts = q.options.map(o =>
    `<button class="option-btn" onclick="selectOption('${q.id}', '${o.value}')">${o.label}</button>`
  ).join('');

  // Create window
  const win = document.createElement('div');
  win.className = 'retro-window';
  win.innerHTML = `
    <div class="window-titlebar">
      <span class="window-titlebar-text">${q.title}</span>
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
    </div>
  `;

  // On first question, clear the stack. Otherwise, keep previous windows visible but dimmed.
  if (currentStep === 0) {
    stack.innerHTML = '';
  } else {
    // Dim previous windows
    const prevWindows = stack.querySelectorAll('.retro-window');
    prevWindows.forEach(w => {
      w.style.opacity = '0.4';
      w.style.pointerEvents = 'none';
    });
  }

  stack.appendChild(win);
  win.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectOption(questionId, value) {
  answers[questionId] = value;

  // Highlight selected
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

  if (currentStep < QUESTIONS.length) {
    setTimeout(renderQuestion, 300);
  } else {
    setTimeout(showResults, 500);
  }
}

// --- Recommendation Engine ---
function buildRecommendation() {
  const rec = {
    stack: null,
    components: {},
    totalCost: '$0/mo',
    description: '',
  };

  // Pick base stack
  if (answers.stage === 'idea') {
    rec.stack = DATA.stacks.find(s => s._file === 'zero-cost-mvp');
    rec.totalCost = '$0/mo';
    rec.description = 'Ship your first version without spending a dollar.';
  } else if (answers.stage === 'launched') {
    rec.stack = DATA.stacks.find(s => s._file === 'production-50');
    rec.totalCost = '~$50-60/mo';
    rec.description = 'Reliable stack for paying customers.';
  } else {
    rec.stack = DATA.stacks.find(s => s._file === 'scale-100');
    rec.totalCost = '~$50-110/mo';
    rec.description = 'Own your infrastructure. Eliminate per-user cost cliffs.';
  }

  // Start from stack defaults
  if (rec.stack) {
    for (const [layer, comp] of Object.entries(rec.stack.components)) {
      rec.components[layer] = {
        tool: comp.tool,
        cost: comp.cost,
        why: comp.why,
        limits: comp.limits || null,
      };
    }
  }

  // Override auth based on answer
  const authTools = DATA.toolsByCategory['authentication'] || [];
  if (answers.auth === 'no') {
    delete rec.components.auth;
  } else if (answers.auth === 'yes-fast') {
    const clerk = authTools.find(t => t.name.includes('Clerk'));
    if (clerk) {
      rec.components.auth = {
        tool: clerk.name,
        cost: '$0 (free up to 50K users)',
        why: 'Fastest path to working auth. Pre-built UI components.',
        limits: clerk.free_tier,
        _toolData: clerk,
      };
    }
  } else if (answers.auth === 'yes-cheap') {
    const authjs = authTools.find(t => t.name.includes('Auth.js'));
    if (authjs) {
      rec.components.auth = {
        tool: authjs.name,
        cost: '$0',
        why: 'Self-hosted auth. $0 forever, regardless of user count.',
        limits: 'Unlimited',
        _toolData: authjs,
      };
    }
  }
  // yes-default keeps the stack default

  // Override payments based on answer
  if (answers.payments === 'not-yet') {
    delete rec.components.payments;
  } else if (answers.payments === 'global') {
    const ls = DATA.tools.find(t => t.name.includes('Lemon Squeezy'));
    if (ls) {
      rec.components.payments = {
        tool: ls.name,
        cost: '5% + $0.50/tx',
        why: 'Handles all global tax compliance. Zero thinking about VAT.',
        _toolData: ls,
      };
    }
  } else if (answers.payments === 'us') {
    const stripe = DATA.tools.find(t => t.name === 'Stripe');
    if (stripe) {
      rec.components.payments = {
        tool: stripe.name,
        cost: '2.9% + $0.30/tx',
        why: 'Industry standard. Lower fees than MoR solutions.',
        _toolData: stripe,
      };
    }
  } else if (answers.payments === 'high-volume') {
    const stripe = DATA.tools.find(t => t.name === 'Stripe');
    if (stripe) {
      rec.components.payments = {
        tool: 'Stripe + Stripe Tax',
        cost: '2.9% + $0.30 + 0.5% tax',
        why: 'At $50K+ MRR, the fee savings over MoR platforms add up fast.',
        _toolData: stripe,
      };
    }
  }

  // Override hosting based on answer
  const hostingTools = DATA.toolsByCategory['hosting'] || [];
  if (answers.hosting === 'easy') {
    const vercel = hostingTools.find(t => t.name.includes('Vercel'));
    if (vercel) {
      rec.components.hosting = {
        tool: vercel.name,
        cost: answers.stage === 'idea' ? '$0' : '$20/mo',
        why: 'Best DX. Git push to deploy. Preview URLs.',
        limits: vercel.free_tier,
        _toolData: vercel,
      };
    }
  } else if (answers.hosting === 'balanced') {
    const railway = hostingTools.find(t => t.name.includes('Railway'));
    if (railway) {
      rec.components.hosting = {
        tool: railway.name,
        cost: '~$5-15/mo',
        why: 'Predictable pricing. Frontend + backend + DB in one place.',
        _toolData: railway,
      };
    }
  } else if (answers.hosting === 'own') {
    const hetzner = hostingTools.find(t => t.name.includes('Hetzner'));
    if (hetzner) {
      rec.components.hosting = {
        tool: hetzner.name,
        cost: '~$4-10/mo',
        why: 'Own your infrastructure. 50-70% cheaper than managed platforms.',
        _toolData: hetzner,
      };
    }
  }

  // Add AI if needed
  if (answers.ai === 'cheap') {
    rec.components.ai = {
      tool: 'GPT-4o-mini / Claude Haiku',
      cost: '~$0.15-0.80/1M input tokens',
      why: 'Handles 80% of use cases at 1/20th the cost of frontier models.',
    };
  } else if (answers.ai === 'quality') {
    rec.components.ai = {
      tool: 'GPT-4o / Claude Sonnet',
      cost: '~$2.50-3/1M input tokens',
      why: 'Best quality for complex tasks. Use prompt caching to control costs.',
    };
  }

  return rec;
}

// --- Results Rendering ---
function showResults() {
  const rec = buildRecommendation();

  // Terminal output
  const terminal = document.getElementById('results-terminal');

  const layerLabels = {
    framework: 'Framework',
    database: 'Database',
    auth: 'Auth',
    payments: 'Payments',
    hosting: 'Hosting',
    email: 'Email',
    analytics: 'Analytics',
    monitoring: 'Monitoring',
    ai: 'AI',
  };

  let rows = '';
  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = layerLabels[layer] || layer;
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

  // Detail cards
  const detail = document.getElementById('results-detail');
  detail.innerHTML = '';

  for (const [layer, comp] of Object.entries(rec.components)) {
    const label = layerLabels[layer] || layer;
    // Try to find full tool data
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

  // Update URL hash for sharing
  window.location.hash = encodeAnswersToHash().slice(1);

  showScreen('screen-results');
}

// --- Sharing ---
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

// Make functions available globally
window.startBuilder = startBuilder;
window.resetBuilder = resetBuilder;
window.copyLink = copyLink;
window.shareOnX = shareOnX;
