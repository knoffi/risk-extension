import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

// TODO: use explicit rules and embrace eslint-rule-ownership (maybe even look up eslintPluginPrettierRecommended-object from node_module)
export default tseslint.config(
    { ignores: ["dist", "eslint.config.js"] },

    // Adds eslintConfigPrettier and eslintPluginPrettier, but prettier-violations are warnings
    {
        ...eslintPluginPrettierRecommended,
        rules: {
            ...eslintPluginPrettierRecommended.rules,
            "prettier/prettier": "warn",
        },
    },

    {
        extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    }
);
