/**
 * Courses listing page composable: data, loadData, head.
 */
export function useCoursesPage () {
  const courses = useCoursesList()

  const searchQueryValue = computed({
    get: () => (courses.searchQuery && typeof courses.searchQuery === 'object' && 'value' in courses.searchQuery)
      ? (courses.searchQuery as { value: string }).value
      : (typeof courses.searchQuery === 'string' ? courses.searchQuery : ''),
    set: (v: string) => {
      const r = courses.searchQuery
      if (r && typeof r === 'object' && 'value' in r) (r as { value: string }).value = v
    }
  })

  const selectedCategoryValue = computed({
    get: () => (courses.selectedCategory && typeof courses.selectedCategory === 'object' && 'value' in courses.selectedCategory)
      ? (courses.selectedCategory as { value: string }).value
      : (typeof courses.selectedCategory === 'string' ? courses.selectedCategory : 'all'),
    set: (v: string) => {
      const r = courses.selectedCategory
      if (r && typeof r === 'object' && 'value' in r) (r as { value: string }).value = v
    }
  })

  const filteredCoursesArray = computed(() => {
    const raw = courses.filteredCourses
    const arr = Array.isArray(raw) ? raw : (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: unknown }).value : null)
    return Array.isArray(arr) ? arr : []
  })

  onMounted(() => courses.loadData())

  useHead({
    title: 'Courses | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: 'Learn full-stack web development with free courses from TECH SAVVY Code Camp. Nuxt, Vue, Node.js, and more.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return { courses, searchQueryValue, selectedCategoryValue, filteredCoursesArray }
}
