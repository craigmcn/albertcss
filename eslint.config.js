import neostandard from 'neostandard'
import globals from 'globals'

export default [
    ...neostandard(),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
            'no-console': 'warn',
            'no-multi-spaces': 'error',
        },
    },
]
