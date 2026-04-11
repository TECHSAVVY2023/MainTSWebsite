<template>
  <section
    class="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-[0_8px_40px_rgba(46,19,104,0.08)] sm:p-6"
  >
    <div class="flex flex-col gap-8 xl:flex-row xl:gap-10">
      <!-- Sidebar: calendar + scheduled toggles -->
      <aside class="w-full shrink-0 space-y-0 xl:w-[min(100%,288px)]">
        <div
          class="overflow-hidden rounded-2xl border border-violet-200/60 bg-gradient-to-b from-violet-50/80 to-zinc-50/90 shadow-sm"
        >
          <div class="border-b border-violet-100/80 bg-white/70 px-4 pb-3 pt-4">
            <div class="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-white text-violet-800 shadow-sm transition-colors hover:border-violet-400 hover:bg-violet-50"
                aria-label="Previous month"
                @click="shiftMonth(-1)"
              >
                <span class="text-lg leading-none" aria-hidden="true">‹</span>
              </button>
              <span class="text-sm font-bold tabular-nums text-zinc-900">{{ monthLabel }}</span>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-white text-violet-800 shadow-sm transition-colors hover:border-violet-400 hover:bg-violet-50"
                aria-label="Next month"
                @click="shiftMonth(1)"
              >
                <span class="text-lg leading-none" aria-hidden="true">›</span>
              </button>
            </div>
            <div class="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-violet-600/90">
              <span v-for="d in weekdayLabels" :key="d">{{ d }}</span>
            </div>
            <div class="grid grid-cols-7 gap-1.5">
              <template v-for="(cell, i) in calendarCells" :key="'c-' + i">
                <span v-if="cell === null" class="aspect-square min-h-[2.25rem] max-h-10" />
                <button
                  v-else
                  type="button"
                  :aria-pressed="isCellSelected(cell)"
                  :aria-label="dayButtonLabel(cell)"
                  class="relative flex min-h-[2.25rem] max-h-10 flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all duration-150"
                  :class="cellClasses(cell)"
                  @click="selectDay(cell)"
                >
                  <span class="leading-none">{{ cell.day }}</span>
                  <span
                    v-if="eventCountOnDay(cell.day) > 0"
                    class="mt-0.5 flex h-3 items-end justify-center gap-0.5"
                    aria-hidden="true"
                  >
                    <span
                      v-for="i in dotsForDay(cell.day)"
                      :key="i"
                      class="h-1 w-1 shrink-0 rounded-full bg-violet-600"
                    />
                  </span>
                </button>
              </template>
            </div>
            <p class="mt-3 text-[11px] leading-snug text-zinc-500">
              <span class="font-medium text-violet-700">Tip:</span>
              click a date to filter the schedule; click again to show all dates.
            </p>
            <div
              v-if="dayFilterActive"
              class="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/90 px-3 py-2"
            >
              <span class="text-[11px] font-semibold text-violet-900">{{ selectedDateLabel }}</span>
              <button
                type="button"
                class="rounded-lg border border-violet-300 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-800 transition-colors hover:bg-violet-100"
                @click="clearDayFilter"
              >
                Show all dates
              </button>
            </div>
          </div>

          <div class="border-t border-violet-100/80 bg-white/80 px-4 py-3">
            <p class="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              Scheduled
            </p>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-zinc-800">
              <input v-model="showHoliday" type="checkbox" class="rounded border-zinc-300 text-violet-600 focus:ring-violet-500/30">
              Holiday
            </label>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-zinc-800">
              <input v-model="showRemindersKind" type="checkbox" class="rounded border-zinc-300 text-violet-600 focus:ring-violet-500/30">
              Reminders
            </label>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-zinc-800">
              <input v-model="showTaskKind" type="checkbox" class="rounded border-zinc-300 text-violet-600 focus:ring-violet-500/30">
              Task
            </label>
          </div>
        </div>
      </aside>

      <!-- Main: schedule -->
      <div class="min-w-0 flex-1 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h3 class="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
              Schedule
            </h3>
            <p v-if="dayFilterActive" class="mt-1 text-xs text-violet-700">
              Filtered to {{ selectedDateLabel }} · matches current tab &amp; checkboxes
            </p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-lg leading-none text-zinc-500 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="rounded-full border px-3.5 py-2 text-[0.8125rem] font-semibold transition-all duration-200"
            :class="activeTab === tab.id ? tabActiveClass : tabIdleClass"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div v-if="filteredReminders.length === 0" class="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 py-14 text-center">
          <i class="fas fa-calendar-alt mb-3 text-3xl text-violet-400" aria-hidden="true" />
          <p class="text-sm text-zinc-600">
            No items for this filter. Try another tab, another date, or adjust Scheduled checkboxes.
          </p>
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="(event, idx) in filteredReminders"
            :key="`${event.title || 'ev'}-${idx}`"
            class="flex gap-3 rounded-xl border border-zinc-200/90 px-4 py-3.5 transition-shadow hover:shadow-md"
            :class="eventRowTintClass(event)"
          >
            <span
              class="mt-0.5 w-1 shrink-0 self-stretch rounded-full"
              :class="eventAccentClass(event)"
              aria-hidden="true"
            />
            <div class="min-w-0 flex-1">
              <p class="line-clamp-2 text-sm font-bold leading-snug text-zinc-900">
                {{ event.title || 'Scheduled item' }}
              </p>
              <p class="mt-1 text-xs font-medium text-zinc-600">
                {{ formatEventDayLabel(event) }} · {{ formatTimeRange(event) }}
              </p>
              <p v-if="event.description" class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                {{ event.description }}
              </p>
              <a
                v-if="event.link"
                :href="event.link"
                target="_blank"
                rel="noopener"
                class="mt-2 inline-flex text-xs font-semibold text-violet-700 underline underline-offset-2 hover:text-violet-900"
              >
                Open link
              </a>
            </div>
          </li>
        </ul>

        <p class="text-[11px] text-zinc-500">
          {{ filteredReminders.length }} shown · {{ reminders.length }} total in list
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type TabId = 'task' | 'event' | 'reminder' | 'appointment'

