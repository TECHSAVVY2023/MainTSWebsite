<template>
  <div class="text-center py-16 text-white/60">
    <p v-if="hasSearchQuery">
      No projects match "{{ searchQuery }}". Try a different search or
      <NuxtLink to="/projects" class="text-accent-gold hover:underline">view all</NuxtLink>.
    </p>
    <p v-else>No projects yet. Check back later.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasSearchQuery: boolean
  searchQuery: string
}>()
</script>
