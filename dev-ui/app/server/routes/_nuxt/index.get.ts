/**
 * Fallback if middleware did not run: GET /_nuxt/ — not a real asset; avoid 404 noise.
 */
export default defineEventHandler((event) => {
  setResponseStatus(event, 204)
  return ''
})
