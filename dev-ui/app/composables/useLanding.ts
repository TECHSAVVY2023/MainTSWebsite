/**
 * Landing page composable: news, projects, courses, calendar, scroll, search.
 */
import { FALLBACK_NEWS_ITEMS } from '~/constants/fallbackNews'
import {
  SAMPLE_PROJECTS,
  SAMPLE_COURSES,
  SAMPLE_BRAND_LOGOS,
  DEFAULT_NEWS_IMAGE,
  DEFAULT_COURSE_IMAGE,
  DEFAULT_PROJECT_IMAGE
} from '~/constants/sampleMedia'
import { firstCmsImageUrl } from '~/utils/cmsMedia'

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const CALENDAR_KEY = 'calendarEventsForLanding'
const CMS_LIST_PATH = '/cms/list/'
/** Server proxy — browser calls Nuxt origin; Nitro forwards to Django (see server/api/internal/cms-list.get.ts). */
const CMS_LIST_PROXY_PATH = '/api/internal/cms-list'

/** Homepage sections: same max cards per row (News, Courses, Featured Projects). */
export const LANDING_SECTION_MAX_CARDS = 4

/** Community sponsors / partners grids: 2 rows × 4 columns. */
const LANDING_SPONSORS_PARTNERS_MAX = 8

export type LandingNewsItem = { date?: string; title?: string; summary?: string; description?: string; imageUrl?: string; link?: string; id?: string; filters?: string | Record<string, unknown> | null }

const NEWS_CATEGORIES = ['News', 'News Highlights', 'Events', 'Announcements']

function toFilterText (filters?: string | Record<string, unknown> | null): string {
  if (!filters) return ''
  if (typeof filters === 'string') return filters
  return JSON.stringify(filters)
}

/** Parsed `filters.category` (lowercase) for JSON or legacy string CMS items. */
function getFilterCategoryFromLandingItem (filters?: string | Record<string, unknown> | null): string {
  if (!filters) return ''
  if (typeof filters === 'object' && filters !== null && 'category' in filters) {
    return String((filters as Record<string, unknown>).category || '').trim().toLowerCase()
  }
  if (typeof filters === 'string' && filters.trim().startsWith('{')) {
    try {
      const o = JSON.parse(filters) as Record<string, unknown>
      return String(o.category || '').trim().toLowerCase()
    } catch {
      return ''
    }
  }
  const parts = String(filters).split(',').map((s) => s.trim())
  return (parts[0] || '').toLowerCase()
}

const NON_NEWS_LANDING_CATEGORIES = new Set([
  'merchandise',
  'events',
  'courses',
  'featured projects'
])

/** Primary `filters.category` values that belong in the homepage “News & Updates” strip (lowercase tokens). */
const NEWS_SECTION_CATEGORY_TOKENS = new Set([
  'news and update',
  'news and updates',
  'news highlights',
  'news highlight',
  'announcements',
  'announcement',
  'news'
])

function splitCategoryTokens (categoryField: string): string[] {
  const s = String(categoryField || '').trim().toLowerCase()
  if (!s) return []
  return s.split(/[|,]/).map((t) => t.trim()).filter(Boolean)
}

/** Normalize CMS `filters` when API returns a JSON string (legacy) or object. */
function parseLandingFiltersObject (filters: unknown): Record<string, unknown> | null {
  if (!filters) return null
  if (typeof filters === 'object' && !Array.isArray(filters)) {
    return filters as Record<string, unknown>
  }
  if (typeof filters === 'string' && filters.trim().startsWith('{')) {
    try {
      const o = JSON.parse(filters) as unknown
      if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
        return o as Record<string, unknown>
      }
    } catch {
      return null
    }
  }
  return null
}

function isApprovedCmsLanding (status?: string): boolean {
  const s = String(status || '').trim().toLowerCase()
  return s === 'approved' || s === 'published' || s === 'live'
}

/** True if `filters.category` is `events` or a comma/pipe list that includes `events` (e.g. from dashboard checkboxes). */
function filterCategoryIncludesEvents (categoryVal: unknown): boolean {
  const s = String(categoryVal || '').trim().toLowerCase()
  if (!s) return false
  if (s === 'events') return true
  return s.split(/[|,]/).map(p => p.trim().toLowerCase()).some(t => t === 'events')
}

