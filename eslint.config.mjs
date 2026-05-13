import { createRequire } from 'node:module';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

const require = createRequire(import.meta.url);
const localPlugin = require('./eslint/plugin.js');

export default tseslint.config(
  {
    ignores: [
      'api/**',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      'logs/**',
      'sequelize-generator/**',
      'db-generator/**',
      'scripts/**',
      'eslint/**',
      'eslint.config.mjs',
      'commitlint.config.js',
      '.cz-config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'easy-front-local': localPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-useless-escape': 'warn',
      'easy-front-local/dto-message-mentions-field': 'warn',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);
