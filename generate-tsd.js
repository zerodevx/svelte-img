import { sveld } from 'sveld'

sveld({
  input: 'dist/index.js',
  typesOptions: {
    outDir: 'dist'
  }
})
