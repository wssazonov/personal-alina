const angular = require("angular-eslint");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
    {
        ignores: [
            "**/dist/**",
            "**/.angular/**",
            "**/generated/**",
            "coverage/**",
            "node_modules/**",
            "tmp/**",
            "temp/**",
        ],
    },
    {
        files: ["**/*.ts"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["prisma/*.ts", "prisma.config.ts"],
                },
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "local",
                    args: "none",
                    ignoreRestSiblings: true,
                },
            ],
            "prefer-template": "error",
        },
    },
    {
        files: ["apps/frontend/**/*.ts"],
        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            "@angular-eslint/component-selector": [
                "warn",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
            "@angular-eslint/prefer-on-push-component-change-detection": "warn",
            "@angular-eslint/prefer-standalone": "error",
        },
    },
    {
        files: [
            "apps/frontend/src/app/pages/admin/**/*.ts",
            "apps/frontend/src/app/pages/admin-login/**/*.ts",
        ],
        rules: {
            "@typescript-eslint/unbound-method": "off",
        },
    },
    {
        files: ["**/*.html"],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
    },
);
