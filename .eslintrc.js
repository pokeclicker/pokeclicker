/* eslint-disable no-restricted-syntax */
module.exports = {
    root: true,
    'env': {
        'browser': true,
        'es6': true,
        'es2020': true,
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    rules: {
        'no-restricted-syntax': [
            'error',
            {
                'selector': "Literal[value=/\\.\\.\\u002Fassets/]",
                'message': "Use 'assets/' instead of '../assets/'",
            },
        ],
        '@html-eslint/no-restricted-attr-values': ["error",  {
            attrPatterns: [".*"],
            attrValuePatterns: ["\.\./assets.*"],
            message: "Use 'assets/' instead of '../assets/'"
        }]
    },
    'overrides': [
        {
            'files': ['*.html'],
            'plugins': ['@html-eslint'],
            'parser': '@html-eslint/parser',
            'extends': ['plugin:@html-eslint/recommended'],
            'rules': {
                '@html-eslint/element-newline': 'off',
                '@html-eslint/require-img-alt': 'off',
            }
        },
        {
            'files': ['*.ts'],
            'parser': '@typescript-eslint/parser',
            'parserOptions': {
                'tsconfigRootDir': '.',
                'project': ['./tsconfig.json'],
            },
            'plugins': ['@typescript-eslint'],
            'extends': ['plugin:@typescript-eslint/recommended'],
    'rules': {
        '@typescript-eslint/member-ordering': ['off'],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': ['error', {'selector': 'variable', 'format': ['camelCase', 'UPPER_CASE', 'PascalCase']}],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'no-trailing-spaces': 'error',
        'eol-last': ['error', 'always'],
        'array-bracket-newline': ['error', { 'multiline': true }],
        'comma-dangle': ['error', { 'arrays': 'always-multiline', 'objects': 'always-multiline', 'imports': 'always-multiline', 'exports': 'always-multiline' }],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'no-useless-concat': 'error',
        'prefer-template': 'error',
        'template-curly-spacing': ['error', 'never'],
        'curly': 'error',
        'brace-style': 'error',
        'semi': 'error',
        'space-before-blocks': ['error', 'always'],
        'keyword-spacing': 'error',
        'no-tabs': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'space-infix-ops': 'error',
        'arrow-spacing': 'error',
        'semi-spacing': 'error',
        'quotes': ['error', 'single'],
        'prefer-arrow-callback': 'error',
        'no-alert': 'error',
        'no-sparse-arrays': 'error',
        'dot-notation': 'error',
    },
        },
    ],
};
