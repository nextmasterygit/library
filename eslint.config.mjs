import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
// import eslintPluginPrettier from "eslint-plugin-prettier";
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // prettier, // Disables conflicting ESLint rules

  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      // prettier: eslintPluginPrettier,
      import: importPlugin, // Register import plugin
      'react-hooks': reactHooks,
    },
    rules: {
      // Prettier integration
      // "prettier/prettier": ["error", { singleQuote: true,
      //   quoteProps: "preserve" }],

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // JavaScript rules
      'no-undef': 'error',
      'no-implicit-globals': 'error',
      'no-constant-condition': 'error',
      'no-empty-pattern': 'off',
      'no-constant-binary-expression': 'off',

      // Import rules
      'import/no-unresolved': 'warn',
      'import/named': 'off',
    },
  },
];
