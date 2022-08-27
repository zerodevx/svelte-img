<script>
export let src = []
export let sizes = undefined
export let loading = 'lazy'
export let decoding = 'async'
export let ref = undefined

let image = {}
let sources = []

$: if (src.length) {
  const { list, lqip } = src.reduce(
    (a, c) => {
      if (c.base64) a.lqip = `url('${c.base64}') no-repeat center/cover`
      else a.list.push(c)
      return a
    },
    { list: [], lqip: undefined }
  )
  const groups = []
  for (const format of ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff']) {
    const group = list.filter((i) => i.format === format)
    if (group.length) {
      group.sort((a, b) => a.width - b.width)
      groups.push({
        format,
        srcset: group.reduce((a, c) => [...a, `${c.src} ${c.width}w`], []).join(','),
        src: group[0].src
      })
    }
  }
  image = { ...groups.pop(), lqip }
  sources = groups
}
</script>

{#if image.src}
  <picture>
    {#each sources as { format, srcset }}
      <source type="image/{format}" {srcset} {sizes} />
    {/each}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img
      src={image.src}
      srcset={image.srcset}
      {sizes}
      {loading}
      {decoding}
      style:background={image.lqip}
      bind:this={ref}
      on:click
      on:load
      {...$$restProps}
    />
  </picture>
{/if}
