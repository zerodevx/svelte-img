import { imagetools, pictureFormat } from 'vite-imagetools'

function run(cfg) {
  return async function (metadatas) {
    const pic = pictureFormat()(metadatas)
    const lqip = (cfg && parseInt(cfg)) ?? 16
    if (lqip) {
      const { image } = metadatas.find((i) => i.src === pic.img.src)
      if (lqip > 1) {
        const buf = await image
          .clone()
          .resize({ width: lqip })
          .toFormat('webp', { quality: 20 })
          .toBuffer()
        pic.img.lqip = buf.toString('base64')
      } else {
        const { dominant } = await image.stats()
        const { r, g, b } = dominant
        pic.img.lqip = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
      }
    }
    return pic
  }
}

function main({
  profiles = {},
  // deprecated - to remove in next major
  runDefaultDirectives = new URLSearchParams('w=480;1024;1920&format=avif;webp;jpg'),
  defaultDirectives = new URLSearchParams(),
  exclude = '{build,dist,node_modules}/**/*',
  extendOutputFormats = (i) => i, //noop
  ...rest
} = {}) {
  const dict = {
    run: runDefaultDirectives,
    ...profiles
  }
  return imagetools({
    defaultDirectives: (url) => {
      const key = url.searchParams.get('as')?.split(':')[0]
      return Object.keys(dict).includes(key) ? dict[key] : defaultDirectives
    },
    extendOutputFormats: (builtins) => ({
      ...extendOutputFormats(builtins),
      ...Object.keys(dict).reduce((a, c) => ({ ...a, [c]: run }), {})
    }),
    exclude,
    ...rest
  })
}

export { main as imagetools, run }
