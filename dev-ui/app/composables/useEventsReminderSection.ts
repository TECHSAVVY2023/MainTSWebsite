export type EventsReminderTabId = 'all' | 'task' | 'event' | 'reminder' | 'appointment'

export type EventReminderItem = {
  title?: string
  date?: string
  time?: string
  endTime?: string
  description?: string
  link?: string
  kind?: EventsReminderTabId
}

type Ymd = { y: number; m: number; d: number }
type CalendarCell = { day: number; isToday: boolean; inMonth: boolean }

export function useEventsReminderSection (reminders: Ref<EventReminderItem[]>) {
  const activeTab = ref<EventsReminderTabId>('all')
  const viewYear = ref(new Date().getFullYear())
  const viewMonth = ref(new Date().getMonth())
  const today = new Date()
  const selectedDate = ref<Ymd>({
    y: today.getFullYear(),
    m: today.getMonth(),
    d: today.getDate(),
  })

  const dayFilterActive = ref(false)
  const showHoliday = ref(true)
  const showRemindersKind = ref(true)
  const showTaskKind = ref(true)

  const tabs: { id: EventsReminderTabId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'task', label: 'Task' },
    { id: 'event', label: 'Event' },
    { id: 'reminder', label: 'Reminders' },
    { id: 'appointment', label: 'Appointment' },
  ]

  const tabActiveClass = 'border-violet-800 bg-violet-600 text-white shadow-md'
  const tabIdleClass =
    'border-zinc-300 bg-white text-zinc-800 hover:border-violet-400 hover:bg-violet-50'

  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  function kindOf (e: EventReminderItem): EventsReminderTabId {
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

  const eventCountsByDay = computed(() => {
    const counts = new Map<number, number>()
    const y = viewYear.value
    const mo = viewMonth.value

    for (const e of reminders.value) {
      const ymd = parseEventLocalYmd(e.date)
      if (!ymd || ymd.y !== y || ymd.m !== mo) continue
      counts.set(ymd.d, (counts.get(ymd.d) || 0) + 1)
    }

    return counts
  })

  function eventCountOnDay (day: number): number {
    return eventCountsByDay.value.get(day) || 0
  }

  function dotsForDay (day: number): number[] {
    const n = Math.min(eventCountOnDay(day), 3)
    return Array.from({ length: n }, (_, i) => i)
  }

  const filteredReminders = computed(() => {
    return reminders.value.filter((e) => {
      if (activeTab.value !== 'all' && kindOf(e) !== activeTab.value) return false
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
    new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    }),
  )

  const selectedDateLabel = computed(() => {
    const { y, m, d } = selectedDate.value
    return new Date(y, m, d).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  })

  const calendarCells = computed<(CalendarCell | null)[]>(() => {
    const y = viewYear.value
    const m = viewMonth.value
    const first = new Date(y, m, 1)
    const last = new Date(y, m + 1, 0)
    const startPad = first.getDay()
    const daysInMonth = last.getDate()
    const cells: (CalendarCell | null)[] = []
    const now = new Date()
    const isRealToday = now.getFullYear() === y && now.getMonth() === m

    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        isToday: isRealToday && d === now.getDate(),
        inMonth: true,
      })
    }
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  })

  function isCellSelected (cell: CalendarCell): boolean {
    const sel = selectedDate.value
    return sel.y === viewYear.value && sel.m === viewMonth.value && sel.d === cell.day
  }

  function dayButtonLabel (cell: CalendarCell): string {
    const n = eventCountOnDay(cell.day)
    const suffix = n > 0 ? `, ${n} scheduled` : ''
    return `${monthLabel.value} ${cell.day}${suffix}`
  }

  function cellClasses (cell: CalendarCell | null): string {
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

  function selectDay (cell: CalendarCell) {
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
      day: 'numeric',
    })
  }

  function eventAccentClass (e: EventReminderItem): string {
    const k = kindOf(e)
    const map: Record<EventsReminderTabId, string> = {
      task: 'bg-blue-600',
      event: 'bg-violet-600',
      reminder: 'bg-orange-500',
      appointment: 'bg-teal-500',
    }
    if (isHolidayTitle(e)) return 'bg-emerald-500'
    return map[k] || 'bg-zinc-400'
  }

  function eventRowTintClass (e: EventReminderItem): string {
    const k = kindOf(e)
    const map: Record<EventsReminderTabId, string> = {
      task: 'bg-blue-500/[0.06]',
      event: 'bg-violet-500/[0.08]',
      reminder: 'bg-orange-500/[0.07]',
      appointment: 'bg-teal-500/[0.07]',
    }
    if (isHolidayTitle(e)) return 'bg-emerald-500/[0.07]'
    return map[k] || 'bg-zinc-50'
  }

  return {
    activeTab,
    dayFilterActive,
    showHoliday,
    showRemindersKind,
    showTaskKind,
    tabs,
    tabActiveClass,
    tabIdleClass,
    weekdayLabels,
    filteredReminders,
    monthLabel,
    selectedDateLabel,
    calendarCells,
    eventCountOnDay,
    dotsForDay,
    isCellSelected,
    dayButtonLabel,
    cellClasses,
    shiftMonth,
    selectDay,
    clearDayFilter,
    formatTimeRange,
    formatEventDayLabel,
    eventAccentClass,
    eventRowTintClass,
  }
}
