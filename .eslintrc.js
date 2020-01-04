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
    '@typescript-eslint/camelcase': 'warn',
    "indent": ["error", 4, { "SwitchCase": 1 }]
  }
}
