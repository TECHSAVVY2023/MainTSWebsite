/**
 * Landing page composable: news, projects, courses, calendar, scroll, search.
 */
import {
  SAMPLE_NEWS,
  SAMPLE_PROJECTS,
  SAMPLE_COURSES,
  SAMPLE_BRAND_LOGOS,
  DEFAULT_NEWS_IMAGE,
  DEFAULT_COURSE_IMAGE,
  DEFAULT_PROJECT_IMAGE
} from '~/constants/sampleMedia'

const APPROVED_NEWS_KEY = 'approvedNewsForLanding'
const CALENDAR_KEY = 'calendarEventsForLanding'
const CMS_LIST_PATH = '/techsavvy_app/cms/list/'

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

function getFirstFileUrl (files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null): string {
  if (!files) return ''
  if (Array.isArray(files)) return files[0]?.url || ''
  if (typeof files === 'object') return files.url || ''
  return ''
}

function isNewsItem (item: { filters?: string | Record<string, unknown> | null }): boolean {
  const f = toFilterText(item.filters)
  if (!f.trim()) return true // no category set → treat as news (legacy items)
  return NEWS_CATEGORIES.some((cat) => f.split(',').map((s) => s.trim()).includes(cat)) || f.toLowerCase().includes('news and update')
}
export type LandingProjectItem = { title: string; domain?: string; url: string; image?: string; alt?: string }
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
export type LandingSpeaker = { name: string; role?: string; topic?: string; link?: string }
export type LandingSponsor = { name: string; tier?: string; description?: string; link?: string; logo?: string }

const FALLBACK_NEWS_ITEMS: LandingNewsItem[] = [
  {
    id: 'sample-news-1',
    date: '2026-03-10',
    title: 'Code Camp Batch Opens',
    summary: 'Applications are now open for the next full-stack learning batch.',
    description: 'Applications are now open for the next full-stack learning batch with guided mentorship and practical project work.',
    imageUrl: SAMPLE_NEWS.codecamp,
    link: '/news'
  },
  {
    id: 'sample-news-2',
    date: '2026-03-05',
    title: 'Community Demo Night',
    summary: 'Learners showcased portfolio projects to mentors and peers.',
    description: 'Learners showcased portfolio projects to mentors and peers during our monthly community demo night.',
    imageUrl: SAMPLE_NEWS.demoNight,
    link: '/news'
  },
  {
    id: 'sample-news-3',
    date: '2026-02-28',
    title: 'Mentor Spotlight Series',
    summary: 'A new talk series on modern frontend and backend workflows.',
    description: 'A new talk series featuring practical sessions on modern frontend and backend development workflows.',
    imageUrl: SAMPLE_NEWS.mentor,
    link: '/news'
  },
  {
    id: 'sample-news-4',
    date: '2026-02-20',
    title: 'Student Success Stories',
    summary: 'Graduates shared real project journeys and career progress.',
    description: 'Recent graduates shared real project journeys, lessons learned, and their career progress in tech.',
    imageUrl: SAMPLE_NEWS.success,
    link: '/news'
  }
]

