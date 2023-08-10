/** @type {IntersectionObserver} */
let observer

/** @param {Element} node */
function observe(node) {
  observer =
    observer ||
    new IntersectionObserver((entries) => {
      for (const detail of entries) {
        const { isIntersecting, target } = detail
        target.dispatchEvent(new CustomEvent(isIntersecting ? 'enter' : 'leave', { detail }))
      }
    })
  observer.observe(node)
  return {
    destroy() {
      observer.unobserve(node)
    }
  }
}

function len(obj) {
  return obj && Object.keys(obj).length
}

function lqipToBackground(lqip) {
  return lqip[0] === '#' ? lqip : `url(data:image/webp;base64,${lqip}) no-repeat center/cover`
}

export { observe, len, lqipToBackground }
