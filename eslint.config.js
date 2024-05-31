import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
    { languageOptions: { globals: globals.node } },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'object-curly-spacing': ['error', 'always'],
            'semi': ['error', 'always'],
            'no-multi-spaces': 'error',
            'key-spacing': ['error', {
                'beforeColon': false,
                'afterColon': true
            }],
            'space-infix-ops': 'error',
            'object-property-newline': ['error', { 'allowAllPropertiesOnSameLine': false }],
            'object-curly-newline': ['error', {
                'multiline': true,
                'consistent': true 
            }],
            'comma-style': ['error', 'last']
        }
    },
    {
        ignores: ['.tsimp/*', 'coverage/*', 'dist/*']
    },
);
