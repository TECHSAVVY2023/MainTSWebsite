<template>
  <div>
    <section
      id="events-reminders"
      class="min-h-screen pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden flex flex-col"
    >
      <SectionWires gradient-id-prefix="swg-events-reminders" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
              <SectionWireShield :wide="false">
                <div class="max-w-[42rem]">
                  <div class="mb-1 flex flex-wrap items-center gap-2">
                    <h2 class="text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                      Event Reminders
                    </h2>
                    <span
                      v-if="lockedReminders"
                      class="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800 sm:text-[11px]"
                    >
                      <i class="fas fa-lock text-[9px]" aria-hidden="true" />
                      Members
                    </span>
                  </div>
                  <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                    Upcoming events and schedules for the community.
                  </p>
                </div>
              </SectionWireShield>
              <SectionWireShield :wide="false">
                <NuxtLink
                  :to="lockedReminders ? '/login' : '/#events-reminders'"
                  class="inline-flex items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border px-3.5 py-2 text-xs font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:text-sm"
                >
                  <template v-if="lockedReminders">
                    <i class="fas fa-lock text-[10px]" aria-hidden="true" />
                    Sign in to view
                  </template>
                  <template v-else>
                    Community Hub
                  </template>
                </NuxtLink>
              </SectionWireShield>
            </div>
          </div>
          <div
            class="relative"
            :class="lockedReminders ? 'max-h-[24rem] overflow-hidden sm:max-h-none' : ''"
          >
            <EventsReminderSection :reminders="safeReminders" />
            <div
              v-if="lockedReminders"
              class="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-neutral-gray/40 px-3 py-4 backdrop-blur-[2px] sm:items-center sm:bg-neutral-gray/70 sm:px-6 sm:py-10 sm:backdrop-blur-[5px]"
            >
              <div class="w-full max-w-[18rem] rounded-2xl border border-violet-200/80 bg-white/95 px-4 py-5 text-center shadow-[0_14px_32px_rgba(46,19,104,0.10)] sm:max-w-sm sm:px-6 sm:py-8 sm:shadow-[0_20px_50px_rgba(46,19,104,0.12)]">
                <div class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 sm:mb-4 sm:h-14 sm:w-14">
                  <i class="fas fa-lock text-xl sm:text-2xl" aria-hidden="true" />
                </div>
                <p class="text-[15px] font-bold text-dark sm:text-lg">
                  Member access
                </p>
                <p class="mt-1.5 text-xs leading-relaxed text-dark/65 sm:mt-2 sm:text-sm">
                  Sign in with your community account to unlock event reminders and upcoming schedules.
                </p>
                <NuxtLink
                  to="/login"
                  class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-violet-800 sm:mt-5 sm:py-3"
                >
                  <i class="fas fa-sign-in-alt text-xs" aria-hidden="true" />
                  Sign in
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="community-sponsors"
      class="min-h-screen pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden flex flex-col"
    >
      <SectionWires gradient-id-prefix="swg-community-sponsors" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
              <SectionWireShield :wide="false">
                <div class="max-w-[42rem]">
                  <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                    Sponsors &amp; partners
                  </h2>
                  <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                    Sponsors and community partners supporting our initiatives.
                  </p>
                </div>
              </SectionWireShield>
              <SectionWireShield :wide="false">
                <span class="inline-flex items-center rounded-full border border-accent-purple/25 bg-violet-border px-3.5 py-2 text-xs font-medium text-accent-purple sm:text-sm">
                  Partners
                </span>
              </SectionWireShield>
            </div>
          </div>
          <SponsorsSection :sponsors="safeSponsors" :partners="safePartners" />
        </div>
      </div>
    </section>

    <section
      id="community-people"
      class="min-h-screen pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden flex flex-col"
    >
      <SectionWires gradient-id-prefix="swg-community-people" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="w-11/12 mx-auto relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
              <SectionWireShield :wide="false">
                <div class="max-w-[42rem]">
                  <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                    Community Members & Speakers
                  </h2>
                  <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                    Community members breakdown with a modern speaker showcase.
                  </p>
                </div>
              </SectionWireShield>
              <SectionWireShield :wide="false">
                <div class="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    :class="hubFilterPillClass(membersView === 'all')"
                    :aria-pressed="membersView === 'all'"
                    @click="membersView = 'all'"
                  >
                    Members
                  </button>
                  <button
                    type="button"
                    :class="hubFilterPillClass(membersView === 'speakers')"
                    :aria-pressed="membersView === 'speakers'"
                    @click="membersView = 'speakers'"
                  >
                    Speakers
                  </button>
                </div>
              </SectionWireShield>
            </div>
          </div>
          <p
            v-if="displayedPeople.length === 0 && membersView === 'speakers'"
            class="mb-6 text-sm text-dark/65"
            role="status"
          >
            No members are listed as speakers yet. Switch to &ldquo;Members&rdquo; or add speaker roles in the directory.
          </p>
          <SpeakersSection v-if="displayedPeople.length > 0" :speakers="displayedPeople" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import EventsReminderSection from '~/components/community/EventsReminderSection.vue'
