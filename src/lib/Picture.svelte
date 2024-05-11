<script>
import { len } from './utils.js'

/**
 * @typedef PictureProps
 * @property {Object} sources
 * @property {string | undefined} sizes
 */

/** @type {PictureProps} */
let { sources = {}, sizes, children } = $props()

let srcs = $state([])

$effect(() => {
  if (len(sources)) {
    const list = []
    for (const [format, imgs] of Object.entries(sources)) {
      list.push({
        format,
        srcset: imgs.map((i) => `${i.src} ${i.w}w`).join()
      })
    }
    srcs = list
  } else {
    srcs = []
  }
})
</script>

{#if len(srcs)}
  <picture>
    {#each srcs as { format, srcset }}
      <source type="image/{format}" {sizes} {srcset} />
    {/each}
    {@render children()}
  </picture>
{:else}
  {@render children()}
{/if}
