# @cefo14/eslint-config

Opinionated ESLint Flat Config presets for JavaScript, TypeScript, React, Node.js, and Jest.

## Requirements

- Node.js `>=18`
- ESLint `>=10.2.0`

## Installation

```bash
# npm
npm install --save-dev @cefo14/eslint-config eslint

# pnpm
pnpm add -D @cefo14/eslint-config eslint

# yarn
yarn add -D @cefo14/eslint-config eslint
```

## Usage

This package uses [ESLint's Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) format. Create an `eslint.config.mjs` (or `eslint.config.js` with `"type": "module"`) at the root of your project.

The presets are designed to be composed. `base` is always required, and you add the rest depending on your project's needs.

### Available presets

| Import path | Description |
|---|---|
| `@cefo14/eslint-config/base` | **Always required.** Shared foundational rules used by all other presets. |
| `@cefo14/eslint-config/javascript` | Rules for JavaScript projects. |
| `@cefo14/eslint-config/typescript` | Rules for TypeScript projects (uses `typescript-eslint`). |
| `@cefo14/eslint-config/react` | Rules for React projects, including hooks and accessibility (`jsx-a11y`). |
| `@cefo14/eslint-config/browser` | Globals and rules for browser environments. |
| `@cefo14/eslint-config/node` | Rules for Node.js projects (uses `eslint-plugin-n`). |
| `@cefo14/eslint-config/jest` | Rules for Jest test files (uses `eslint-plugin-jest`). |

### JavaScript project

```js
// eslint.config.mjs
import base       from '@cefo14/eslint-config/base';
import javascript from '@cefo14/eslint-config/javascript';

export default [
  ...base,
  ...javascript,
];
```

### TypeScript project

```js
// eslint.config.mjs
import base       from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';

export default [
  ...base,
  ...typescript,
];
```

### React + TypeScript project

```js
// eslint.config.mjs
import base       from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';
import react      from '@cefo14/eslint-config/react';
import browser    from '@cefo14/eslint-config/browser';

export default [
  ...base,
  ...typescript,
  ...react,
  ...browser,
];
```

### Node.js project

```js
// eslint.config.mjs
import base       from '@cefo14/eslint-config/base';
import javascript from '@cefo14/eslint-config/javascript'; // or typescript
import node       from '@cefo14/eslint-config/node';

export default [
  ...base,
  ...javascript,
  ...node,
];
```

### Node.js + TypeScript + Jest

```js
// eslint.config.mjs
import base       from '@cefo14/eslint-config/base';
import typescript from '@cefo14/eslint-config/typescript';
import node       from '@cefo14/eslint-config/node';
import jest       from '@cefo14/eslint-config/jest';

export default [
  ...base,
  ...typescript,
  ...node,
  ...jest,
];
```

## What's included

This config is built on top of the following plugins:

- [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) — ESLint's official JS rules
- [`typescript-eslint`](https://typescript-eslint.io/) — TypeScript-aware linting
- [`@stylistic/eslint-plugin`](https://eslint.style/) — Formatting and style rules
- [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react) — React-specific rules
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) — Rules for React Hooks
- [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) — Accessibility rules for JSX
- [`eslint-plugin-n`](https://github.com/eslint-community/eslint-plugin-n) — Node.js-specific rules
- [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest) — Jest testing rules

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests. Please follow these guidelines:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes and commit them
4. Push to your fork and submit a pull request

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🔗 Links

- [GitHub Repository](https://github.com/Cefo14/eslint-config)
- [Issues](https://github.com/Cefo14/eslint-config/issues)

## 📞 Support

If you have any questions or need help, please:

- Check the [Issues](https://github.com/Cefo14/eslint-config/issues) for existing solutions
- Create a new issue if your problem isn't already addressed
- Contact the maintainer: cefo14@protonmail.com

---

Made with ❤️ by [Cefo14](https://github.com/Cefo14)
