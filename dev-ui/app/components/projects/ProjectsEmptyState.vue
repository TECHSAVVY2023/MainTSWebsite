<template>
  <div class="py-12 px-6 rounded-2xl border border-dashed border-violet-200 bg-white/90 text-center shadow-sm max-w-xl mx-auto my-8">
    <p v-if="hasSearchQuery" class="text-sm text-dark/70">
      No projects match "{{ searchQuery }}". Try a different search or
      <NuxtLink to="/projects" class="text-violet-700 font-semibold hover:underline">view all</NuxtLink>.
    </p>
    <div v-else>
      <pre class="font-mono text-[11px] sm:text-xs text-violet-600 whitespace-pre leading-relaxed inline-block text-left mx-auto mb-3 select-none">{{ asciiMsg }}</pre>
      <p class="text-xs font-bold text-dark uppercase tracking-wider">No Featured Projects Published Yet</p>
      <p class="text-[11px] text-dark/60 mt-0.5">Publish new projects from the Community Dashboard.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRandomAsciiMessage } from '~/constants/asciiMessages'

const asciiMsg = computed(() => getRandomAsciiMessage())

defineProps<{
  hasSearchQuery: boolean
  searchQuery: string
}>()
</script>
