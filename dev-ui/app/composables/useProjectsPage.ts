/**
 * Projects page composable: search, filtered projects, head.
 */
export function useProjectsPage () {
  const projects = useProjects()

  const projectSearchInputValue = computed({
    get: () => (projects.projectSearchInput && typeof projects.projectSearchInput === 'object' && 'value' in projects.projectSearchInput)
      ? (projects.projectSearchInput as { value: string }).value
      : (typeof projects.projectSearchInput === 'string' ? projects.projectSearchInput : ''),
    set: (v: string) => {
      const r = projects.projectSearchInput
      if (r && typeof r === 'object' && 'value' in r) (r as { value: string }).value = v
    }
  })

  const filteredProjectsArray = computed(() => {
    const raw = projects.filteredProjects
    const arr = Array.isArray(raw) ? raw : (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: unknown }).value : null)
    return Array.isArray(arr) ? arr : []
  })

  const searchQueryValue = computed(() => {
    const raw = projects.searchQuery
    return typeof raw === 'string' ? raw : (raw && typeof raw === 'object' && 'value' in raw ? String((raw as { value: unknown }).value ?? '') : '')
  })

  onMounted(() => projects.loadData())

  useHead({
    title: 'Projects | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: 'Ecommerce and web projects by the TECH SAVVY community.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return {
    projects,
    projectSearchInputValue,
    filteredProjectsArray,
    searchQueryValue
  }
}
