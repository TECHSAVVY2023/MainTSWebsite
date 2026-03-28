<template>
  <section
    class="rounded-2xl border border-neutral-border bg-white p-5 shadow-[0_8px_30px_rgba(46,19,104,0.06)] sm:p-6"
  >
    <div class="flex flex-col gap-8 xl:flex-row xl:gap-10">
      <!-- Sidebar: one panel, calendar + filters separated by divider only -->
      <aside class="w-full shrink-0 space-y-0 xl:w-[min(100%,272px)]">
        <div class="overflow-hidden rounded-xl border border-neutral-border bg-neutral-gray/50">
          <div class="p-4">
            <div class="mb-3 flex items-center justify-between gap-2">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-border bg-white text-sm text-secondary transition-colors hover:bg-violet-dark"
                aria-label="Previous month"
                @click="shiftMonth(-1)"
              >
                ‹
              </button>
              <span class="text-sm font-semibold tabular-nums text-dark">{{ monthLabel }}</span>
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-border bg-white text-sm text-secondary transition-colors hover:bg-violet-dark"
                aria-label="Next month"
                @click="shiftMonth(1)"
              >
                ›
              </button>
            </div>
            <div class="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-dark/55">
              <span v-for="d in weekdayLabels" :key="d">{{ d }}</span>
            </div>
            <div class="grid grid-cols-7 gap-1">
              <template v-for="(cell, i) in calendarCells" :key="'c-' + i">
                <span v-if="cell === null" class="aspect-square max-h-9" />
                <button
                  v-else
                  type="button"
                  class="aspect-square max-h-9 rounded-lg text-xs font-medium transition-colors"
                  :class="cellClasses(cell)"
                  @click="selectDay(cell)"
                >
                  {{ cell.day }}
                </button>
              </template>
            </div>
          </div>

          <div class="border-t border-neutral-border bg-white/60 px-4 py-3">
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-dark/50">
              Scheduled
            </p>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-dark/85">
              <input v-model="showHoliday" type="checkbox" class="rounded border-neutral-steel text-accent-purple focus:ring-accent-purple/30">
              Holiday
            </label>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-dark/85">
              <input v-model="showRemindersKind" type="checkbox" class="rounded border-neutral-steel text-accent-purple focus:ring-accent-purple/30">
              Reminders
            </label>
            <label class="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-dark/85">
              <input v-model="showTaskKind" type="checkbox" class="rounded border-neutral-steel text-accent-purple focus:ring-accent-purple/30">
              Task
            </label>
          </div>
        </div>
      </aside>

      <!-- Main: header + tabs + list (no nested schedule/inner cards) -->
      <div class="min-w-0 flex-1 space-y-4">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-lg font-bold tracking-tight text-dark sm:text-xl">
            Schedule
          </h3>
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-border bg-neutral-gray text-lg leading-none text-dark/45 transition-colors hover:bg-violet-dark hover:text-dark"
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

        <div v-if="filteredReminders.length === 0" class="rounded-xl border border-dashed border-neutral-border bg-neutral-gray/40 py-14 text-center">
          <i class="fas fa-calendar-alt mb-3 text-3xl text-accent-purple/35" aria-hidden="true" />
          <p class="text-sm text-dark/55">
            No items for this filter. Try another tab or adjust Scheduled checkboxes.
          </p>
        </div>

        <ul v-else class="space-y-2">
          <li
            v-for="(event, idx) in filteredReminders"
            :key="`${event.title || 'ev'}-${idx}`"
            class="flex gap-3 rounded-xl border border-neutral-border px-4 py-3.5 transition-shadow hover:shadow-sm"
            :class="eventRowTintClass(event)"
          >
            <span
              class="mt-0.5 w-1 shrink-0 self-stretch rounded-full"
              :class="eventAccentClass(event)"
              aria-hidden="true"
            />
            <div class="min-w-0 flex-1">
              <p class="line-clamp-2 text-sm font-bold leading-snug text-dark">
                {{ event.title || 'Scheduled item' }}
              </p>
              <p class="mt-1 text-xs font-medium text-dark/65">
                {{ formatTimeRange(event) }}
              </p>
              <p v-if="event.description" class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-dark/55">
                {{ event.description }}
              </p>
              <a
                v-if="event.link"
                :href="event.link"
                target="_blank"
                rel="noopener"
                class="mt-2 inline-flex text-xs font-semibold text-accent-purple underline underline-offset-2 hover:text-secondary"
              >
                Open link
              </a>
            </div>
          </li>
        </ul>

        <p class="text-[11px] text-dark/50">
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

