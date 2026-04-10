import base from './src/base';
import typescript from './src/typescript';

export default [
  {
    ignores: ['scripts/**'],
  },

  ...base,
  ...typescript,
];
