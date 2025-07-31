// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
     parserOptions: {
  ecmaVersion: "latest",
  sourceType: "module",
  project: "./tsconfig.app.json", // ✅ update this
},

    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/prop-types": "off",         // Since you're using TS
    },
  },
];

