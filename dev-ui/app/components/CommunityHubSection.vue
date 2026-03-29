<template>
  <div>
    <section
      id="events-reminders"
      class="min-h-screen pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden flex flex-col"
    >
      <SectionWires gradient-id-prefix="swg-events-reminders" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <SectionWireShield>
              <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                Event Reminders
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Upcoming events and schedules for the community.
              </p>
            </SectionWireShield>
          </div>
          <EventsReminderSection :reminders="safeReminders" />
        </div>
      </div>
    </section>

    <section
      id="community-sponsors"
      class="min-h-screen pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden flex flex-col"
    >
      <SectionWires gradient-id-prefix="swg-community-sponsors" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <SectionWireShield>
              <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                Sponsors &amp; partners
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Sponsors and community partners supporting our initiatives.
              </p>
            </SectionWireShield>
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
        <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
          <div class="mb-8 sm:mb-12">
            <SectionWireShield>
              <h2 class="mb-1 text-[22px] font-bold leading-tight tracking-tight text-dark sm:text-[26px] md:text-[30px]">
                Community Members & Speakers
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Community members breakdown with a modern speaker showcase.
              </p>
            </SectionWireShield>
          </div>
          <SpeakersSection :speakers="safeSpeakers" />
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
}

type SponsorItem = {
  name: string
  tier?: string
  description?: string
  link?: string
  logo?: string
}

const props = defineProps<{
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
  { name: 'Maria Santos', role: 'Lead Engineer', topic: 'Vue 3 composition API and production Nuxt apps' },
  { name: 'James Rivera', role: 'Full-stack Mentor', topic: 'REST APIs, auth, and PostgreSQL in practice' },
  { name: 'Ana Cruz', role: 'Frontend Specialist', topic: 'Accessible UI and design systems' },
  { name: 'Luis Mendoza', role: 'DevOps Advocate', topic: 'CI/CD and cloud deployments for small teams' },
  { name: 'Priya Nair', role: 'Backend Lead', topic: 'Django, async tasks, and API design' },
  { name: 'Carlos Vega', role: 'Mobile & Web', topic: 'Responsive apps and offline-first patterns' },
  { name: 'Elena Torres', role: 'Product & UX', topic: 'User research for developer tools' },
  { name: 'Noah Kim', role: 'Security Mentor', topic: 'OWASP basics and secure coding habits' },
  { name: 'Sofia Reyes', role: 'Data & Analytics', topic: 'SQL dashboards and metrics for community projects' },
  { name: 'Miguel Ortiz', role: 'Open Source', topic: 'Contributing to libraries and documentation' },
  { name: 'Rachel Lim', role: 'Career Coach', topic: 'Interviews, portfolios, and first developer job' },
  { name: 'David Okonkwo', role: 'Speaker', topic: 'Building side projects that ship' },
  { name: 'Ms. Jo', role: 'Tech Lead & CTO', topic: 'Modern web development and real-world delivery' },
  { name: 'Community Mentor Panel', role: 'Mentor collective', topic: 'Career readiness, code review, and collaboration' },
  { name: 'Aaron Dela Cruz', role: 'Workshop Host', topic: 'Git workflows and team collaboration' },
  { name: 'Bianca Flores', role: 'UI Engineer', topic: 'Tailwind, tokens, and consistent theming' },
  { name: 'Jordan Tan', role: 'Cloud Engineer', topic: 'Serverless patterns and cost-aware architecture' },
  { name: 'Camille Reyes', role: 'QA Mentor', topic: 'Test plans, automation basics, and release confidence' },
  { name: 'Ethan Morales', role: 'Community Lead', topic: 'Running inclusive meetups and volunteer programs' },
  { name: 'Nina Patel', role: 'Speaker', topic: 'AI tooling for developers without the hype' }
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

/** 2 rows × md:grid-cols-4 in SpeakersSection / each sponsors & partners grid */
const COMMUNITY_SPEAKERS_MAX = 8
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

const safeSpeakers = computed(() => {
  const raw = props.speakers
  const primary = Array.isArray(raw)
    ? raw.filter((s): s is SpeakerItem => s != null && typeof s === 'object' && typeof (s as SpeakerItem).name === 'string')
    : []
  return mergeNamedUnique(primary, FALLBACK_SPEAKERS, COMMUNITY_SPEAKERS_MAX).slice(0, COMMUNITY_SPEAKERS_MAX)
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
