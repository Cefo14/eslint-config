import globals from 'globals';
import js from '@eslint/js';
import type { Config } from 'eslint/config';

/**
 * Base ESLint configuration for JavaScript and TypeScript projects.
 * 
 * Includes:
 * - Ignore patterns for common build/dist folders
 * - Base language options and globals
 * - Recommended JS and TS configurations
 * - Core code quality and style rules
 * - Relaxed rules for config files
 */
const config = [
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
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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
  // EXTEND RECOMMENDED CONFIGURATIONS
  // ========================================
  js.configs.recommended,
  
  // ========================================
  // JAVASCRIPT RULES
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      // ==========================================
      // CODE QUALITY
      // Detect potential errors and bad practices
      // ==========================================
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-useless-return': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-unneeded-ternary': 'error',
      'no-nested-ternary': 'warn',
      
      // ==========================================
      // FORMAT AND STYLE
      // Keep code uniform across the team
      // ==========================================
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'block-spacing': 'error',
      'comma-spacing': 'error',
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      
      // ==========================================
      // COMPLEXITY AND MAINTAINABILITY
      // Prevent hard-to-maintain code
      // ==========================================
      'complexity': ['warn', { 'max': 10 }],
      'max-depth': ['warn', 3],
      'max-lines-per-function': ['warn', {
        'max': 75,
        'skipBlankLines': true,
        'skipComments': true,
      }],
      'max-params': ['warn', 4],
      'max-statements': ['warn', 15],

      // ==========================================
      // ADDITIONAL VALIDATIONS
      // Extra safety for common mistakes
      // ==========================================
      'consistent-return': 'error', // tsconfig: noImplicitReturns
      'constructor-super': 'error', // tsconfig: strict class checks
      'no-constant-binary-expression': 'error',
      'no-fallthrough': 'error', // tsconfig: noFallthroughCasesInSwitch
      'no-labels': 'error', // tsconfig: allowUnusedLabels
      'no-this-before-super': 'error', // tsconfig: strict class checks
      'no-unreachable': 'error', // tsconfig: allowUnreachableCode
      'no-unreachable-loop': 'error', // Extra safety for loops
      // 'no-unused-vars': tsconfig: noUnusedLocals - enabled by js.configs.recommended
    },
  },

  // ========================================
  // CONFIG FILES - RELAXED RULES
  // ========================================
  {
    files: ['**/*.config.{js,ts,mjs,mts}'],
    rules: {
      'no-console': 'off', // Config files often need console for debugging
      'complexity': 'off', // Config files can be complex with many conditionals
      'max-lines-per-function': 'off', // Configuration functions can be long
    },
  },

  // ========================================
  // TEST FILES - RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{ts,tsx,js,jsx}',
      '**/__tests__/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      'complexity': 'off', // Test functions can be complex
      'max-depth': 'off', // Deep nesting in test setup is common
      'max-lines-per-function': 'off', // Test functions can be long
      'max-params': 'off', // Test utilities often need many params
      'max-statements': 'off', // Many assertions and setup statements
      'no-console': 'off', // Console logs are common in tests
    },
  },
] as Config[];

export default Object.freeze(config);
