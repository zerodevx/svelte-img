import { imagetools } from 'vite-imagetools'
import { resize, format, setMetadata, metadataFormat, resolveConfigs } from 'imagetools-core'

function lqip(cfg, ctx) {
  if ('lqip' in cfg) {
    const r = resize({ width: cfg.lqip }, ctx)
    const f = format({ format: 'webp', quality: '20' }, ctx)
    return async function (image) {
      image = f(r(image))
      const buffer = await image.toBuffer()
      setMetadata(image, 'base64', `data:image/webp;base64,${buffer.toString('base64')}`)
      return image
    }
  }
}

function set(url, defaults = 'width=480;1024;1920&format=avif;webp;jpg') {
  const { searchParams } = url
  const out = new URLSearchParams(defaults)
  for (const [key, val] of searchParams.entries()) out.set(key, val)
  return out
}

function main(opts) {
  return imagetools({
    defaultDirectives: (url) => set(url),
    extendTransforms: (builtins) => [...builtins, lqip],
    extendOutputFormats: (builtinOutputFormats) => ({
      ...builtinOutputFormats,
      run: () => metadataFormat(['format', 'src', 'width', 'base64'])
    }),
    resolveConfigs: (e, f) => {
      const idx = e.findIndex((i) => i[0] === 'lqip')
      let lqip = 16
      if (idx > -1) lqip = parseInt(e.splice(idx, 1)[0][1][0])
      return [...resolveConfigs(e, f), { lqip }]
    },
    ...opts
  })
}

export { main as imagetools, set, lqip }
