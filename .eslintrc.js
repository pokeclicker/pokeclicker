module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'es2020': true
  },
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
      'project': './tsconfig.json'
  },
  'extends': ['plugin:@typescript-eslint/recommended'],
  'rules': {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/naming-convention': ['error', {'selector': 'variable', 'format': ['camelCase', 'UPPER_CASE', 'PascalCase']}],
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
    'array-bracket-newline': ['error', { 'multiline': true }],
    'comma-dangle': ['error', { 'arrays': 'always-multiline', 'objects': 'always-multiline', 'imports': 'always-multiline', 'exports': 'always-multiline' }],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'no-useless-concat': 'error',
    'prefer-template': 'warn',
    'template-curly-spacing': ['error', 'never'],
    'curly': 'error',
    'brace-style': 'error',
    'semi': 'error',
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error'],
    'no-tabs': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'space-infix-ops': ['error'],
    'arrow-spacing': ['error'],
  }
};
