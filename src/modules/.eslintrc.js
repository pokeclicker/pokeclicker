const path = require('path');

module.exports = {
  parserOptions: {
      project: path.resolve(__dirname, '../../tsconfigWithModules.json'),
  },
  extends: ['airbnb-typescript/base'],
  globals: {
    ko: 'readonly',
    KnockoutObservable: 'readonly',
  },
  rules: {
      indent: 'off',
      '@typescript-eslint/indent': ['error', 4, { 'SwitchCase': 1 }],
      '@typescript-eslint/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
        generics: 'always-multiline',
        tuples: 'always-multiline',
      }],
      '@typescript-eslint/lines-between-class-members': ['error', { exceptAfterSingleLine: true }],
  },
};
