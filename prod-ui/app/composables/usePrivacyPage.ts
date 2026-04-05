/**
 * Privacy page composable: sections, accordion, head.
 */
export function usePrivacyPage () {
  const { sections } = usePrivacySections()
  const accordion = useAccordion(sections.length)

  const openSectionsArray = computed(() => {
    const raw = accordion.openSections
    return Array.isArray(raw) ? raw : (raw && typeof raw === 'object' && 'value' in raw ? (raw as { value: boolean[] }).value : [])
  })

  onMounted(() => accordion.init())

  useHead({
    title: 'Privacy Policy | TECH SAVVY Code Camp',
    meta: [{ name: 'description', content: 'Privacy Policy for TECH SAVVY Code Camp - how we collect, use, and protect your information.' }],
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' }]
  })

  return { sections, accordion, openSectionsArray }
}