function landingNewsToCalendarRows (items: LandingNewsItem[]): LandingCalEvent[] {
  const out: LandingCalEvent[] = []
  for (const item of items) {
    const fl = parseLandingFiltersObject(item.filters)
    if (!fl) continue
    if (!filterCategoryIncludesEvents(fl.category)) continue
    const dateStr = String(fl.event_date || '').trim()
    if (!dateStr) continue
    const iso = dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00.000Z`
    const kindRaw = String(fl.event_kind || 'event').toLowerCase()
    const kind: LandingCalEvent['kind'] =
      kindRaw === 'task' || kindRaw === 'reminder' || kindRaw === 'appointment' ? kindRaw : 'event'
    out.push({
      date: iso,
      time: String(fl.event_time || ''),
      endTime: String(fl.end_time || ''),
      title: item.title || 'Event',
      description: item.summary || '',
      link: item.link && item.link !== '#' ? item.link : '',
      kind
    })
  }
  return out
}

function getFirstFileUrl (files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null): string {
  if (!files) return ''
  if (Array.isArray(files)) return files[0]?.url || ''
  if (typeof files === 'object') return files.url || ''
  return ''
}

function isNewsItem (item: { filters?: string | Record<string, unknown> | null }): boolean {
  const cat = getFilterCategoryFromLandingItem(item.filters)
  const tokens = splitCategoryTokens(cat)

  if (tokens.length > 0) {
    if (tokens.some((t) => NEWS_SECTION_CATEGORY_TOKENS.has(t))) return true
    if (tokens.every((t) => NON_NEWS_LANDING_CATEGORIES.has(t))) return false
  } else if (cat && NON_NEWS_LANDING_CATEGORIES.has(cat)) {
    return false
  }

  if (cat === 'news and update' || cat === 'news highlights') return true

  const f = toFilterText(item.filters)
  const lower = f.toLowerCase()
  if (!f.trim()) return true
  if (lower.includes('news and update') || lower.includes('news highlights')) return true
  return NEWS_CATEGORIES.some((c) => lower.includes(c.toLowerCase()))
}
export type LandingProjectItem = { title: string; domain?: string; developer?: string; url: string; image?: string; alt?: string }
export type LandingCourseItem = { slug: string; title: string; instructor?: string; rating?: string; duration?: string; badge?: string; image?: string }
export type LandingCalEvent = {
  date: string
  time?: string
  endTime?: string
  title?: string
  description?: string
  link?: string
  kind?: 'task' | 'event' | 'reminder' | 'appointment'
}
export type LandingRoleStat = { role: string; count: number; percent: number }
export type LandingSpeaker = {
  name: string
  role?: string
  topic?: string
  link?: string
  image?: string
  /** Set when mapped from API — used for “Speakers only” filter on the hub. */
  isSpeaker?: boolean
}
export type LandingSponsor = { name: string; tier?: string; description?: string; link?: string; logo?: string }

const FALLBACK_PROJECTS: LandingProjectItem[] = [
  {
    title: 'CampusMart E-commerce',
    domain: 'Retail Platform',
    developer: 'Tech Savvy Community',
    url: '/projects',
    image: SAMPLE_PROJECTS.ecommerce,
    alt: 'Sample e-commerce project preview'
  },
  {
    title: 'BookNook Marketplace',
    domain: 'Online Book Store',
    developer: 'Tech Savvy Community',
    url: '/projects',
    image: SAMPLE_PROJECTS.books,
    alt: 'Sample marketplace project preview'
  },
  {
    title: 'Farm2Door Shop',
    domain: 'Local Produce Store',
    developer: 'Tech Savvy Community',
    url: '/projects',
    image: SAMPLE_PROJECTS.farm,
    alt: 'Sample produce store project preview'
  },
  {
    title: 'LearnHub LMS',
    domain: 'Education Platform',
    developer: 'Tech Savvy Community',
    url: '/projects',
    image: SAMPLE_PROJECTS.lms,
    alt: 'Sample learning platform preview'
  }
]

const FALLBACK_COURSES: LandingCourseItem[] = [
  {
    slug: 'frontend-fundamentals',
    title: 'Frontend Fundamentals',
    instructor: 'Tech Savvy Mentors',
    rating: '4.8',
    duration: '6 weeks',
    badge: 'Beginner',
    image: SAMPLE_COURSES.frontend
  },
  {
    slug: 'backend-api-practical',
    title: 'Backend API Practical',
    instructor: 'Community Instructors',
    rating: '4.9',
    duration: '8 weeks',
    badge: 'Intermediate',
    image: SAMPLE_COURSES.backend
  },
  {
    slug: 'nuxt-fullstack-lab',
    title: 'Nuxt Fullstack Lab',
    instructor: 'Senior Mentors',
    rating: '4.7',
    duration: '7 weeks',
    badge: 'Project-based',
    image: SAMPLE_COURSES.nuxt
  },
  {
    slug: 'deployment-and-devops',
    title: 'Deployment and DevOps',
    instructor: 'Platform Team',
    rating: '4.8',
    duration: '5 weeks',
    badge: 'Advanced',
    image: SAMPLE_COURSES.devops
  }
]

function fallbackReminderDate (daysFromNow: number): string {
  return new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000).toISOString()
}

const FALLBACK_REMINDERS: LandingCalEvent[] = [
  { date: fallbackReminderDate(1), time: '09:00 AM', endTime: '10:15 AM', title: 'Assessment With ITSG', description: 'Quarterly skills review.', kind: 'task' },
  { date: fallbackReminderDate(2), time: '10:30 AM', endTime: '11:45 AM', title: 'Brief internship sync', description: 'Intern check-in.', kind: 'event' },
  { date: fallbackReminderDate(2), time: '02:00 PM', endTime: '03:30 PM', title: 'Meeting with Saban K.', description: 'Project alignment.', kind: 'appointment' },
  { date: fallbackReminderDate(3), time: '11:00 AM', endTime: '12:00 PM', title: 'Consultation Research', description: 'Research planning session.', kind: 'reminder' },
  { date: fallbackReminderDate(4), time: '01:00 PM', endTime: '02:30 PM', title: 'Analysis Project Mint', description: 'Sprint review.', kind: 'event' },
  { date: fallbackReminderDate(5), time: '08:00 AM', endTime: '09:00 AM', title: 'Community stand-up', description: 'Daily sync.', kind: 'task' },
  { date: fallbackReminderDate(6), time: '06:30 PM', endTime: '08:00 PM', title: 'Frontend Workshop', description: 'UI patterns lab.', kind: 'event' },
  { date: fallbackReminderDate(7), time: '07:00 PM', endTime: '08:30 PM', title: 'Community Meetup', description: 'Networking night.', kind: 'reminder' },
  { date: fallbackReminderDate(8), time: '04:00 PM', endTime: '05:00 PM', title: 'Mentor office hours', description: 'Open Q&A.', kind: 'appointment' },
  { date: fallbackReminderDate(9), time: '10:00 AM', endTime: '11:30 AM', title: 'Code review circle', description: 'Peer reviews.', kind: 'task' },
  { date: fallbackReminderDate(10), time: '03:00 PM', endTime: '04:15 PM', title: 'Sponsor thank-you call', description: 'Partner outreach.', kind: 'appointment' },
  { date: fallbackReminderDate(11), time: '08:00 PM', endTime: '09:30 PM', title: 'Career Mentoring Night', description: 'Portfolio feedback.', kind: 'event' },
  { date: fallbackReminderDate(12), time: '09:30 AM', endTime: '10:00 AM', title: 'Holiday — no sessions', description: 'Local holiday.', kind: 'reminder' }
]

type MemberRoleApiItem = {
  role?: string
  firstname?: string
  lastname?: string
  website?: string
  profilePicture?: string | null
  speaker_topic?: string
}

type CmsApiItem = {
  id?: number
  title?: string
  descriptions?: string
  approval_status?: string
  filters?: string | Record<string, unknown> | null
  links?: string[]
  files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null
  /** String URLs and/or `{ name?, url? }` objects (API may mix both). */
  images?: unknown[]
  created_at?: string
}

function mapCmsToNewsItem (
  cms: { id?: number; title?: string; descriptions?: string; approval_status?: string; filters?: string | Record<string, unknown> | null; links?: string[]; files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null; images?: string[]; created_at?: string },
  baseUrl: string
) {
  const imgFromImages = firstCmsImageUrl(cms.images)
  let fileUrl = imgFromImages || getFirstFileUrl(cms.files)
  if (fileUrl && baseUrl && !fileUrl.startsWith('http')) {
    const origin = baseUrl.replace(/\/api\/techsavvy\/?$/i, '').replace(/\/$/, '')
    fileUrl = `${origin}${fileUrl.startsWith('/') ? '' : '/'}${fileUrl}`
  }
  const link = Array.isArray(cms.links) && cms.links[0] ? cms.links[0] : ''
  return {
    id: String(cms.id ?? ''),
    date: cms.created_at || '',
    title: cms.title || 'Untitled',
    summary: cms.descriptions || '',
    description: cms.descriptions || '',
    imageUrl: fileUrl,
    link: link || '#',
    filters: cms.filters || null
  }
}

function normalizeCmsList (body: unknown): unknown[] {
  if (Array.isArray(body)) return body
  if (body && typeof body === 'object' && !Array.isArray(body)) {
    const o = body as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data
    if (Array.isArray(o.results)) return o.results
    if (Array.isArray(o.items)) return o.items
  }
  return []
}

function mapDashboardCalKind (raw?: string): LandingCalEvent['kind'] {
  const k = String(raw || 'event').trim().toLowerCase()
  if (k === 'task' || k === 'reminder' || k === 'appointment') return k
  return 'event'
}

/** Drop duplicates when the same CMS event is merged from the calendar-events feed and CMS list. */
function dedupeLandingCalEvents (events: LandingCalEvent[]): LandingCalEvent[] {
  const seen = new Set<string>()
  const out: LandingCalEvent[] = []
  for (const e of events) {
    const key = `${String(e.date || '')}::${String(e.title || '').trim().toLowerCase()}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(e)
  }
  return out
}

