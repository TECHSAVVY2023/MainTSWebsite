/**
 * Composable for TechSavvy CMS API (techsavvy_app).
 * Backend: GET {apiBase}/techsavvy_app/cms/list/ and GET .../cms/<pk>/
 */

export type CmsNewsItem = {
  id: string
  date: string
  title: string
  summary: string
  description: string
  imageUrl: string
  link: string
  images?: string[]
}

type CmsRawItem = {
  id?: number
  title?: string
  authors?: string
  descriptions?: string
  approval_status?: string
  filters?: string | Record<string, unknown> | null
  links?: string[]
  files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null
  images?: string[]
  created_at?: string
}

function getProjectDeveloper (
  filters?: string | Record<string, unknown> | null,
  authors?: string
): string {
  let parsed: Record<string, unknown> | null = null
  if (filters && typeof filters === 'object' && !Array.isArray(filters)) {
    parsed = filters as Record<string, unknown>
  } else if (typeof filters === 'string' && filters.trim().startsWith('{')) {
    try {
      parsed = JSON.parse(filters) as Record<string, unknown>
    } catch {
      parsed = null
    }
  }
  const fromFilter = String(parsed?.project_developer ?? '').trim()
  if (fromFilter) return fromFilter
  return String(authors ?? '').trim()
}

const NEWS_CATEGORIES = ['News', 'News Highlights', 'Events', 'Announcements']

function toFilterText (filters?: string | Record<string, unknown> | null): string {
  if (!filters) return ''
  if (typeof filters === 'string') return filters
  return JSON.stringify(filters)
}

function getFilterCategory (filters?: string | Record<string, unknown> | null): string {
  if (!filters) return ''
  if (typeof filters === 'object' && filters !== null && 'category' in filters) {
    return String((filters as Record<string, unknown>).category || '').trim().toLowerCase()
  }
  if (typeof filters === 'string' && filters.trim().startsWith('{')) {
    try {
      const o = JSON.parse(filters) as Record<string, unknown>
      return String(o.category || '').trim().toLowerCase()
    } catch {
      return ''
    }
  }
  return ''
}

const NON_NEWS_CATEGORIES = new Set(['merchandise', 'events', 'courses', 'featured projects'])

function getFirstFileUrl (files: CmsRawItem['files']): string {
  if (!files) return ''
  if (Array.isArray(files)) return files[0]?.url || ''
  if (typeof files === 'object') return files.url || ''
  return ''
}

function isNewsCategory (filters?: string | Record<string, unknown> | null): boolean {
  const cat = getFilterCategory(filters)
  if (cat && NON_NEWS_CATEGORIES.has(cat)) return false
  if (cat === 'news and update') return true

  const f = toFilterText(filters)
  if (!f.trim()) return true
  const parts = f.split(',').map((s) => s.trim())
  return NEWS_CATEGORIES.some((c) => parts.includes(c)) || f.toLowerCase().includes('news and update')
}

const CMS_LIST_PATH = '/techsavvy_app/cms/list/'

