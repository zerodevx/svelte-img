// Squelch ts import warnings (https://github.com/JonasKruckenberg/imagetools/issues/160)

declare module '*?run' {
  const out
  export default out
}

declare module '*&run' {
  const out
  export default out
}
