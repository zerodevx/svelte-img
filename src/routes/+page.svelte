<script>
/* eslint-disable no-useless-escape */
import hero from './assets/hero.jpg?w=480;1024;1920;2560;h=720&as=run'
import i1 from './assets/1920/1.jpg?h=720&as=run'
import i2 from './assets/1920/2.jpg?h=720&as=run:1'
import i3 from './assets/1920/3.jpg?h=720&as=run'
import i4 from './assets/1920/4.jpg?h=720&as=run'
import i5 from './assets/1920/5.jpg?h=720&as=run'
import pllx from './assets/pllx.jpg?h=1024&as=run'
import Img, { FxReveal, FxParallax } from '$lib/index.js'
import { version } from '$app/environment'
import testSingle from './assets/640/01.jpg?w=80&h=80&format=jpg&as=run:0'
import testFallback from './assets/640/01.jpg?h=80'

const modules = import.meta.glob('./assets/640/*.jpg', {
  import: 'default',
  eager: true,
  query: { w: 640, h: 640, fit: 'cover', as: 'run' }
})

const esc = (i) => i

const images = Object.entries(modules).map((i) => i[1])
let selected = 0
</script>

<div class="test-basic relative mb-16">
  <Img class="h-[32rem] w-full object-cover" src={hero} alt="cat" loading="eager" />
  <div class="absolute inset-0 flex flex-col justify-center">
    <div class="prose mx-auto px-4 text-center prose-h1:text-white prose-p:text-white">
      <h1>svelte-img</h1>
      <div class="badge badge-neutral ml-2 font-mono text-xs">v{version}</div>
      <p>High-performance responsive/progressive images for SvelteKit.</p>
      <a class="btn btn-primary" href="https://github.com/zerodevx/svelte-img">
        <span class="icon-[mdi--github] h-6 w-6" />
        View Github Repo
      </a>
    </div>
  </div>
</div>

<div class="prose mx-auto mb-8 px-4">
  <blockquote>
    Render the bare minimum, minimally invasive, LQIP-included HTML code to represent responsive
    images, served in multiple widths and next-gen formats.
  </blockquote>
  <h2>Install</h2>
  <pre><code>{esc(`$ npm i -D @zerodevx/svelte-img`)}</code></pre>
  <p>Add <code>imagetools</code> plugin into your <code>vite.config.js</code>:</p>
  <pre><code
      >{esc(`import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from '@zerodevx/svelte-img/vite'

export default defineConfig({
  plugins: [sveltekit(), imagetools()]
})`)}</code
    ></pre>
  <h2>Use</h2>
  <p>Anywhere in your <code>svelte</code> app:</p>
  <pre><code
      >{esc(`<script>
  import cat from '$lib/assets/cat.jpg?as=run'
  import Img from '@zerodevx/svelte-img'
<\/script>

<Img class="cool kitty" src={cat} alt="Very meow" />`)}</code
    ></pre>
  <h2>Showcase</h2>
  <blockquote>
    By default, the original image is transformed into 9 variants - <code>480/1024/1920</code>
    widths at <code>avif/webp/jpg</code> formats, with an inline <code>base64</code> low-quality image
    placeholder (LQIP) background.
  </blockquote>
</div>

<Img class="mx-auto mb-16 h-[32rem] w-full max-w-[1920px] object-cover" src={i1} alt="cat" />

<div class="prose mx-auto mb-8 px-4">
  <blockquote>
    The LQIP is usually a 16px <code>webp;base64</code> data URI at about ≈150 bytes.
  </blockquote>
</div>

<img
  class="mx-auto mb-16 h-[32rem] w-full max-w-[1920px] object-cover"
  src="data:image/webp;base64,{i1.img.lqip}"
  alt="cat lqip"
/>

<div class="prose mx-auto mb-8 px-4">
  <blockquote>
    Though not recommended, you can apply a Gaussian blur <code>backdrop-filter</code>.
  </blockquote>
</div>

