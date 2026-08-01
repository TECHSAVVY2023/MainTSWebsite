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
                <span class="text-lg leading-none" aria-hidden="true">&lsaquo;</span>
              </button>
              <span class="text-sm font-bold tabular-nums text-zinc-900">{{ monthLabel }}</span>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-200 bg-white text-violet-800 shadow-sm transition-colors hover:border-violet-400 hover:bg-violet-50"
                aria-label="Next month"
                @click="shiftMonth(1)"
              >
                <span class="text-lg leading-none" aria-hidden="true">&rsaquo;</span>
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
              Filtered to {{ selectedDateLabel }} - matches current tab &amp; checkboxes
            </p>
          </div>
          <button
            type="button"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-lg leading-none text-zinc-500 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800"
            aria-label="Close"
          >
            &times;
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

        <div v-if="filteredReminders.length === 0" class="rounded-xl border border-dashed border-violet-200 bg-white/90 py-10 px-4 text-center">
          <pre class="font-mono text-[11px] sm:text-xs text-violet-600 whitespace-pre leading-relaxed inline-block text-left mx-auto mb-3 select-none">{{ asciiMsg }}</pre>
          <p class="text-xs font-bold uppercase tracking-wider text-dark">No Events Scheduled Yet</p>
          <p class="text-[11px] text-dark/60 mt-0.5">Check another tab or add events via the Community Dashboard.</p>
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
                {{ formatEventDayLabel(event) }} - {{ formatTimeRange(event) }}
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
          {{ filteredReminders.length }} shown - {{ reminders.length }} total in list
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EventReminderItem } from '~/composables/useEventsReminderSection'
import { useEventsReminderSection } from '~/composables/useEventsReminderSection'
import { getRandomAsciiMessage } from '~/constants/asciiMessages'

const asciiMsg = computed(() => getRandomAsciiMessage())

const props = defineProps<{
  reminders: EventReminderItem[]
}>()

const reminders = toRef(props, 'reminders')

const {
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
} = useEventsReminderSection(reminders)
</script>
