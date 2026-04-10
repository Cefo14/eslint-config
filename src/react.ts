import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import type { Config } from 'eslint/config';

/**
 * React and JSX ESLint configuration.
 * 
 * Includes:
 * - React best practices and JSX rules
 * - React Hooks rules (critical for hooks usage)
 * - Performance and safety rules
 * - Accessibility (a11y) rules
 * - Component definition consistency
 * 
 * Requires:
 * - eslint-plugin-react
 * - eslint-plugin-react-hooks
 * - eslint-plugin-jsx-a11y
 */
const config = [
  // ========================================
  // REACT AND JSX RULES
  // ========================================
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // ==========================================
      // CORE RULES
      // Base React configuration
      // ==========================================
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+

      // ==========================================
      // JSX BEST PRACTICES
      // Make JSX cleaner and more consistent
      // ==========================================
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/jsx-fragments': ['error', 'syntax'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],

      // ==========================================
      // HOOKS
      // Critical React Hooks rules
      // ==========================================
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // ==========================================
      // PERFORMANCE & SAFETY
      // Prevent common performance bugs
      // ==========================================
      'react/no-array-index-key': 'warn',
      'react/no-danger': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/jsx-no-constructed-context-values': 'error',

      // ==========================================
      // COMPONENT DEFINITION
      // Consistency in component definitions
      // ==========================================
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // ==========================================
      // ACCESSIBILITY (A11Y)
      // Make the app usable for everyone
      // ==========================================
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',


      // ==========================================
      // COMPLEXITY AND MAINTAINABILITY
      // React components often need more flexibility
      // ==========================================
      'complexity': ['warn', { max: 12 }], // Components can have more conditional rendering logic
      'max-depth': ['warn', 4], // Allow deeper nesting for conditional rendering
      'max-lines-per-function': ['warn', { 
        max: 100, 
        skipBlankLines: true, 
        skipComments: true, 
      }], // Components with JSX need more space
      'max-params': ['warn', 6], // Props destructuring often needs more params
      'max-statements': ['warn', 20], // Components have more statements for UI logic
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
      'react/display-name': 'off',
    },
  },
] as Config[];

export default Object.freeze(config);
