import type { Config } from 'eslint/config';

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

/**
 * React ESLint preset — additive.
 *
 * Unlike browser/node, this preset does NOT include the JS base.
 * React is a library, not an environment. Use it alongside the
 * appropriate environment preset:
 *
 *   export default defineConfig([...browser, ...typescript, ...react]);
 *
 * Requires:
 *   eslint-plugin-react
 *   eslint-plugin-react-hooks
 *   eslint-plugin-jsx-a11y
 */
const config: Config[] = [
  // ========================================
  // REACT — flat config preset
  // Uses reactPlugin.configs.flat.* (not .configs.recommended.rules)
  // to correctly register the plugin, enable JSX parserOptions,
  // and inherit settings. Scoped to JSX/TSX files.
  // ========================================
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        // Automatically detects the installed React version.
        // Avoids hardcoding a version that can drift out of date.
        version: 'detect',
      },
    },
  },

  // jsx-runtime disables rules that are unnecessary with React 17+
  // new JSX transform (no longer need `import React from 'react'`).
  // This replaces manually setting:
  //   'react/react-in-jsx-scope': 'off'
  //   'react/prop-types': 'off' (already covered by TypeScript)
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat['jsx-runtime'],
  },

  // ========================================
  // REACT HOOKS — flat config preset
  // Used directly as an array element (not spread into an object with files),
  // following the official documented pattern. Requires v6.2.0+.
  //
  // Intentionally has no `files` restriction: hooks rules must apply to
  // all JS/TS files in a React project, including custom hook files (.ts)
  // that contain no JSX. Since this preset is React-specific, applying
  // to all processed files is correct.
  //
  // The preset automatically picks up new recommended rules in future
  // versions (e.g. component-hook-factories, error-boundaries).
  // ========================================
  reactHooksPlugin.configs.flat.recommended,

  // ========================================
  // JSX RULES + A11Y + ADDITIONAL RULES
  // ========================================
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // ==========================================
      // JSX BEST PRACTICES — all ✓ auto-fixable
      // ==========================================

      // Enforces `<Input />` over `<Input disabled={true} />`. ✓ auto-fix
      'react/jsx-boolean-value': ['error', 'never'],

      // Removes unnecessary `{'string'}` in props and children. ✓ auto-fix
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      // Enforces `<>` shorthand over `<React.Fragment>`. ✓ auto-fix
      'react/jsx-fragments': ['error', 'syntax'],

      // Removes `<><Child /></>` when a single child doesn't need wrapping. ✓ auto-fix
      'react/jsx-no-useless-fragment': 'error',

      // Enforces PascalCase for component names.
      'react/jsx-pascal-case': 'error',

      // Enforces `<Component />` over `<Component></Component>`. ✓ auto-fix
      'react/self-closing-comp': 'error',

      // Requires key prop in lists, including fragment shorthand.
      // Already in recommended but overridden here to add checkFragmentShorthand.
      'react/jsx-key': ['error', { checkFragmentShorthand: true }],

      // ==========================================
      // PERFORMANCE & SAFETY
      // ==========================================

      // Array index keys cause incorrect reconciliation when items are reordered.
      'react/no-array-index-key': 'warn',

      // dangerouslySetInnerHTML is an XSS risk. Warn rather than error
      // since legitimate uses exist (e.g. sanitized CMS content).
      'react/no-danger': 'warn',

      // Defining components inside render functions causes them to remount
      // on every render instead of updating.
      'react/no-unstable-nested-components': 'error',

      // Object literals and function calls in JSX are recreated on every render,
      // causing unnecessary context consumers to re-render.
      'react/jsx-no-constructed-context-values': 'error',

      // ==========================================
      // COMPONENT DEFINITION
      // ==========================================

      // Enforce arrow function components consistently.
      // Named: `const Foo = () => ...`, unnamed: `export default () => ...`
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      // ==========================================
      // ACCESSIBILITY (A11Y)
      // Spread recommended rules, then explicitly upgrade the most
      // critical ones to error (recommended sets some as warn).
      // ==========================================
      ...jsxA11yPlugin.configs.recommended.rules,
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',

      // Mouse-only interactions exclude keyboard users.
      // warn instead of error to allow gradual adoption.
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },

  // ========================================
  // TEST FILES — RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{ts,tsx,js,jsx}',
      '**/__tests__/**/*.{ts,tsx,js,jsx}',
    ],
    rules: {
      // Tests often define anonymous wrapper components inline.
      'react/display-name': 'off',
      // Tests render components with arbitrary props.
      'react/no-unstable-nested-components': 'off',
    },
  },
];

export default Object.freeze(config);
