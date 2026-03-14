<template>
  <div class="bg-[rgba(35,21,89,0.95)] border border-accent-purple/20 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 border-b border-accent-purple/15 bg-black/15">
      <h2 class="text-[0.8125rem] font-semibold tracking-[0.08em] uppercase text-accent-purple m-0">Sections</h2>
      <div class="flex gap-2">
        <button
          type="button"
          class="py-2 px-3.5 text-[0.8125rem] font-medium text-white/80 bg-accent-purple/10 border border-accent-purple/20 rounded-lg cursor-pointer transition-colors hover:bg-accent-purple/20 hover:text-white hover:border-accent-purple/30"
          @click="$emit('expand-all', true)"
        >
          Expand all
        </button>
        <button
          type="button"
          class="py-2 px-3.5 text-[0.8125rem] font-medium text-white/80 bg-accent-purple/10 border border-accent-purple/20 rounded-lg cursor-pointer transition-colors hover:bg-accent-purple/20 hover:text-white hover:border-accent-purple/30"
          @click="$emit('expand-all', false)"
        >
          Collapse all
        </button>
      </div>
    </div>
    <div class="py-2">
      <section
        v-for="(section, idx) in sections"
        :key="section.id"
        :id="section.id"
        class="border-b border-accent-purple/10 last:border-b-0 scroll-mt-24"
        :class="{ 'is-open': safeOpenSections[idx] }"
      >
        <button
          type="button"
          class="w-full flex items-center gap-3 py-4 px-6 sm:py-[1.125rem] sm:px-6 bg-transparent border-none text-white text-base sm:text-[1.0625rem] font-semibold text-left cursor-pointer transition-colors hover:bg-accent-purple/10"
          :class="{ 'bg-accent-purple/[0.06]': safeOpenSections[idx] }"
          :aria-expanded="safeOpenSections[idx]"
          :aria-controls="`${bodyIdPrefix}-${section.id}`"
          @click="$emit('toggle', idx)"
        >
          <span class="shrink-0 text-accent-purple min-w-[1.75rem] font-bold">{{ section.title.split('.')[0] }}.</span>
          <span class="flex-1">{{ section.title.replace(/^\d+\.\s*/, '') }}</span>
          <i
            class="fas fa-chevron-down shrink-0 text-xs text-white/50 transition-transform duration-250"
            :class="{ 'rotate-180 text-accent-purple': safeOpenSections[idx] }"
            aria-hidden="true"
          />
        </button>
        <div
          :id="`${bodyIdPrefix}-${section.id}`"
          class="max-h-0 overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group"
          :class="{ 'open !max-h-[2000px]': safeOpenSections[idx] }"
        >
          <div class="px-6 sm:px-7 pb-5 sm:pb-6 border-none rounded-none bg-[#f8f7f5] opacity-0 transition-opacity duration-300 delay-100 group-[.open]:opacity-100">
            <p v-for="(para, i) in section.paragraphs" :key="i" class="text-[0.9375rem] sm:text-base leading-[1.7] text-gray-700 mb-4 first:mt-0 last:mb-0">
              {{ para }}
            </p>
            <ul v-if="section.list" class="my-3 ml-0 pl-5 list-disc">
              <li v-for="(item, j) in section.list" :key="j" class="text-[0.9375rem] sm:text-base leading-[1.7] text-gray-700 mb-2 last:mb-0">
                {{ item }}
              </li>
            </ul>
            <p
              v-for="(para, k) in (section.paragraphsAfter || [])"
              :key="'after-' + k"
              class="text-[0.9375rem] sm:text-base leading-[1.7] text-gray-700 mb-4 first:mt-0 last:mb-0"
            >
              {{ para }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LegalSection } from '../../composables/useTermsSections'

const props = defineProps<{
  sections: LegalSection[]
  openSections?: boolean[] | unknown
  bodyIdPrefix: string
}>()

const safeOpenSections = computed(() => {
  const raw = props.openSections
  return Array.isArray(raw) ? raw : []
})

defineEmits<{
  toggle: [idx: number]
  'expand-all': [open: boolean]
}>()
</script>
