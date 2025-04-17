import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

import js from '@eslint/js';

export default [
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // Specific overrides if needed
    },
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      '**/*.config.js',
      '**/*.config.mjs',
    ],
  },
  // Configuration specific to example files (less strict)
  {
    files: ['examples/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser, // Example scripts run in browser
        dnVoxLoader: 'readonly', // Global variable from UMD build
      },
    },
    rules: {
      'no-console': 'off', // Allow console logs in examples
      'no-unused-vars': 'warn', // Keep warning about unused variables
    },
  },
];