export function useCmsNews () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string) || ''

  function normalizeCmsList (body: unknown): unknown[] {
    if (Array.isArray(body)) return body
    if (body && typeof body === 'object' && !Array.isArray(body)) {
      const o = body as Record<string, unknown>
      if (Array.isArray(o.data)) return o.data
      if (Array.isArray(o.results)) return o.results
      if (Array.isArray(o.items)) return o.items
    }
    return []
  }

  function resolveMediaUrl (url: string, baseUrl?: string): string {
    if (!url || url.startsWith('http')) return url
    const base = baseUrl ?? apiBase
    const origin = base ? base.replace(/\/api\/?$/, '').replace(/\/$/, '') : ''
    return origin ? `${origin}${url.startsWith('/') ? '' : '/'}${url}` : url
  }

  function mapCmsToNewsItem (cms: CmsRawItem, baseUrl?: string): CmsNewsItem {
    const base = baseUrl ?? apiBase
    const imgFromImages = Array.isArray(cms.images) && cms.images[0] ? cms.images[0] : ''
    let fileUrl = imgFromImages || getFirstFileUrl(cms.files)
    if (fileUrl && base && !fileUrl.startsWith('http')) {
      fileUrl = resolveMediaUrl(fileUrl, base)
    }
    const rawImageUrls = Array.isArray(cms.images) && cms.images.length > 0
      ? cms.images.filter(Boolean) as string[]
      : (Array.isArray(cms.files)
          ? cms.files.map((f) => f?.url).filter(Boolean) as string[]
          : (cms.files && typeof cms.files === 'object' && cms.files.url ? [cms.files.url] : []))
    const images = rawImageUrls.map((u) => resolveMediaUrl(u, base))
    const link = Array.isArray(cms.links) && cms.links[0] ? cms.links[0] : ''
    return {
      id: String(cms.id ?? ''),
      date: cms.created_at || '',
      title: cms.title || 'Untitled',
      summary: cms.descriptions || '',
      description: cms.descriptions || '',
      imageUrl: fileUrl,
      link: link || '#',
      images: images.length > 0 ? images : undefined
    }
  }

  async function fetchCmsList (): Promise<CmsNewsItem[]> {
    if (!apiBase) return []
    try {
      const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
      const data = await $fetch<unknown>(url)
      const list = normalizeCmsList(data) as CmsRawItem[]
      return list
        .filter((item) => item.approval_status === 'approved' && isNewsCategory(item.filters))
        .map((item) => mapCmsToNewsItem(item, apiBase))
    } catch {
      return []
    }
  }

  type CmsCourseItem = {
    id: string
    slug: string
    title: string
    instructor: string
    category: string
    rating: string
    reviewCount: number
    duration: string
    price: string
    level: string
    badge?: string
    image: string
    description: string
    learnItems?: string[]
  }

  function slugify (text: string): string {
    return (text || '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item'
  }

  async function fetchCmsCourses (): Promise<CmsCourseItem[]> {
    if (!apiBase) return []
    try {
      const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
      const data = await $fetch<unknown>(url)
      const list = normalizeCmsList(data) as Array<CmsRawItem>
      const courseItems = list.filter(
        (item) => item.approval_status === 'approved' && toFilterText(item.filters).toLowerCase().includes('course')
      )
      return courseItems.map((item, idx) => {
        const title = item.title || 'Untitled'
        const slug = slugify(title) || `course-${item.id ?? idx}`
        const imgFromImages = Array.isArray(item.images) && item.images[0] ? item.images[0] : ''
        const fileUrl = imgFromImages || getFirstFileUrl(item.files)
        const img = fileUrl ? resolveMediaUrl(fileUrl, apiBase) : ''
        const filters = toFilterText(item.filters).toLowerCase()
        const category = filters.includes('fullstack') ? 'fullstack'
          : filters.includes('frontend') ? 'frontend'
          : filters.includes('backend') ? 'backend'
          : filters.includes('development') ? 'development'
          : 'fullstack'
        const badge = filters.includes('popular') ? 'Popular' : filters.includes('essential') ? 'Essential' : undefined
        const descRaw = (item.descriptions || '').trim()
        let learnItems: string[] | undefined
        if (descRaw) {
          const byLine = descRaw.split(/\n+/).map((s) => s.trim()).filter(Boolean)
          if (byLine.length >= 2) {
            learnItems = byLine.slice(0, 8)
          } else {
            const sentences = descRaw.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 15)
            learnItems = sentences.length ? sentences.slice(0, 6) : [descRaw.length > 220 ? `${descRaw.slice(0, 217)}…` : descRaw]
          }
        }
        return {
          id: String(item.id ?? idx),
          slug,
          title,
          instructor: item.authors || 'TECH SAVVY Mentors',
          category,
          rating: '4.8',
          reviewCount: 0,
          duration: '',
          price: 'Free',
          level: 'Beginner',
          badge,
          image: img,
          description: item.descriptions || '',
          learnItems
        }
      })
    } catch {
      return []
    }
  }

  async function fetchCmsProjects (): Promise<{ title: string; domain: string; developer?: string; url: string; image: string; alt: string }[]> {
    if (!apiBase) return []
    try {
      const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
      const data = await $fetch<unknown>(url)
      const list = normalizeCmsList(data) as Array<CmsRawItem>
      const projectItems = list.filter(
        (item) => item.approval_status === 'approved' && toFilterText(item.filters).toLowerCase().includes('project')
      )
      return projectItems.map((item) => {
        const link = Array.isArray(item.links) && item.links[0] ? item.links[0] : '#'
        let domain = ''
        try {
          domain = link !== '#' ? new URL(link).hostname : ''
        } catch {
          domain = link
        }
        const imgFromImages = Array.isArray(item.images) && item.images[0] ? item.images[0] : ''
        const fileUrl = imgFromImages || getFirstFileUrl(item.files)
        const img = fileUrl ? resolveMediaUrl(fileUrl, apiBase) : ''
        return {
          title: item.title || 'Untitled',
          domain: domain || item.title || '',
          developer: getProjectDeveloper(item.filters, item.authors) || undefined,
          url: link,
          image: img,
          alt: item.title || 'Project'
        }
      })
    } catch {
      return []
    }
  }

  return {
    apiBase,
    CMS_LIST_PATH,
    normalizeCmsList,
    mapCmsToNewsItem,
    fetchCmsList,
    fetchCmsCourses,
    fetchCmsProjects
  }
}
