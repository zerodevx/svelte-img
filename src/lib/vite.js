// @ts-nocheck

import { imagetools } from 'vite-imagetools'
import { resize, format, setMetadata, metadataFormat, resolveConfigs } from 'imagetools-core'

function lqip(cfg, ctx) {
  if (cfg.lqip) {
    const r = resize({ width: cfg.lqip }, ctx)
    const f = format({ format: 'webp', quality: '20' }, ctx)
    return async function (image) {
      const img = f(r(image))
      const buffer = await img.toBuffer()
      setMetadata(img, 'base64', `data:image/webp;base64,${buffer.toString('base64')}`)
      return img
    }
  }
}

function main(overrides = {}) {
  return imagetools({
    defaultDirectives: (url) =>
      url.searchParams.has('run')
        ? new URLSearchParams('width=480;1024;1920&format=avif;webp;jpg')
        : new URLSearchParams(''),
    extendTransforms: (builtins) => [...builtins, lqip],
    extendOutputFormats: (builtinOutputFormats) => ({
      ...builtinOutputFormats,
      run: () => metadataFormat(['format', 'src', 'width', 'height', 'base64'])
    }),
    resolveConfigs: (e, f) => {
      if (e.findIndex((i) => i[0] === 'run') > -1) {
        const idx = e.findIndex((i) => i[0] === 'lqip')
        const lqip = idx > -1 ? parseInt(e.splice(idx, 1)[0][1][0]) : 16
        const merge = new Map()
        for (const [key, val] of e) merge.set(key, val)
        return [...resolveConfigs([...merge], f), ...(lqip ? [{ lqip }] : [])]
      }
      return resolveConfigs(e, f)
    },
    ...overrides
  })
}

export { main as imagetools, lqip }
