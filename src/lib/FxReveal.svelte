<script>
import Img from './SvelteImg.svelte'
import { observe, len, lqipToBackground } from './utils.js'
import { onMount } from 'svelte'

/**
 * Imagetools import meta
 * @type {any}
 */
export let src = {}

/**
 * Bindable reference to &lt;img&gt; element
 * @type {HTMLImageElement|undefined}
 */
export let ref = undefined

let meta = {}
let background
let mounted = false
let loaded = false
let inview = false

$: if (len(src)) {
  loaded = false
  const { lqip, src: s, w, h } = src.img
  background = lqip ? lqipToBackground(lqip) : undefined
  const { sources = {} } = src
  meta = { img: { src: s, w, h }, sources }
} else {
  meta = {}
}

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
    on:enter={() => (inview = true)}
  >
    <Img {...$$restProps} bind:ref on:load on:load={() => (loaded = true)} on:click src={meta} />
    <div class="lqip" style:background />
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