export function useLanding () {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase as string) || ''
  const { getItem: getStorage } = useSafeStorage()
  const { setLastHomeSection } = useLastHomeSection()

  const newsItems = ref<LandingNewsItem[]>([])
  const projects = ref<LandingProjectItem[]>([])
  const coursesPreview = ref<LandingCourseItem[]>([])
  const calendarEvents = ref<LandingCalEvent[]>([])
  const eventReminders = ref<LandingCalEvent[]>([])
  const communityRoleStats = ref<LandingRoleStat[]>([])
  const speakers = ref<LandingSpeaker[]>([])
  const sponsors = ref<LandingSponsor[]>([])
  const partners = ref<LandingSponsor[]>([])

  const mediaBase = () => apiBase.replace(/\/$/, '')

  async function fetchCmsListMapped (): Promise<LandingNewsItem[]> {
    const origin = mediaBase()
    const toMapped = (data: unknown) =>
      (normalizeCmsList(data) as { approval_status?: string }[])
        .filter((item) => isApprovedCmsLanding(item.approval_status))
        .map((item: unknown) => mapCmsToNewsItem(item as CmsApiItem, origin))

    const jsonHeaders = { Accept: 'application/json' as const }
    try {
      const data = await $fetch<unknown>(CMS_LIST_PROXY_PATH, { headers: jsonHeaders })
      return toMapped(data)
    } catch {
      /* proxy unavailable or API base missing — try Django URL directly (SSR / same-machine dev) */
    }
    if (!origin) return []
    try {
      const data = await $fetch<unknown>(`${origin}${CMS_LIST_PATH}`, { headers: jsonHeaders })
      return toMapped(data)
    } catch {
      return []
    }
  }

  const { data: cmsListFromApi, refresh: refreshLandingCmsList } = useAsyncData(
    'landing-cms-list',
    () => fetchCmsListMapped(),
    { server: true, default: () => [] }
  )

  /**
   * `loadData()` only runs on the client (onMounted). Without this, SSR can render an empty
   * news strip until hydration, and a slow `useAsyncData` resolve can miss the first `loadData()` pass.
   */
  watch(
    cmsListFromApi,
    (v) => {
      if (!Array.isArray(v) || v.length === 0) return
      newsItems.value = v as LandingNewsItem[]
    },
    { immediate: true }
  )

  const resolvedNewsItems = computed<LandingNewsItem[]>(() => {
    if (newsItems.value.length > 0) return newsItems.value
    if (Array.isArray(cmsListFromApi.value) && cmsListFromApi.value.length > 0) {
      return cmsListFromApi.value as LandingNewsItem[]
    }
    return []
  })

  const newsItemsDisplay = computed(() =>
    resolvedNewsItems.value
      .filter((item) => isNewsItem(item as { filters?: string | Record<string, unknown> | null }))
      .slice(0, LANDING_SECTION_MAX_CARDS)
  )

  const HEADER_ANCHOR_OFFSET_PX = 80

  function scrollToSection (id: string) {
    if (id === '#') return
    const el = document.querySelector(id)
    if (el) {
      const y = (el as HTMLElement).getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({ top: Math.max(0, y - HEADER_ANCHOR_OFFSET_PX), behavior: 'smooth' })
    }
  }

  function onHeaderSearch (query: string) {
    const q = (query || '').trim()
    if (q) navigateTo({ path: '/search', query: { q } })
    else navigateTo('/search')
  }

  function normalizeRole (raw?: string): string {
    const text = (raw || '').trim()
    if (!text) return 'Member'
    const lower = text.toLowerCase()
    if (lower.includes('speaker')) return 'Speaker'
    if (lower.includes('mentor') || lower.includes('trainer') || lower.includes('instructor')) return 'Mentor'
    if (lower.includes('organizer') || lower.includes('admin') || lower.includes('lead')) return 'Organizer'
    if (lower.includes('sponsor') || lower.includes('partner')) return 'Sponsor'
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  function buildRoleStats (members: MemberRoleApiItem[]) {
    const tally: Record<string, number> = {}
    members.forEach((member) => {
      const role = normalizeRole(member.role)
      tally[role] = (tally[role] || 0) + 1
    })
    const rows = Object.entries(tally)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
    const total = rows.reduce((sum, row) => sum + row.count, 0) || 1
    communityRoleStats.value = rows.map((row) => ({
      role: row.role,
      count: row.count,
      percent: Math.round((row.count / total) * 100)
    }))
  }

  function resolveMemberMediaUrl (path: string | null | undefined): string {
    if (!path) return ''
    const p = String(path).trim()
    if (!p || p.startsWith('http')) return p
    const origin = apiBase.replace(/\/api\/techsavvy\/?$/i, '').replace(/\/$/, '')
    return `${origin}${p.startsWith('/') ? '' : '/'}${p}`
  }

  function memberIsSpeaker (member: MemberRoleApiItem): boolean {
    const roleLabel = normalizeRole(member.role).toLowerCase()
    const raw = String(member.role || '').toLowerCase()
    const topic = String(member.speaker_topic || '').trim()
    if (topic.length > 0) return true
    return (
      roleLabel.includes('speaker') ||
      roleLabel.includes('mentor') ||
      roleLabel.includes('instructor') ||
      raw.includes('speaker') ||
      raw.includes('mentor') ||
      raw.includes('trainer')
    )
  }

  function mapMemberToCommunityCard (member: MemberRoleApiItem): LandingSpeaker {
    const topicLine = String(member.speaker_topic || '').trim()
    const roleDisplay = normalizeRole(member.role)
    const speaker = memberIsSpeaker(member)
    const img = resolveMemberMediaUrl(member.profilePicture ?? null)
    return {
      name: `${member.firstname || ''} ${member.lastname || ''}`.trim() || 'Member',
      role: roleDisplay,
      topic:
        topicLine ||
        (speaker ? 'Practical full-stack development and career growth' : 'Community member'),
      link: member.website || '',
      image: img || undefined,
      isSpeaker: speaker
    }
  }

  function applyCommunityMembersFromApi (members: MemberRoleApiItem[]) {
    if (!members.length) {
      speakers.value = []
      return
    }
    speakers.value = members.map(mapMemberToCommunityCard)
  }

  function mapCmsToSponsorRow (item: LandingNewsItem): LandingSponsor {
    return {
      name: item.title || 'Community Partner',
      description: item.summary || 'Supporting innovation in the local developer community.',
      link: item.link || '',
      logo: item.imageUrl || undefined
    }
  }

  function buildSponsorsAndPartners (cmsApproved: LandingNewsItem[]) {
    const sponsorRows: LandingSponsor[] = []
    const partnerRows: LandingSponsor[] = []

    for (const item of cmsApproved) {
      const f = toFilterText(item.filters).toLowerCase()
      const hasSponsor = f.includes('sponsor')
      const hasPartner = /\bpartner\b/.test(f) || f.includes('venue partner')

      const row = mapCmsToSponsorRow(item)
      if (hasPartner && !hasSponsor) {
        partnerRows.push({ ...row, tier: 'Partner' })
      } else if (hasSponsor) {
        sponsorRows.push({ ...row, tier: 'Sponsor' })
      }
    }

    if (sponsorRows.length > 0 || partnerRows.length > 0) {
      sponsors.value = sponsorRows.slice(0, LANDING_SPONSORS_PARTNERS_MAX)
      partners.value = partnerRows.slice(0, LANDING_SPONSORS_PARTNERS_MAX)
      return
    }

    sponsors.value = [
      {
        name: 'Tech Savvy Community Partners',
        tier: 'Community Sponsor',
        description: 'Helping fund educational programs and developer activities.',
        logo: SAMPLE_BRAND_LOGOS.codebev
      },
      {
        name: 'CloudStack Asia',
        tier: 'Infrastructure Sponsor',
        description: 'Credits and tooling for learning environments.',
        logo: SAMPLE_BRAND_LOGOS.cloud
      }
    ]
    partners.value = [
      {
        name: 'Workflow Co-Working Space',
        tier: 'Venue Partner',
        description: 'Host venue supporting workshops, talks, and build sessions.',
        link: 'https://www.techsavvies.space',
        logo: SAMPLE_BRAND_LOGOS.venue
      },
      {
        name: 'Misamis Digital Guild',
        tier: 'Education Partner',
        description: 'Scholarships and learning resources for cohort members.',
        logo: SAMPLE_BRAND_LOGOS.education
      }
    ]
  }

  async function loadData () {
    if (import.meta.client) {
      await refreshLandingCmsList()
    }
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      newsItems.value = fromApi as LandingNewsItem[]
    } else {
      const mapped = await fetchCmsListMapped()
      if (mapped.length > 0) {
        newsItems.value = mapped
      }
    }

    const { token, init: initAuth } = useAuth()
    if (import.meta.client) initAuth()
    const hasMemberAccess = !!token.value

    if (!hasMemberAccess) {
      projects.value = []
      coursesPreview.value = []
      calendarEvents.value = []
      eventReminders.value = []
    }

    try {
      const { refreshMainPageContent, projects: cmsProjects, eventReminders: cmsEvents, sponsors: cmsSponsors, partners: cmsPartners } = useMainPageCms()
      await refreshMainPageContent()

      if (hasMemberAccess && cmsProjects.value.length > 0) {
        projects.value = cmsProjects.value.slice(0, LANDING_SECTION_MAX_CARDS).map((p) => ({
          title: p.title,
          domain: p.domain,
          developer: p.developer,
          url: p.url,
          image: p.image,
          alt: p.title
        }))
      }

      if (hasMemberAccess && cmsEvents.value.length > 0) {
        calendarEvents.value = cmsEvents.value.map((e) => ({
          date: e.date,
          time: e.time,
          endTime: e.endTime || '',
          title: e.title,
          description: e.description || '',
          link: e.link || '',
          kind: mapDashboardCalKind(e.kind)
        })).sort((a, b) => (a.date || '').localeCompare(b.date || ''))
        eventReminders.value = calendarEvents.value
      }

      if (cmsSponsors.value.length > 0 || cmsPartners.value.length > 0) {
        sponsors.value = cmsSponsors.value.map((s) => ({
          name: s.name,
          tier: 'Sponsor',
          description: 'Official Community Sponsor',
          link: s.websiteUrl,
          logo: s.logoUrl
        }))
        partners.value = cmsPartners.value.map((p) => ({
          name: p.name,
          tier: 'Partner',
          description: 'Community Partner',
          link: p.websiteUrl,
          logo: p.logoUrl
        }))
      }

      const { fetchCmsProjects, fetchCmsCourses } = useCmsNews()
      if (hasMemberAccess && projects.value.length === 0) {
        const proj = await fetchCmsProjects()
        if (Array.isArray(proj) && proj.length > 0) {
          projects.value = proj
            .slice(0, LANDING_SECTION_MAX_CARDS)
            .map((p) => ({ title: p.title, domain: p.domain, developer: p.developer, url: p.url, image: p.image, alt: p.alt }))
        }
      }
      if (hasMemberAccess) {
        const courses = await fetchCmsCourses()
        if (Array.isArray(courses) && courses.length > 0) {
          coursesPreview.value = courses.slice(0, LANDING_SECTION_MAX_CARDS).map((c) => ({
            slug: c.slug,
            title: c.title,
            instructor: c.instructor,
            rating: c.rating,
            duration: c.duration,
            badge: c.badge,
            image: c.image
          }))
        }
      }
    } catch { /* keep empty */ }

    try {
      const api = useDashboardApi()
      if (hasMemberAccess && api.hasApi()) {
        const events = await api.getCalendarEvents()
        if (Array.isArray(events) && events.length > 0) {
          calendarEvents.value = events
            .map((e) => ({
              date: e.date,
              time: e.time,
              endTime: e.end_time || e.endTime || '',
              title: e.title,
              description: e.description,
              link: e.link,
              kind: mapDashboardCalKind(e.kind)
            }))
            .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
        }
      }
    } catch { /* keep empty */ }

    try {
      const raw = getStorage(APPROVED_NEWS_KEY)
      const approved = JSON.parse(raw || '[]')
      if (Array.isArray(approved) && approved.length > 0) {
        newsItems.value = [...approved, ...newsItems.value]
      }
    } catch { /* keep as is */ }

    try {
      const raw = getStorage(CALENDAR_KEY)
      const events = JSON.parse(raw || '[]')
      if (events.length > 0) {
        calendarEvents.value = [...events].sort((a: { date: string }, b: { date: string }) =>
          (a.date || '').localeCompare(b.date || '')
        )
      }
    } catch { /* keep as is */ }

    if (hasMemberAccess) {
      const cmsCal = landingNewsToCalendarRows(resolvedNewsItems.value)
      if (cmsCal.length > 0) {
        calendarEvents.value = [...cmsCal, ...calendarEvents.value].sort((a, b) =>
          (a.date || '').localeCompare(b.date || '')
        )
      }

      calendarEvents.value = dedupeLandingCalEvents(calendarEvents.value)

      const now = new Date()
      eventReminders.value = [...calendarEvents.value]
        .filter((event) => {
          const dt = new Date(event.date)
          return !Number.isNaN(dt.getTime()) && dt >= now
        })
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
        .slice(0, 5)
    }

    try {
      if (apiBase) {
        const membersUrl = `${apiBase.replace(/\/$/, '')}/member/list/`
        const members = await $fetch<MemberRoleApiItem[] | Record<string, unknown> | unknown>(membersUrl)
        let normalized: MemberRoleApiItem[] = []
        if (Array.isArray(members)) {
          normalized = members as MemberRoleApiItem[]
        } else if (members && typeof members === 'object' && Array.isArray((members as Record<string, unknown>).results)) {
          normalized = (members as { results: MemberRoleApiItem[] }).results
        }
        if (normalized.length > 0) {
          buildRoleStats(normalized)
          applyCommunityMembersFromApi(normalized)
        }
      }
    } catch { /* keep fallback values */ }

    buildSponsorsAndPartners(resolvedNewsItems.value)
    if (communityRoleStats.value.length === 0) {
      communityRoleStats.value = [{ role: 'Member', count: 1, percent: 100 }]
    }
    if (typeof document !== 'undefined') {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = (entry.target as HTMLElement).id
              if (id && ['news', 'courses', 'about', 'projects', 'merch', 'events-reminders', 'community-sponsors', 'community-people'].includes(id)) {
                setLastHomeSection(id)
              }
            }
          })
        },
        { threshold: 0.2, rootMargin: '-20% 0px -20% 0px' }
      )
      ;['news', 'courses', 'about', 'projects', 'merch', 'events-reminders', 'community-sponsors', 'community-people'].forEach((id) => {
        const el = document.getElementById(id)
        if (el) sectionObserver.observe(el)
      })
    }

    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash && ['#news', '#courses', '#about', '#projects', '#merch', '#events-reminders', '#community-sponsors', '#community-people'].includes(hash)) {
      nextTick(() => scrollToSection(hash))
    }
  }

  return {
    newsItems,
    projects,
    coursesPreview,
    calendarEvents,
    eventReminders,
    communityRoleStats,
    speakers,
    sponsors,
    partners,
    newsItemsDisplay,
    scrollToSection,
    onHeaderSearch,
    loadData,
    DEFAULT_NEWS_IMAGE,
    DEFAULT_PROJECT_IMAGE,
    DEFAULT_COURSE_IMAGE
  }
}