type EventReminderItem = {
  title?: string
  date?: string
  time?: string
  endTime?: string
  description?: string
  link?: string
  kind?: TabId
}

type Ymd = { y: number; m: number; d: number }

const props = defineProps<{
  reminders: EventReminderItem[]
}>()

const activeTab = ref<TabId>('task')
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())
const _today = new Date()
const selectedDate = ref<Ymd>({
  y: _today.getFullYear(),
  m: _today.getMonth(),
  d: _today.getDate()
})

/** When true, list is restricted to reminders on selectedDate (local calendar day). */
const dayFilterActive = ref(false)

const showHoliday = ref(true)
const showRemindersKind = ref(true)
const showTaskKind = ref(true)

const tabs: { id: TabId; label: string }[] = [
  { id: 'task', label: 'Task' },
  { id: 'event', label: 'Event' },
  { id: 'reminder', label: 'Reminders' },
  { id: 'appointment', label: 'Appointment' }
]

const tabActiveClass = 'border-violet-800 bg-violet-600 text-white shadow-md'
const tabIdleClass =
  'border-zinc-300 bg-white text-zinc-800 hover:border-violet-400 hover:bg-violet-50'

const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function kindOf (e: EventReminderItem): TabId {
  return e.kind || 'event'
}

function isHolidayTitle (e: EventReminderItem): boolean {
  return !!(e.title && /holiday/i.test(e.title))
}

function parseEventLocalYmd (dateStr?: string): Ymd | null {
  if (!dateStr) return null
  const t = Date.parse(dateStr)
  if (Number.isNaN(t)) return null
  const d = new Date(t)
  return { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() }
}

function sameYmd (a: Ymd, b: Ymd): boolean {
  return a.y === b.y && a.m === b.m && a.d === b.d
}

/** Event counts per day-of-month for the month currently shown in the calendar. */
const eventCountsByDay = computed(() => {
  const counts = new Map<number, number>()
  const y = viewYear.value
  const mo = viewMonth.value
  for (const e of props.reminders) {
    const ymd = parseEventLocalYmd(e.date)
    if (!ymd || ymd.y !== y || ymd.m !== mo) continue
    counts.set(ymd.d, (counts.get(ymd.d) || 0) + 1)
  }
  return counts
})

function eventCountOnDay (day: number): number {
  return eventCountsByDay.value.get(day) || 0
}

/** Up to 3 dot indices for stacked event indicators */
function dotsForDay (day: number): number[] {
  const n = Math.min(eventCountOnDay(day), 3)
  return Array.from({ length: n }, (_, i) => i)
}

