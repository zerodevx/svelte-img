import { addIconSelectors } from '@iconify/tailwind'
import typography from '@tailwindcss/typography'
import daisyui from 'daisyui'
import dt from 'tailwindcss/defaultTheme'
import themes from 'daisyui/src/theming/themes'

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
  plugins: [addIconSelectors(['mdi']), typography, daisyui],
  daisyui: {
    themes: [
      { light: { ...themes['light'], primary: '#1C75BC', 'primary-content': 'white' } },
      { dark: { ...themes['dark'], primary: '#1C75BC' } }
    ]
  }
}
