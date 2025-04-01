// @ts-check
import eslint from "@eslint/js";
import eslintPluginForImportsInTypescript from "eslint-plugin-import-typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

// TODO: use explicit rules and embrace eslint-rule-ownership (maybe even look up eslintPluginPrettierRecommended-object from node_module)
export default tseslint.config(
     {
          ignores: ["eslint.config.mjs"],
     },
     eslint.configs.recommended,
     ...tseslint.configs.recommendedTypeChecked,

     // Adds eslintConfigPrettier and eslintPluginPrettier, but prettier-violations are warnings
     {
          ...eslintPluginPrettierRecommended,
          rules: {
               ...eslintPluginPrettierRecommended.rules,
               "prettier/prettier": "warn",
          },
     },
     {
          languageOptions: {
               globals: {
                    ...globals.node,
                    ...globals.jest,
               },
               ecmaVersion: 5,
               sourceType: "module",
               parserOptions: {
                    projectService: true,
                    tsconfigRootDir: import.meta.dirname,
               },
          },
     },
     {
          plugins: {
               "import-typescript": eslintPluginForImportsInTypescript,
          },
          rules: {
               "import-typescript/no-relative-parent-imports": ["error"],
          },
     },
     {
          rules: {
               "@typescript-eslint/no-explicit-any": "error",
               "@typescript-eslint/no-floating-promises": "error",
               "@typescript-eslint/no-unused-vars": [
                    "error",
                    { ignoreRestSiblings: true },
               ],
               "@typescript-eslint/no-unsafe-argument": "warn",
               "@typescript-eslint/ban-ts-comment": "off",
               "@typescript-eslint/no-unsafe-return": "off",
               "@typescript-eslint/no-unsafe-assignment": "warn",
               "@typescript-eslint/no-unsafe-call": "warn",
               "@typescript-eslint/no-unsafe-member-access": "warn",
               "@typescript-eslint/require-await": "warn",
               "@typescript-eslint/unbound-method": "warn",
          },
     }
);
