/**
 * News listing page composable: search, pagination, head.
 */
export function useNewsPage () {
  const news = useNewsList()

  const newsSearchInputValue = computed({
    get: () => {
      const r = news.newsSearchInput
      return (r && typeof r === 'object' && 'value' in r) ? (r as { value: string }).value : (r ?? '')
    },
    set: (v: string) => {
      const r = news.newsSearchInput
      if (r && typeof r === 'object' && 'value' in r) (r as { value: string }).value = v
    }
  })

  const paginatedNewsArray = computed(() => {
    const raw = news.paginatedNews
    const arr = (raw && typeof raw === 'object' && 'value' in raw) ? (raw as { value: unknown }).value : raw
    return Array.isArray(arr) ? arr : []
  })

  const filteredNewsItemsArray = computed(() => {
    const raw = news.filteredNewsItems
    const arr = (raw && typeof raw === 'object' && 'value' in raw) ? (raw as { value: unknown }).value : raw
    return Array.isArray(arr) ? arr : []
  })

  const searchQueryValue = computed(() => {
    const raw = news.searchQuery
    return typeof raw === 'string' ? raw : (raw && typeof raw === 'object' && 'value' in raw ? String((raw as { value: unknown }).value ?? '') : '')
  })

  const currentPageValue = computed(() => {
    const raw = news.currentPage
    return typeof raw === 'number' ? raw : (raw && typeof raw === 'object' && 'value' in raw ? Number((raw as { value: unknown }).value) || 1 : 1)
  })

  const totalPagesValue = computed(() => {
    const raw = news.totalPages
    return typeof raw === 'number' ? raw : (raw && typeof raw === 'object' && 'value' in raw ? Number((raw as { value: unknown }).value) || 1 : 1)
  })

  const pageNumbersValue = computed(() => {
    const raw = news.pageNumbers
    return Array.isArray(raw) ? raw : (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: unknown[] }).value : [])
  })

  onMounted(() => news.loadData())

  useHead({
    title: 'News & Updates | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: 'Latest news and updates from the TECH SAVVY community.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return {
    news,
    newsSearchInputValue,
    paginatedNewsArray,
    filteredNewsItemsArray,
    searchQueryValue,
    currentPageValue,
    totalPagesValue,
    pageNumbersValue
  }
}
