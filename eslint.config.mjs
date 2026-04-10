import base from './dist/base.js';
import typescript from './dist/typescript.js';
import node from './dist/node.js';

export default [
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'commitlint.config.mts',
            'lint-staged.config.mts',
          ],
        },
      },
    },
  },
  ...base,
  ...typescript,
  ...node,
];