import SponsorsSection from '~/components/community/SponsorsSection.vue'
import SpeakersSection from '~/components/community/SpeakersSection.vue'
import { SAMPLE_BRAND_LOGOS } from '~/constants/sampleMedia'

type EventReminderItem = {
  title?: string
  date?: string
  time?: string
  endTime?: string
  description?: string
  link?: string
  kind?: 'task' | 'event' | 'reminder' | 'appointment'
}

type SpeakerItem = {
  name: string
  role?: string
  topic?: string
  link?: string
  image?: string
  isSpeaker?: boolean
}

type SponsorItem = {
  name: string
  tier?: string
  description?: string
  link?: string
  logo?: string
}

const props = defineProps<{
  lockedReminders?: boolean
  reminders?: EventReminderItem[] | unknown
  speakers?: SpeakerItem[] | unknown
  sponsors?: SponsorItem[] | unknown
  partners?: SponsorItem[] | unknown
}>()

function daysFromNow (n: number): string {
  return new Date(Date.now() + n * 24 * 60 * 60 * 1000).toISOString()
}

const FALLBACK_REMINDERS_LOCAL: EventReminderItem[] = [
  { title: 'Assessment With ITSG', date: daysFromNow(1), time: '09:00 AM', endTime: '10:15 AM', description: 'Quarterly skills review.', kind: 'task' },
  { title: 'Brief internship sync', date: daysFromNow(2), time: '10:30 AM', endTime: '11:45 AM', description: 'Intern check-in.', kind: 'event' },
  { title: 'Meeting with Saban K.', date: daysFromNow(2), time: '02:00 PM', endTime: '03:30 PM', description: 'Project alignment.', kind: 'appointment' },
  { title: 'Consultation Research', date: daysFromNow(3), time: '11:00 AM', endTime: '12:00 PM', description: 'Research planning.', kind: 'reminder' },
  { title: 'Analysis Project Mint', date: daysFromNow(4), time: '01:00 PM', endTime: '02:30 PM', description: 'Sprint review.', kind: 'event' },
  { title: 'Community stand-up', date: daysFromNow(5), time: '08:00 AM', endTime: '09:00 AM', description: 'Daily sync.', kind: 'task' },
  { title: 'Frontend Workshop', date: daysFromNow(6), time: '06:30 PM', endTime: '08:00 PM', description: 'UI patterns lab.', kind: 'event' },
  { title: 'Tech Savvy Monthly Meetup', date: daysFromNow(7), time: '07:00 PM', endTime: '08:30 PM', description: 'Networking night.', kind: 'reminder' },
  { title: 'Mentor office hours', date: daysFromNow(8), time: '04:00 PM', endTime: '05:00 PM', description: 'Open Q&A.', kind: 'appointment' },
  { title: 'Code review circle', date: daysFromNow(9), time: '10:00 AM', endTime: '11:30 AM', description: 'Peer reviews.', kind: 'task' },
  { title: 'Sponsor thank-you call', date: daysFromNow(10), time: '03:00 PM', endTime: '04:15 PM', description: 'Partner outreach.', kind: 'appointment' },
  { title: 'Career Mentoring Night', date: daysFromNow(11), time: '08:00 PM', endTime: '09:30 PM', description: 'Portfolio feedback.', kind: 'event' }
]

