const dtoMessageMentionsField = require('./rules/dto-message-mentions-field');

module.exports = {
  meta: { name: 'easy-front-local', version: '0.1.0' },
  rules: {
    'dto-message-mentions-field': dtoMessageMentionsField,
  },
};
