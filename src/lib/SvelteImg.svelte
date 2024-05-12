<script>
import Picture from './Picture.svelte'
import { len, lqipToBackground } from './utils.js'

/**
 * @callback onclick
 * @param {MouseEvent & { currentTarget: EventTarget & HTMLImageElement }} event
 */

/**
 * @callback onload
 * @param {Event & { currentTarget: EventTarget & Element }} event
 */

/**
 * @typedef SvelteImgProps
 * @property {Object} src
 * @property {string | undefined} sizes
 * @property {number | undefined} width
 * @property {number | undefined} height
 * @property {'lazy' | 'eager'} loading
 * @property {'async' | 'auto'} decoding
 * @property {HTMLImageElement | undefined} ref
 * @property {onclick} onclick
 * @property {onload} onload
 */

/** @type {SvelteImgProps}  */
let {
  src = {},
  sizes,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  ref = $bindable(),
  ...rest
} = $props()

let sources = $derived(src.sources || {})
let img = $state(src.img || {})
let background = $state(undefined)

$effect(() => {
  if (len(img)) {
    const { lqip } = img
    background = lqip ? lqipToBackground(lqip) : undefined
  }
})
</script>

{#if len(img)}
  <Picture {sources} {sizes}>
    <img
      {loading}
      {decoding}
      width={width || img.w || undefined}
      height={height || img.h || undefined}
      style:background
      bind:this={ref}
      {...rest}
      src={img.src}
    />
  </Picture>
{/if}
