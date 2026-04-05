<template>
  <section
    id="calendar"
    class="min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden"
  >
    <SectionWires gradient-id-prefix="swg-calendar" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative">
        <div class="mb-8 sm:mb-12">
          <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
            Community Calendar
          </h2>
          <p class="text-sm sm:text-base text-dark/60 max-w-[42rem] leading-relaxed">
            Stay updated with workshops, meetups, and events
          </p>
        </div>

        <div class="rounded-2xl overflow-hidden bg-white backdrop-blur-[10px] border border-neutral-border">
          <!-- Toolbar -->
          <div class="flex flex-wrap items-center justify-between gap-3 p-4 md:p-5 border-b border-neutral-border bg-neutral-gray">
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="py-2 px-3.5 rounded-lg text-sm font-medium bg-white border border-neutral-border text-dark/90 transition-colors hover:bg-neutral-gray hover:border-accent-purple/30"
                @click="goToday"
              >
                Today
              </button>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="w-9 h-9 inline-flex items-center justify-center rounded-lg text-dark/80 bg-white border border-neutral-border transition-colors hover:bg-neutral-gray hover:text-dark"
                  aria-label="Previous month"
                  @click="prevMonth"
                >
                  <i class="fas fa-chevron-left" />
                </button>
                <button
                  type="button"
                  class="w-9 h-9 inline-flex items-center justify-center rounded-lg text-dark/80 bg-white border border-neutral-border transition-colors hover:bg-neutral-gray hover:text-dark"
                  aria-label="Next month"
                  @click="nextMonth"
                >
                  <i class="fas fa-chevron-right" />
                </button>
              </div>
            </div>
            <h3 class="text-xl font-bold text-dark">
              {{ monthLabel }}
            </h3>
            <a
              href="https://calendar.google.com/calendar/embed?src=en.philippines%23holiday%40group.v.calendar.google.com&ctz=Asia%2FManila&mode=AGENDA"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-dark/80 hover:text-dark border border-neutral-border hover:border-accent-purple/30 transition-colors"
            >
              <i class="fas fa-external-link-alt mr-2" />
              Google Calendar
            </a>
          </div>

          <!-- Day headers -->
          <div class="grid grid-cols-7 text-center text-xs font-semibold text-dark/60 uppercase tracking-wider border-b border-neutral-border bg-neutral-gray">
            <div v-for="d in dayLabels" :key="d" class="py-3">{{ d }}</div>
          </div>

          <!-- Month grid -->
          <div class="bg-white">
            <div
              v-for="(week, wi) in grid"
              :key="wi"
              class="grid grid-cols-7 min-h-[80px] sm:min-h-[100px]"
            >
              <div
                v-for="(day, di) in week"
                :key="di"
                class="border-b border-r border-neutral-border p-1.5 sm:p-2 flex flex-col bg-white last:border-r-0"
                :class="{
                  'bg-accent-purple/10': day.isCurrentMonth && day.isToday,
                  'opacity-50': !day.isCurrentMonth
                }"
              >
                <div class="flex items-center justify-between mb-1">
                  <span
                    v-if="day.date"
                    class="text-sm font-medium"
                    :class="day.isToday ? 'calendar-cell-today inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-purple/35 text-dark font-bold' : 'text-dark/90'"
                  >
                    {{ day.dayNum }}
                  </span>
                  <span v-if="day.date && day.isCurrentMonth" class="text-[10px] text-dark/50 hidden sm:inline">{{ day.monthLabel }}</span>
                </div>
                <div class="flex-1 space-y-1 overflow-hidden">
                  <template v-for="(ev, ei) in day.events" :key="ei">
                    <a
                      v-if="ev.link"
                      :href="ev.link"
                      target="_blank"
                      rel="noopener"
                      class="block rounded px-1.5 py-0.5 text-[10px] sm:text-xs font-medium truncate transition-opacity hover:opacity-90"
                      :class="ei % 2 === 0 ? 'bg-violet-border text-accent-purple border-l-2 border-l-accent-purple' : 'bg-green-500/25 text-green-300 border-l-2 border-l-green-500'"
                      :title="ev.title + (ev.time ? ' · ' + ev.time : '')"
                    >
                      {{ ev.title || 'Event' }}{{ ev.time ? ` · ${ev.time}` : '' }}
                    </a>
                    <div
                      v-else
                      class="rounded px-1.5 py-0.5 text-[10px] sm:text-xs font-medium truncate"
                      :class="ei % 2 === 0 ? 'bg-violet-border text-accent-purple border-l-2 border-l-accent-purple' : 'bg-green-500/25 text-green-300 border-l-2 border-l-green-500'"
                      :title="ev.title + (ev.time ? ' · ' + ev.time : '')"
                    >
                      {{ ev.title || 'Event' }}{{ ev.time ? ` · ${ev.time}` : '' }}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type CalEvent = { date: string; time?: string; title?: string; description?: string; link?: string }
type CalDay = {
  date: Date | null
  dayNum: number
  monthLabel: string
  isCurrentMonth: boolean
  isToday: boolean
  events: CalEvent[]
}

const props = defineProps<{
  events?: CalEvent[] | unknown
}>()

const safeEvents = computed(() => {
  const raw = props.events
  return Array.isArray(raw) ? raw : []
})

const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const viewDate = ref<Date>(new Date())

const monthLabel = computed(() => {
  const d = viewDate.value
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const grid = computed(() => {
  const view = viewDate.value
  const year = view.getFullYear()
  const month = view.getMonth()
  const today = new Date()
  const todayISO =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0')

  const eventsByDate: Record<string, CalEvent[]> = {}
  safeEvents.value.forEach((ev) => {
    const iso = (ev.date || '').slice(0, 10)
    if (!eventsByDate[iso]) eventsByDate[iso] = []
    eventsByDate[iso].push(ev)
  })

  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startDow = first.getDay()
  const daysInMonth = last.getDate()

  const weeks: CalDay[][] = []
  let week: CalDay[] = []
  for (let i = 0; i < startDow; i++) {
    const prev = new Date(year, month, 1 - (startDow - i))
    const iso =
      prev.getFullYear() +
      '-' +
      String(prev.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(prev.getDate()).padStart(2, '0')
    week.push({
      date: prev,
      dayNum: prev.getDate(),
      monthLabel: prev.toLocaleDateString('en-US', { month: 'short' }),
      isCurrentMonth: false,
      isToday: iso === todayISO,
      events: eventsByDate[iso] || []
    })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const iso = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0')
    week.push({
      date,
      dayNum: d,
      monthLabel: date.toLocaleDateString('en-US', { month: 'short' }),
      isCurrentMonth: true,
      isToday: iso === todayISO,
      events: eventsByDate[iso] || []
    })
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }
  if (week.length > 0) {
    let d = 1
    while (week.length < 7) {
      const next = new Date(year, month + 1, d++)
      const iso =
        next.getFullYear() +
        '-' +
        String(next.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(next.getDate()).padStart(2, '0')
      week.push({
        date: next,
        dayNum: next.getDate(),
        monthLabel: next.toLocaleDateString('en-US', { month: 'short' }),
        isCurrentMonth: false,
        isToday: iso === todayISO,
        events: eventsByDate[iso] || []
      })
    }
    weeks.push(week)
  }
  return weeks
})

function prevMonth() {
  const d = new Date(viewDate.value)
  d.setMonth(d.getMonth() - 1)
  viewDate.value = d
}

function nextMonth() {
  const d = new Date(viewDate.value)
  d.setMonth(d.getMonth() + 1)
  viewDate.value = d
}

function goToday() {
  viewDate.value = new Date()
}
</script>
