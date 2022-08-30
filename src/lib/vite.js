import { imagetools } from 'vite-imagetools'
import { resize, format, setMetadata, metadataFormat, resolveConfigs } from 'imagetools-core'

function lqip(cfg, ctx) {
  if (cfg.lqip) {
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
  const merge = new URLSearchParams(defaults)
  for (const [key, val] of url.searchParams.entries()) merge.set(key, val)
  return merge
}

function main(overrides = {}) {
  return imagetools({
    defaultDirectives: (url) => set(url),
    extendTransforms: (builtins) => [...builtins, lqip],
    extendOutputFormats: (builtinOutputFormats) => ({
      ...builtinOutputFormats,
      run: () => metadataFormat(['format', 'src', 'width', 'base64'])
    }),
    resolveConfigs: (e, f) => {
      const idx = e.findIndex((i) => i[0] === 'lqip')
      const lqip = idx > -1 ? parseInt(e.splice(idx, 1)[0][1][0]) : 16
      return [...resolveConfigs(e, f), { lqip }]
    },
    ...overrides
  })
}

export { main as imagetools, set, lqip }
