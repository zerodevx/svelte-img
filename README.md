# svelte-img

> High-performance responsive/progressive images for SvelteKit.

Automatically transform local images into multiple widths and next-gen formats, then render a
minimally invasive LQIP-included HTML representation into your SvelteKit project.

Includes special effects:

- [x] Fade-in on image reveal
- [x] Parallax vertical scroll effect

Hope you like cats. Demo: https://zerodevx.github.io/svelte-img/

## Install

Install the package:

```
$ npm i -D @zerodevx/svelte-img
```

Add `imagetools` plugin into your `vite.config.js`:

```js
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from '@zerodevx/svelte-img/vite'

export default defineConfig({
  plugins: [sveltekit(), imagetools()]
})
```

Optionally, to silence typescript
[warnings](https://github.com/JonasKruckenberg/imagetools/issues/160) on image imports, create a new
file at `src/ambient.d.ts`:

```js
// Squelch warnings of image imports from your assets dir
declare module '$lib/assets/*' {
  var meta
  export default meta
}
```

### Under the hood

Local image transformations are delegated to the excellent
[vite-imagetools](https://github.com/JonasKruckenberg/imagetools) with a custom `run` directive.
This preset generates optimized images with sensible defaults, including a `base64` low-quality
image placeholder.

Invoke the preset with the `?as=run` query param:

```js
import imageMeta from 'path/to/asset?as=run'
```

## Usage

Use anywhere in your Svelte app:

<!-- prettier-ignore -->
```html
<script>
  // Import original full-sized image with `?as=run` query param
  import cat from '$lib/assets/cat.jpg?as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<Img class="cool kitty" src="{cat}" alt="Very meow" />
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
  <source
    type="image/jpeg"
    srcset="path/to/jpeg-480 480w, path/to/jpeg-1024 1024w, path/to/jpeg-1920 1920w"
  />
  <img
    class="cool kitty"
    width="1920"
    height="1080"
    loading="lazy"
    decoding="async"
    style="background: url(data:image/webp;base64,XXX) no-repeat center/cover"
    alt="Very meow"
    src="path/to/jpeg-1920"
  />
</picture>
```

## Features

### Change default widths/formats

By default, `svelte-img` generates 9 variants of an original full-sized image - at `480/1024/1920`
widths in `avif/webp/jpg` formats; and a `16px webp/base64` low-quality image placeholder (LQIP).

To change this globally, edit your `vite.config.js`:

```js
import ...

// By default, `run` is set to 'w=480;1024;1920&format=avif;webp;jpg' (9 variants)
export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools({
      profiles: {
        // Now we change `run` to generate 4 variants instead: 640/1280w in webp/jpg
        run: new URLSearchParams('w=640;1280&format=webp;jpg')
      }
    })
  ]
})
```

> [!NOTE]  
> `runDefaultDirectives` is deprecated and will be removed in the next major; use `profiles`
> instead. When a profile is not used, behaviour falls back to standard `vite-imagetools`, which in
> turn take defaults from `defaultDirectives` as usual, so both can co-exist.

### Profiles

Use profiles to manage multiple defaults. Define in your `vite.config.js`:

```js
export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools({
      profiles: {
        sm: new URLSearchParams('w=640&format=webp;jpg'),
        lg: new URLSearchParams('w=640;1280;1920&format=webp;jpg')
      }
    })
  ]
})
```

Then invoke in your app:

```js
import sm from '$lib/a/1.jpg?as=sm' // use `sm` profile
import lg from '$lib/a/2.jpg?as=lg' // use `lg` profile
import normal from '$lib/a/3.jpg?as=run'
```

### On a per-image basis

Widths/formats can be applied to a particular image. From your `.svelte` file:

<!-- prettier-ignore -->
```html
<script>
  // We override defaults to generate 4 variants: 720/1560w in webp/jpg
  import src from '$lib/a/cat.jpg?w=720;1560&format=webp;jpg&as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />
```

> [!NOTE]  
> Order of `format` matters - the _last_ format is used as the fallback image.

If just **one** variant is generated, then only the `<img>` tag renders, so:

<!-- prettier-ignore -->
```html
<script>
  // Generate only 1 variant: 640x640 in jpg
  import src from '$lib/a/cat.jpg?w=640&h=640&format=jpg&as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />
```

Renders into:

```html
<img
  width="640"
  height="640"
  loading="lazy"
  decoding="async"
  style="background: url(data:image/webp;base64,XXX) no-repeat center/cover"
  alt="cat"
  src="path/to/jpg-640"
/>
```

### Change LQIP width

The `run` directive takes an optional parameter that sets the LQIP's width. Using `?as=run` defaults
to `16px` LQIP - functionally equivalent to `?as=run:16`. Increase for a higher quality LQIP (eg.
`?as=run:32` for `32px` LQIP) at the expense of a larger inline `base64` (larger HTML size).

To disable LQIP, set `?as=run:0`.

For a dominant single-colour background, set `?as=run:1`, so:

<!-- prettier-ignore -->
```html
<script>
  import src from '$lib/a/cat.jpg?as=run:1'
  import Img from '@zerodevx/svelte-img'
</script>

<!-- Render img with dominant colour background -->
<Img {src} alt="cat" />
```

Renders into:

<!-- prettier-ignore -->
```html
<picture>
  <source ... />
  <img ... style="background: #abcdef" />
</picture>
```

### Other transformations

The full [repertoire](https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md)
of transformation directives offered by
[vite-imagetools](https://github.com/JonasKruckenberg/imagetools) can be used.

<!-- prettier-ignore -->
```html
<script>
  // Generate all 9 variants at fixed 600px height
  import src from '$lib/a/cat.jpg?h=600&fit=cover&normalize&as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" />
```

### Art direction

Use the `sizes` attribute to define media conditions that provide hints as to which image size to
select when those conditions are true. Read up more on the
[art direction problem](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

<!-- prettier-ignore -->
```html
<script>
  import src from '$lib/a/cat.jpg?w=480;800&as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<!-- If viewport is <=600px, use 480px as viewport width -->
<Img {src} alt="cat" sizes="(max-width: 600px) 480px, 800px" />
```

Renders into:

```html
<picture>
  <source
    type="image/avif"
    sizes="(max-width: 600px) 480px, 800px"
    srcset="path/to/avif-480 480w, path/to/avif-800 800w"
  />
  <source
    type="image/webp"
    sizes="(max-width: 600px) 480px, 800px"
    srcset="path/to/webp-480 480w, path/to/webp-800 800w"
  />
  <source
    type="image/jpeg"
    sizes="(max-width: 600px) 480px, 800px"
    srcset="path/to/jpeg-480 480w, path/to/jpeg-800 800w"
  />
  <img
    alt="cat"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
    src="path/to/jpeg-800"
    style="background: url(data:image/webp;base64,XXX) center center / cover no-repeat;"
  />
</picture>
```

Renders into:

```html
<picture>
	<source
		type="image/avif"
		sizes="(max-width: 600px) 480px, 800px"
		srcset="path/to/avif-480 480w,path/to/avif-800 800w"
	/><source
		type="image/webp"
		sizes="(max-width: 600px) 480px, 800px"
		srcset="path/to/webp-480 480w,path/to/webp-800 800w"
	/><source
		type="image/jpeg"
		sizes="(max-width: 600px) 480px, 800px"
		srcset="path/to/jpeg-480 480w,path/to/jpeg-800 800w"
	/>
	<img
		alt="cat"
		width="800"
		height="600"
		loading="lazy"
		decoding="async"
		src="path/to/jpeg-800"
		style="background: url(data:image/webp;base64,XXX) center center / cover no-repeat;"
	/>
</picture>
```

### Lazy loading

`svelte-img` utilises the browser's native lazy loading capability by setting the `loading="lazy"`
attribute on the rendered `<img>` tag by default. This is supported by
[most modern browsers](https://caniuse.com/loading-lazy-attr). To load an image eagerly instead:

<!-- prettier-ignore -->
```html
<script>
  import src from '$lib/a/cat.jpg?as=run'
  import Img from '@zerodevx/svelte-img'
</script>

<Img {src} alt="cat" loading="eager" />
```

### Batch loading local images

Use Vite's `import.meta.glob` [feature](https://vitejs.dev/guide/features.html#glob-import).

<!-- prettier-ignore -->
```html
<script>
  import Img from '@zerodevx/svelte-img'

  const modules = import.meta.glob('$lib/a/cats/*.*', {
    import: 'default',
    eager: true,
    query: { w: 640, h: 640, fit: 'cover', as: 'run' }
  })
  const images = Object.entries(modules).map((i) => i[1])
</script>

{#each images as src}
  <Img {src} alt="cat" />
{/each}
```

### Remote images from an API

Use the `svelte-img` component on its own by passing a `src` object, like so:

<!-- prettier-ignore -->
```html
<script>
import Img from '@zerodevx/svelte-img'

const src = {
  img: { src: 'path/to/img', w: 1920, h: 1080 },
  sources: {
    // Order is important; last format is fallback img
    webp: [
      { src: 'path/to/img', w: 1920 },
      { src: 'path/to/img', w: 1024 }
    ],
    jpeg: [
      { src: 'path/to/img', w: 1920 },
      { src: 'path/to/img', w: 1024 }
    ]
  }
}
</script>

<Img {src} alt="cat" />
```

### Blurred image placeholders

Natively, browsers do already apply _some_ blur when displaying low resolution images. That's enough
for me, but you can apply your own using CSS.

<!-- prettier-ignore -->
```html
<script>
  import Img from '@zerodevx/svelte-img'
  import src from '$lib/a/cat.jpg?as=run'
  import { onMount } from 'svelte'

  let ref, loaded
  onMount(() => {
    if (ref.complete) loaded = true
  })
</script>

<div class="wrap">
  <Img {src} bind:ref on:load={() => (loaded = true)} />
  <div class="blur" class:loaded />
</div>

<style>
  .wrap {
    position: relative;
    overflow: hidden;
  }
  .blur {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(20px);
    pointer-events: none;
  }
  .loaded {
    display: none;
  }
</style>
```

## Special Effects

### Fade-in on reveal

Reveal images with a fade-in effect (aka medium.com) when they are loaded **and** in the viewport.

<!-- prettier-ignore -->
```html
<script>
  import src from '$lib/a/cat.jpg?as=run'
  import { FxReveal as Img } from '@zerodevx/svelte-img'
</script>

<Img class="my-img" {src} alt="cat" />

<style>
  :global(.my-img) {
    width: 640px;
    height: 480px;
    
    /* These CSS vars (with their default values) are exposed */
    --reveal-transform: scale(1.02);
    --reveal-transition: opacity 1s ease-in, transform 0.8s ease-out;
    --reveal-filter: blur(20px);
  }
</style>
```

### Parallax

Apply a vertical parallax scrolling effect to an image, where `factor` is a decimal value between 0
and 1, that controls how much slower the element scrolls, relative to the scrolling speed:

- A value closer to 0 is faster, while a value closer to 1 is slower.
- A value of 1 behaves normally.
- A value of 0 effectively makes the element fixed on the page.

The default factor is `0.75`.

<!-- prettier-ignore -->
```html
<script>
  import src from '$lib/a/cat.jpg?as=run'
  import { FxParallax as Img } from '@zerodevx/svelte-img'
</script>

<Img class="my-img" factor="0.5" {src} alt="cat" />

<style>
  :global(.my-img) {
    width: 100%;
    height: 28rem;
  }
</style>
```

## Development

Library is packaged via [SvelteKit](https://kit.svelte.dev/docs/packaging). Standard Github
[contribution workflow](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
applies.

### Tests

End-to-end testing via [Playwright](https://github.com/microsoft/playwright). To run tests
headlessly:

```
$ npm run test
```

## Changelog

Please refer to the [releases](https://github.com/zerodevx/svelte-img/releases) page.

## License

ISC
