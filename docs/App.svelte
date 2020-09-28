<script>
import Image from '../src'

const list = [
  'Qpjl_dXQrD8',
  '2JcixB1Ky3I',
  'vQUXUHjyy8A',
  'AHgpNYkX9dc',
  'oHm8scWafA0',
  '6hNPfolX368',
  '2U43VoxAcTU',
  'sEA9uXU9vfA',
  '4nPEdPwgfe8',
  'L-Lps4RihqQ',
  'jZooolbmdho',
  'jGJZJ-mjzVU',
  'S4SiH-IHjF4'
]
let selected = list[0]

</script>

<ol class="list-decimal list-inside">
  <li class="mb-12">
    Components are sized at 100% of its <strong>containing</strong> element.
    <div class="w-full h-128 mt-4">
      <Image
        src="https://source.unsplash.com/YCPkW_r_6uA/1280x512"
        alt="cats"
        placeholder="https://source.unsplash.com/YCPkW_r_6uA/40x16"
        />
    </div>
  </li>
  <li class="mb-12">
    A super small image (typical dimension about 20px) can be set as placeholder to create a beautiful transition effect when the main image download completes.
    Images are object-fit to <strong>cover</strong> the containing element regardless of image dimensions.
    <div class="w-full h-128 mt-4">
      <Image
        src="https://source.unsplash.com/GtwiBmtJvaU/1280x512"
        alt="cats"
        placeholder="https://source.unsplash.com/GtwiBmtJvaU/40x16"
        />
    </div>
  </li>
  <li class="mb-12">
    If no placeholder is declared, a spinner is shown instead.
    <div class="w-full h-128 mt-4">
      <Image
        src="https://source.unsplash.com/z6NZYyTjEd0/1280x512"
        alt="cats"
        />
    </div>
  </li>
  <li class="mb-12">
    The <code class="bg-gray-200 border border-gray-300 px-1 rounded">src</code> attribute can be dynamically updated.
    <div class="w-full max-w-lg h-128 mt-4">
      <Image
        src="https://source.unsplash.com/{selected}/640x640"
        alt="cats"
        placeholder="https://source.unsplash.com/{selected}/24x24"
        />
    </div>
    <div class="flex flex-row flex-wrap mt-2">
      {#each list as i}
      <div
        class="w-32 h-32 mr-2 border-4 cursor-pointer {selected === i ? 'border-red-500' : 'border-transparent'}"
        on:click={() => { selected = i }}
        >
        <Image
          src="https://source.unsplash.com/{i}/128x128"
          alt="cats"
          />
      </div>
      {/each}
    </div>

  </li>

</ol>

