/** @type {IntersectionObserver} */
let observer

/** @param {Element} node */
export default function (node) {
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
