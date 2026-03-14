/**
 * Mark 404 errors as handled so they are not logged as "[request error] [unhandled]".
 * Common case: GET /_nuxt/ (no filename) returns 404 and was reported as unhandled.
 */
export default defineNitroPlugin((nitroApp) => {
  const h3App = nitroApp.h3App
  if (!h3App?.options) return
  const existingOnError = h3App.options.onError
  h3App.options.onError = (error: unknown, event: unknown) => {
    const err = error as { statusCode?: number; status?: number; unhandled?: boolean; cause?: { status?: number } }
    const cause = err?.cause as { status?: number; unhandled?: boolean } | undefined
    const status = err?.statusCode ?? err?.status ?? cause?.status
    if (status === 404) {
      try { (err as { unhandled?: boolean }).unhandled = false } catch { /* ignore */ }
      try { if (cause) cause.unhandled = false } catch { /* ignore */ }
    }
    if (existingOnError) {
      return (existingOnError as (e: unknown, ev: unknown) => unknown)(error, event)
    }
  }
})
