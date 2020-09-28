import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'SvelteImg',
    file: 'dist/svelte-img.js'
  },
  plugins: [
    replace({
      '<!--DIST|': '',
      '|END-->': '',
      delimiters: ['', '']
    }),
    svelte({
      customElement: true
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}
