import tsParser from '@typescript-eslint/parser';
import * as playwright from 'eslint-plugin-playwright';
declare const _default: ({
    rules: Record<string, 0 | "off">;
} | {
    files: string[];
    rules: Readonly<import("eslint").Linter.RulesRecord>;
    languageOptions?: undefined;
    plugins?: undefined;
    ignores?: undefined;
} | {
    files: string[];
    languageOptions: {
        parser: typeof tsParser;
        parserOptions: {
            ecmaVersion: number;
            sourceType: string;
            project: string;
            tsconfigRootDir: string;
        };
    };
    plugins: {
        '@typescript-eslint': {
            default: {
                configs: Record<string, import("@typescript-eslint/utils/ts-eslint").ClassicConfig.Config>;
                meta: import("@typescript-eslint/utils/ts-eslint").FlatConfig.PluginMeta;
                rules: typeof import("@typescript-eslint/eslint-plugin/use-at-your-own-risk/rules");
            };
            configs: Record<string, import("@typescript-eslint/utils/ts-eslint").ClassicConfig.Config>;
            meta: import("@typescript-eslint/utils/ts-eslint").FlatConfig.PluginMeta;
            rules: typeof import("@typescript-eslint/eslint-plugin/use-at-your-own-risk/rules");
        };
        playwright: typeof playwright;
        prettier: {
            default: ESLint.Plugin;
        };
    };
    rules: {
        'no-undef': string;
        'no-unused-vars': string;
        '@typescript-eslint/no-unused-vars': string;
        '@typescript-eslint/explicit-function-return-type': string;
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/prefer-const': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-unsafe-call': string;
        'no-console': string;
        'prefer-const': string;
        'no-var': string;
        'no-duplicate-imports': string;
        'playwright/expect-expect': string;
        'playwright/no-conditional-in-test': string;
        'playwright/no-skipped-test': string;
        'playwright/no-useless-await': string;
        'playwright/prefer-web-first-assertions': string;
        'prettier/prettier': string;
    };
    ignores?: undefined;
} | {
    files: string[];
    rules: {
        'no-console': string;
        '@typescript-eslint/explicit-function-return-type': string;
        'playwright/expect-expect': string;
        '@typescript-eslint/no-unused-vars': string;
        'no-undef'?: undefined;
        'no-unused-vars'?: undefined;
        '@typescript-eslint/no-explicit-any'?: undefined;
        '@typescript-eslint/prefer-const'?: undefined;
        '@typescript-eslint/no-unsafe-assignment'?: undefined;
        '@typescript-eslint/no-unsafe-member-access'?: undefined;
        '@typescript-eslint/no-unsafe-call'?: undefined;
        'prefer-const'?: undefined;
        'no-var'?: undefined;
        'no-duplicate-imports'?: undefined;
        'playwright/no-conditional-in-test'?: undefined;
        'playwright/no-skipped-test'?: undefined;
        'playwright/no-useless-await'?: undefined;
        'playwright/prefer-web-first-assertions'?: undefined;
        'prettier/prettier'?: undefined;
    };
    languageOptions?: undefined;
    plugins?: undefined;
    ignores?: undefined;
} | {
    files: string[];
    rules: {
        'playwright/no-conditional-in-test': string;
        'playwright/no-useless-await': string;
        'no-undef'?: undefined;
        'no-unused-vars'?: undefined;
        '@typescript-eslint/no-unused-vars'?: undefined;
        '@typescript-eslint/explicit-function-return-type'?: undefined;
        '@typescript-eslint/no-explicit-any'?: undefined;
        '@typescript-eslint/prefer-const'?: undefined;
        '@typescript-eslint/no-unsafe-assignment'?: undefined;
        '@typescript-eslint/no-unsafe-member-access'?: undefined;
        '@typescript-eslint/no-unsafe-call'?: undefined;
        'no-console'?: undefined;
        'prefer-const'?: undefined;
        'no-var'?: undefined;
        'no-duplicate-imports'?: undefined;
        'playwright/expect-expect'?: undefined;
        'playwright/no-skipped-test'?: undefined;
        'playwright/prefer-web-first-assertions'?: undefined;
        'prettier/prettier'?: undefined;
    };
    languageOptions?: undefined;
    plugins?: undefined;
    ignores?: undefined;
} | {
    ignores: string[];
    files?: undefined;
    languageOptions?: undefined;
    plugins?: undefined;
    rules?: undefined;
})[];
export default _default;
//# sourceMappingURL=eslint.config.d.ts.map