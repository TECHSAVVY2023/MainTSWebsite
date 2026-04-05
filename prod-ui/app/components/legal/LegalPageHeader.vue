<template>
  <div class="bg-neutral-gray p-4 px-6 w-fit max-w-full border-none shadow-none outline-none mb-10 sm:mb-12">
    <div class="mb-0">
      <span class="block text-xs font-semibold tracking-[0.12em] uppercase text-accent-purple mb-2">{{ label }}</span>
      <h1 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-[-0.5px] leading-tight text-dark mb-2">
        {{ title }}
      </h1>
      <p class="text-[13px] sm:text-sm leading-relaxed text-dark/60 mb-4">{{ subtitle }}</p>
      <p v-if="lastUpdated" class="text-dark/50 text-sm">{{ lastUpdated }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
  subtitle: string
  lastUpdated?: string
}>()
</script>