const props = defineProps<{
  reminders: EventReminderItem[]
}>()

const activeTab = ref<TabId>('task')
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth())
const _today = new Date()
const selectedDate = ref<{ y: number; m: number; d: number }>({
  y: _today.getFullYear(),
  m: _today.getMonth(),
  d: _today.getDate()
})

const showHoliday = ref(true)
const showRemindersKind = ref(true)
const showTaskKind = ref(true)

const tabs: { id: TabId; label: string }[] = [
  { id: 'task', label: 'Task' },
  { id: 'event', label: 'Event' },
  { id: 'reminder', label: 'Reminders' },
  { id: 'appointment', label: 'Appointment' }
]

const tabActiveClass = 'border-accent-purple bg-accent-purple text-white shadow-sm'
const tabIdleClass = 'border-neutral-border bg-white text-dark/80 hover:border-accent-purple/25 hover:bg-neutral-gray'

const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function kindOf (e: EventReminderItem): TabId {
  return e.kind || 'event'
}

function isHolidayTitle (e: EventReminderItem): boolean {
  return !!(e.title && /holiday/i.test(e.title))
}

const filteredReminders = computed(() => {
  return props.reminders.filter((e) => {
    if (kindOf(e) !== activeTab.value) return false
    if (isHolidayTitle(e) && !showHoliday.value) return false
    if (kindOf(e) === 'reminder' && !showRemindersKind.value) return false
    if (kindOf(e) === 'task' && !showTaskKind.value) return false
    return true
  })
})

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
)

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

function cellClasses (cell: Cell | null): string {
  if (!cell) return ''
  const base = 'flex items-center justify-center'
  const sel = selectedDate.value
  const isSelected = sel && sel.y === viewYear.value && sel.m === viewMonth.value && sel.d === cell.day
  if (cell.isToday) return `${base} bg-accent-purple text-white shadow-sm`
  if (isSelected) return `${base} border border-accent-purple/30 bg-accent-purple/10 text-secondary`
  return `${base} border border-transparent text-dark/80 hover:bg-violet-dark`
}

function shiftMonth (delta: number) {
  const d = new Date(viewYear.value, viewMonth.value + delta, 1)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
}

function selectDay (cell: Cell) {
  selectedDate.value = { y: viewYear.value, m: viewMonth.value, d: cell.day }
}

function formatTimeRange (e: EventReminderItem): string {
  const start = e.time || '—'
  if (e.endTime) return `${start} – ${e.endTime}`
  return start
}

function eventAccentClass (e: EventReminderItem): string {
  const k = kindOf(e)
  const map: Record<TabId, string> = {
    task: 'bg-[#2563EB]',
    event: 'bg-[#7E57C2]',
    reminder: 'bg-[#EA580C]',
    appointment: 'bg-[#14B8A6]'
  }
  if (isHolidayTitle(e)) return 'bg-[#22C55E]'
  return map[k] || 'bg-dark/40'
}

function eventRowTintClass (e: EventReminderItem): string {
  const k = kindOf(e)
  const map: Record<TabId, string> = {
    task: 'bg-blue-500/[0.06]',
    event: 'bg-[#7E57C2]/[0.07]',
    reminder: 'bg-orange-500/[0.07]',
    appointment: 'bg-teal-500/[0.07]'
  }
  if (isHolidayTitle(e)) return 'bg-emerald-500/[0.07]'
  return map[k] || 'bg-neutral-gray/80'
}
</script>
