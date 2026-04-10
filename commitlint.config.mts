import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Define allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation only
        'style',    // Code style (formatting, missing semicolons, etc)
        'refactor', // Code refactoring
        'perf',     // Performance improvement
        'test',     // Adding tests
        'chore',    // Maintenance tasks
        'revert',   // Revert a previous commit
        'ci',       // CI/CD changes
        'build',    // Build system changes
      ],
    ],
    // Define allowed commit scopes
    'scope-enum': [
      2,
      'always',
      [
        'eslint-config', // ESLint configuration
        'tsconfig', // TypeScript configuration
        'deps', // Dependency updates
        'release', // Release-related changes
        'config', // General configuration, root workspace, and scripts
        'ci', // CI/CD workflows
        'docs', // Documentation changes
      ],
    ],
    // Scope is required
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
  },
};

export default config;
