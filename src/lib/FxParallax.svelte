<script>
import Img from './SvelteImg.svelte'
import { observe } from './utils.js'
import { onMount } from 'svelte'

let classes = ''
export { classes as class }
/**
 * @type {number} number between 0 to 1 to control speed relative to scroll
 * - value closer to 0 is faster, while a value closer to 1 is slower
 * - value of 1 behaves normally
 * - value of 0 effectively makes the element scroll fixed with the page
 */
export let factor = 0.75
/** @type {HTMLImageElement|undefined} bindable reference to <img> element */
export let ref = undefined

let mounted = false
let inview = false
let scrollY = 0
let offsetHeight = 0
let screenHeight = 0
let stamp = 0
let height = 100
let offset = 0
let normalized = 0

function entered(e) {
  stamp = scrollY + e.detail.boundingClientRect.top
  inview = true
}

function resized() {
  screenHeight = window.screen.height
}

$: normalized = Math.abs(factor - 1)

$: if (screenHeight && offsetHeight) {
  height = 100 + normalized * (screenHeight / offsetHeight) * 100
}

$: if (inview) {
  offset = Math.floor((scrollY - stamp) * normalized)
}

onMount(() => {
  resized()
  mounted = true
})
</script>

<svelte:window bind:scrollY on:resize={resized} />

<div
  class="wrap {classes}"
  class:mounted
  bind:offsetHeight
  use:observe
  on:enter={entered}
  on:leave={() => (inview = false)}
>
  <Img
    style="height:{height}%;transform:translate(0,{offset}px)"
    bind:ref
    on:load
    on:click
    {...$$restProps}
  />
</div>

<style>
.wrap {
  position: relative;
  overflow: hidden;
}
.wrap :global(img) {
  width: 100%;
  object-fit: cover;
  will-change: transform;
  margin: 0;
}
</style>
