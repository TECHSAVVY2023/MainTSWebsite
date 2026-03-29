/**
 * Browsers or tools sometimes request GET /_nuxt/ with no chunk path.
 * That is not a real Vite asset; answer 204 early so nothing falls through as an unhandled 404.
 */
export default defineEventHandler((event) => {
  const path = event.path
  if (path === '/_nuxt' || path === '/_nuxt/') {
    setResponseStatus(event, 204)
    return ''
  }
})