<div class="mx-auto mb-16 h-[32rem] w-full max-w-[1920px] overflow-hidden">
  <img
    class="h-full w-full scale-105 object-cover blur"
    src="data:image/webp;base64,{i1.img.lqip}"
    alt="cat lqip"
  />
</div>

<div class="prose mx-auto mb-8 px-4">
  <blockquote>
    Not much difference, is there? The next image has a dominant colour placeholder instead.
  </blockquote>
</div>

<div class="test-run-param">
  <Img
    class="test-1px mx-auto mb-16 h-[32rem] w-full max-w-[1920px] object-cover"
    src={i2}
    alt="cat"
  />
</div>

<div class="prose mx-auto mb-8 px-4">
  <blockquote>Which looks like this.</blockquote>
</div>

<div class="mx-auto mb-16 h-[32rem] w-full max-w-[1920px]" style="background:{i2.img.lqip}" />

<div class="prose mx-auto mb-8 px-4">
  <blockquote>
    You can also reveal images with <code>fade-in/zoom</code> special effects.
  </blockquote>
</div>

<div class="mb-16">
  <FxReveal class="mx-auto h-[32rem] w-full max-w-[1920px] object-cover" src={i3} alt="cat" />
</div>

<div class="mb-16">
  <FxReveal class="mx-auto h-[32rem] w-full max-w-[1920px] object-cover" src={i4} alt="cat" />
</div>

<div class="mb-16">
  <FxReveal class="mx-auto h-[32rem] w-full max-w-[1920px] object-cover" src={i5} alt="cat" />
</div>

<div class="prose mx-auto mb-8 px-4">
  <blockquote>Or even apply parallax scrolling special effects.</blockquote>
</div>

<div class="mx-auto mb-16 w-full max-w-[1920px]">
  <FxParallax class="h-[40rem] w-full" src={pllx} alt="cat" />
</div>

<div class="prose mx-auto mb-16 px-4">
  <blockquote>
    The <code>svelte-img</code> component tries, as much as possible, to be a drop-in replacement
    for the native HTML
    <code>{esc(`<img>`)}</code> tag. Side-effects are kept to a minimum, so things should still work
    even without JavaScript. Try it - disable JS on this page and refresh, and check out the Lighthouse
    score too.
  </blockquote>
  <blockquote>
    The next example however does require JavaScript, because interactivity. It uses the
    <code>Vite</code> pattern for glob imports to load a local dir of images, like so:
  </blockquote>
  <pre><code
      >{esc(`const modules = import.meta.glob('$lib/assets/sm/*.jpg', {
  import: 'default',
  eager: true,
  query: { w: 640, h: 640, fit: 'cover', as: 'run' }
})

const images = Object.entries(modules).map((i) => i[1])
`)}</code
    ></pre>
</div>

<div class="relative mb-16 flex w-full flex-col items-center lg:flex-row lg:justify-center">
  <div class="sticky top-0 aspect-square w-full max-w-sm overflow-hidden shadow-md lg:relative">
    <FxReveal class="h-full w-full" src={images[selected]} alt="cat" />
  </div>
  <div class="mt-6 flex w-full max-w-xl flex-wrap justify-center lg:mt-0">
    {#each images as src, i}
      <div class="m-3 aspect-square w-28">
        <Img
          class="h-full w-full cursor-pointer border-4 {selected === i
            ? 'border-primary'
            : 'border-base-200'}"
          {src}
          alt="cat"
          on:click={() => (selected = i)}
        />
      </div>
    {/each}
  </div>
</div>

<!-- Start tests -->
<div class="test-single hidden">
  <Img src={testSingle} alt="test" />
</div>
<div class="test-fallback hidden">{JSON.stringify(testFallback)}</div>
<!-- End tests -->

<footer
  class="flex h-96 w-full flex-row items-center justify-center bg-neutral text-neutral-content"
>
  <span class="icon-[mdi--email] mr-2 h-6 w-6" />
  <a class="link" href="mailto:jason@zerodevx.com">jason@zerodevx.com</a>
</footer>

<style>
:global(img.blur)::after {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(20px);
  pointer-events: none;
}
</style>
