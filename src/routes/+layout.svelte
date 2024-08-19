<script>
import '@fontsource-variable/inter'
import '../app.pcss'
import { dev } from '$app/environment'
</script>

<svelte:head>
  <title>DEMO | svelte-img</title>
  <meta
    name="description"
    content="High-performance responsive/progressive images for SvelteKit."
  />
  {#if !dev}
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-6QMRQS31JH"></script>
    <script>
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', 'G-6QMRQS31JH')
    </script>
  {/if}
</svelte:head>

<slot />
