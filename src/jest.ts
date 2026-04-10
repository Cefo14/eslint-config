import globals from 'globals';
import jestPlugin from 'eslint-plugin-jest';
import type { Config } from 'eslint/config';

/**
 * Jest ESLint configuration.
 *
 * Includes:
 * - Jest plugin rules for test correctness
 * - Test-file specific safety and readability defaults
 */
const config = [
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
] as Config[];

export default Object.freeze(config);
