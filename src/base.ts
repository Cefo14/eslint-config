import type { Config } from 'eslint/config';

import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import js from '@eslint/js';

/**
 * Base ESLint configuration for all JavaScript and TypeScript files.
 *
 * This is the foundation for all other presets. It includes:
 *   - recommended ESLint rules (no-debugger, no-unused-vars, etc.)
 *   - global variables for modern environments (browser, node, es2026)
 *   - parser options for modern JavaScript and JSX
 *   stylistic rules that apply to all files (quotes, semi, comma-dangle, etc.)
 *
 * Scope: all .js / .jsx / .ts / .tsx files. Other presets may narrow this
 * scope further with their own `files` patterns.
 */
const config: Config[] = [
  // ========================================
  // IGNORE PATTERNS
  // ========================================
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/*.min.js',
      '**/public/**',
    ],
  },

  // ========================================
  // BASE CONFIGURATION
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.es2026,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // ========================================
  // EXTEND RECOMMENDED CONFIGURATION
  // Covers: no-debugger, no-unused-vars, no-undef, no-unreachable,
  // no-fallthrough, constructor-super, no-this-before-super,
  // no-constant-binary-expression, and more.
  // ========================================
  js.configs.recommended,


  // ========================================
  // STYLISTIC PLUGIN
  // Replaces the deprecated ESLint core formatting rules.
  // All rules below live in @stylistic/eslint-plugin and are auto-fixable.
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    plugins: { '@stylistic': stylistic },
    rules: {
      // 'quotes': deprecated → @stylistic/quotes
      // allowTemplateLiterals: false complements prefer-template: backticks are
      // only allowed when they contain interpolation (`${x}`), never for plain strings.
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'never' }],

      // 'semi': deprecated → @stylistic/semi
      '@stylistic/semi': ['error', 'always'],

      // 'comma-dangle': deprecated → @stylistic/comma-dangle
      '@stylistic/comma-dangle': ['error', 'always-multiline'],

      // 'object-curly-spacing': deprecated → @stylistic/object-curly-spacing
      '@stylistic/object-curly-spacing': ['error', 'always'],

      // 'array-bracket-spacing': deprecated → @stylistic/array-bracket-spacing
      '@stylistic/array-bracket-spacing': ['error', 'never'],

      // 'arrow-spacing': deprecated → @stylistic/arrow-spacing
      '@stylistic/arrow-spacing': 'error',

      // 'block-spacing': deprecated → @stylistic/block-spacing
      '@stylistic/block-spacing': 'error',

      // 'comma-spacing': deprecated → @stylistic/comma-spacing
      '@stylistic/comma-spacing': 'error',

      // 'key-spacing': deprecated → @stylistic/key-spacing
      '@stylistic/key-spacing': 'error',

      // 'keyword-spacing': deprecated → @stylistic/keyword-spacing
      '@stylistic/keyword-spacing': 'error',

      // 'space-before-blocks': deprecated → @stylistic/space-before-blocks
      '@stylistic/space-before-blocks': 'error',

      // 'space-infix-ops': deprecated → @stylistic/space-infix-ops
      '@stylistic/space-infix-ops': 'error',

      // Disallow spaces inside parentheses: `if( a )` → `if(a)`
      '@stylistic/space-in-parens': ['error', 'never'],

      // Space before function parenthesis:
      //   anonymous:  `function ()` — space to distinguish from a call
      //   named:      `function foo()` — no space, reads naturally
      //   asyncArrow: `async () =>` — space is standard
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      }],
    },
  },

  // ========================================
  // CONFIG FILES — RELAXED RULES
  // ========================================
  {
    files: ['**/*.config.{js,mjs,cjs,ts,mts,cts,tsx}'],
    rules: {
      'no-console': 'off',
    },
  },

  // ========================================
  // TEST FILES — RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{js,jsx,ts,tsx}',
      '**/__tests__/**/*.{js,jsx,ts,tsx}',
    ],
    rules: {
      'no-console': 'off',
      'no-shadow': 'off',
      'max-lines-per-function': 'off',
      'no-unused-vars': 'off',
    },
  },
];

export default Object.freeze(config);
