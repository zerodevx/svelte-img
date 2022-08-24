const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      width: {
        128: '32rem'
      },
      height: {
        128: '32rem'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}

module.exports = config
