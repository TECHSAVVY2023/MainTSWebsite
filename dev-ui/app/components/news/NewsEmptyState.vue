<template>
  <div class="text-center py-16 text-dark/60">
    <p v-if="hasSearchQuery">
      No news match "{{ searchQuery }}". Try a different search or
      <NuxtLink to="/news" class="text-accent-gold hover:underline">view all</NuxtLink>.
    </p>
    <p v-else>No news yet. Check back later.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasSearchQuery: boolean
  searchQuery: string
}>()
</script>
