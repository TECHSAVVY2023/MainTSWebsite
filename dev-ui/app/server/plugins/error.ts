/**
 * Mark 404 errors as handled so they are not logged as "[request error] [unhandled]".
 * Common case: GET /_nuxt/ (no filename) returns 404 and was reported as unhandled.
 *
 * h3 sets unhandled=true when the thrown value is not already an H3Error; status may
 * live on `cause` or be a string, so we normalize before comparing to 404.
 */
function resolveHttpStatus(error: unknown): number | undefined {
  let current: unknown = error
  for (let depth = 0; depth < 8 && current != null; depth++) {
    if (typeof current !== 'object') break
    const o = current as Record<string, unknown>
    const raw = o.statusCode ?? o.status
    if (raw != null && raw !== '') {
      const n = Number(raw)
      if (!Number.isNaN(n)) return n
    }
    current = o.cause
  }
  return undefined
}

function clearUnhandledChain(error: unknown) {
  let current: unknown = error
  for (let depth = 0; depth < 8 && current != null; depth++) {
    if (typeof current === 'object' && current !== null && 'unhandled' in current) {
      try {
        (current as { unhandled?: boolean }).unhandled = false
      } catch {
        /* ignore */
      }
    }
    if (typeof current !== 'object' || current === null) break
    current = (current as { cause?: unknown }).cause
  }
}

export default defineNitroPlugin((nitroApp) => {
  const h3App = nitroApp.h3App
  if (!h3App?.options) return
  const existingOnError = h3App.options.onError
  h3App.options.onError = (error: unknown, event: unknown) => {
    const status = resolveHttpStatus(error)
    const path =
      event && typeof event === 'object' && 'path' in event
        ? String((event as { path?: string }).path ?? '')
        : ''

    const is404 = status === 404
    /** Directory URL with no chunk name — always treat as benign */
    const bareNuxtDir = path === '/_nuxt' || path === '/_nuxt/'

    if (is404 || bareNuxtDir) {
      clearUnhandledChain(error)
    }

    if (existingOnError) {
      return (existingOnError as (e: unknown, ev: unknown) => unknown)(error, event)
    }
  }
})
