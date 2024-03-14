<script lang="ts">
import SveltePicture from './SveltePicture.svelte'
import { len, lqipToBackground } from './utils.js'
import type { HTMLImgAttributes } from 'svelte/elements'
import type { Picture } from 'vite-imagetools'

interface $$Props extends Omit<HTMLImgAttributes, 'src'> {
  /** imagetools import */
  src: Picture

  /** img tag `sizes` attr */
  sizes?: string

  /** img width override */
  width?: number

  /** img height override */
  height?: number

  /** img tag `loading` attr */
  loading?: 'lazy' | 'eager'

  /** img tag `decoding` attr */
  decoding?: 'async' | 'auto' | 'sync'

  /** bindable reference to `<img>` element */
  ref?: HTMLImageElement
}

export let src: $$Props['src']
export let sizes: $$Props['sizes'] = undefined
export let width: $$Props['width'] = undefined
export let height: $$Props['height'] = undefined
export let loading: $$Props['loading'] = 'lazy'
export let decoding: $$Props['decoding'] = 'async'
export let ref: $$Props['ref'] = undefined

let sources: Picture['sources'] | undefined
let img: (Picture['img'] & { lqip?: string }) | undefined
let background: string | undefined

$: sources = src?.sources
$: img = src?.img
$: if (len(img)) {
  background = img?.lqip ? lqipToBackground(img.lqip) : undefined
}
</script>

{#if len(img)}
  <SveltePicture {sources} {sizes}>
    <!-- svelte-ignore a11y-missing-attribute a11y-no-noninteractive-element-interactions -->
    <img
      {loading}
      {decoding}
      width={width || img?.w || undefined}
      height={height || img?.h || undefined}
      style:background
      bind:this={ref}
      on:click
      on:load
      {...$$restProps}
      src={img?.src}
    />
  </SveltePicture>
{/if}

<!--
@component
High-performance responsive/progressive images for SvelteKit

## Usage
```html
<script>
  import Img from '@zerodevx/svelte-img'
  import cat from '$lib/assets/cat.jpg?as=run'
</script>
<Img class="cool kitty" src="{cat}" alt="Very meow" />
```

## Props
- `src: Picture` - imagetools import
- `sizes?: string` - img tag `sizes` attr
- `width?: number` - img `width` override
- `height?: number` - img `height` override
- `loading?: 'lazy' | 'eager'` - img tag `loading` attr
- `decoding?: 'async' | 'auto' | 'sync'` - img tag `decoding` attr
- `ref?: HTMLImageElement` - bindable reference to `<img>` element
-->
