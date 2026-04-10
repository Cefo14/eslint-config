import type { Config } from 'eslint/config';

/**
 * ESLint configuration for plain JavaScript files.
 *
 * Goal: approximate TypeScript strict discipline using only ESLint rules,
 * compensating for the absence of a type system.
 *
 * Formatting is enforced via @stylistic/eslint-plugin instead of the
 * deprecated ESLint core formatting rules (quotes, semi, comma-dangle, etc.),
 * which will be removed in ESLint v11.
 *
 * Scope: .js / .mjs / .cjs / .jsx only.
 * TypeScript files are handled by typescript.ts.
 */
const config: Config[] = [
  // ========================================
  // JAVASCRIPT RULES
  // ========================================
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    rules: {
      // ==========================================
      // TYPESCRIPT STRICT EQUIVALENTS
      // Rules that approximate what TS strict mode enforces statically.
      // Without a type system, ESLint is the only safety net.
      // ==========================================

      // → noImplicitReturns: all code paths must return a value
      'consistent-return': 'error',

      // → noFallthroughCasesInSwitch (also in js.configs.recommended, explicit here for traceability)
      'no-fallthrough': 'error',

      // → allowUnreachableCode=false (also in js.configs.recommended, explicit here for traceability)
      'no-unreachable': 'error',

      // → switch-exhaustiveness-check (weak equivalent — catches missing default)
      'default-case': 'error',

      // → strictNullChecks: no implicit equality coercion
      // `null: 'ignore'` allows `== null` to check both null and undefined,
      // a common JS idiom that has no equivalent in TypeScript's type guards.
      'eqeqeq': ['error', 'always', { null: 'ignore' }],

      // → noImplicitAny / no-shadow: prevent variable name collisions that
      // would be caught by TypeScript's scope analysis
      'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions' }],

      // → no-var is implied by TypeScript: tsc compiles to let/const,
      // and var's function scoping causes bugs that TypeScript's analysis masks
      'no-var': 'error',

      // → useUnknownInCatchVariables: don't throw arbitrary values
      'no-throw-literal': 'error',

      // → strict mode analysis: don't use variables before they're declared.
      // In TS, the type system catches most of these cases.
      'no-use-before-define': ['error', {
        functions: false, // function declarations are hoisted intentionally
        classes: true,
        variables: true,
      }],

      // → noUnusedLocals / noUnusedParameters (in recommended as warn, upgrade here)
      'no-unused-vars': ['error', {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true, // common destructuring pattern: const { a, ...rest } = obj
        caughtErrors: 'all', // ESLint v9 default, explicit for clarity
      }],

      // ==========================================
      // CODE QUALITY
      // Rules with no direct TS equivalent but that prevent real bugs.
      // ==========================================
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-alert': 'warn',
      'no-return-assign': ['error', 'always'],  // prevents `return x = 1` bugs
      'no-sequences': 'error',                  // disallow comma operator
      'no-unreachable-loop': 'error',
      'no-labels': 'error',
      'no-implicit-coercion': 'error',          // ✓ auto-fix: `+x` → `Number(x)`
      'no-useless-return': 'error',             // ✓ auto-fix
      'radix': 'error',                         // parseInt must specify base

      // ==========================================
      // MODERN JAVASCRIPT
      // Enforce ES2015+ patterns that TypeScript projects use by default.
      // ==========================================
      'prefer-const': 'error',                        // ✓ auto-fix
      'prefer-arrow-callback': 'error',               // ✓ auto-fix
      'arrow-body-style': ['error', 'as-needed'],     // ✓ auto-fix
      'prefer-template': 'error',                     // ✓ auto-fix: `'hello ' + name` → template literal
      'no-duplicate-imports': 'error',
      'object-shorthand': ['error', 'always'],        // ✓ auto-fix: `{ x: x }` → `{ x }`
      'curly': ['error', 'all'],                      // require braces in all control flow

      // ==========================================
      // SIMPLIFICATION
      // Prevent unnecessary complexity that TypeScript's inference avoids.
      // ==========================================
      'no-else-return': ['error', { allowElseIf: false }], // ✓ auto-fix
      'no-lonely-if': 'error',                             // ✓ auto-fix
      'no-unneeded-ternary': 'error',                      // ✓ auto-fix
      'no-nested-ternary': 'warn',

      // ==========================================
      // INTENTIONALLY COMMENTED OUT
      // Complexity rules are useful but highly project-dependent.
      // Uncomment and tune per project.
      // ==========================================
      // 'complexity': ['warn', { max: 10 }],
      // 'max-depth': ['warn', 3],
      // 'max-params': ['warn', 4],
      // 'max-statements': ['warn', 15],
      // 'max-lines-per-function': ['warn', { max: 75, skipBlankLines: true, skipComments: true }],
    },
  },
];

export default Object.freeze(config);
