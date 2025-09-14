// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Base (all files)
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // JavaScript-only stylistic rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'brace-style': ['error', 'allman', { allowSingleLine: false }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      // Keep indent only for JS; the core rule is unreliable on TS AST
      'indent': ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
    },
  },

  // TypeScript recommended (must come before TS-specific overrides)
  ...tseslint.configs.recommended,

  // TypeScript-only stylistic rules (use core ESLint rules, not @typescript-eslint variants)
  {
    files: ['**/*.{ts,mts,cts}'],
    rules: {
      'brace-style': ['error', 'allman', { allowSingleLine: false }],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      // Intentionally no "indent" here (TS indent rule is deprecated/unreliable)
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
    },
  },

  // If you truly need plain script mode for .js (matches your original)
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
]);
