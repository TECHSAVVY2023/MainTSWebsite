<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
    <div v-for="(item, i) in safeItems" :key="i" class="w-full max-w-[280px] mx-2 sm:mx-3">
      <NewsCard :item="item" :default-image="defaultImage" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items?: { date?: string; title?: string; summary?: string; description?: string; imageUrl?: string }[] | unknown
  defaultImage: string
}>()

const { defaultImage } = toRefs(props)
const safeItems = computed(() => {
  const raw = props.items
  return Array.isArray(raw) ? raw.filter((x): x is NonNullable<typeof x> => x != null && typeof x === 'object') : []
})
</script>
