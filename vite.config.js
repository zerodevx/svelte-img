import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from './src/lib/imagetools'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools()]
}

export default config
