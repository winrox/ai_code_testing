import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginJest from "eslint-plugin-jest";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { 
    settings: {
      react: {
        version: "detect"
      }
    },
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { 
      js, 
      jest: pluginJest 
    }, 
    extends: ["js/recommended"], 
    rules: {
      "no-unused-vars": "error",
			"no-undef": "error",
    },
    languageOptions: {
      globals: {
        ...globals.jest, // Enables all Jest globals
        ...globals.browser
      }
    }
  },
  pluginReact.configs.flat.recommended,
]);
