const dt = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: [
    'docs/index.html',
    'docs/App.svelte'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...dt.fontFamily.sans]
      },
      width: {
        128: '32rem'
      },
      height: {
        128: '32rem'
      }
    }
  },
  variants: {},
  plugins: []
}
