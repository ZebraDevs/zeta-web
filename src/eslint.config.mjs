import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import wc from "eslint-plugin-wc";
import lit from "eslint-plugin-lit";
import tsdoc from "eslint-plugin-tsdoc";
import storybook from "eslint-plugin-storybook";
import litA11Y from "eslint-plugin-lit-a11y";
import prettier from "eslint-config-prettier";
import testingStructure from "../scripts/enforce-testing-structure.js";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettier,
  storybook.configs["flat/recommended"],
  wc.configs["flat/recommended"],
  lit.configs["flat/recommended"],
  {
    ignores: ["**/*.stories.*", "**/generated", "**/*.tsx"]
  },
  {
    files: ["src/**/*.ts"],
    plugins: {
      tsdoc: tsdoc,
      "lit-a11y": litA11Y
    },

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["../tsconfig.json"]
      }
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
          SwitchCase: 1
        }
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
          fixStyle: "separate-type-imports"
        }
      ],

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      semi: [1, "always"],
      "spaced-comment": 0
    }
  },
  {
    files: ["src/**/*.test.ts"],
    plugins: {
      "testing-structure": testingStructure
    },
    rules: {
      "testing-structure/enforce-testing-structure": "error",
      "no-unused-expressions": 0,
      "@typescript-eslint/no-unused-expressions": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/no-unsafe-assignment": 0,
      "@typescript-eslint/no-unsafe-member-access": 0
    }
  }
);
