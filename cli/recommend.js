function buildRecommendation(answers, data) {
  const rec = {
    stack: null,
    components: {},
    totalCost: '$0/mo',
    description: '',
  };

  // Pick base stack
  if (answers.stage === 'idea') {
    rec.stack = data.stacks.find(s => s._file === 'zero-cost-mvp');
    rec.totalCost = '$0/mo';
    rec.description = 'Ship your first version without spending a dollar.';
  } else if (answers.stage === 'launched') {
    rec.stack = data.stacks.find(s => s._file === 'production-50');
    rec.totalCost = '~$50-60/mo';
    rec.description = 'Reliable stack for paying customers.';
  } else {
    rec.stack = data.stacks.find(s => s._file === 'scale-100');
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
      };
    }
  }

  // Override auth
  const authTools = data.toolsByCategory['authentication'] || [];
  if (answers.auth === 'no') {
    delete rec.components.auth;
  } else if (answers.auth === 'yes-fast') {
    const clerk = authTools.find(t => t.name.includes('Clerk'));
    if (clerk) {
      rec.components.auth = {
        tool: clerk.name,
        cost: '$0 (free up to 50K users)',
        why: 'Fastest path to working auth. Pre-built UI components.',
      };
    }
  } else if (answers.auth === 'yes-cheap') {
    const authjs = authTools.find(t => t.name.includes('Auth.js'));
    if (authjs) {
      rec.components.auth = {
        tool: authjs.name,
        cost: '$0',
        why: 'Self-hosted auth. $0 forever, regardless of user count.',
      };
    }
  }

  // Override payments
  if (answers.payments === 'not-yet') {
    delete rec.components.payments;
  } else if (answers.payments === 'global') {
    const ls = data.tools.find(t => t.name.includes('Lemon Squeezy'));
    if (ls) {
      rec.components.payments = {
        tool: ls.name,
        cost: '5% + $0.50/tx',
        why: 'Handles all global tax compliance. Zero thinking about VAT.',
      };
    }
  } else if (answers.payments === 'us') {
    const stripe = data.tools.find(t => t.name === 'Stripe');
    if (stripe) {
      rec.components.payments = {
        tool: stripe.name,
        cost: '2.9% + $0.30/tx',
        why: 'Industry standard. Lower fees than MoR solutions.',
      };
    }
  } else if (answers.payments === 'high-volume') {
    rec.components.payments = {
      tool: 'Stripe + Stripe Tax',
      cost: '2.9% + $0.30 + 0.5% tax',
      why: 'At $50K+ MRR, the fee savings over MoR platforms add up fast.',
    };
  }

  // Override hosting
  const hostingTools = data.toolsByCategory['hosting'] || [];
  if (answers.hosting === 'easy') {
    const vercel = hostingTools.find(t => t.name.includes('Vercel'));
    if (vercel) {
      rec.components.hosting = {
        tool: vercel.name,
        cost: answers.stage === 'idea' ? '$0' : '$20/mo',
        why: 'Best DX. Git push to deploy. Preview URLs.',
      };
    }
  } else if (answers.hosting === 'balanced') {
    const railway = hostingTools.find(t => t.name.includes('Railway'));
    if (railway) {
      rec.components.hosting = {
        tool: railway.name,
        cost: '~$5-15/mo',
        why: 'Predictable pricing. Frontend + backend + DB in one place.',
      };
    }
  } else if (answers.hosting === 'own') {
    const hetzner = hostingTools.find(t => t.name.includes('Hetzner'));
    if (hetzner) {
      rec.components.hosting = {
        tool: hetzner.name,
        cost: '~$4-10/mo',
        why: 'Own your infrastructure. 50-70% cheaper than managed platforms.',
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

module.exports = { buildRecommendation };
