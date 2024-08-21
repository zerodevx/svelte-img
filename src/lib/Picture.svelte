<script>
export let sources = {}
export let sizes = undefined

let srcs = []

$: srcs = Object.entries(sources)
</script>

{#if srcs.length}
  <picture>
    {#each srcs as [format, srcset]}
      <source type="image/{format}" {sizes} {srcset} />
    {/each}
    <slot />
  </picture>
{:else}
  <slot />
{/if}
