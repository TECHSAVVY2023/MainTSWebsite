<template>
  <div class="text-center py-12 px-6 relative z-10">
    <div class="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-accent-gold/10 text-accent-gold/50 text-2xl">
      <i class="fas fa-search" aria-hidden="true" />
    </div>
    <p class="text-lg font-semibold text-white mb-2">No results for "{{ query }}"</p>
    <p class="text-[0.9375rem] text-white/60 leading-relaxed max-w-[28rem] mx-auto">
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
