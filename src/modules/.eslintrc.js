const path = require('path');

module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    parserOptions: {
        project: [
            path.resolve(__dirname, './tsconfig.eslint.json'),
            path.resolve(__dirname, './tsconfig.json'),
        ],
        tsconfigRootDir: __dirname,
    },
    plugins: ['import'],
    extends: ['airbnb-typescript/base'],
    globals: {
        ko: 'readonly',
        $: 'readonly',
        App: 'readonly',
        player: 'readonly',
        Save: 'readonly',
        MapHelper: 'readonly',
        DungeonRunner: 'readonly',
        GymRunner: 'readonly',
        AchievementHandler: 'readonly',
        PokemonLocations: 'readonly',
        PokemonFactory: 'readonly',
        PartyController: 'readonly',
    },
    rules: {
        indent: 'off',
        'no-plusplus': 'off',
        'max-len': [
            'error', 200, 2, {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'no-return-assign': ['error', 'except-parens'],
        'no-console': ['error', { allow: ['warn', 'error', 'trace'] }],
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
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
        '@typescript-eslint/default-param-last': 'warn',
        '@typescript-eslint/lines-between-class-members': ['error', { exceptAfterSingleLine: true }],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: ['signature', 'field', 'constructor', 'method'],
            },
        ],
        'no-alert': 'error',
        'no-sparse-arrays': 'error',
        'dot-notation': 'error',
    },
};
