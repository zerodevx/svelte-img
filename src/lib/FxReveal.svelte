<script>
import Img from './SvelteImg.svelte'
import { observe, len, lqipToBackground } from './utils.js'
import { onMount } from 'svelte'

/**
 * @callback onclick
 * @param {MouseEvent & { currentTarget: EventTarget & HTMLImageElement }} event
 */

/**
 * @callback onload
 * @param {Event & { currentTarget: EventTarget & Element }} event
 */

/**
 * @typedef FxRevealProps
 * @property {Object} src imagetools import
 * @property {HTMLImageElement | undefined} ref bindable reference to <img> element
 * @property {onclick} onclick
 * @property {onload} onload
 */

/** @type {FxRevealProps} */
let { src, ref = $bindable(), onload = () => (loaded = true), onclick, ...rest } = $props()

let meta = $state({})
let background = $state(undefined)
let mounted = $state(false)
let loaded = $state(false)
let inview = $state(false)

$effect(() => {
  if (len(src)) {
    loaded = false
    const { lqip, src: s, w, h } = src.img
    background = lqip ? lqipToBackground(lqip) : undefined
    const { sources = {} } = src
    meta = { img: { src: s, w, h }, sources }
  } else {
    meta = {}
  }
})

onMount(() => {
  mounted = true
  if (ref.complete) loaded = true
})
</script>

{#if len(meta)}
  <div
    class="wrap"
    class:mounted
    class:reveal={loaded && inview}
    use:observe
    onenter={() => (inview = true)}
  >
    <Img src={meta} bind:ref {onload} {onclick} {...rest} />
    <div class="lqip" style:background></div>
  </div>
{/if}

<style>
.wrap {
  position: relative;
  overflow: hidden;
}
.wrap :global(img) {
  margin: 0;
}
.mounted :global(img) {
  opacity: 0;
  transform: var(--reveal-transform, scale(1.02));
}
.mounted.reveal :global(img) {
  transition: var(--reveal-transition, opacity 1s ease-in, transform 0.8s ease-out);
  opacity: 1;
  transform: scale(1);
}
.lqip {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.lqip::after {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: var(--reveal-filter, blur(20px));
}
</style>
