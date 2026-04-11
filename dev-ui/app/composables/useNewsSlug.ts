/**
 * Build news detail slug from item (id or title+date). Use for /news/[slug] links.
 */
export function useNewsSlug () {
  function newsSlugFromTitleDate (item: { title?: string; date?: string }) {
    const base = `${item.title || ''} ${item.date || ''}`.trim().toLowerCase()
    const cleaned = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    return cleaned || 'news-item'
  }

  /**
   * CMS posts use numeric string ids (`"42"`). Demo/fallback rows use ids like `sample-news-2`;
   * those must not be used in URLs or `/news/sample-news-2` will never match API-only lists.
   */
  function getNewsSlug (item: { id?: string; title?: string; date?: string }) {
    const id = String(item?.id ?? '').trim()
    if (/^\d+$/.test(id)) return id
    return newsSlugFromTitleDate(item)
  }

  return { getNewsSlug, newsSlugFromTitleDate }
}
