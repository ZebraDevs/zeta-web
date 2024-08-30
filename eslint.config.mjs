import typescriptEslint from "@typescript-eslint/eslint-plugin";
import wc from "eslint-plugin-wc";
import tsdoc from "eslint-plugin-tsdoc";
import litA11Y from "eslint-plugin-lit-a11y";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.stories.*", "**/generated"],
  },
  ...compat.extends(
    "prettier",
    "eslint:recommended",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:wc/recommended",
    "plugin:lit/recommended"
  ),
  {
    files: ["src/**/*.ts"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      wc,
      tsdoc,
      "lit-a11y": litA11Y,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },

    settings: {},

    rules: {
      "wc/attach-shadow-constructor": "error",
      "wc/guard-super-call": "error",
      "wc/no-closed-shadow-root": "error",
      "wc/no-constructor-attributes": "error",
      "wc/no-constructor-params": "error",
      "wc/no-invalid-element-name": "error",
      "wc/no-self-class": "error",
      "wc/no-typos": "error",
      "wc/require-listener-teardown": "error",
      camelcase: 1,
      "comma-dangle": [1, "never"],
      "eol-last": [0],

      indent: [
        "off",
        2,
        {
          SwitchCase: 1,
        },
      ],

      "no-extra-semi": "warn",
      "no-extra-boolean-cast": "warn",
      "no-undef": 0,
      "no-unused-vars": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      semi: [1, "always"],
      "spaced-comment": 0,
    },
  },
  {
    files: ["src/**/*.test.ts"],
    rules: {
      "no-unused-expressions": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-member-access": 0,
    },
  },
];
