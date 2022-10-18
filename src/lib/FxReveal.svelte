<script>
import Img from './SvelteImg.svelte'
import observe from './_observe.js'
import { onMount } from 'svelte'

export let src = []
export let ref = undefined

let sources = []
let background
let mounted = false
let loaded = false
let inview = false

$: if (src.length) {
  const { base64 } = src.find((i) => i.base64) || {}
  background = base64 && `url('${base64}') no-repeat center/cover`
  sources = src.filter((i) => !i.base64)
}

onMount(() => {
  mounted = true
  if (ref.complete) loaded = true
})
</script>

{#if src.length}
  <div
    class="wrap"
    class:mounted
    class:reveal={loaded && inview}
    use:observe
    on:enter={() => (inview = true)}
  >
    <Img src={sources} bind:ref on:load={() => (loaded = true)} on:click {...$$restProps} />
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
  transform: scale(var(--reveal-scale, 1.03));
}
.reveal :global(img) {
  transition: opacity var(--reveal-opacity-duration, 1s) linear,
    transform var(--reveal-transform-duration, 0.6s) ease-out;
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
  backdrop-filter: blur(20px);
}
</style>
