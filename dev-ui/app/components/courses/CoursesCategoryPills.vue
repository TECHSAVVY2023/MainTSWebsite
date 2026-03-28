<template>
  <section class="mb-8">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat.value"
        type="button"
        class="px-4 py-2 rounded-full text-[0.8125rem] font-semibold border cursor-pointer transition-all"
        :class="selectedCategory === cat.value ? 'bg-[#b5a3ff] text-[#14082e] border-[#b5a3ff]' : 'bg-[#ECEFF1] text-[#303F9F] border-[#D1D8E3] hover:bg-[#DDE4EE] hover:text-[#283593] hover:border-[#B8C4D8]'"
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
