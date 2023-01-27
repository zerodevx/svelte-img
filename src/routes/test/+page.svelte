<script>
import testBasic from '../cat01.jpg?run'
import testNoLqip from '../cat01.jpg?lqip=0&run'
import testWidthOverride from '../cat01.jpg?width=480;1024&run'

const s = (obj = {}) => JSON.stringify(obj)

const tests = [
  { id: 'basic', name: 'default variants are generated', view: s(testBasic) },
  { id: 'nolqip', name: 'no lqip', view: s(testNoLqip) },
  { id: 'width', name: 'width override', view: s(testWidthOverride) }
]
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="prose container mx-auto">
  <h1>Tests</h1>
  <section>
    <h2>Imagetools</h2>
    <ol>
      {#each tests as { id, name, view }}
        <li>
          {name}
          <pre><code data-testid={id} class="whitespace-normal">{@html view}</code></pre>
        </li>
      {/each}
    </ol>
  </section>
</div>
