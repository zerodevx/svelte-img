<script>
import Img from './SvelteImg.svelte'
import { observe } from './utils.js'
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
 * @typedef FxParallaxProps
 * @property {string} class
 * @property {number} factor number between 0 to 1 to control speed relative to scroll
 * - value closer to 0 is faster, while a value closer to 1 is slower
 * - value of 1 behaves normally
 * - value of 0 effectively makes the element scroll fixed with the page
 * @property {HTMLImageElement | undefined} ref bindable reference to <img> element
 * @property {onclick} onclick
 * @property {onload} onload
 */

/** @type {FxParallaxProps} */
let { factor = 0.75, ref = $bindable(), onload, onclick, ...rest } = $props()

let mounted = $state(false)
let inview = $state(false)
let scrollY = $state(0)
let offsetHeight = $state(0)
let screenHeight = $state(0)
let stamp = $state(0)
let height = $state(100)
let offset = $state(0)
let normalized = $state(0)

function entered(e) {
  stamp = scrollY + e.detail.boundingClientRect.top
  inview = true
}

function resized() {
  screenHeight = window.screen.height
}

$effect(() => (normalized = Math.abs(factor - 1)))

$effect(() => {
  if (screenHeight && offsetHeight) {
    height = 100 + normalized * (screenHeight / offsetHeight) * 100
  }
})

$effect(() => {
  if (inview) {
    offset = Math.floor((scrollY - stamp) * normalized)
  }
})

onMount(() => {
  resized()
  mounted = true
})
</script>

<svelte:window bind:scrollY onresize={resized} />

<div
  class="wrap {rest.class}"
  class:mounted
  bind:offsetHeight
  use:observe
  onenter={entered}
  onleave={() => (inview = false)}
>
  <Img
    style="height:{height}%;transform:translate(0,{offset}px)"
    bind:ref
    {onload}
    {onclick}
    {...rest}
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
