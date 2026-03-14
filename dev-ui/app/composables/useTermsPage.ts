/**
 * Terms page composable: sections, accordion, head.
 */
export function useTermsPage () {
  const { sections } = useTermsSections()
  const accordion = useAccordion(sections.length)

  const openSectionsArray = computed(() => {
    const raw = accordion.openSections
    return Array.isArray(raw) ? raw : (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: boolean[] }).value : [])
  })

  onMounted(() => accordion.init())

  useHead({
    title: 'Terms of Use | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: 'Terms of Use for TECH SAVVY Code Camp - an IT community in Misamis Occidental.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return { sections, accordion, openSectionsArray }
}
