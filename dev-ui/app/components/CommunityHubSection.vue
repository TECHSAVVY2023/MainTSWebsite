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
                    Community members
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
            No members are listed as speakers yet.
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

const safeReminders = computed(() => {
  if (Array.isArray(props.reminders) && props.reminders.length > 0) {
    return props.reminders
  }
  return []
})

const membersFromApiOrEmpty = computed(() => {
  const raw = props.speakers
  return Array.isArray(raw)
    ? raw.filter((s): s is SpeakerItem => s != null && typeof s === 'object' && typeof (s as SpeakerItem).name === 'string')
    : []
})

const membersSourceList = computed((): SpeakerItem[] => {
  return membersFromApiOrEmpty.value
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
  return Array.isArray(raw)
    ? raw.filter((s): s is SponsorItem => s != null && typeof s === 'object' && typeof (s as SponsorItem).name === 'string').slice(0, COMMUNITY_SPONSORS_MAX)
    : []
})

const safePartners = computed(() => {
  const raw = props.partners
  return Array.isArray(raw)
    ? raw.filter((s): s is SponsorItem => s != null && typeof s === 'object' && typeof (s as SponsorItem).name === 'string').slice(0, COMMUNITY_PARTNERS_MAX)
    : []
})
</script>
