import type { Config } from 'eslint/config';

import n from 'eslint-plugin-n';
import globals from 'globals';

/**
 * Node.js ESLint preset — self-contained.
 *
 * Includes the base javascript.ts rules. Use this instead of javascript.ts:
 *
 *   // JS-only Node project:
 *   export default defineConfig([...node]);
 *
 *   // TypeScript Node project:
 *   export default defineConfig([...node, ...typescript]);
 *
 * Provides:
 * - Node.js-only globals (removes browser globals from the base config).
 * - eslint-plugin-n recommended rules: validates imports exist, detects
 *   use of Node.js APIs unsupported by the project's `engines` field, etc.
 * - Additional rules for modern Node.js best practices.
 *
 * eslint-plugin-n detects ESM vs CJS automatically from the `"type"` field
 * in package.json. Set `"type": "module"` for ESM or omit it for CJS.
 * Requires `"engines": { "node": ">=X" }` in package.json for
 * `n/no-unsupported-features/*` rules to work correctly.
 */
const config: Config[] = [
  // ========================================
  // GLOBALS — Node.js only
  // Overrides the base config's browser+node mix.
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // ========================================
  // eslint-plugin-n — recommended preset
  // Covers: no-missing-require, no-extraneous-require,
  // no-unsupported-features/es-syntax, no-unsupported-features/node-builtins,
  // and more. Uses flat/ prefix for ESLint v9 flat config compatibility.
  //
  // Note: spread without a `files` wrapper, so it applies to all files
  // ESLint processes in this project. This is intentional — this preset
  // is designed for Node.js-only projects where every file is a Node file.
  // Do not combine this preset with javascript.browser.ts.
  // ========================================
  n.configs['flat/recommended'],

  // ========================================
  // NODE.JS SPECIFIC RULES
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    rules: {
      // ==========================================
      // IMPORTS
      // ==========================================

      // Enforce the `node:` protocol on built-in module imports. ✓ auto-fix
      // Makes it immediately clear which imports are Node.js builtins vs npm packages.
      // `import fs from 'fs'` → `import fs from 'node:fs'`
      // Supported since Node.js v14.18.0 (require) / v12.20.0 (import).
      'n/prefer-node-protocol': 'error',

      // ==========================================
      // PROCESS
      // ==========================================

      // Prefer process.exitCode over process.exit().
      // process.exit() stops the event loop immediately, preventing cleanup
      // handlers (e.g. graceful server shutdown, flushing logs) from running.
      // process.exitCode = 1 sets the code and lets the process exit naturally.
      'n/no-process-exit': 'error',

      // ==========================================
      // ASYNC APIS
      // Prefer promise-based Node.js APIs over the legacy callback style.
      // These predate async/await and are inconsistent with modern code.
      // ==========================================
      'n/prefer-promises/fs': 'error',   // fs.promises.readFile vs fs.readFile(cb)
      'n/prefer-promises/dns': 'error',  // dns.promises.lookup vs dns.lookup(cb)
    },
  },

  // ========================================
  // TEST FILES — RELAXED RULES
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{js,cjs,mjs,ts,mts,cts}',
      '**/__tests__/**/*.{js,cjs,mjs,ts,mts,cts}',
    ],
    rules: {
      // Tests may intentionally use process.exit() to signal failure.
      'n/no-process-exit': 'off',
    },
  },
];

export default Object.freeze(config);
