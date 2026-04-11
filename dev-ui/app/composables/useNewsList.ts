/**
 * News listing page composable: data, search, pagination.
 */
import { FALLBACK_NEWS_ITEMS } from '~/constants/fallbackNews'

export type NewsListItem = {
  id?: string
  date?: string
  title?: string
  summary?: string
  description?: string
  imageUrl?: string
  link?: string
}

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const PER_PAGE = 6

export function useNewsList () {
  const route = useRoute()
  const { getItem: getStorage } = useSafeStorage()
  const { fetchCmsList } = useCmsNews()

  const { data: cmsListFromApi } = useAsyncData(
    'news-page-cms-list',
    () => fetchCmsList(),
    { server: true, default: () => [] }
  )

  const newsItems = ref<NewsListItem[]>([])
  const newsSearchInput = ref('')

  function mergeListItems (api: NewsListItem[]): NewsListItem[] {
    let merged: NewsListItem[] =
      api.length > 0 ? [...api] : [...FALLBACK_NEWS_ITEMS]
    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        merged = [...approved, ...merged]
      }
    } catch { /* ignore */ }
    return merged
  }

  watch(
    cmsListFromApi,
    (v) => {
      const api = Array.isArray(v) ? (v as NewsListItem[]) : []
      newsItems.value = mergeListItems(api)
    },
    { immediate: true }
  )

  const searchQuery = computed(() => (newsSearchInput.value || '').trim().toLowerCase())

  const filteredNewsItems = computed(() => {
    const q = searchQuery.value
    if (!q) return newsItems.value
    return newsItems.value.filter(
      (n) =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.summary || '').toLowerCase().includes(q) ||
        (n.description || '').toLowerCase().includes(q)
    )
  })

  const currentPage = computed(() => {
    const p = Number(route.query.page)
    return Number.isFinite(p) && p >= 1 ? p : 1
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredNewsItems.value.length / PER_PAGE)))

  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    return filteredNewsItems.value.slice(start, start + PER_PAGE)
  })

  const pageNumbers = computed(() => {
    const total = totalPages.value
    const cur = currentPage.value
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    const pages: (number | '…')[] = []
    if (cur <= 3) {
      pages.push(1, 2, 3, 4, '…', total)
    } else if (cur >= total - 2) {
      pages.push(1, '…', total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '…', cur - 1, cur, cur + 1, '…', total)
    }
    return pages
  })

  function pageQuery (page: number) {
    const q: Record<string, string> = { page: String(page) }
    const search = newsSearchInput.value?.trim()
    if (search) q.q = search
    return q
  }

  async function loadData () {
    const q = route.query.q
    if (typeof q === 'string' && q.trim()) newsSearchInput.value = q.trim()

    let api: NewsListItem[] = []
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      api = fromApi as NewsListItem[]
    } else {
      try {
        const list = await fetchCmsList()
        if (list.length > 0) api = list as NewsListItem[]
      } catch { /* fall through */ }
    }

    newsItems.value = mergeListItems(api)
  }

  return {
    PER_PAGE,
    newsItems,
    newsSearchInput,
    searchQuery,
    filteredNewsItems,
    paginatedNews,
    currentPage,
    totalPages,
    pageNumbers,
    pageQuery,
    loadData
  }
}
