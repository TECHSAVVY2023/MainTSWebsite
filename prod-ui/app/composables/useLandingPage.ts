/**
 * Landing page (index) composable: section data, loadData, head.
 */
export function useLandingPage () {
  const landing = useLanding()
  const { unwrapRef } = useUnwrapRef()

  const newsItemsForSection = computed(() => {
    const arr = unwrapRef(landing.newsItemsDisplay)
    return Array.isArray(arr) ? arr : []
  })

  const coursesForSection = computed(() => {
    const arr = unwrapRef(landing.coursesPreview)
    return Array.isArray(arr) ? arr : []
  })

  const projectsForSection = computed(() => {
    const arr = unwrapRef(landing.projects)
    return Array.isArray(arr) ? arr : []
  })

  const eventsForSection = computed(() => {
    const arr = unwrapRef(landing.calendarEvents)
    return Array.isArray(arr) ? arr : []
  })

  const eventRemindersForSection = computed(() => {
    const arr = unwrapRef(landing.eventReminders)
    return Array.isArray(arr) ? arr : []
  })

  const communityRoleStatsForSection = computed(() => {
    const arr = unwrapRef(landing.communityRoleStats)
    return Array.isArray(arr) ? arr : []
  })

  const speakersForSection = computed(() => {
    const arr = unwrapRef(landing.speakers)
    return Array.isArray(arr) ? arr : []
  })

  const sponsorsForSection = computed(() => {
    const arr = unwrapRef(landing.sponsors)
    return Array.isArray(arr) ? arr : []
  })

  const partnersForSection = computed(() => {
    const arr = unwrapRef(landing.partners)
    return Array.isArray(arr) ? arr : []
  })

  onMounted(() => landing.loadData())

  useHead({
    title: 'www.techsavvies.space',
    meta: [
      {
        name: 'description',
        content: 'Modern minimalist redesign of TECH SAVVY Code Camp - A growing IT community in Misamis Occidental running code camps in full-stack web development. TECH SAVVY | Code Camp 2026 — Tech Community & Full-Stack Development'
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
    ]
  })

  return {
    landing,
    newsItemsForSection,
    coursesForSection,
    projectsForSection,
    eventsForSection,
    eventRemindersForSection,
    communityRoleStatsForSection,
    speakersForSection,
    sponsorsForSection,
    partnersForSection
  }
}
