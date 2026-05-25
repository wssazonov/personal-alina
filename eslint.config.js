const angular = require("angular-eslint");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
    {
        ignores: [
            "dist/**",
            ".angular/**",
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
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
        },
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
        files: ["**/*.html"],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
    },
);
