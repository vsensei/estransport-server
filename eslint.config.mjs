import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,ts}'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      'array-callback-return': 'error',
      'no-await-in-loop': 'error',
      'no-constructor-return': 'error',
      'no-duplicate-imports': 'error',
      'no-inner-declarations': 'error',
      'no-promise-executor-return': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'no-unassigned-vars': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable-loop': 'error',
      'no-use-before-define': 'error',
      'no-useless-assignment': 'error',
      'require-atomic-updates': 'error',
    },
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs', 'build/*.ts'],
          defaultProject: 'tsconfig.json',
        },
      },
    },
  },
]);
