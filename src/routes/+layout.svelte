<script>
import '../app.postcss'
import { dev } from '$app/environment'
</script>

<svelte:head>
  <title>svelte-img</title>
  <meta name="description" content="Elegant responsive images for SvelteKit." />
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
