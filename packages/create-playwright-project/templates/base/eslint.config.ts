import { configs } from '@eslint/js';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import * as playwright from 'eslint-plugin-playwright';
import * as prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Fix for ESLint JS recommended config
  {
    ...configs.recommended,
    files: ['**/*.{js,ts}'],
  },
  // Prettier config - properly import as default
  prettierConfig,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // Remove project-based checking for templates
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      playwright,
      prettier: prettierPlugin,
    },
    rules: {
      // Disable rules that conflict with TypeScript strict mode
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off', // Use TypeScript version instead

      // TypeScript-specific rules aligned with your tsconfig
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/prefer-const': 'off', // Handled by 'prefer-const' below
      '@typescript-eslint/no-unsafe-assignment': 'off', // Can be too strict with Playwright
      '@typescript-eslint/no-unsafe-member-access': 'off', // Can be too strict with Playwright
      '@typescript-eslint/no-unsafe-call': 'off', // Can be too strict with Playwright

      // General code quality that works with your tsconfig
      'no-console': 'warn',
      'prefer-const': 'error', // Aligns with TypeScript strict mode
      'no-var': 'error', // Aligns with modern TS

      // Import/Export rules that work with your module settings
      'no-duplicate-imports': 'error',

      // Playwright-specific rules
      'playwright/expect-expect': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-useless-await': 'error',
      'playwright/prefer-web-first-assertions': 'error',

      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      // Test files can have console.log for debugging
      'no-console': 'off',
      // Test functions don't need explicit return types
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Tests might not have explicit assertions if they're in page methods
      'playwright/expect-expect': 'off',
      // Allow unused vars in tests (sometimes needed for destructuring)
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/pages/**/*.ts'],
    rules: {
      // Page objects might have conditionals for dynamic content
      'playwright/no-conditional-in-test': 'off',
      // Page objects might have await expressions that seem unnecessary
      'playwright/no-useless-await': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      'playwright-report/',
      'test-results/',
      '!eslint.config.ts', // Include this config file
    ],
  },
];
