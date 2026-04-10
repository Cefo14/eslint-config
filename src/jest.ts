import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';
import type { Config } from 'eslint/config';

/**
 * Jest ESLint preset — self-contained.
 *
 * Provides:
 * - Jest testing globals (describe, it, expect, etc.).
 * - Recommended rules for Jest tests.
 *
 * Scope: test files matching `*.test.{js,ts,jsx,tsx}` or `*.spec.{js,ts,jsx,tsx}`
 * or located in `__tests__` directories. Adjust the `files` patterns as needed
 * to fit your project's test file naming conventions and structure.
 *
 * Requires:
 *   eslint-plugin-jest
 */

const config: Config[] = [
  {
    files: [
      '**/*.{test,spec}.{ts,tsx,js,jsx,mts,cts,mjs,cjs}',
      '**/__tests__/**/*.{ts,tsx,js,jsx,mts,cts,mjs,cjs}',
    ],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-title': 'error',
      'jest/prefer-to-have-length': 'warn',
    },
  },
];

export default Object.freeze(config);
