/**
 * Mark 404 errors as handled so they are not logged as "[request error] [unhandled]".
 * Common case: GET /_nuxt/ (no filename) returns 404 and was reported as unhandled.
 */
export default defineNitroPlugin((nitroApp) => {
  const h3App = nitroApp.h3App
  if (!h3App?.options) return
  const existingOnError = h3App.options.onError
  h3App.options.onError = (error: unknown, event: { __nuxt_error_handled?: boolean }) => {
    const err = error as { statusCode?: number; status?: number; unhandled?: boolean }
    const status = err?.statusCode ?? err?.status
    if (status === 404) {
      err.unhandled = false
    }
    if (existingOnError) {
      return (existingOnError as (e: unknown, ev: unknown) => unknown)(error, event)
    }
  }
})
