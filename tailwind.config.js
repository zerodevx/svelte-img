import { addIconSelectors } from '@iconify/tailwind'
import dt from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...dt.fontFamily.sans]
      }
    }
  },
  plugins: [addIconSelectors(['mdi']), require('@tailwindcss/typography'), require('daisyui')],
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
