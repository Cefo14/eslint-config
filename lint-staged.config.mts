import type { Configuration } from 'lint-staged';

const config: Configuration = {
  '*.{ts,mts,cts}': [
    'pnpm typecheck',
  ],
};

export default config;
