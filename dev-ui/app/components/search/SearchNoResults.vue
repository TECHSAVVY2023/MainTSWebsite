<template>
  <div class="relative z-10 px-6 py-12 text-center">
    <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-purple/10 text-2xl text-accent-purple/70">
      <i class="fas fa-search" aria-hidden="true" />
    </div>
    <p class="mb-2 text-lg font-semibold text-dark">
      No results for "{{ query }}"
    </p>
    <p class="mx-auto max-w-[28rem] text-[0.9375rem] leading-relaxed text-dark/65">
      Try a different term or browse
      <NuxtLink to="/news" class="text-accent-purple font-medium no-underline hover:text-accent-gold hover:underline">News</NuxtLink>,
      <NuxtLink to="/courses" class="text-accent-purple font-medium no-underline hover:text-accent-gold hover:underline">Courses</NuxtLink>, or
      <NuxtLink to="/projects" class="text-accent-purple font-medium no-underline hover:text-accent-gold hover:underline">Projects</NuxtLink>.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  query: string
}>()
</script>
