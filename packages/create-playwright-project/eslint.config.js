import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import playwright from 'eslint-plugin-playwright';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default [
    // Config for template files without project checking - placed FIRST for highest precedence
    {
        files: ['templates/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                // No project checking for templates
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            playwright,
            prettier: prettierPlugin,
        },
        rules: {
            // Relaxed rules for templates
            'no-undef': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'no-console': 'off',
            'playwright/expect-expect': 'off',
            // Test rule to see if this config is applied
            'no-debugger': 'off',
        },
    },
    // Fix for ESLint JS recommended config
    {
        ...eslint.configs.recommended,
        files: ['**/*.{js,ts}'],
    },
    // Prettier config - properly import as default
    prettierConfig,
    // Config for non-template TypeScript files with project checking
    {
        files: ['**/*.ts'],
        ignores: ['templates/**'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
                project: './tsconfig.json',
                tsconfigRootDir: __dirname,
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
];
//# sourceMappingURL=eslint.config.js.map