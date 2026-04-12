import neostandard from 'neostandard'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'

export default [
    ...neostandard(),
    prettierConfig,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            'no-console': 'warn',
        },
    },
]
