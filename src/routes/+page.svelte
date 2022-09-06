<script>
import cat01 from './cat01.jpg?run&width=480;1024;1920;2560&height=1024'
import cat02 from './cat02.jpg?run'
import cat03 from './cat03.jpg?run'
import cat04 from './cat04.jpg?run'
import cat05 from './cat05.jpg?run&width=640&height=640&fit=cover'
import cat06 from './cat06.jpg?run&width=640&height=640&fit=cover'
import cat07 from './cat07.jpg?run&width=640&height=640&fit=cover'
import cat08 from './cat08.jpg?run&width=640&height=640&fit=cover'
import cat09 from './cat09.jpg?run&width=640&height=640&fit=cover'
import cat10 from './cat10.jpg?run&width=640&height=640&fit=cover'
import cat11 from './cat11.jpg?run&width=640&height=640&fit=cover'
import cat12 from './cat12.jpg?run&width=640&height=640&fit=cover'
import cat13 from './cat13.jpg?run&width=640&height=640&fit=cover'
import cat14 from './cat14.jpg?run&width=640&height=640&fit=cover'
import cat15 from './cat15.jpg?run&width=640&height=640&fit=cover'
import Img, { FxReveal } from '$lib/index.js'

const features = [
  [
    'Full width image in 10 variants - <code>avif/webp/jpg</code> formats at <code>480/1024/1920</code> widths, and a low-quality image placeholder (LQIP) background.',
    cat02
  ],
  [
    'Delegate the heavy lifting to native browser handlers and existing build pipelines. The <code>svelte-img</code> component is intended to be a drop-in replacement of the native <code>&lt;img&gt;</code> tag and works as equivalently as possible.',
    cat03
  ],
  [
    'Images still work without Javascript. Try disabling JS and refreshing the page. Also check out the lighthouse score.',
    cat04
  ]
]
const dynamic = [cat05, cat06, cat07, cat08, cat09, cat10, cat11, cat12, cat13, cat14, cat15]
let selected = 0
</script>

<div class="relative bg-gray-900 text-white text-center mb-20">
  <Img class="w-full h-screen object-cover" src={cat01} alt="cat" loading="eager" />
  <div class="absolute inset-0 flex flex-col items-center justify-center prose-2xl max-w-none px-2">
    <h1>svelte-img</h1>
    <p>Elegant responsive images for SvelteKit.</p>
    <a
      class="h-14 flex items-center justify-center rounded-full text-xs font-bold tracking-wider bg-blue-600 hover:bg-blue-800 px-6 mt-8 mb-6"
      href="https://github.com/zerodevx/svelte-img">VISIT GITHUB REPO</a
    >
  </div>
</div>

<div class="max-w-7xl mx-auto prose px-4 mb-28">
  <h1>svelte-img</h1>
  <blockquote>
    Render the bare minimum, minimally invasive, LQIP-included HTML code to represent responsive
    images, served in multiple widths and next-gen formats.
  </blockquote>

  <ol>
    {#each features as f}
      <li class="mb-12">
        <p>{@html f[0]}</p>
        <FxReveal class="w-full h-128 object-cover" src={f[1]} alt="cat" />
      </li>
    {/each}
    <li>
      <p>
        Image <code>src</code> can be dynamically updated - well, this requires Javascript because interactivity.
      </p>
      <div class="flex flex-col md:flex-row">
        <div class="flex justify-center">
          <div class="w-96 h-96 md:w-128 md:h-128">
            <Img class="w-full h-full not-prose" src={dynamic[selected]} alt="cat" />
          </div>
        </div>
        <div class="flex flex-wrap justify-center mt-4 md:flex-1 md:mt-6">
          {#each dynamic as src, i}
            <div class="w-32 h-32 md:w-36 md:h-36 m-2">
              <Img
                class="w-full h-full border-4 cursor-pointer {selected === i
                  ? 'border-red-500'
                  : 'border-gray-100'}"
                {src}
                alt="cat"
                on:click={() => (selected = i)}
              />
            </div>
          {/each}
        </div>
      </div>
    </li>
  </ol>
</div>
