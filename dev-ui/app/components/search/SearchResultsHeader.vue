<template>
  <div class="relative z-10">
    <div class="inline-flex items-baseline gap-2 py-2 px-4 mb-3 bg-accent-purple/10 border border-accent-purple/20 rounded-full">
      <span class="text-xl font-extrabold text-accent-gold">{{ totalCount }}</span>
      <span class="text-[0.8125rem] text-white/80 font-medium">
        result{{ totalCount !== 1 ? 's' : '' }} in {{ categoryCount }} {{ categoryCount === 1 ? 'section' : 'sections' }}
      </span>
    </div>
    <p class="text-sm text-white/55 mb-6">Choose a section below to see all matching results:</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalCount: number
  categoryCount: number
}>()
</script>
