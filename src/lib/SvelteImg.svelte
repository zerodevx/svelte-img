<script>
import Picture from './Picture.svelte'
import { len, lqipToBackground } from './utils.js'

/** @type {Object} imagetools import */
export let src = {}
/** @type {string|undefined} img tag `sizes` attr */
export let sizes = undefined
/** @type {number|undefined} img width override */
export let width = undefined
/** @type {number|undefined} img height override */
export let height = undefined
/** @type {'lazy'|'eager'} img tag `loading` attr */
export let loading = 'lazy'
/** @type {'auto'|'high'|'low'} img tag `fetchpriority` attr */
export let fetchpriority = 'auto'
/** @type {'async'|'auto'|'sync'} img tag `decoding` attr */
export let decoding = 'async'
/** @type {HTMLImageElement|undefined} bindable reference to `<img>` element */
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

{#if len(img)}
  <Picture {sources} {sizes}>
    <!-- svelte-ignore a11y-missing-attribute a11y-no-noninteractive-element-interactions -->
    <img
      {loading}
      {decoding}
      {fetchpriority}
      width={width || img.w || undefined}
      height={height || img.h || undefined}
      style:background
      bind:this={ref}
      on:click
      on:load
      {...$$restProps}
      src={img.src}
    />
  </Picture>
{/if}
