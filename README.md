# svelte-img

A component to lazy-load images natively and progressively.

DEMO: https://zerodevx.github.io/svelte-img/

This is a super simple and lightweight component that transforms this:

```html
<svelte-img src="/image.jpg" placeholder="/image-tiny.jpg"></svelte-img>
```

into this:

```html
<div>
  <div style="background:url('/image-tiny.jpg') center center / cover no-repeat"></div>
  <img src="/image.jpg" alt="image" loading="lazy">
</div>
```

where the placeholder will be gaussian blurred and the main image beautifully transitioned in place when its download completes.

The work of lazy-loading is deferred to browsers to handle natively via the `loading="lazy"` attribute. For browsers that don't support this (yet), images will load as normal (i.e. eagerly).

## Usage

### Install

To install latest stable:

```bash
$ npm i -D @zerodevx/svelte-img
```

**NOTE**

This is still in `pre-release` so install with the `@next` tag:

```bash
$ npm i -D @zerodevx/svelte-img@next
```

### Use as a Svelte component

Simply consume anywhere in your app:

`MyComponent.svelte`

```html
<script>
  import Img from '@zerodevx/svelte-img`
</script>

<style>
  .container {
    width: 100%;
    max-width: 800px;
    height: 500px;
  }
</style>

<div class="container">
  <Img
    srcset="/images/hello-800.jpg 800w, /images/hello-480.jpg 480w"
    sizes="(max-width: 600px) 480px, 800px"
    src="/images/hello-800.jpg"
    alt="hello"
    placeholder="/images/hello-20.jpg"
    />
</div>
```

### Use as native Web Component

Just load the web component definition from CDN then use anywhere.

```html
<head>
  ...
  <!-- Load the web component definition -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/@zerodevx/svelte-img@0"></script>
</head>
<body>
  ...
  <!-- Use anywhere -->
  <div class="explicitly-sized-container">
    <svelte-img src="/image.jpg"></svelte-img>
  </div>
</body>
```

Or you can [download](https://raw.githubusercontent.com/zerodevx/svelte-img/master/dist/svelte-img.js) the script and host it yourself.

## Contributing

Fork, clone and install dependencies:

```bash
$ git clone https://github.com/<username>/svelte-img
$ cd svelte-img
$ npm i
```

Start the dev server:

```bash
$ npm run dev
```

Create a new branch, make changes and commit:

```bash
$ git checkout -b my-contribution
$ git add -A
$ git commit -m <message>
```

Lint the code:

```bash
$ npm run lint
```

Then raise a PR.


## License

ISC
