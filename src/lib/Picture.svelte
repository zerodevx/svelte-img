<script>
import { len } from './utils.js'

export let sources = {}
export let sizes = undefined

let srcs = []

$: if (len(sources)) {
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
</script>

{#if len(srcs)}
  <picture>
    {#each srcs as { format, srcset }}
      <source type="image/{format}" {sizes} {srcset} />
    {/each}
    <slot />
  </picture>
{:else}
  <slot />
{/if}
