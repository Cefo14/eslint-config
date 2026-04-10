import type { Config } from 'eslint/config';

import tseslint from 'typescript-eslint';

import baseConfig from './base.js';

/**
 * TypeScript ESLint configuration.
 *
 * Assumes tsconfig `strict: true` is enforced project-wide.
 * Rules already covered by the TypeScript compiler are left off
 * to avoid duplicate diagnostics — but documented here for traceability.
 *
 * Preset hierarchy:
 *   strictTypeChecked ⊃ recommendedTypeChecked ⊃ recommended
 *   stylisticTypeChecked ⊃ stylistic
 */
const config: Config[] = [
  // ========================================
  // BASE CONFIGURATION
  // ========================================
  ...baseConfig,

  // ========================================
  // BASE PRESETS
  // strictTypeChecked already includes recommended + recommendedTypeChecked.
  // stylisticTypeChecked adds style rules that require type information.
  // ========================================
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        // Enables type-aware rules using the same type info as your editor.
        // Required for all rules in the *TypeChecked presets.
        projectService: true,
      },
    },
    rules: {
      // ==========================================
      // HANDLED BY TSCONFIG STRICT — OFF IN ESLINT
      //
      // These rules are disabled for two reasons:
      //   1. tsconfig strict already reports the same errors.
      //   2. None of them have ESLint auto-fix, so enabling them
      //      would only produce duplicate diagnostics with no fix benefit.
      //      (tsc has no --fix flag either, so the fix is always manual.)
      // ==========================================

      // → strict: noUnusedLocals + noUnusedParameters (no ESLint fix)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // → strict: noImplicitReturns (no ESLint fix)
      'consistent-return': 'off',
      '@typescript-eslint/consistent-return': 'off',

      // → strict: allowUnusedLabels=false (no ESLint fix)
      'no-labels': 'off',

      // → strict: allowUnreachableCode=false (no ESLint fix)
      'no-unreachable': 'off',

      // → strict: noFallthroughCasesInSwitch (no ESLint fix)
      'no-fallthrough': 'off',

      // → strict: useUnknownInCatchVariables (no ESLint fix)
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',

      // → TypeScript itself catches these in strict mode (no ESLint fix)
      'constructor-super': 'off',
      'no-this-before-super': 'off',

      // ==========================================
      // ALREADY IN PRESET — DOCUMENTED FOR TRACEABILITY
      // These rules are already enabled by strictTypeChecked or
      // recommendedTypeChecked. They are listed here explicitly to
      // document WHY they are on and their relationship to tsconfig,
      // not to override anything.
      // ==========================================

      // In preset (recommended). Also stricter than strictNullChecks:
      // tsc catches `obj!.prop` but not `obj?.prop!`
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

      // In preset (recommendedTypeChecked). Also stricter than strict:
      // ESLint detects more unnecessary assertions + ✓ auto-fix
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // In preset (recommended). Also stricter than noImplicitAny:
      // noImplicitAny allows explicit `any`; ESLint bans it entirely
      '@typescript-eslint/no-explicit-any': 'error',

      // In preset (recommended). Also stricter than noImplicitThis:
      // tsc covers classes; ESLint also covers variable aliasing (`const self = this`)
      '@typescript-eslint/no-this-alias': 'error',

      // In preset (recommended). Catches declaration merging that can
      // break isolatedModules compilation.
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',

      // ==========================================
      // ASYNC SAFETY
      // Requires type information — not possible in tsconfig alone.
      // Both already in recommendedTypeChecked. Listed here to document
      // the intentional override on no-floating-promises.
      // ==========================================

      // Default preset has ignoreVoid: true, which allows `void fetchData()`
      // as an explicit way to discard a promise. Setting it to false means
      // the only valid options are `await` or returning the promise.
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: false },
      ],
      // In preset (recommendedTypeChecked). No options to override.
      '@typescript-eslint/no-misused-promises': 'error',

      // ==========================================
      // TYPE NARROWING
      // Pure ESLint territory — no tsconfig equivalent.
      // ==========================================

      // Detects conditions TypeScript can prove are always true/false.
      '@typescript-eslint/no-unnecessary-condition': 'error',

      // Forces explicit comparisons instead of truthy/falsy coercion.
      // e.g. `count > 0` instead of `count`, `name !== ""` instead of `name`
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableBoolean: true, // `if (flag)` where flag is `boolean | null`
          allowNullableObject: true,  // `if (user)` where user is `User | null`
          allowNullableString: false,
          allowNullableNumber: false,
        },
      ],

      // Ensures switch on union types covers every member.
      '@typescript-eslint/switch-exhaustiveness-check': [
        'error',
        {
          // Guards against future additions to the union.
          requireDefaultForNonUnion: true,
        },
      ],

      // ==========================================
      // IMPORTS — all ✓ auto-fixable
      // Enforces type-only imports for better tree-shaking and
      // compatibility with isolatedModules.
      // ==========================================

      // Adds the `type` modifier to qualifying imports. ✓ auto-fix
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      // Prevents `import type` from triggering side-effect imports.
      '@typescript-eslint/no-import-type-side-effects': 'error',
      // Multiple imports from the same module should be combined.
      'no-duplicate-imports': 'error',

      // ==========================================
      // TYPE DEFINITIONS — all ✓ auto-fixable
      // ==========================================

      // Prefer `T[]` for simple types, `Array<T>` for complex ones. ✓ auto-fix
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

      // Enforce `interface` over `type` for object shapes. ✓ auto-fix
      // `type` is still allowed for unions, intersections, and aliases.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // In preset (strict). Listed here to document the intent:
      // strictNullChecks reduces the need for `!`, but the remaining
      // cases are usually design issues worth surfacing explicitly.
      '@typescript-eslint/no-non-null-assertion': 'error',

      // ==========================================
      // FUNCTIONS
      // Off by default in all presets. Listed here to document that
      // this is an intentional choice, not an oversight.
      // Return types are intentionally inferred — explicit annotations
      // add noise without benefit, especially in React component files.
      // ==========================================
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // `const x: number = 5` → redundant; TypeScript infers it fine.
      '@typescript-eslint/no-inferrable-types': 'off',

      // ==========================================
      // CODE QUALITY
      // Language-agnostic rules that apply equally to TypeScript.
      // Mirrors the javascript.ts config for consistency.
      // ==========================================

      // TypeScript does not enforce === vs ==.
      // null: 'ignore' allows `== null` to check both null and undefined.
      'eqeqeq': ['error', 'always', { null: 'ignore' }],

      // Disallow console.log in production code; warn is acceptable for logging.
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Prevent `return x = y` and similar silent bugs.
      'no-return-assign': ['error', 'always'],

      // Disallow the comma operator: `a = b, c` is always a mistake.
      'no-sequences': 'error',

      // Loops that can only ever execute once are likely logic errors.
      // Not included in any preset.
      'no-unreachable-loop': 'error',

      // ✓ auto-fix: `+x` → Number(x), `!!x` → Boolean(x), `"" + x` → String(x)
      'no-implicit-coercion': 'error',

      // ✓ auto-fix: removes pointless `return` at end of function.
      'no-useless-return': 'error',

      // parseInt must always specify the radix to avoid octal parsing bugs.
      'radix': 'error',

      // ==========================================
      // SIMPLIFICATION
      // Enforce cleaner control flow. All auto-fixable.
      // ==========================================

      // ✓ auto-fix: removes unnecessary `else` after a `return`.
      'no-else-return': ['error', { allowElseIf: false }],

      // ✓ auto-fix: converts `else { if }` to `else if`.
      'no-lonely-if': 'error',

      // ✓ auto-fix: `x ? x : y` → `x || y`, `!!x` → Boolean(x) in conditions.
      'no-unneeded-ternary': 'error',

      // Nested ternaries are hard to read regardless of type safety.
      'no-nested-ternary': 'warn',

      // ==========================================
      // MODERN JAVASCRIPT
      // Language-agnostic style rules. All auto-fixable.
      // ==========================================

      // ✓ auto-fix: template literals over string concatenation.
      'prefer-template': 'error',

      // ✓ auto-fix: arrow functions as callbacks.
      'prefer-arrow-callback': 'error',

      // ✓ auto-fix: remove unnecessary braces from arrow functions.
      'arrow-body-style': ['error', 'as-needed'],

      // ✓ auto-fix: `{ x: x }` → `{ x }`, `{ fn: function() {} }` → `{ fn() {} }`
      'object-shorthand': ['error', 'always'],

      // Require braces in all control flow, even single-line bodies.
      'curly': ['error', 'all'],

      // ==========================================
      // NAMING CONVENTIONS
      // ==========================================
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
      ],
    },
  },

  // ========================================
  // TEST FILES — RELAXED RULES
  // Tests interact with mocks and fixtures that are intentionally
  // loosely typed. Strict type rules create more friction than value.
  // ========================================
  {
    files: [
      '**/*.{test,spec}.{ts,tsx,mts,cts}',
      '**/__tests__/**/*.{ts,tsx,mts,cts}',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];

export default Object.freeze(config);
