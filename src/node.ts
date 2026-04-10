import globals from 'globals';
import type { Config } from 'eslint/config';

/**
 * Node.js backend ESLint configuration.
 *
 * Includes:
 * - Node runtime globals
 * - Backend-focused safety rules
 */
const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // Backend safety and runtime behavior
      'no-process-exit': 'error',
      'no-sync': 'warn',
    },
  },
] as Config[];

export default Object.freeze(config);
