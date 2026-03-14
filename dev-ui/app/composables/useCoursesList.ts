/**
 * Courses listing page composable: data, search, category filter.
 */
export type CourseItem = {
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
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'development', label: 'Development' },
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'fullstack', label: 'Full-stack' }
]

export function useCoursesList () {
  const route = useRoute()
  const searchQuery = ref((route.query.q as string) || '')
  const selectedCategory = ref('all')
  const courses = ref<CourseItem[]>([])

  const filteredCourses = computed(() => {
    let list = courses.value
    const q = (searchQuery.value || '').trim().toLowerCase()
    const cat = selectedCategory.value
    if (cat && cat !== 'all') {
      list = list.filter((c) => (c.category || '') === cat)
    }
    if (q) {
      list = list.filter(
        (c) =>
          (c.title || '').toLowerCase().includes(q) ||
          (c.instructor || '').toLowerCase().includes(q) ||
          (c.description || '').toLowerCase().includes(q)
      )
    }
    return list
  })

  async function loadData () {
    const q = route.query.q
    if (typeof q === 'string' && q.trim()) searchQuery.value = q.trim()
    try {
      const { fetchCmsCourses } = useCmsNews()
      const list = await fetchCmsCourses()
      courses.value = list.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        instructor: c.instructor,
        category: c.category,
        rating: c.rating,
        reviewCount: c.reviewCount,
        duration: c.duration,
        price: c.price,
        level: c.level,
        badge: c.badge,
        image: c.image,
        description: c.description
      }))
    } catch {
      courses.value = []
    }
  }

  return {
    categories: CATEGORIES,
    searchQuery,
    selectedCategory,
    courses,
    filteredCourses,
    loadData
  }
}
