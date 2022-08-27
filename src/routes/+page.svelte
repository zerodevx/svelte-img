<script>
import cat01 from './cat01.jpg?run&width=480;1024;1920;2560'
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
import Img from '$lib/index.js'

const features = [
  [
    'Render the bare minimum, minimally invasive, HTML code to represent responsive images, served in multiple widths and next-gen formats.',
    cat02
  ],
  [
    'Delegate the heavy lifting to native browser handlers and existing build pipelines. Render <strong>&lt;img&gt;</strong> tags with modern defaults, with other component props spread into it.',
    cat03
  ],
  [
    'Images still work without Javascript. Try disabling JS and refreshing the page. Also try checking the lighthouse score.',
    cat04
  ]
]
const dynamic = [cat05, cat06, cat07, cat08, cat09, cat10, cat11, cat12, cat13, cat14, cat15]
let selected = 0
</script>

<div class="relative w-full h-screen bg-gray-900 text-white text-center mb-20">
  <Img class="w-full h-full object-cover" src={cat01} alt="cat" loading="eager" />
  <div class="absolute inset-0 flex flex-col items-center justify-center prose-2xl max-w-none px-2">
    <h1>svelte-img</h1>
    <p>Elegant responsive images for SvelteKit.</p>
    <a
      class="h-14 flex items-center justify-center rounded-full text-xs font-bold tracking-wider bg-blue-600 hover:bg-blue-800 px-6 mt-8 mb-6"
      href="https://github.com/zerodevx/svelte-img">VISIT GITHUB REPO</a
    >
  </div>
</div>

<div class="max-w-7xl mx-auto prose text-center px-4 mb-28">
  {#each features as f}
    <p>{@html f[0]}</p>
    <Img class="w-full h-128 object-cover" src={f[1]} alt="cat" />
  {/each}

  <p>
    Image <code>src</code> can be dynamically updated - well, this requires Javascript because interactivity.
  </p>
  <div class="flex flex-col md:flex-row">
    <div class="flex justify-center">
      <Img
        class="w-96 h-96 md:w-128 md:h-128 object-cover"
        src={dynamic[selected]}
        alt="cat"
        width="1"
        height="1"
      />
    </div>
    <div class="flex flex-wrap justify-center mt-4 md:flex-1 md:mt-6">
      {#each dynamic as src, i}
        <Img
          class="w-32 h-32 md:w-36 md:h-36 m-2 border-4 cursor-pointer {selected === i
            ? 'border-red-500'
            : 'border-gray-100'}"
          {src}
          alt="cat"
          on:click={() => (selected = i)}
        />
      {/each}
    </div>
  </div>
</div>
