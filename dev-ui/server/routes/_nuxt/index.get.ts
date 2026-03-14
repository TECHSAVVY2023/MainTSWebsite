/**
 * Handle GET /_nuxt/ (no filename). Return 404 so the request is handled
 * and the dev server does not log "[request error] [unhandled]".
 */
export default defineEventHandler((event) => {
  setResponseStatus(event, 404)
  return 'Not Found'
})
