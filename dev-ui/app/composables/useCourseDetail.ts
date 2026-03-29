/**
 * Course detail page composable. Fetches course from CMS API.
 */
export type CourseDetailItem = {
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

export function useCourseDetail () {
  const route = useRoute()
  const slug = computed(() => String(route.params.slug || ''))
  const course = ref<CourseDetailItem | null>(null)

  async function loadData () {
    course.value = null
    const s = slug.value
    if (!s) return
    try {
      const { fetchCmsCourses } = useCmsNews()
      const list = await fetchCmsCourses()
      const found = list.find((c) => c.slug === s)
      if (found) {
        course.value = {
          id: found.id,
          slug: found.slug,
          title: found.title,
          instructor: found.instructor,
          category: found.category,
          rating: found.rating,
          reviewCount: found.reviewCount,
          duration: found.duration,
          price: found.price,
          level: found.level,
          badge: found.badge,
          image: found.image,
          description: found.description,
          learnItems: found.learnItems
        }
      }
    } catch { /* keep null */ }
  }

  return { course, loadData }
}
