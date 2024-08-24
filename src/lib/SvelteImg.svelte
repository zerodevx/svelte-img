<script>
import Picture from './Picture.svelte'
import { len, lqipToBackground } from './utils.js'

/**
 * Imagetools import meta
 * @type {any}
 */
export let src = {}

/**
 * &lt;img&gt; element `sizes` attr
 * @type {string|undefined}
 */
export let sizes = undefined

/**
 * &lt;img&gt; `width` override
 * @type {number|undefined}
 */
export let width = undefined

/**
 * &lt;img&gt; `height` override
 * @type {number|undefined}
 */
export let height = undefined

/**
 * &lt;img&gt; element `loading` attr
 * @type {'lazy'|'eager'}
 */
export let loading = 'lazy'

/**
 * &lt;img&gt; element `decoding` attr
 * @type {'async'|'auto'|'sync'}
 */
export let decoding = 'async'

/**
 * Bindable reference to &lt;img&gt; element
 * @type {HTMLImageElement|undefined}
 */
export let ref = undefined

let sources = []
let img = {}
let background = undefined

$: sources = src.sources || {}
$: img = src.img || {}
$: if (len(img)) {
  const { lqip } = img
  background = lqip ? lqipToBackground(lqip) : undefined
}
</script>

<!-- @component
High-performance responsive/progressive images for SvelteKit.

@example
<script>
  import Img from '@zerodevx/svelte-img'
  import src from '$lib/assets/cat.jpg?as=run'
</script>

<Img {src} alt="cute cat" />
-->

{#if len(img)}
  <Picture {sources} {sizes}>
    <!-- svelte-ignore a11y-missing-attribute a11y-no-noninteractive-element-interactions -->
    <img
      {...$$restProps}
      {loading}
      {decoding}
      width={width || img.w || undefined}
      height={height || img.h || undefined}
      style:background
      bind:this={ref}
      on:click
      on:load
      src={img.src}
    />
  </Picture>
{/if}
