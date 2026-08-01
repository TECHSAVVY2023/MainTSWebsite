/**
 * Projects page composable: data loading from Django CMS, search filter.
 */
export type ProjectItem = {
  title: string
  domain: string
  developer?: string
  url: string
  image?: string
  alt?: string
}

export function useProjects () {
  const route = useRoute()
  const projectSearchInput = ref('')

  const { data: projectsFromApi, refresh: refreshProjects } = useAsyncData(
    'projects-page-cms',
    async () => {
      try {
        const { refreshMainPageContent, projects: mainProjects } = useMainPageCms()
        await refreshMainPageContent()
        if (Array.isArray(mainProjects.value) && mainProjects.value.length > 0) {
          return mainProjects.value.map((p) => ({
            title: p.title,
            domain: p.domain,
            developer: p.developer || 'Tech Savvy Community',
            url: p.url,
            image: p.image,
            alt: p.title
          }))
        }
        const { fetchCmsProjects } = useCmsNews()
        const proj = await fetchCmsProjects()
        return proj.map((p) => ({
          title: p.title,
          domain: p.domain,
          developer: p.developer || 'Tech Savvy Community',
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
        (p.domain || '').toLowerCase().includes(q) ||
        (p.developer || '').toLowerCase().includes(q)
    )
  })

  function loadData () {
    const q = route.query.q
    if (typeof q === 'string' && q.trim()) {
      projectSearchInput.value = q.trim()
    }
    refreshProjects()
  }

  return {
    projects,
    projectSearchInput,
    searchQuery,
    filteredProjects,
    loadData
  }
}