const filteredReminders = computed(() => {
  return props.reminders.filter((e) => {
    if (kindOf(e) !== activeTab.value) return false
    if (isHolidayTitle(e) && !showHoliday.value) return false
    if (kindOf(e) === 'reminder' && !showRemindersKind.value) return false
    if (kindOf(e) === 'task' && !showTaskKind.value) return false

    if (dayFilterActive.value) {
      const ymd = parseEventLocalYmd(e.date)
      if (!ymd || !sameYmd(ymd, selectedDate.value)) return false
    }

    return true
  })
})

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
)

const selectedDateLabel = computed(() => {
  const { y, m, d } = selectedDate.value
  return new Date(y, m, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

type Cell = { day: number; isToday: boolean; inMonth: boolean }

const calendarCells = computed<(Cell | null)[]>(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const first = new Date(y, m, 1)
  const last = new Date(y, m + 1, 0)
  const startPad = first.getDay()
  const daysInMonth = last.getDate()
  const cells: (Cell | null)[] = []
  const today = new Date()
  const isRealToday = today.getFullYear() === y && today.getMonth() === m

  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isToday: isRealToday && d === today.getDate(),
      inMonth: true
    })
  }
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
})

function isCellSelected (cell: Cell): boolean {
  const sel = selectedDate.value
  return sel.y === viewYear.value && sel.m === viewMonth.value && sel.d === cell.day
}

function dayButtonLabel (cell: Cell): string {
  const n = eventCountOnDay(cell.day)
  const suffix = n > 0 ? `, ${n} scheduled` : ''
  return `${monthLabel.value} ${cell.day}${suffix}`
}

function cellClasses (cell: Cell | null): string {
  if (!cell) return ''
  const base = 'min-h-[2.25rem] px-0.5'
  const sel = isCellSelected(cell)
  const hasEv = eventCountOnDay(cell.day) > 0

  if (cell.isToday && sel) {
    return `${base} bg-violet-700 text-white shadow-md ring-2 ring-violet-400 ring-offset-1`
  }
  if (cell.isToday) {
    return `${base} border-2 border-violet-500 bg-violet-50 text-violet-900 shadow-sm`
  }
  if (sel) {
    return `${base} bg-violet-600 text-white shadow-md hover:bg-violet-700`
  }
  if (hasEv) {
    return `${base} border border-violet-200/80 bg-white text-zinc-800 hover:border-violet-400 hover:bg-violet-50/80`
  }
  return `${base} border border-transparent text-zinc-700 hover:bg-violet-100/60`
}

function shiftMonth (delta: number) {
  const d = new Date(viewYear.value, viewMonth.value + delta, 1)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
}

function selectDay (cell: Cell) {
  const next: Ymd = { y: viewYear.value, m: viewMonth.value, d: cell.day }
  if (dayFilterActive.value && sameYmd(next, selectedDate.value)) {
    dayFilterActive.value = false
    return
  }
  selectedDate.value = next
  dayFilterActive.value = true
}

function clearDayFilter () {
  dayFilterActive.value = false
}

function formatTimeRange (e: EventReminderItem): string {
  const start = e.time || '—'
  if (e.endTime) return `${start} – ${e.endTime}`
  return start
}

function formatEventDayLabel (e: EventReminderItem): string {
  const ymd = parseEventLocalYmd(e.date)
  if (!ymd) return 'Date TBC'
  return new Date(ymd.y, ymd.m, ymd.d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

function eventAccentClass (e: EventReminderItem): string {
  const k = kindOf(e)
  const map: Record<TabId, string> = {
    task: 'bg-blue-600',
    event: 'bg-violet-600',
    reminder: 'bg-orange-500',
    appointment: 'bg-teal-500'
  }
  if (isHolidayTitle(e)) return 'bg-emerald-500'
  return map[k] || 'bg-zinc-400'
}

function eventRowTintClass (e: EventReminderItem): string {
  const k = kindOf(e)
  const map: Record<TabId, string> = {
    task: 'bg-blue-500/[0.06]',
    event: 'bg-violet-500/[0.08]',
    reminder: 'bg-orange-500/[0.07]',
    appointment: 'bg-teal-500/[0.07]'
  }
  if (isHolidayTitle(e)) return 'bg-emerald-500/[0.07]'
  return map[k] || 'bg-zinc-50'
}
</script>
