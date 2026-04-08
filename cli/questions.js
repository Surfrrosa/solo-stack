const sharedQuestions = require('../shared/questions.json');

const QUESTIONS = sharedQuestions.map(q => ({
  type: 'list',
  name: q.id,
  message: q.question,
  choices: q.options.map(o => ({ value: o.value, name: o.label })),
}));

module.exports = { QUESTIONS };
