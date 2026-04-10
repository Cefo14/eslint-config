import type { Config } from 'eslint/config';

import globals from 'globals';


/**
 * Browser ESLint preset — self-contained.
 *
 * Includes the base javascript.ts rules. Use this instead of javascript.ts:
 *
 *   // JS-only browser project:
 *   export default defineConfig([...browser]);
 *
 *   // TypeScript browser project:
 *   export default defineConfig([...browser, ...typescript]);
 *
 * Provides:
 * - Browser-only globals (removes Node.js globals from the base config).
 * - Rules targeting browser-specific bad practices and security issues.
 *
 * Note: there is no eslint-plugin-browser equivalent to eslint-plugin-n.
 * Browser environment rules are covered by ESLint core.
 */
const config: Config[] = [
  // ========================================
  // GLOBALS — Browser only
  // Overrides the base config's browser+node mix.
  // ========================================
  {
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // ========================================
  // BROWSER-SPECIFIC RULES
  // ========================================
  {
    files: ['**/*.{js,mjs,jsx,ts,mts,tsx}'],
    rules: {
      // ==========================================
      // SECURITY
      // ==========================================

      // Prevent `javascript:` URLs, which are an XSS attack vector.
      // `<a href="javascript:doSomething()">` or `location.href = 'javascript:...'`
      'no-script-url': 'error',

      // Restrict implicit browser globals that shadow common variable names
      // and cause subtle bugs. These are globals on `window` that are
      // accessible without qualification, making code harder to reason about.
      'no-restricted-globals': [
        'error',
        {
          name: 'event',
          message: 'Use the `event` parameter from your event handler instead of the implicit global.',
        },
        {
          name: 'name',
          message: 'Use a local variable. `window.name` is a string coercion footgun.',
        },
        {
          name: 'status',
          message: 'Use a local variable. `window.status` modifies the browser status bar.',
        },
        {
          name: 'closed',
          message: 'Use `window.closed` explicitly to avoid confusion with local variables.',
        },
      ],

      // ==========================================
      // UI QUALITY
      // ==========================================

      // Upgrade `no-alert` from warn (base) to error.
      // alert/confirm/prompt block the main thread, break UX, and have
      // no place in production browser code. Use a modal component instead.
      'no-alert': 'error',
    },
  },

  // ========================================
  // TEST FILES — RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{js,jsx,mjs,ts,tsx,mts}',
      '**/__tests__/**/*.{js,jsx,mjs,ts,tsx,mts}',
    ],
    rules: {
      // jsdom-based tests (Jest/Vitest) may use alert/confirm stubs.
      'no-alert': 'off',
      'no-restricted-globals': 'off',
    },
  },
];

export default Object.freeze(config);
