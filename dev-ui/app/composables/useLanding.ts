/**
 * Landing page composable: news, projects, courses, calendar, scroll, search.
 */
const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const CALENDAR_KEY = 'calendarEventsForLanding'
const CMS_LIST_PATH = '/techsavvy_app/cms/list/'

export type LandingNewsItem = { date?: string; title?: string; summary?: string; description?: string; imageUrl?: string; link?: string; id?: string }
export type LandingProjectItem = { title: string; domain?: string; url: string; image?: string; alt?: string }
export type LandingCourseItem = { slug: string; title: string; instructor?: string; rating?: string; duration?: string; badge?: string; image?: string }
export type LandingCalEvent = { date: string; time?: string; title?: string; description?: string; link?: string }

function mapCmsToNewsItem (
  cms: { id?: number; title?: string; descriptions?: string; approval_status?: string; links?: string[]; files?: { name?: string; url?: string }[]; images?: string[]; created_at?: string },
  baseUrl: string
) {
  const imgFromImages = Array.isArray(cms.images) && cms.images[0] ? cms.images[0] : ''
  let fileUrl = imgFromImages || (Array.isArray(cms.files) && cms.files[0]?.url ? cms.files[0].url : '')
  if (fileUrl && baseUrl && !fileUrl.startsWith('http')) {
    const origin = baseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
    fileUrl = `${origin}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
  }
  const link = Array.isArray(cms.links) && cms.links[0] ? cms.links[0] : ''
  return {
    id: String(cms.id ?? ''),
    date: cms.created_at || '',
    title: cms.title || 'Untitled',
    summary: cms.descriptions || '',
    description: cms.descriptions || '',
    imageUrl: fileUrl,
    link: link || '#'
  }
}

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

export function useLanding () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string) || ''
  const { getItem: getStorage } = useSafeStorage()
  const { setLastHomeSection } = useLastHomeSection()

  const newsItems = ref<LandingNewsItem[]>([])
  const projects = ref<LandingProjectItem[]>([])
  const coursesPreview = ref<LandingCourseItem[]>([])
  const calendarEvents = ref<LandingCalEvent[]>([])

  const { data: cmsListFromApi } = useAsyncData(
    'landing-cms-list',
    async () => {
      if (!apiBase) return []
      try {
        const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
        const data = await $fetch<unknown>(url)
        const list = normalizeCmsList(data)
        return (list as { approval_status?: string }[])
          .filter((item) => item.approval_status !== 'rejected')
          .map((item: unknown) => mapCmsToNewsItem(item as Parameters<typeof mapCmsToNewsItem>[0], apiBase))
      } catch {
        return []
      }
    },
    { server: true, default: () => [] }
  )

  const newsItemsDisplay = computed(() => newsItems.value.slice(0, 4))

  function scrollToSection (id: string) {
    if (id === '#') return
    const el = document.querySelector(id)
    if (el) {
      const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset
      const headerOffset = id === '#news' ? 0 : 80
      window.scrollTo({ top: Math.max(0, y - headerOffset), behavior: 'smooth' })
    }
  }

  function onHeaderSearch (query: string) {
    const q = (query || '').trim()
    if (q) navigateTo({ path: '/search', query: { q } })
    else navigateTo('/search')
  }

  async function loadData () {
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      newsItems.value = fromApi as LandingNewsItem[]
    } else if (apiBase) {
      try {
        const cmsUrl = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
        const res = await fetch(cmsUrl)
        const data = await res.json().catch(() => null)
        const list = normalizeCmsList(data)
        if (res.ok && list.length > 0) {
          const mapped = (list as { approval_status?: string }[])
            .filter((item) => item.approval_status !== 'rejected')
            .map((item: unknown) => mapCmsToNewsItem(item as Parameters<typeof mapCmsToNewsItem>[0], apiBase))
          if (mapped.length > 0) newsItems.value = mapped
        }
      } catch { /* fall through */ }
    }

    try {
      const { fetchCmsProjects, fetchCmsCourses } = useCmsNews()
      const proj = await fetchCmsProjects()
      if (Array.isArray(proj) && proj.length > 0) {
        projects.value = proj.map((p) => ({ title: p.title, domain: p.domain, url: p.url, image: p.image, alt: p.alt }))
      }
      const courses = await fetchCmsCourses()
      if (Array.isArray(courses) && courses.length > 0) {
        coursesPreview.value = courses.slice(0, 4).map((c) => ({
          slug: c.slug,
          title: c.title,
          instructor: c.instructor,
          rating: c.rating,
          duration: c.duration,
          badge: c.badge,
          image: c.image
        }))
      }
    } catch { /* keep empty */ }

    try {
      const api = useDashboardApi()
      if (api.hasApi()) {
        const events = await api.getCalendarEvents()
        if (Array.isArray(events) && events.length > 0) {
          calendarEvents.value = events
            .map((e) => ({ date: e.date, time: e.time, title: e.title, description: e.description, link: e.link }))
            .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
        }
      }
    } catch { /* keep empty */ }

    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        newsItems.value = [...approved, ...newsItems.value]
      }
    } catch { /* keep as is */ }

    try {
      const raw = getStorage(CALENDAR_KEY)
      const events = JSON.parse(raw || '[]')
      if (events.length > 0) {
        calendarEvents.value = [...events].sort((a: { date: string }, b: { date: string }) =>
          (a.date || '').localeCompare(b.date || '')
        )
      }
    } catch { /* keep as is */ }

    if (typeof document !== 'undefined') {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).id
              if (id && ['news', 'courses', 'about', 'projects', 'calendar'].includes(id)) {
                setLastHomeSection(id)
              }
            }
          })
        },
        { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
      )
      ;['news', 'courses', 'about', 'projects', 'calendar'].forEach((id) => {
        const el = document.getElementById(id)
        if (el) sectionObserver.observe(el)
      })
    }

    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash && ['#news', '#courses', '#about', '#projects', '#calendar'].includes(hash)) {
      nextTick(() => scrollToSection(hash))
    }
  }

  return {
    newsItems,
    projects,
    coursesPreview,
    calendarEvents,
    newsItemsDisplay,
    scrollToSection,
    onHeaderSearch,
    loadData,
    DEFAULT_NEWS_IMAGE: '/assets/no-image.png',
    DEFAULT_PROJECT_IMAGE: '/assets/no-image.png',
    DEFAULT_COURSE_IMAGE: '/assets/no-image.png'
  }
}
