/**
 * CMS API `images` may be string URLs or `{ name?, url? }` objects (same pattern as `files`).
 * Using raw `images[0]` as a string breaks `.startsWith('http')` and throws inside list mapping.
 */
export function coerceCmsMediaUrl (v: unknown): string {
  if (typeof v === 'string') return v
  if (v && typeof v === 'object' && v !== null && 'url' in v) {
    const u = (v as { url?: unknown }).url
    return typeof u === 'string' ? u : ''
  }
  return ''
}

export function firstCmsImageUrl (images: unknown): string {
  if (!Array.isArray(images) || images.length === 0) return ''
  return coerceCmsMediaUrl(images[0])
}

export function cmsImageUrlList (images: unknown): string[] {
  if (!Array.isArray(images)) return []
  return images.map(coerceCmsMediaUrl).filter(Boolean)
}
