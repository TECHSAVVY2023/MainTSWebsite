/**
 * Build news detail slug from item (id or title+date). Use for /news/[slug] links.
 */
export function useNewsSlug () {
  function newsSlugFromTitleDate (item: { title?: string; date?: string }) {
    const base = `${item.title || ''} ${item.date || ''}`.trim().toLowerCase()
    const cleaned = base.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    return cleaned || 'news-item'
  }

  function getNewsSlug (item: { id?: string; title?: string; date?: string }) {
    return item.id || newsSlugFromTitleDate(item)
  }

  return { getNewsSlug, newsSlugFromTitleDate }
}
