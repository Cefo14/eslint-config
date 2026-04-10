import tseslint, { type Config } from 'typescript-eslint';

/**
 * TypeScript-specific ESLint configuration.
 * 
 * Includes:
 * - TypeScript-specific rules and validations
 * - tsconfig strict mode equivalents
 * - Import organization and type checking
 * - Naming conventions for types and enums
 * 
 * Note: Many of these rules can be delegated to TypeScript compiler
 * for better performance when using strict tsconfig.json settings.
 */
const config = [
  // ========================================
  // EXTEND RECOMMENDED CONFIGURATIONS
  // ========================================
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,

  // ========================================
  // TYPESCRIPT SPECIFIC RULES
  // ========================================
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // ==========================================
      // TSCONFIG STRICT EQUIVALENTS
      // These checks are handled by TypeScript strict mode in this project.
      // Keep them off in ESLint to reduce duplicate diagnostics.
      // ==========================================

      // ── noUnusedLocals + noUnusedParameters ──
      'no-unused-vars': 'off', // Disabled in favor of @typescript-eslint version
      '@typescript-eslint/no-unused-vars': 'off', // Handled by tsconfig: noUnusedLocals + noUnusedParameters

      // ── noImplicitReturns ──
      'consistent-return': 'off', // Disabled in favor of @typescript-eslint version
      '@typescript-eslint/consistent-return': 'off', // Handled by tsconfig: noImplicitReturns

      // ── allowUnusedLabels: false ──
      'no-labels': 'off', // Handled by tsconfig: allowUnusedLabels=false

      // ── allowUnreachableCode: false ──
      'no-unreachable': 'off', // Handled by tsconfig: allowUnreachableCode=false

      // ── noFallthroughCasesInSwitch ──
      'no-fallthrough': 'off', // Handled by tsconfig: noFallthroughCasesInSwitch

      // ── isolatedModules ──
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',

      // ── strict: true (strictNullChecks) ──
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // ── strict: true (noImplicitAny) - ESLint is stricter ──
      '@typescript-eslint/no-explicit-any': 'error',

      // ── strict: true (noImplicitThis) ──
      '@typescript-eslint/no-this-alias': 'error',

      // ── strict: true (useUnknownInCatchVariables) ──
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off', // Handled by tsconfig strict

      // ── Class inheritance (core type checking) ──
      'constructor-super': 'off', // Already covered by base + TypeScript checks
      'no-this-before-super': 'off', // Already covered by base + TypeScript checks

      // ==========================================
      // TSCONFIG OPTIONS WITHOUT ESLINT EQUIVALENT
      // These can ONLY be validated by TypeScript compiler:
      // - noImplicitOverride (requires 'override' keyword)
      // - noUncheckedSideEffectImports (validates imports exist)
      // - strictPropertyInitialization (class property init)
      // - strictFunctionTypes (function type variance)
      // - strictBindCallApply (bind/call/apply types)
      // ==========================================

      // ==========================================
      // IMPORTS
      // Organize imports and improve tree-shaking
      // ==========================================
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error', // Complements: tsconfig noUncheckedSideEffectImports

      // ==========================================
      // TYPE SYSTEM
      // Keep code strongly typed
      // ==========================================
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-non-null-assertion': 'error', // Stricter than tsconfig strictNullChecks

      // ==========================================
      // FUNCTIONS
      // Inferred return types (especially for React)
      // ==========================================
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',

      // ==========================================
      // NAMING CONVENTIONS
      // Consistency in type and enum names
      // ==========================================
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE', 'PascalCase'],
        },
      ],

      // Strict-mode equivalent checks are intentionally off in this preset.
    },
  },
] as Config[];

export default Object.freeze(config);
