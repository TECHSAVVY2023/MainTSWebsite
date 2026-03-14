/**
 * Projects page composable: data loading, search filter.
 */
export type ProjectItem = {
  title: string
  domain: string
  url: string
  image?: string
  alt?: string
}

export function useProjects () {
  const route = useRoute()
  const projectSearchInput = ref('')

  const { data: projectsFromApi } = useAsyncData(
    'projects-page-cms',
    async () => {
      try {
        const { fetchCmsProjects } = useCmsNews()
        const proj = await fetchCmsProjects()
        return proj.map((p) => ({
          title: p.title,
          domain: p.domain,
          url: p.url,
          image: p.image,
          alt: p.alt
        }))
      } catch {
        return []
      }
    },
    { server: true, default: () => [] }
  )

  const projects = computed(() => {
    const arr = projectsFromApi.value
    return Array.isArray(arr) ? arr : []
  })

  const searchQuery = computed(() => (projectSearchInput.value || '').trim().toLowerCase())

  const filteredProjects = computed(() => {
    const q = searchQuery.value
    const list = projects.value
    if (!q) return list
    return list.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.domain || '').toLowerCase().includes(q)
    )
  })

  function loadData () {
    const q = route.query.q
    if (typeof q === 'string' && q.trim()) {
      projectSearchInput.value = q.trim()
    }
  }

  return {
    projects,
    projectSearchInput,
    searchQuery,
    filteredProjects,
    loadData
  }
}
