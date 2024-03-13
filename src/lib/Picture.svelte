<script>
import { len } from './utils.js'

export let sources = {}
export let sizes = undefined

let srcs = []

$: if (len(sources)) {
  srcs = Object.entries(sources)
} else {
  srcs = []
}
</script>

{#if len(srcs)}
  <picture>
    {#each srcs as [format, srcset]}
      <source type="image/{format}" {sizes} {srcset} />
    {/each}
    <slot />
  </picture>
{:else}
  <slot />
{/if}
