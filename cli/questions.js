const QUESTIONS = [
  {
    type: 'list',
    name: 'stage',
    message: 'What stage is your project at?',
    choices: [
      { value: 'idea', name: 'Idea / pre-revenue -- validate without spending money' },
      { value: 'launched', name: 'Launched with paying customers -- need reliability' },
      { value: 'scaling', name: 'Scaling (10K+ users) -- need cost control' },
    ]
  },
  {
    type: 'list',
    name: 'auth',
    message: 'Do you need user authentication?',
    choices: [
      { value: 'yes-fast', name: 'Yes, and I want it working in an hour (managed)' },
      { value: 'yes-cheap', name: 'Yes, and I want it free forever (self-managed)' },
      { value: 'yes-default', name: 'Yes, just give me the default' },
      { value: 'no', name: 'No, this is a public tool / landing page' },
    ]
  },
  {
    type: 'list',
    name: 'payments',
    message: 'Are you selling something?',
    choices: [
      { value: 'not-yet', name: 'Not yet' },
      { value: 'global', name: 'Yes, selling globally (don\'t want to think about taxes)' },
      { value: 'us', name: 'Yes, primarily US customers' },
      { value: 'high-volume', name: 'Yes, processing $50K+ MRR' },
    ]
  },
  {
    type: 'list',
    name: 'hosting',
    message: 'How do you feel about infrastructure?',
    choices: [
      { value: 'easy', name: 'Git push and forget. I\'ll pay for convenience.' },
      { value: 'balanced', name: 'Good DX but predictable pricing' },
      { value: 'own', name: 'Own my infrastructure, minimize costs' },
    ]
  },
  {
    type: 'list',
    name: 'ai',
    message: 'Does your product have AI features?',
    choices: [
      { value: 'no', name: 'No' },
      { value: 'cheap', name: 'Yes, cost-efficiency matters most' },
      { value: 'quality', name: 'Yes, need the best model quality' },
    ]
  },
];

module.exports = { QUESTIONS };
