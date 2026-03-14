function unwrap<T> (val: unknown): T {
  if (val != null && typeof val === 'object' && 'value' in val) {
    return (val as { value: T }).value
  }
  return val as T
}

/**
 * Search page composable: query, search data, head.
 */
export function useSearchPage () {
  const route = useRoute()
  const queryTrimmed = computed(() => (route.query.q as string)?.trim() || '')
  const search = useSearch(queryTrimmed)

  const searchInputValue = computed({
    get: () => (search.searchInput && typeof search.searchInput === 'object' && 'value' in search.searchInput)
      ? (search.searchInput as { value: string }).value
      : (typeof search.searchInput === 'string' ? search.searchInput : ''),
    set: (v: string) => {
      const r = search.searchInput
      if (r && typeof r === 'object' && 'value' in r) (r as { value: string }).value = v
    }
  })

  const totalCountValue = computed(() => unwrap<number>(search.totalCount) ?? 0)
  const categoryCountValue = computed(() => unwrap<number>(search.categoryCount) ?? 0)
  const newsResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.newsResults)
    return Array.isArray(arr) ? arr : []
  })
  const displayedNewsResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.displayedNewsResults)
    return Array.isArray(arr) ? arr : []
  })
  const newsSectionLinkValue = computed(() => unwrap<{ path: string; query?: Record<string, string> }>(search.newsSectionLink) ?? { path: '/news' })
  const newsExpandedValue = computed(() => unwrap<boolean>(search.newsExpanded) ?? false)
  const courseResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.courseResults)
    return Array.isArray(arr) ? arr : []
  })
  const displayedCourseResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.displayedCourseResults)
    return Array.isArray(arr) ? arr : []
  })
  const coursesSectionLinkValue = computed(() => unwrap<{ path: string; query?: Record<string, string> }>(search.coursesSectionLink) ?? { path: '/courses' })
  const coursesExpandedValue = computed(() => unwrap<boolean>(search.coursesExpanded) ?? false)
  const projectResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.projectResults)
    return Array.isArray(arr) ? arr : []
  })
  const displayedProjectResultsArray = computed(() => {
    const arr = unwrap<unknown>(search.displayedProjectResults)
    return Array.isArray(arr) ? arr : []
  })
  const projectsSectionLinkValue = computed(() => unwrap<{ path: string; query?: Record<string, string> }>(search.projectsSectionLink) ?? { path: '/projects' })
  const projectsExpandedValue = computed(() => unwrap<boolean>(search.projectsExpanded) ?? false)

  watch(queryTrimmed, () => search.resetExpanded())
  onMounted(() => search.loadData())

  useHead({
    title: () => (queryTrimmed.value ? `"${queryTrimmed.value}" – Search | TECH SAVVY` : 'Search | TECH SAVVY Code Camp'),
    meta: [{ name: 'description', content: 'Search news and updates, courses, and featured projects.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return {
    route,
    queryTrimmed,
    search,
    searchInputValue,
    totalCountValue,
    categoryCountValue,
    newsResultsArray,
    displayedNewsResultsArray,
    newsSectionLinkValue,
    newsExpandedValue,
    courseResultsArray,
    displayedCourseResultsArray,
    coursesSectionLinkValue,
    coursesExpandedValue,
    projectResultsArray,
    displayedProjectResultsArray,
    projectsSectionLinkValue,
    projectsExpandedValue,
    PREVIEW_COUNT: search.PREVIEW_COUNT
  }
}
