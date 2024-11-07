import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});
export default [
  {
    ignores: [
      'dist/',
      'node_modules/',
      '**/*.test.ts',
      'coverage/',
      'eslint.config.mjs',
      'node_modules',
      'test-results',
      'playwright-report',
      'playwright/.cache',
      'playwright/.auth',
      '.husky',
      '.env',
      '.vscode',
      '.idea',
      '.DS_Store',
      'allure*',
      'dist',
      'package-lock.json',
      '**/*.sh',
      '**/*.png',
      '*.md',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:playwright/playwright-test',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      import: fixupPluginRules(_import),
      jsdoc,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      parserOptions: {
        project: path.join(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: path.join(__dirname, './tsconfig.json'),
        },
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
      'no-console': 'error',
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0,
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
      'require-await': 'error',

      complexity: [
        'warn',
        {
          max: 11,
        },
      ],
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',
      'playwright/missing-playwright-await': ['error'],
      'playwright/no-focused-test': 'error',
      'playwright/valid-expect': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-useless-await': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-useless-not': 'warn',
      'playwright/require-top-level-describe': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
  {
    files: ['**/*.ts'],

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    },
  },
];