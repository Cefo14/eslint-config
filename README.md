# @cefo14/eslint-config

Opinionated ESLint Flat Config presets for JavaScript, TypeScript, React, Node.js, and Jest.

Goal: centralize one set of linting decisions and reuse it across projects.

## 🚀 Quick Start

```bash
pnpm add -D @cefo14/eslint-config eslint typescript
```

Create an `eslint.config.mjs` file:

```js
import base from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';

export default [
	...base,
	...typescript,
];
```

## 📦 Presets

- `@cefo14/eslint-config/base`
- `@cefo14/eslint-config/typescript`
- `@cefo14/eslint-config/react`
- `@cefo14/eslint-config/node`
- `@cefo14/eslint-config/jest`

## 🧩 Minimal Compositions

### React + TypeScript

```js
import base from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';
import react from '@cefo14/eslint-config/react';

export default [
	...base,
	...typescript,
	...react,
];
```

### Node.js Backend + TypeScript

```js
import base from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';
import node from '@cefo14/eslint-config/node';

export default [
	...base,
	...typescript,
	...node,
];
```

### Jest

```js
import base from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';
import jest from '@cefo14/eslint-config/jest';

export default [
	...base,
	...typescript,
	...jest,
];
```

## 🛠️ TypeScript Strict Mode

The `typescript` preset turns off ESLint rules that are redundant when you use a strict `tsconfig` (for example `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, etc.).

This avoids duplicate diagnostics and improves lint performance by delegating checks that the TypeScript compiler already handles natively.

## Notes

- Optimized for ESLint Flat Config.
- Specific Oxlint compatibility is not guaranteed in this initial scope.

## 📜 License

MIT - [Cefo14](https://github.com/cefo14)

## 🤝 Contributing

Contributions are welcome.

- Open an issue before major changes.
- Keep changes aligned with the package philosophy.
- Add or update documentation when behavior changes.

## 📬 Support

- Check [Issues](https://github.com/Cefo14/eslint-config/issues) for existing reports.
- Open a new issue if your case is not covered.

Made with ❤️ by [Cefo14](https://github.com/cefo14)
