export type SponsorFlipItem = {
  name: string
  tier?: string
  description?: string
  link?: string
  logo?: string
}

export function useSponsorFlipCard (props: {
  sponsor: SponsorFlipItem
  defaultLogo: string
  kind?: 'sponsor' | 'partner'
}) {
  const flipped = ref(false)
  const logoBroken = ref(false)

  const ariaLabel = computed(() => {
    const n = props.sponsor.name || 'Sponsor'
    return flipped.value
      ? `${n}, showing details. Click to return to logo.`
      : `${n}, logo. Click for details.`
  })

  function onCardClick (e: MouseEvent) {
    const el = e.target as HTMLElement | null
    if (el?.closest('a[href]')) return
    flipped.value = !flipped.value
  }

  function onCardKeydown (e: KeyboardEvent) {
    if (e.key !== 'Enter' && e.key !== ' ') return
    const el = e.target as HTMLElement | null
    if (el?.closest('a[href]')) return
    e.preventDefault()
    flipped.value = !flipped.value
  }

  watch(
    () => [props.sponsor.logo, props.sponsor.name] as const,
    () => {
      logoBroken.value = false
    },
  )

  const logoSrc = computed(() => {
    if (logoBroken.value) return props.defaultLogo
    return props.sponsor.logo?.trim() || props.defaultLogo
  })

  function onLogoError () {
    logoBroken.value = true
  }

  const initials = computed(() => {
    const n = props.sponsor.name?.trim() || '?'
    const parts = n.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      return (parts[0]![0]! + parts[1]![0]!).toUpperCase()
    }
    return n.slice(0, 2).toUpperCase()
  })

  const tierLabel = computed(() => props.sponsor.tier?.trim() || '')

  const visitHref = computed(() => {
    const u = props.sponsor.link?.trim()
    return u || null
  })

  const isExternalHttp = computed(() => /^https?:\/\//i.test(visitHref.value || ''))

  const useFullPageNavigation = computed(() => {
    const u = (visitHref.value || '').trim()
    if (!u) return false
    if (/^https?:\/\//i.test(u)) return true
    if (/^(mailto|tel):/i.test(u)) return true
    if (u.startsWith('/assets/')) return true
    if (/\.(png|jpe?g|gif|webp|svg|pdf|ico|woff2?)(\?[^#]*)?(#|$)/i.test(u)) return true
    return false
  })

  const ctaLabel = computed(() => (props.kind === 'partner' ? 'Visit partner' : 'Visit sponsor'))

  const logoPanelClass = computed(() =>
    props.kind === 'partner'
      ? 'from-[#0c1929] via-[#134e4a] to-[#164e63]'
      : 'from-[#121028] via-[#1f1348] to-[#2e1368]',
  )

  const backShellClass = computed(() =>
    props.kind === 'partner'
      ? 'from-[#0f172a] via-[#134e4a] to-[#115e59]'
      : 'from-[#1a0d3e] via-[#2e1368] to-[#4c1d95]',
  )

  return {
    flipped,
    ariaLabel,
    onCardClick,
    onCardKeydown,
    logoSrc,
    onLogoError,
    initials,
    tierLabel,
    visitHref,
    isExternalHttp,
    useFullPageNavigation,
    ctaLabel,
    logoPanelClass,
    backShellClass,
  }
}
