(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.SoloStack = root.SoloStack || {};
    root.SoloStack.buildRecommendation = factory().buildRecommendation;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {

  function buildRecommendation(answers, data) {
    var rec = {
      stack: null,
      components: {},
      totalCost: '$0/mo',
      description: '',
    };

    if (answers.stage === 'idea') {
      rec.stack = data.stacks.find(function (s) { return s._file === 'zero-cost-mvp'; });
      rec.totalCost = '$0/mo';
      rec.description = 'Ship your first version without spending a dollar.';
    } else if (answers.stage === 'launched') {
      rec.stack = data.stacks.find(function (s) { return s._file === 'production-50'; });
      rec.totalCost = '~$50-60/mo';
      rec.description = 'Reliable stack for paying customers.';
    } else {
      rec.stack = data.stacks.find(function (s) { return s._file === 'scale-100'; });
      rec.totalCost = '~$50-110/mo';
      rec.description = 'Own your infrastructure. Eliminate per-user cost cliffs.';
    }

    if (rec.stack) {
      for (var layer in rec.stack.components) {
        var comp = rec.stack.components[layer];
        rec.components[layer] = {
          tool: comp.tool,
          cost: comp.cost,
          why: comp.why,
          limits: comp.limits || null,
        };
      }
    }

    var authTools = (data.toolsByCategory || {})['authentication'] || [];
    if (answers.auth === 'no') {
      delete rec.components.auth;
    } else if (answers.auth === 'yes-fast') {
      var clerk = authTools.find(function (t) { return t.name.includes('Clerk'); });
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
      var authjs = authTools.find(function (t) { return t.name.includes('Auth.js'); });
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

    if (answers.payments === 'not-yet') {
      delete rec.components.payments;
    } else if (answers.payments === 'global') {
      var ls = data.tools.find(function (t) { return t.name.includes('Lemon Squeezy'); });
      if (ls) {
        rec.components.payments = {
          tool: ls.name,
          cost: '5% + $0.50/tx',
          why: 'Handles all global tax compliance. Zero thinking about VAT.',
          _toolData: ls,
        };
      }
    } else if (answers.payments === 'us') {
      var stripe = data.tools.find(function (t) { return t.name === 'Stripe'; });
      if (stripe) {
        rec.components.payments = {
          tool: stripe.name,
          cost: '2.9% + $0.30/tx',
          why: 'Industry standard. Lower fees than MoR solutions.',
          _toolData: stripe,
        };
      }
    } else if (answers.payments === 'high-volume') {
      var stripeHv = data.tools.find(function (t) { return t.name === 'Stripe'; });
      if (stripeHv) {
        rec.components.payments = {
          tool: 'Stripe + Stripe Tax',
          cost: '2.9% + $0.30 + 0.5% tax',
          why: 'At $50K+ MRR, the fee savings over MoR platforms add up fast.',
          _toolData: stripeHv,
        };
      }
    }

    var hostingTools = (data.toolsByCategory || {})['hosting'] || [];
    if (answers.hosting === 'easy') {
      var vercel = hostingTools.find(function (t) { return t.name.includes('Vercel'); });
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
      var railway = hostingTools.find(function (t) { return t.name.includes('Railway'); });
      if (railway) {
        rec.components.hosting = {
          tool: railway.name,
          cost: '~$5-15/mo',
          why: 'Predictable pricing. Frontend + backend + DB in one place.',
          _toolData: railway,
        };
      }
    } else if (answers.hosting === 'own') {
      var hetzner = hostingTools.find(function (t) { return t.name.includes('Hetzner'); });
      if (hetzner) {
        rec.components.hosting = {
          tool: hetzner.name,
          cost: '~$4-10/mo',
          why: 'Own your infrastructure. 50-70% cheaper than managed platforms.',
          _toolData: hetzner,
        };
      }
    }

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

  return { buildRecommendation: buildRecommendation };
});
