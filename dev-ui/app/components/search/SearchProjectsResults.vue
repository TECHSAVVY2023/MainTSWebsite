<template>
  <section
    v-if="items.length > 0"
    class="relative z-10 mb-5 rounded-2xl p-6 sm:p-7 overflow-hidden bg-[rgba(35,21,89,0.92)] border border-accent-purple/20 transition-all hover:border-accent-purple/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-l before:bg-gradient-to-b before:from-accent-gold before:to-accent-purple"
  >
    <div class="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-accent-purple/15">
      <div class="flex items-center gap-3 flex-wrap">
        <span class="w-9 h-9 flex items-center justify-center rounded-[10px] bg-accent-gold/15 text-accent-gold text-sm">
          <i class="fas fa-project-diagram" />
        </span>
        <h2 class="text-lg font-bold text-white m-0">Featured Projects</h2>
        <span class="text-[0.8125rem] font-semibold text-white/60 py-0.5 px-2 bg-white/10 rounded-md">{{ items.length }}</span>
      </div>
      <NuxtLink
        :to="sectionLink"
        class="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-accent-gold no-underline transition-all hover:text-white hover:translate-x-0.5 [&>i]:text-[0.7rem]"
      >
        View all
        <i class="fas fa-arrow-right" />
      </NuxtLink>
    </div>
    <ul class="list-none p-0 m-0 [&>li]:mb-2 [&>li:last-child]:mb-0">
      <li v-for="(item, i) in displayedItems" :key="i">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 py-3 px-4 rounded-[10px] no-underline text-inherit transition-colors hover:bg-accent-purple/10 group/item"
        >
          <span class="flex-1 font-medium text-white min-w-0 group-hover/item:text-accent-purple">{{ item.title }}</span>
          <span class="text-[0.8125rem] text-white/50 shrink-0">{{ item.domain }}</span>
          <i class="fas fa-chevron-right text-xs text-white/35 shrink-0 transition-all group-hover/item:text-accent-gold group-hover/item:translate-x-0.5" aria-hidden="true" />
        </a>
      </li>
    </ul>
    <button
      v-if="items.length > previewCount"
      type="button"
      class="flex items-center justify-center gap-2 w-full mt-3 py-2.5 px-3.5 rounded-full border border-accent-purple/20 bg-white/[0.03] text-white/80 text-[0.8125rem] font-medium cursor-pointer transition-colors hover:bg-accent-purple/10 hover:border-accent-purple/30"
      @click="$emit('toggle-expand')"
    >
      <span>{{ expanded ? 'Show less' : `Show ${items.length - previewCount} more` }}</span>
      <i class="fas fa-chevron-down text-[0.7rem] transition-transform" :class="{ 'rotate-180': expanded }" aria-hidden="true" />
    </button>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  items: { title: string; domain: string; url: string }[]
  displayedItems: { title: string; domain: string; url: string }[]
  sectionLink: { path: string; query?: Record<string, string> }
  previewCount: number
  expanded: boolean
}>()

defineEmits<{
  'toggle-expand': []
}>()
</script>
