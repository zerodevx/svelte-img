import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        grecaptcha: true,
        gtag: true
      }
    },
    rules: {
      'no-tabs': 'error',
      'no-unexpected-multiline': 'error',
      'svelte/no-at-html-tags': 'off'
    }
  },
  {
    ignores: ['build/', '.svelte-kit/', 'dist/', 'temp/']
  }
]
