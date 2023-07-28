const { addDynamicIconSelectors } = require('@iconify/tailwind')
const dt = require('tailwindcss/defaultTheme')

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...dt.fontFamily.sans]
      },
      width: {
        128: '32rem'
      },
      height: {
        128: '32rem'
      }
    }
  },
  plugins: [addDynamicIconSelectors(), require('@tailwindcss/typography')]
}

module.exports = config
