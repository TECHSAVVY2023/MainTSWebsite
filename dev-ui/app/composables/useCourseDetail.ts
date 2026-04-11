/**
 * Course detail page composable.
 * Loads the full CMS course catalog once via useAsyncData, then picks the row by route slug.
 * (Per-slug useAsyncData keys + watch were unreliable for client navigations in Nuxt 3.16.)
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

type CmsCourseListItem = {
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

function findCourseBySlug (list: CmsCourseListItem[], raw: string): CmsCourseListItem | undefined {
  const s = raw.trim()
  if (!s) return undefined
  let dec = s
  try {
    dec = decodeURIComponent(s)
  } catch { /* keep s */ }
  const lower = s.toLowerCase()
  return (
    list.find((c) => c.slug === s)
    || list.find((c) => c.slug === dec)
    || list.find((c) => c.slug.toLowerCase() === lower)
    || list.find((c) => slugify(c.title) === lower)
    || list.find((c) => slugify(c.slug) === lower)
  )
}

function mapToDetail (found: CmsCourseListItem): CourseDetailItem {
  return {
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

export function useCourseDetail () {
  const route = useRoute()
  const slug = computed(() => String(route.params.slug || ''))

  const { data: coursesList, pending, error, refresh } = useAsyncData(
    'cms-courses-catalog',
    async () => {
      const { fetchCmsCourses } = useCmsNews()
      return await fetchCmsCourses()
    },
    {
      server: true,
      lazy: false,
      default: () => [] as CmsCourseListItem[]
    }
  )

  const course = computed<CourseDetailItem | null>(() => {
    const list = coursesList.value
    if (!Array.isArray(list) || list.length === 0) return null
    const found = findCourseBySlug(list as CmsCourseListItem[], slug.value)
    return found ? mapToDetail(found) : null
  })

  return {
    course,
    pending,
    error,
    refresh,
    loadData: refresh
  }
}
