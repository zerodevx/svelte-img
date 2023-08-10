import { imagetools, pictureFormat } from 'vite-imagetools'

function run(cfg) {
  return async function (metadatas) {
    const pic = pictureFormat()(metadatas)
    const lqip = (cfg && parseInt(cfg)) ?? 16
    if (lqip) {
      const { image } = metadatas.find((i) => i.src === pic.img.src)
      let data
      if (lqip > 1) {
        const buf = await image.resize({ width: lqip }).toFormat('webp', { quality: 20 }).toBuffer()
        data = buf.toString('base64')
      } else {
        const { dominant } = await image.stats()
        const { r, g, b } = dominant
        data = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
      }
      pic.img.lqip = data
    }
    return pic
  }
}

function main({
  runDefaultDirectives = new URLSearchParams('w=480;1024;1920&format=avif;webp;jpg'),
  defaultDirectives = new URLSearchParams(),
  exclude = '{build,dist,node_modules}/**/*',
  extendOutputFormats = (i) => i, //noop
  ...rest
} = {}) {
  return imagetools({
    defaultDirectives: (url) =>
      url.searchParams.get('as') === 'run' ? runDefaultDirectives : defaultDirectives,
    extendOutputFormats: (builtins) => ({ ...extendOutputFormats(builtins), run }),
    exclude,
    ...rest
  })
}

export { main as imagetools, run }
