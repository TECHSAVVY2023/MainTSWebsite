<template>
  <section class="mb-8">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.value"
        type="button"
        class="px-4 py-2 rounded-full text-[0.8125rem] font-semibold border cursor-pointer transition-all"
        :class="selectedCategory === cat.value ? 'bg-[#b5a3ff] text-[#14082e] border-[#b5a3ff]' : 'bg-white/15 text-white/85 border-white/20 hover:bg-white/25 hover:text-white'"
        @click="$emit('update:selectedCategory', cat.value)"
      >
        {{ cat.label }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  categories: { value: string; label: string }[]
  selectedCategory: string
}>()

defineEmits<{
  'update:selectedCategory': [value: string]
}>()
</script>
