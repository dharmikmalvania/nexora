import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier/flat";

export default [
  js.configs.recommended,
  tsPlugin.flatConfigs["flat/recommended"],
  prettier,
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsPlugin.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];