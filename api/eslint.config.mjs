import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      sourceType: 'module',
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
    },
    ignores: ['node_modules/**', 'dist/**','eslint.config.mjs'],
  },
];