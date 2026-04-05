<template>
  <div class="relative z-10">
    <div class="mb-3 inline-flex flex-wrap items-baseline gap-2 rounded-full border border-accent-purple/25 bg-accent-purple/[0.08] px-4 py-2">
      <span class="text-xl font-extrabold text-accent-purple">{{ totalCount }}</span>
      <span class="text-[0.8125rem] font-medium text-dark/80">
        result{{ totalCount !== 1 ? 's' : '' }} in {{ categoryCount }} {{ categoryCount === 1 ? 'section' : 'sections' }}
      </span>
    </div>
    <p class="mb-6 text-sm text-dark/65">
      Choose a section below to see all matching results.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  totalCount: number
  categoryCount: number
}>()
</script>