const FALLBACK_SPEAKERS: SpeakerItem[] = [
  { name: 'Maria Santos', role: 'Lead Engineer', topic: 'Vue 3 composition API and production Nuxt apps', isSpeaker: true },
  { name: 'James Rivera', role: 'Full-stack Mentor', topic: 'REST APIs, auth, and PostgreSQL in practice', isSpeaker: true },
  { name: 'Ana Cruz', role: 'Frontend Specialist', topic: 'Accessible UI and design systems', isSpeaker: false },
  { name: 'Luis Mendoza', role: 'DevOps Advocate', topic: 'CI/CD and cloud deployments for small teams', isSpeaker: false },
  { name: 'Priya Nair', role: 'Backend Lead', topic: 'Django, async tasks, and API design', isSpeaker: true },
  { name: 'Carlos Vega', role: 'Mobile & Web', topic: 'Responsive apps and offline-first patterns', isSpeaker: true },
  { name: 'Elena Torres', role: 'Product & UX', topic: 'User research for developer tools', isSpeaker: true },
  { name: 'Noah Kim', role: 'Security Mentor', topic: 'OWASP basics and secure coding habits', isSpeaker: true },
  { name: 'Sofia Reyes', role: 'Data & Analytics', topic: 'SQL dashboards and metrics for community projects', isSpeaker: true },
  { name: 'Miguel Ortiz', role: 'Open Source', topic: 'Contributing to libraries and documentation', isSpeaker: true },
  { name: 'Rachel Lim', role: 'Career Coach', topic: 'Interviews, portfolios, and first developer job', isSpeaker: true },
  { name: 'David Okonkwo', role: 'Speaker', topic: 'Building side projects that ship', isSpeaker: true },
  { name: 'Ms. Jo', role: 'Tech Lead & CTO', topic: 'Modern web development and real-world delivery', isSpeaker: true },
  { name: 'Community Mentor Panel', role: 'Mentor collective', topic: 'Career readiness, code review, and collaboration', isSpeaker: true },
  { name: 'Aaron Dela Cruz', role: 'Workshop Host', topic: 'Git workflows and team collaboration', isSpeaker: true },
  { name: 'Bianca Flores', role: 'UI Engineer', topic: 'Tailwind, tokens, and consistent theming', isSpeaker: true },
  { name: 'Jordan Tan', role: 'Cloud Engineer', topic: 'Serverless patterns and cost-aware architecture', isSpeaker: true },
  { name: 'Camille Reyes', role: 'QA Mentor', topic: 'Test plans, automation basics, and release confidence', isSpeaker: true },
  { name: 'Ethan Morales', role: 'Community Lead', topic: 'Running inclusive meetups and volunteer programs', isSpeaker: true },
  { name: 'Nina Patel', role: 'Speaker', topic: 'AI tooling for developers without the hype', isSpeaker: true }
]

const FALLBACK_SPONSORS_ONLY: SponsorItem[] = [
  { name: 'Tech Savvy Community Partners', tier: 'Community Sponsor', description: 'Supporting education, events, and developer growth.', logo: SAMPLE_BRAND_LOGOS.codebev },
  { name: 'CloudStack Asia', tier: 'Infrastructure', description: 'Credits for learning environments.', logo: SAMPLE_BRAND_LOGOS.cloud },
  { name: 'Women in Tech PH — Mindanao', tier: 'Diversity Sponsor', description: 'Mentorship circles and scholarship fund.', logo: SAMPLE_BRAND_LOGOS.diversity },
  { name: 'Youth Code Initiative', tier: 'Outreach Sponsor', description: 'High school coding bootcamps and kits.', logo: SAMPLE_BRAND_LOGOS.youth },
  { name: 'Open Source Pilipinas', tier: 'Community Sponsor', description: 'Documentation sprints and speaker outreach.', logo: SAMPLE_BRAND_LOGOS.openSource },
  { name: 'Green Tech Collective', tier: 'Sustainability', description: 'Low-energy hosting tips for student projects.', logo: SAMPLE_BRAND_LOGOS.green },
  { name: 'DevRel Meetup Network', tier: 'Events Sponsor', description: 'Cross-chapter promotion and speakers.', logo: SAMPLE_BRAND_LOGOS.devrel },
  { name: 'Print & Brand Studio Ozamiz', tier: 'Creative Sponsor', description: 'Banners, stickers, and event branding.', logo: SAMPLE_BRAND_LOGOS.print }
]

