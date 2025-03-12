// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

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
          rules: {
               "@typescript-eslint/no-explicit-any": "error",
               "@typescript-eslint/no-floating-promises": "error",
               "@typescript-eslint/no-unsafe-argument": "warn",
               "@typescript-eslint/ban-ts-comment": "off",
               "@typescript-eslint/no-unsafe-return": "off",
               "@typescript-eslint/no-unsafe-assignment": "warn",
               "@typescript-eslint/no-unsafe-call": "warn",
               "@typescript-eslint/no-unsafe-member-access": "warn",
               "@typescript-eslint/require-await": "warn",
               "@typescript-eslint/no-unused-vars": "warn",
               "@typescript-eslint/unbound-method": "warn",
          },
     }
);
