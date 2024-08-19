const { addDynamicIconSelectors } = require('@iconify/tailwind')
const dt = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...dt.fontFamily.sans]
      }
    }
  },
  plugins: [addDynamicIconSelectors(), require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#1C75BC',
          'primary-content': 'white'
        }
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#1C75BC'
        }
      }
    ]
  }
}

module.exports = config
