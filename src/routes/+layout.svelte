<script>
import '../app.postcss'
import { dev } from '$app/env'
</script>

<svelte:head>
  <title>svelte-img</title>
  <meta name="description" content="Elegant responsive images for SvelteKit." />
  {#if !dev}
    <script>
    ;(function () {
      if (location.protocol === 'https:') {
        window.ga =
          window.ga ||
          function () {
            ;(ga.q = ga.q || []).push(arguments)
          }
        ga.l = +new Date()
        ga('create', 'UA-66946548-3', 'auto')
        ga('send', 'pageview')
        var el = document.createElement('script')
        el.src = 'https://www.google-analytics.com/analytics.js'
        document.head.appendChild(el)
      }
    })()
    </script>
  {/if}
</svelte:head>

<slot />