const FALLBACK_PARTNERS_ONLY: SponsorItem[] = [
  { name: 'Workflow Co-Working Space', tier: 'Venue Partner', description: 'Hosting workshops, talks, and local developer sessions.', link: 'https://www.techsavvies.space', logo: SAMPLE_BRAND_LOGOS.venue },
  { name: 'Misamis Digital Guild', tier: 'Education Partner', description: 'Scholarships and learning resources for cohort members.', logo: SAMPLE_BRAND_LOGOS.education },
  { name: 'Northern Mindanao IT Council', tier: 'Advocacy Partner', description: 'Regional tech policy and industry connections.', logo: SAMPLE_BRAND_LOGOS.advocacy },
  { name: 'CodeBev Solutions', tier: 'Technology Partner', description: 'Tools and hosting support for community projects.', logo: SAMPLE_BRAND_LOGOS.codebev },
  { name: 'Local Coffee Roasters Co.', tier: 'In-kind Partner', description: 'Beverages and venue snacks for meetups.', logo: SAMPLE_BRAND_LOGOS.coffee },
  { name: 'Campus IT Student Union', tier: 'Academic Partner', description: 'Student volunteers and campus event space.', logo: SAMPLE_BRAND_LOGOS.campus },
  { name: 'Regional Startup Hub', tier: 'Innovation Partner', description: 'Pitch nights and founder office hours.', logo: SAMPLE_BRAND_LOGOS.startup },
  { name: 'Freelancers Guild MO', tier: 'Professional Partner', description: 'Contract templates and client ethics workshops.', logo: SAMPLE_BRAND_LOGOS.freelance }
]

const COMMUNITY_SPEAKERS_MAX = 8

const membersView = ref<'all' | 'speakers'>('all')

function hubFilterPillClass (active: boolean) {
  const base =
    'inline-flex shrink-0 items-center justify-center rounded-full border border-solid px-4 py-2 text-xs font-semibold transition-colors sm:text-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6126B1] focus-visible:ring-offset-2'
  return [
    base,
    active
      ? 'border-[#2E1368] bg-[#2E1368] text-white shadow-sm'
      : 'border-[#9e9e9e] bg-white text-[#1a1a1d] hover:border-[#6126B1] hover:text-[#2E1368]'
  ].join(' ')
}
const COMMUNITY_SPONSORS_MAX = 8
const COMMUNITY_PARTNERS_MAX = 8

function mergeNamedUnique<T extends { name?: string }>(primary: T[], filler: T[], minCount: number): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  const add = (item: T) => {
    const key = (item.name || '').trim().toLowerCase()
    if (!key || seen.has(key)) return
    seen.add(key)
    out.push(item)
  }
  for (const item of primary) {
    add(item)
  }
  if (out.length < minCount) {
    for (const item of filler) {
      if (out.length >= minCount) break
      add(item)
    }
  }
  return out.length > 0 ? out : filler.slice(0, minCount)
}

const safeReminders = computed(() =>
  Array.isArray(props.reminders) && props.reminders.length > 0
    ? props.reminders
    : FALLBACK_REMINDERS_LOCAL
)

const membersFromApiOrEmpty = computed(() => {
  const raw = props.speakers
  return Array.isArray(raw)
    ? raw.filter((s): s is SpeakerItem => s != null && typeof s === 'object' && typeof (s as SpeakerItem).name === 'string')
    : []
})

const membersSourceList = computed((): SpeakerItem[] => {
  const primary = membersFromApiOrEmpty.value
  if (primary.length > 0) {
    return primary
  }
  return mergeNamedUnique([], FALLBACK_SPEAKERS, COMMUNITY_SPEAKERS_MAX).slice(0, COMMUNITY_SPEAKERS_MAX)
})

const displayedPeople = computed((): SpeakerItem[] => {
  const base = membersSourceList.value
  if (membersView.value !== 'speakers') {
    return base
  }
  return base.filter((s) => s.isSpeaker === true)
})

const safeSponsors = computed(() => {
  const raw = props.sponsors
  const primary = Array.isArray(raw)
    ? raw.filter((s): s is SponsorItem => s != null && typeof s === 'object' && typeof (s as SponsorItem).name === 'string')
    : []
  return mergeNamedUnique(primary, FALLBACK_SPONSORS_ONLY, COMMUNITY_SPONSORS_MAX).slice(0, COMMUNITY_SPONSORS_MAX)
})

const safePartners = computed(() => {
  const raw = props.partners
  const primary = Array.isArray(raw)
    ? raw.filter((s): s is SponsorItem => s != null && typeof s === 'object' && typeof (s as SponsorItem).name === 'string')
    : []
  return mergeNamedUnique(primary, FALLBACK_PARTNERS_ONLY, COMMUNITY_PARTNERS_MAX).slice(0, COMMUNITY_PARTNERS_MAX)
})

</script>
