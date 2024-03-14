import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static'
import { readFileSync } from 'node:fs'

const { version: name } = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))
const dev = process.env.NODE_ENV === 'development'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/svelte-img'
    },
    version: { name }
  },
  preprocess: [vitePreprocess({})]
}

export default config
