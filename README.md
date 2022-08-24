# svelte-img

> Elegant responsive images for SvelteKit.

Demo: https://zerodevx.github.io/svelte-img/

## Install

Install the package:

```
$ npm i -D @zerodevx/svelte-img
```

Add `imagetools` plugin into your `vite.config.js`:

```js
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from '@zerodevx/svelte-img'

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
// Import original max-sized image with `?run` query param.
import cat from '$lib/assets/cat.jpg?run'
import { Img } from '@zerodevx/svelte-img'
</script>

<Img class="any classes" src="{cat}" alt="Cute cat" />
```

The `<Img>` tag renders into:

```html
<picture>
  <source
    type="image/avif"
    srcset="path/to/avif/480 480w, path/to/avif/1024 1024w, path/to/avif/1920 1920w"
  />
  <source
    type="image/webp"
    srcset="path/to/webp/480 480w, path/to/webp/1024 1024w, path/to/webp/1920 1920w"
  />
  <img
    class="any classes"
    src="path/to/jpg/480"
    srcset="path/to/jpg/480 480w, path/to/jpg/1024 1024w, path/to/jpg/1920 1920w"
    loading="lazy"
    decoding="async"
    style='background: url("data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAQCdASoQAAwABUB8JbACdACVHAuzHEAA+FXw/vPuIDGE/UU8XBsY0aVUcxdGEcG5CngK2JQO7wxCmgwPJrlpw4REDWFeMX1yfLUHBxkTmnPYhBDAP1QyVOF7EB/AAAA=") no-repeat center/cover'
    alt="Cute cat"
  />
</picture>
```

## License

ISC
