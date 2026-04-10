import baseConfig from './base.js';
import typescriptConfig from './typescript.js';
import reactConfig from './react.js';
import nodeConfig from './node.js';
import jestConfig from './jest.js';
import type { Config } from 'typescript-eslint';

/**
 * Default ESLint configuration for TypeScript + React projects.
 * 
 * This is the default export that includes:
 * - Base JavaScript/TypeScript rules and configuration
 * - TypeScript-specific rules and validations
 * - React and JSX rules with accessibility
 * 
 * Node and Jest presets are exported separately for explicit composition.
 * 
 * For granular usage, import individual configs:
 * - `@cefo14/eslint-config/base` - Base JS/TS rules only
 * - `@cefo14/eslint-config/typescript` - TypeScript-specific rules
 * - `@cefo14/eslint-config/react` - React and JSX rules
 * - `@cefo14/eslint-config/node` - Node.js backend rules
 * - `@cefo14/eslint-config/jest` - Jest test rules
 */
const config = [
  ...baseConfig,
  ...typescriptConfig, 
  ...reactConfig,
] as Config[];

export {
  baseConfig,
  typescriptConfig,
  reactConfig,
  nodeConfig,
  jestConfig,
};

export default Object.freeze(config);