const FALLBACK_PROJECTS: LandingProjectItem[] = [
  {
    title: 'CampusMart E-commerce',
    domain: 'Retail Platform',
    url: '/projects',
    image: SAMPLE_PROJECTS.ecommerce,
    alt: 'Sample e-commerce project preview'
  },
  {
    title: 'BookNook Marketplace',
    domain: 'Online Book Store',
    url: '/projects',
    image: SAMPLE_PROJECTS.books,
    alt: 'Sample marketplace project preview'
  },
  {
    title: 'Farm2Door Shop',
    domain: 'Local Produce Store',
    url: '/projects',
    image: SAMPLE_PROJECTS.farm,
    alt: 'Sample produce store project preview'
  },
  {
    title: 'LearnHub LMS',
    domain: 'Education Platform',
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
}

type CmsApiItem = {
  id?: number
  title?: string
  descriptions?: string
  approval_status?: string
  filters?: string | Record<string, unknown> | null
  links?: string[]
  files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null
  images?: string[]
  created_at?: string
}

function mapCmsToNewsItem (
  cms: { id?: number; title?: string; descriptions?: string; approval_status?: string; filters?: string | Record<string, unknown> | null; links?: string[]; files?: { name?: string; url?: string }[] | { name?: string; url?: string } | null; images?: string[]; created_at?: string },
  baseUrl: string
) {
  const imgFromImages = Array.isArray(cms.images) && cms.images[0] ? cms.images[0] : ''
  let fileUrl = imgFromImages || getFirstFileUrl(cms.files)
  if (fileUrl && baseUrl && !fileUrl.startsWith('http')) {
    const origin = baseUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
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

  const { data: cmsListFromApi } = useAsyncData(
    'landing-cms-list',
    async () => {
      if (!apiBase) return []
      try {
        const url = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
        const data = await $fetch<unknown>(url)
        const list = normalizeCmsList(data)
        return (list as { approval_status?: string }[])
          .filter((item) => item.approval_status === 'approved')
          .map((item: unknown) => mapCmsToNewsItem(item as CmsApiItem, apiBase))
      } catch {
        return []
      }
    },
    { server: true, default: () => [] }
  )

  const newsItemsDisplay = computed(() =>
    newsItems.value
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

  function buildSpeakers (members: MemberRoleApiItem[]) {
    const topSpeakers = members
      .filter((member) => {
        const role = normalizeRole(member.role).toLowerCase()
        return role.includes('speaker') || role.includes('mentor') || role.includes('instructor')
      })
      .slice(0, 6)
      .map((member) => ({
        name: `${member.firstname || ''} ${member.lastname || ''}`.trim() || 'Guest Speaker',
        role: normalizeRole(member.role),
        topic: 'Practical full-stack development and career growth',
        link: member.website || ''
      }))

    if (topSpeakers.length > 0) {
      speakers.value = topSpeakers
      return
    }

    speakers.value = [
      { name: 'Ms. Jo', role: 'Tech Lead & CTO', topic: 'Modern web development and real-world delivery' },
      { name: 'Community Mentor Panel', role: 'Mentor', topic: 'Career readiness, code review, and collaboration' }
    ]
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
    const fromApi = cmsListFromApi.value
    if (Array.isArray(fromApi) && fromApi.length > 0) {
      newsItems.value = fromApi as LandingNewsItem[]
    } else if (apiBase) {
      try {
        const cmsUrl = `${apiBase.replace(/\/$/, '')}${CMS_LIST_PATH}`
        const res = await fetch(cmsUrl)
        const data = await res.json().catch(() => null)
        const list = normalizeCmsList(data)
        if (res.ok && list.length > 0) {
          const mapped = (list as { approval_status?: string }[])
            .filter((item) => item.approval_status === 'approved')
            .map((item: unknown) => mapCmsToNewsItem(item as Parameters<typeof mapCmsToNewsItem>[0], apiBase))
          if (mapped.length > 0) newsItems.value = mapped
        }
      } catch { /* fall through */ }
    }

    try {
      const { fetchCmsProjects, fetchCmsCourses } = useCmsNews()
      const proj = await fetchCmsProjects()
      if (Array.isArray(proj) && proj.length > 0) {
        projects.value = proj
          .slice(0, LANDING_SECTION_MAX_CARDS)
          .map((p) => ({ title: p.title, domain: p.domain, url: p.url, image: p.image, alt: p.alt }))
      }
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
    } catch { /* keep empty */ }

    try {
      const api = useDashboardApi()
      if (api.hasApi()) {
        const events = await api.getCalendarEvents()
        if (Array.isArray(events) && events.length > 0) {
          calendarEvents.value = events
            .map((e) => ({ date: e.date, time: e.time, title: e.title, description: e.description, link: e.link }))
            .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
        }
      }
    } catch { /* keep empty */ }

    const now = new Date()
    eventReminders.value = [...calendarEvents.value]
      .filter((event) => {
        const dt = new Date(event.date)
        return !Number.isNaN(dt.getTime()) && dt >= now
      })
      .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      .slice(0, 5)

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
        eventReminders.value = [...calendarEvents.value]
          .filter((event) => {
            const dt = new Date(event.date)
            return !Number.isNaN(dt.getTime()) && dt >= now
          })
          .slice(0, 5)
      }
    } catch { /* keep as is */ }

    try {
      if (apiBase) {
        const membersUrl = `${apiBase.replace(/\/$/, '')}/techsavvy_members/member/list/`
        const members = await $fetch<MemberRoleApiItem[] | unknown>(membersUrl)
        const normalized = Array.isArray(members) ? members : []
        if (normalized.length > 0) {
          buildRoleStats(normalized)
          buildSpeakers(normalized)
        }
      }
    } catch { /* keep fallback values */ }

    buildSponsorsAndPartners(newsItems.value)
    if (newsItems.value.length === 0) {
      newsItems.value = [...FALLBACK_NEWS_ITEMS].slice(0, LANDING_SECTION_MAX_CARDS)
    }
    if (projects.value.length === 0) {
      projects.value = [...FALLBACK_PROJECTS].slice(0, LANDING_SECTION_MAX_CARDS)
    }
    if (coursesPreview.value.length === 0) {
      coursesPreview.value = [...FALLBACK_COURSES].slice(0, LANDING_SECTION_MAX_CARDS)
    }
    if (calendarEvents.value.length === 0) {
      calendarEvents.value = [...FALLBACK_REMINDERS]
    }
    if (eventReminders.value.length === 0) {
      eventReminders.value = [...FALLBACK_REMINDERS]
    }
    if (communityRoleStats.value.length === 0) {
      communityRoleStats.value = [{ role: 'Member', count: 1, percent: 100 }]
    }
    if (speakers.value.length === 0) {
      buildSpeakers([])
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
