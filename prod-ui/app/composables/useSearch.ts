/**
 * Search page composable: data, filters, results, and submit logic.
 */
import type { Ref } from 'vue'

export type SearchNewsItem = {
  id?: string
  date: string
  title: string
  summary: string
  description?: string
  imageUrl?: string
  link?: string
}

export type SearchCourseItem = {
  id: string
  slug: string
  title: string
  instructor: string
  category: string
  duration: string
  description: string
  [key: string]: unknown
}

export type SearchProjectItem = {
  title: string
  domain: string
  url: string
  image?: string
  alt?: string
}

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const PREVIEW_COUNT = 3

function matches (text: string, q: string): boolean {
  return (text || '').toLowerCase().includes(q)
}

export function useSearch (queryTrimmed: Ref<string>) {
  const router = useRouter()
  const { getItem: getStorage } = useSafeStorage()

  const newsItems = ref<SearchNewsItem[]>([])
  const coursesList = ref<SearchCourseItem[]>([])
  const projectsList = ref<SearchProjectItem[]>([])

  const searchInput = ref('')
  const newsExpanded = ref(false)
  const coursesExpanded = ref(false)
  const projectsExpanded = ref(false)

  const newsResults = computed(() => {
    const q = queryTrimmed.value.toLowerCase()
    if (!q) return []
    return newsItems.value.filter(
      (n) =>
        matches(n.title, q) ||
        matches(n.summary, q) ||
        matches(n.description ?? '', q)
    )
  })

  const courseResults = computed(() => {
    const q = queryTrimmed.value.toLowerCase()
    if (!q) return []
    return coursesList.value.filter(
      (c) =>
        matches(c.title, q) ||
        matches(c.instructor, q) ||
        matches(c.description, q)
    )
  })

  const projectResults = computed(() => {
    const q = queryTrimmed.value.toLowerCase()
    if (!q) return []
    return projectsList.value.filter(
      (p) => matches(p.title, q) || matches(p.domain, q)
    )
  })

  const totalCount = computed(
    () => newsResults.value.length + courseResults.value.length + projectResults.value.length
  )

  const categoryCount = computed(() => {
    let n = 0
    if (newsResults.value.length > 0) n++
    if (courseResults.value.length > 0) n++
    if (projectResults.value.length > 0) n++
    return n
  })

  const displayedNewsResults = computed(() =>
    newsExpanded.value ? newsResults.value : newsResults.value.slice(0, PREVIEW_COUNT)
  )
  const displayedCourseResults = computed(() =>
    coursesExpanded.value ? courseResults.value : courseResults.value.slice(0, PREVIEW_COUNT)
  )
  const displayedProjectResults = computed(() =>
    projectsExpanded.value ? projectResults.value : projectResults.value.slice(0, PREVIEW_COUNT)
  )

  const newsSectionLink = computed(() => ({ path: '/news', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))
  const coursesSectionLink = computed(() => ({ path: '/courses', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))
  const projectsSectionLink = computed(() => ({ path: '/projects', query: queryTrimmed.value ? { q: queryTrimmed.value } : {} }))

  function submitSearch () {
    const q = searchInput.value?.trim() || ''
    if (q) router.push({ path: '/search', query: { q } })
  }

  function resetExpanded () {
    newsExpanded.value = false
    coursesExpanded.value = false
    projectsExpanded.value = false
  }

  function toggleNewsExpanded () {
    newsExpanded.value = !newsExpanded.value
  }
  function toggleCoursesExpanded () {
    coursesExpanded.value = !coursesExpanded.value
  }
  function toggleProjectsExpanded () {
    projectsExpanded.value = !projectsExpanded.value
  }

  async function loadData () {
    newsItems.value = []
    coursesList.value = []
    projectsList.value = []

    if (queryTrimmed.value) searchInput.value = queryTrimmed.value

    try {
      const { fetchCmsList, fetchCmsCourses, fetchCmsProjects } = useCmsNews()
      const [cmsList, courses, proj] = await Promise.all([
        fetchCmsList(),
        fetchCmsCourses(),
        fetchCmsProjects()
      ])
      if (cmsList.length > 0) {
        newsItems.value = cmsList.map((n) => ({
          id: n.id,
          date: n.date,
          title: n.title,
          summary: n.summary,
          description: n.description ?? '',
          imageUrl: n.imageUrl,
          link: n.link
        }))
      }
      if (courses.length > 0) {
        coursesList.value = courses.map((c) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          instructor: c.instructor,
          category: c.category,
          duration: c.duration,
          description: c.description,
          rating: c.rating,
          reviewCount: c.reviewCount,
          price: c.price,
          level: c.level,
          badge: c.badge,
          image: c.image
        }))
      }
      if (proj.length > 0) {
        projectsList.value = proj.map((p) => ({
          title: p.title,
          domain: p.domain,
          url: p.url,
          image: p.image,
          alt: p.alt
        }))
      }
    } catch { /* keep empty */ }

    try {
      const api = useDashboardApi()
      if (api.hasApi()) {
        const approved = await api.getApprovedNews()
        if (approved.length > 0) {
          const approvedMapped = approved.map((a) => ({
            id: a.id,
            date: a.date,
            title: a.title,
            summary: a.summary,
            description: a.description ?? '',
            imageUrl: a.imageUrl,
            link: a.link
          }))
          const existing = new Set(newsItems.value.map((n) => `${n.title}-${n.date}`))
          const extra = approvedMapped.filter((a) => !existing.has(`${a.title}-${a.date}`))
          newsItems.value = [...extra, ...newsItems.value]
        }
      }
    } catch { /* ignore */ }

    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        newsItems.value = [...approved, ...newsItems.value]
      }
    } catch { /* ignore */ }
  }

  return {
    PREVIEW_COUNT,
    searchInput,
    newsExpanded,
    coursesExpanded,
    projectsExpanded,
    newsResults,
    courseResults,
    projectResults,
    displayedNewsResults,
    displayedCourseResults,
    displayedProjectResults,
    totalCount,
    categoryCount,
    newsSectionLink,
    coursesSectionLink,
    projectsSectionLink,
    submitSearch,
    resetExpanded,
    loadData,
    toggleNewsExpanded,
    toggleCoursesExpanded,
    toggleProjectsExpanded
  }
}
