import { useCMS } from '~/composables/useCMS'
import { useAuth } from '~/composables/useAuth'

export interface FeaturedProject {
  id?: number
  title: string
  domain: string
  developer: string
  url: string
  image: string
  approval_status?: string
  authors?: string
}

export interface MainPageEventReminder {
  id?: number
  title: string
  date: string
  time: string
  endTime?: string
  kind: 'event' | 'reminder' | 'workshop'
  link?: string
  description?: string
  approval_status?: string
  authors?: string
}

export interface SponsorPartnerItem {
  id?: number
  name: string
  type: 'sponsor' | 'partner'
  logoUrl: string
  websiteUrl: string
  approval_status?: string
  authors?: string
}

export function useMainPageCms () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
  const { uploadMultipleFiles } = useCMS()
  const { user } = useAuth()

  const projects = ref<FeaturedProject[]>([])
  const eventReminders = ref<MainPageEventReminder[]>([])
  const sponsors = ref<SponsorPartnerItem[]>([])
  const partners = ref<SponsorPartnerItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch all CMS content from dedicated Django endpoints
   */
  async function refreshMainPageContent () {
    if (!apiBase) return
    loading.value = true
    error.value = null

    try {
      // 1. Fetch Featured Projects
      const projRes = await $fetch<any[]>(`${apiBase}/featured-projects/`).catch(() => [])
      if (Array.isArray(projRes)) {
        projects.value = projRes.map((p: any) => ({
          id: p.id,
          title: p.title || '',
          domain: p.domain || '',
          developer: p.developer || 'Tech Savvy Community',
          url: p.url || '#',
          image: p.image || '',
          approval_status: p.approval_status || 'approved',
          authors: p.authors || ''
        }))
      }

      // 2. Fetch Event Reminders
      const evtRes = await $fetch<any[]>(`${apiBase}/event-reminders/`).catch(() => [])
      if (Array.isArray(evtRes)) {
        eventReminders.value = evtRes.map((e: any) => ({
          id: e.id,
          title: e.title || '',
          date: e.date || '',
          time: e.time || '',
          endTime: e.end_time || '',
          kind: e.kind || 'event',
          link: e.link || '',
          description: e.description || '',
          approval_status: e.approval_status || 'approved',
          authors: e.authors || ''
        }))
      }

      // 3. Fetch Sponsors & Partners
      const spRes = await $fetch<any[]>(`${apiBase}/sponsors-partners/`).catch(() => [])
      if (Array.isArray(spRes)) {
        const spList: SponsorPartnerItem[] = []
        const ptList: SponsorPartnerItem[] = []

        spRes.forEach((s: any) => {
          const entry: SponsorPartnerItem = {
            id: s.id,
            name: s.name || '',
            type: s.type === 'partner' ? 'partner' : 'sponsor',
            logoUrl: s.logo_url || '',
            websiteUrl: s.website_url || '#',
            approval_status: s.approval_status || 'approved',
            authors: s.authors || ''
          }
          if (entry.type === 'partner') {
            ptList.push(entry)
          } else {
            spList.push(entry)
          }
        })

        sponsors.value = spList
        partners.value = ptList
      }
    } catch (err: any) {
      error.value = err?.message || 'Failed to load Django CMS records'
      console.error('Error fetching Django CMS content:', err)
    } finally {
      loading.value = false
    }
  }

  // ── Projects CRUD ──
  async function saveProject (proj: FeaturedProject, isAutoApproved: boolean) {
    const authorEmail = user.value?.email || 'info@techsavvies.space'
    const status = isAutoApproved ? 'approved' : 'pending'
    const payload = {
      title: proj.title,
      domain: proj.domain,
      developer: proj.developer || 'Tech Savvy Community',
      url: proj.url,
      image: proj.image || '',
      approval_status: status,
      authors: proj.authors || authorEmail
    }

    if (proj.id) {
      await $fetch(`${apiBase}/featured-projects/${proj.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch(`${apiBase}/featured-projects/`, {
        method: 'POST',
        body: payload
      })
    }
    await refreshMainPageContent()
  }

  async function removeProject (id: number) {
    await $fetch(`${apiBase}/featured-projects/${id}/`, { method: 'DELETE' })
    await refreshMainPageContent()
  }

  // ── Event Reminders CRUD ──
  async function saveEventReminder (event: MainPageEventReminder, isAutoApproved: boolean) {
    const authorEmail = user.value?.email || 'info@techsavvies.space'
    const status = isAutoApproved ? 'approved' : 'pending'
    const payload = {
      title: event.title,
      date: event.date || null,
      time: event.time || '',
      end_time: event.endTime || '',
      kind: event.kind || 'event',
      link: event.link || '',
      description: event.description || '',
      approval_status: status,
      authors: event.authors || authorEmail
    }

    if (event.id) {
      await $fetch(`${apiBase}/event-reminders/${event.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch(`${apiBase}/event-reminders/`, {
        method: 'POST',
        body: payload
      })
    }
    await refreshMainPageContent()
  }

  async function removeEventReminder (id: number) {
    await $fetch(`${apiBase}/event-reminders/${id}/`, { method: 'DELETE' })
    await refreshMainPageContent()
  }

  // ── Sponsors & Partners CRUD ──
  async function saveSponsorPartner (sp: SponsorPartnerItem, isAutoApproved: boolean) {
    const authorEmail = user.value?.email || 'info@techsavvies.space'
    const status = isAutoApproved ? 'approved' : 'pending'
    const payload = {
      name: sp.name,
      type: sp.type,
      logo_url: sp.logoUrl || '',
      website_url: sp.websiteUrl || '',
      approval_status: status,
      authors: sp.authors || authorEmail
    }

    if (sp.id) {
      await $fetch(`${apiBase}/sponsors-partners/${sp.id}/`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $fetch(`${apiBase}/sponsors-partners/`, {
        method: 'POST',
        body: payload
      })
    }
    await refreshMainPageContent()
  }

  async function removeSponsorPartner (id: number) {
    await $fetch(`${apiBase}/sponsors-partners/${id}/`, { method: 'DELETE' })
    await refreshMainPageContent()
  }

  return {
    projects,
    eventReminders,
    sponsors,
    partners,
    loading,
    error,
    refreshMainPageContent,
    saveProject,
    removeProject,
    saveEventReminder,
    removeEventReminder,
    saveSponsorPartner,
    removeSponsorPartner,
    uploadMultipleFiles
  }
}
