<script>
export let src = []
export let loading = 'lazy'
export let decoding = 'async'
export let ref = {}

const priority = ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff']
const blacklist = ['src', 'srcset', 'loading', 'decoding', 'style', 'ref']
let props = {}
let image = {}
let sources = []

$: if (src.length) {
  const { list, lqip } = src.reduce(
    (a, c) => {
      if (c.base64) a.lqip = c.base64
      else a.list.push(c)
      return a
    },
    { list: [], lqip: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIBAAA=' }
  )
  const groups = []
  for (const f of priority) {
    const group = list.filter((i) => i.format === f)
    if (group.length) {
      group.sort((a, b) => a.width - b.width)
      groups.push({
        format: f,
        srcset: group.reduce((a, c) => [...a, `${c.src} ${c.width}w`], []).join(','),
        src: group[0].src
      })
    }
  }
  image = { ...groups.pop(), lqip }
  sources = groups
}

$: {
  props = {}
  for (const tag in $$props) {
    if (!blacklist.includes(tag)) props[tag] = $$props[tag]
  }
}
</script>

{#if image.src}
  <picture>
    {#each sources as { format, srcset }}
      <source type="image/{format}" {srcset} />
    {/each}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
      src={image.src}
      srcset={image.srcset}
      {loading}
      {decoding}
      style="background:url('{image.lqip}') no-repeat center/cover"
      bind:this={ref}
      on:click
      on:load
      {...props}
    />
  </picture>
{/if}
