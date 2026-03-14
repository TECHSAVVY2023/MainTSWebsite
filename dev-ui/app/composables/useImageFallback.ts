/**
 * Returns an @error handler that sets img.src to a fallback URL.
 */
export function useImageFallback (defaultSrc: string) {
  return function onImageError (ev: Event) {
    const el = (ev.target as HTMLImageElement | null)
    if (el?.src) el.src = defaultSrc
  }
}
