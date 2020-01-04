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
  }
}
