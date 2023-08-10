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
import testSingle from './assets/640/01.jpg?w=80&h=80&as=run:0'
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

<div class="relative mb-16 test-basic">
  <Img class="w-full h-[32rem] object-cover" src={hero} alt="cat" loading="eager" />
  <div class="absolute inset-0 flex flex-col justify-center">
    <div class="prose prose-h1:text-white prose-p:text-white mx-auto text-center px-4">
      <h1>svelte-img</h1>
      <div class="badge badge-neutral font-mono text-xs ml-2">v{version}</div>
      <p>High-performance responsive/progressive images for SvelteKit.</p>
      <a class="btn btn-primary" href="https://github.com/zerodevx/svelte-img">
        <span class="w-6 h-6 icon-[mdi--github]" />
        View Github Repo
      </a>
    </div>
  </div>
</div>

<div class="prose mx-auto px-4 mb-8">
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

<Img class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover mb-16" src={i1} alt="cat" />

<div class="prose mx-auto px-4 mb-8">
  <blockquote>
    The LQIP is usually a 16px <code>webp;base64</code> data URI at about ≈150 bytes.
  </blockquote>
</div>

<img
  class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover mb-16"
  src="data:image/webp;base64,{i1.img.lqip}"
  alt="cat lqip"
/>

<div class="prose mx-auto px-4 mb-8">
  <blockquote>
    Though not recommended, you can apply a Gaussian blur <code>backdrop-filter</code>.
  </blockquote>
</div>

<div class="w-full h-[32rem] max-w-[1920px] mx-auto overflow-hidden mb-16">
  <img
    class="w-full h-full object-cover blur scale-105"
    src="data:image/webp;base64,{i1.img.lqip}"
    alt="cat lqip"
  />
</div>

<div class="prose mx-auto px-4 mb-8">
  <blockquote>
    Not much difference, is there? The next image has a dominant colour placeholder instead.
  </blockquote>
</div>

<Img
  class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover mb-16 test-1px"
  src={i2}
  alt="cat"
/>

<div class="prose mx-auto px-4 mb-8">
  <blockquote>Which looks like this.</blockquote>
</div>

<div class="w-full h-[32rem] max-w-[1920px] mx-auto mb-16" style="background:{i2.img.lqip}" />

<div class="prose mx-auto px-4 mb-8">
  <blockquote>
    You can also reveal images with <code>fade-in/zoom</code> special effects.
  </blockquote>
</div>

<div class="mb-16">
  <FxReveal class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover" src={i3} alt="cat" />
</div>

<div class="mb-16">
  <FxReveal class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover" src={i4} alt="cat" />
</div>

<div class="mb-16">
  <FxReveal class="w-full h-[32rem] max-w-[1920px] mx-auto object-cover" src={i5} alt="cat" />
</div>

<div class="prose mx-auto px-4 mb-8">
  <blockquote>Or even apply parallax scrolling special effects.</blockquote>
</div>

<div class="w-full max-w-[1920px] mx-auto mb-16">
  <FxParallax class="w-full h-[40rem]" src={pllx} alt="cat" />
</div>

<div class="prose mx-auto px-4 mb-16">
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

<div class="relative w-full flex flex-col lg:flex-row lg:justify-center items-center mb-16">
  <div class="w-full max-w-sm aspect-square shadow-md overflow-hidden sticky lg:relative top-0">
    <FxReveal class="w-full h-full" src={images[selected]} alt="cat" />
  </div>
  <div class="w-full max-w-xl flex flex-wrap justify-center mt-6 lg:mt-0">
    {#each images as src, i}
      <div class="w-28 aspect-square m-3">
        <Img
          class="w-full h-full border-4 cursor-pointer {selected === i
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
<div class="hidden test-single">
  <Img src={testSingle} alt="test" />
</div>
<div class="hidden test-fallback">{JSON.stringify(testFallback)}</div>
<!-- End tests -->

<footer
  class="w-full h-96 bg-neutral text-neutral-content flex flex-row items-center justify-center"
>
  <span class="icon-[mdi--email] w-6 h-6 mr-2" />
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
