/**
 * dto-message-mentions-field
 *
 * Surfaces copy-paste drift in class-validator decorator messages.
 *
 * When a DTO property like:
 *
 *   @IsString({ message: 'account_id必须是字符串' })
 *   readonly account_id: string;
 *
 * is renamed to `account_pwd` but the author forgets to update the
 * message, the message still says `account_id` — silently wrong in
 * Swagger and in user-facing error responses.
 *
 * Rule fires only when the message contains an identifier-looking
 * token (snake_case / camelCase). Pure natural-language messages like
 * "手机号码输入不正确" are skipped — they don't claim to reference any
 * specific field, so there's no drift to detect.
 */

const CLASS_VALIDATOR_DECORATORS = new Set([
  'IsString',
  'IsInt',
  'IsNumber',
  'IsBoolean',
  'IsArray',
  'IsEnum',
  'IsIn',
  'IsNotEmpty',
  'IsEmpty',
  'IsOptional',
  'IsDateString',
  'IsEmail',
  'IsPhoneNumber',
  'IsUrl',
  'IsUUID',
  'Length',
  'MinLength',
  'MaxLength',
  'Min',
  'Max',
  'Matches',
  'ArrayNotEmpty',
  'ArrayMinSize',
  'ArrayMaxSize',
  'ValidateNested',
]);

// At least 3 characters so generic nouns like `id`, `pk`, `fk` (which
// often appear in Chinese-prose messages like "用户id必须是数字" and
// aren't a real claim about the field name) don't trigger drift
// warnings. Real field names are virtually always ≥ 3 chars.
const IDENT_TOKEN = /\b[a-z][a-zA-Z0-9_]{2,}\b/g;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Detect copy-paste drift in class-validator decorator messages — when a message mentions an identifier that does not match the property name.',
    },
    schema: [],
    messages: {
      drift:
        'Validator message mentions identifier "{{token}}" which does not match the DTO field name "{{field}}". Likely copy-paste drift after a rename.',
    },
  },

  create(context) {
    return {
      PropertyDefinition(node) {
        if (!node.decorators || node.decorators.length === 0) return;
        const fieldName = node.key && 'name' in node.key ? node.key.name : null;
        if (!fieldName) return;

        for (const dec of node.decorators) {
          const expr = dec.expression;
          if (!expr || expr.type !== 'CallExpression') continue;
          const callee = expr.callee;
          if (!callee || callee.type !== 'Identifier') continue;
          if (!CLASS_VALIDATOR_DECORATORS.has(callee.name)) continue;

          for (const arg of expr.arguments) {
            if (arg.type !== 'ObjectExpression') continue;

            const msgProp = arg.properties.find(
              (p) =>
                p.type === 'Property' &&
                p.key &&
                ((p.key.type === 'Identifier' && p.key.name === 'message') ||
                  (p.key.type === 'Literal' && p.key.value === 'message')),
            );
            if (!msgProp || msgProp.type !== 'Property') continue;

            // Only check static string literals — skip template strings
            // and dynamic expressions (those usually interpolate the
            // field name correctly via ${...}).
            if (msgProp.value.type !== 'Literal' || typeof msgProp.value.value !== 'string') {
              continue;
            }
            const msg = msgProp.value.value;
            const tokens = msg.match(IDENT_TOKEN);
            if (!tokens || tokens.length === 0) continue;

            const fieldLower = fieldName.toLowerCase();
            // If ANY identifier-looking token matches the field name
            // we consider it intentional. Otherwise the first
            // unmatched token is the drift candidate.
            const matches = tokens.some((t) => t.toLowerCase() === fieldLower);
            if (matches) continue;

            context.report({
              node: msgProp.value,
              messageId: 'drift',
              data: { token: tokens[0], field: fieldName },
            });
          }
        }
      },
    };
  },
};
