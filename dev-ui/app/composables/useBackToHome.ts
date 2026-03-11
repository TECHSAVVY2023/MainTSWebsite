/**
 * Returns the "Back to Home" URL with the section the user came from.
 * Uses sessionStorage (from index scroll tracking) or infers from current route.
 */
const HOME_SECTIONS = ['news', 'courses', 'about', 'projects', 'calendar'] as const
const STORAGE_KEY = 'lastHomeSection'

function getStoredSection (): string | null {
  try {
    if (import.meta.client && typeof sessionStorage !== 'undefined') {
      const v = sessionStorage.getItem(STORAGE_KEY)
      return v && HOME_SECTIONS.includes(v as typeof HOME_SECTIONS[number]) ? v : null
    }
  } catch {
    /* ignore */
  }
  return null
}

export function useBackToHome () {
  const route = useRoute()

  const backToHomeHref = computed(() => {
    const stored = getStoredSection()
    if (stored) return `/#${stored}`

    // Infer from current route when no stored section
    const path = route.path
    if (path.startsWith('/news')) return '/#news'
    if (path.startsWith('/courses')) return '/#courses'
    if (path === '/projects') return '/#projects'
    if (path === '/about') return '/#about'
    if (path === '/contact') return '/#about' // contact is often from footer near about

    return '/#news' // default first content section
  })

  return { backToHomeHref }
}

export function useLastHomeSection () {
  function setLastHomeSection (section: string) {
    if (!HOME_SECTIONS.includes(section as typeof HOME_SECTIONS[number])) return
    try {
      if (import.meta.client && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem(STORAGE_KEY, section)
      }
    } catch {
      /* ignore */
    }
  }

  return { setLastHomeSection }
}
