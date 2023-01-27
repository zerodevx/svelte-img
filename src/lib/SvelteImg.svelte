<script>
/** @type {Object[]} imagetools import */
export let src = []
/** @type {string|undefined} img tag `sizes` attr */
export let sizes = undefined
/** @type {number|undefined} image width override */
export let width = undefined
/** @type {number|undefined} image height override */
export let height = undefined
/** @type {'lazy'|'eager'} img tag `loading` attr */
export let loading = 'lazy'
/** @type {'async'|'auto'|'sync'} */
export let decoding = 'async'
/** @type {Object|undefined} bindable reference to this component */
export let ref = undefined

const priority = ['heic', 'heif', 'avif', 'webp', 'jpeg', 'jpg', 'png', 'gif', 'tiff']
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
  for (const format of priority) {
    const group = list.filter((i) => i.format === format)
    if (group.length) {
      group.sort((a, b) => a.width - b.width)
      const { src, width, height } = group[group.length - 1]
      groups.push({
        format: format === 'jpg' ? 'jpeg' : format,
        srcset: group.reduce((a, c) => [...a, `${c.src} ${c.width}w`], []).join(','),
        src,
        width,
        height
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
      width={width || image.width || undefined}
      height={height || image.height || undefined}
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
