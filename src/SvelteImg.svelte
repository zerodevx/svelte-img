<!--DIST|<svelte:options tag="svelte-img" />|END-->

<script>
export let src = null
export let alt = null
export let srcset = null
export let sizes = null
export let placeholder = null
export let loading = 'lazy'

const spinner = `data:image/svg+xml;charset=UTF-8,%3c?xml version='1.0' encoding='UTF-8' standalone='no'?%3e%3csvg xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.0' width='16px' height='16px' viewBox='0 0 128 128' xml:space='preserve'%3e%3cg%3e%3cpath fill='%232d3748' fill-opacity='1' d='M109.25 55.5h-36l12-12a29.54 29.54 0 0 0-49.53 12H18.75A46.04 46.04 0 0 1 96.9 31.84l12.35-12.34v36zm-90.5 17h36l-12 12a29.54 29.54 0 0 0 49.53-12h16.97A46.04 46.04 0 0 1 31.1 96.16L18.74 108.5v-36z'/%3e%3canimateTransform attributeName='transform' type='rotate' from='0 64 64' to='360 64 64' dur='720ms' repeatCount='indefinite'%3e%3c/animateTransform%3e%3c/g%3e%3c/svg%3e` // eslint-disable-line quotes

const getFilename = url => {
  if (!url) {
    return 'image'
  }
  const parts = url.split('/')
  return parts[parts.length - 1].split('.')[0]
}

let reveal, hide

$: if (src) {
  reveal = false
  hide = false
}
</script>

<style>
._imgWrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #A0AEC0;
  overflow: hidden;
}
._img0 {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
}
._imgP.blur {
  filter: blur(2vh);
  transform: scale(1.1);
}
._imgP.hide {
  visibility: hidden;
}
._img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.05);
}
._img.reveal {
  transition: opacity 400ms linear, transform 400ms ease-out;
  opacity: 1;
  transform: scale(1);
}
</style>

<div class="_imgWrap">
  <div
    style="background:url(&quot;{placeholder || spinner}&quot;) center center / {placeholder ? 'cover' : 'auto'} no-repeat"
    class="_imgP _img0"
    class:blur={!!placeholder}
    class:hide
    ></div>
  <img
    {src} alt={alt || getFilename(src)} {srcset} {sizes}
    class="_img _img0"
    class:reveal
    on:load={() => { reveal = true }}
    on:transitionend={() => { hide = true }}
    {loading}
    >
</div>
