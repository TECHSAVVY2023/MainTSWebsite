/**
 * Super-admin UI (Members nav, CMS approval, etc.).
 * Set NUXT_PUBLIC_SUPERADMIN_EMAILS in dev-ui .env (comma-separated) to use your own Google account locally.
 */
export function useSuperAdmin () {
  const config = useRuntimeConfig()

  const superAdminEmails = computed(() => {
    const raw = String(config.public.superAdminEmails ?? 'jorenleeluna24@gmail.com')
    return raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  })

  function isSuperAdmin (email: string | null | undefined) {
    const e = (email || '').trim().toLowerCase()
    return e.length > 0 && superAdminEmails.value.includes(e)
  }

  return { superAdminEmails, isSuperAdmin }
}
