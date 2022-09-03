# svelte-img

> Elegant responsive images for SvelteKit.

Automatically transform local images into multiple widths and next-gen formats, then render a
minimally invasive HTML representation into your SvelteKit project.

Demo: https://zerodevx.github.io/svelte-img/

## Install

Install the package:

```
$ npm i -D @zerodevx/svelte-img
```

Add `imagetools` plugin into your `vite.config.js`:

```js
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from '@zerodevx/svelte-img/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), imagetools()]
}

export default config
```

## Usage

Use anywhere in your Svelte app:

<!-- prettier-ignore -->
```html
<script>
// Import original full-sized image with `?run` query param.
import cat from '$lib/assets/cat.jpg?run'
import Img from '@zerodevx/svelte-img'
</script>

<Img class="cool cats" src={cat} alt="Cute cat" />
```

The image component renders into:

```html
<picture>
  <source
    type="image/avif"
    srcset="path/to/avif-480 480w, path/to/avif-1024 1024w, path/to/avif-1920 1920w"
  />
  <source
    type="image/webp"
    srcset="path/to/webp-480 480w, path/to/webp-1024 1024w, path/to/webp-1920 1920w"
  />
  <img
    class="cool cats"
    src="path/to/jpg-1920"
    srcset="path/to/jpg-480 480w, path/to/jpg-1024 1024w, path/to/jpg-1920 1920w"
    loading="lazy"
    decoding="async"
    style='background: url("data:image/webp;base64,XXX") no-repeat center/cover'
    alt="Cute cat"
  />
</picture>
```

## Features

#### Change default widths/formats

Local image manipulation is delegated to the excellent
[vite-imagetools](https://github.com/JonasKruckenberg/imagetools) with a custom `?run` directive. By
default, this generates 10 variants of every image - `avif/webp/jpg` formats at `480/1024/1920`
widths; and a `16px webp/base64` low-quality image placeholder (LQIP).

To change this globally, edit your `vite.config.js`:

```js
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from '@zerodevx/svelte-img/vite'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    imagetools({
      // By default, directives are `?width=480;1024;1920&format=avif;webp;jpg`
      // Now we change it to generate 5 variants instead - `avif/jpg` formats at `640/1280` + LQIP
      defaultDirectives: () => new URLSearchParams('?width=640;1280&format=avif;jpg')
    })
  ]
}

export default config
```

#### On a per-image basis

Widths/formats can be applied to a particular image. From your `.svelte` file:

<!-- prettier-ignore -->
```html
<script>
// We override defaults to generate 5 variants instead - `avif/jpg` formats at `768/1024` + LQIP
import src from '$lib/a/cat.jpg?run&width=640;1024&format=avif;jpg'
import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />
```

#### Change LQIP width

By default, LQIPs are 16px in width and set to `cover` the full image dimension. Increase for a
higher quality LQIP at the expense of a larger `base64`, or set to 1px for a dominant single-colour
background. To disable LQIP completely, set `?run&lqip=0`.

<!-- prettier-ignore -->
```html
<script>
import src from '$lib/a/cat.jpg?run&lqip=1'
import Img from '@zerodevx/svelte-img'
</script>

<!-- Render dominant colour background -->
<Img {src} alt="cat" />
```

#### Other transformations

The full [repertoire](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md)
of transformation directives offered by
[vite-imagetools](https://github.com/JonasKruckenberg/imagetools) can be used.

<!-- prettier-ignore -->
```html
<script>
import src from '$lib/a/cat.jpg?run&height=600&fit=cover&normalize'
import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />
```

#### Remote images from an API

Use the `svelte-img` component on its own by passing an array of image objects into `src` like so:

<!-- prettier-ignore -->
```html
<script>
import Img from '@zerodevx/svelte-img'

const src = [
  { format: 'avif', src: 'https://x.com/path/to/avif-480', width: 480 },
  { format: 'webp', src: 'https://x.com//path/to/webp-480', width: 480 },
  { format: 'jpg', src: 'https://x.com//path/to/jpg-480', width: 480 },
  { format: 'avif', src: 'https://x.com//path/to/avif-1024', width: 1024 },
  ... // all other variants
  { base64: 'data:image/webp;base64,XXX' } // an optional LQIP with `base64` key
]
</script>

<Img {src} alt="hello" />
```

The order doesn't matter; `svelte-img` internally sorts out the source priority based on:

```js
// Highest to lowest
const priority = ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff']
```

#### Blurred image placeholders

Natively, browsers do already apply _some_ blur when displaying low resolution images. That's enough
for me, but you can apply your own using CSS.

<!-- prettier-ignore -->
```html
<script>
import src from '$lib/a/cat.jpg?run'
import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />

<style>
:global(img)::after {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(20px);
  pointer-events: none;    
}
</style>
```

## To do

- [ ] Add typings
- [ ] Add tests
- [ ] Improve docs
- [ ] Improve demo

## License

ISC
