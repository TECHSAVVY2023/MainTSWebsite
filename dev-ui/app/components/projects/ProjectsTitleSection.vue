<template>
  <section class="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
    <div class="min-w-0">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
        Featured Projects
      </h1>
      <p class="text-[0.9375rem] sm:text-base text-white/70 leading-relaxed mb-0">
        Ecommerce websites developed by our community
      </p>
    </div>
    <div class="shrink-0 min-w-[200px] max-w-[320px] w-full sm:w-[280px] ml-auto">
      <div class="relative">
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-base pointer-events-none" aria-hidden="true" />
        <input
          :model-value="modelValue"
          type="text"
          placeholder="Search projects..."
          class="w-full py-3.5 pl-11 pr-4 rounded-xl border border-white/20 bg-[rgba(35,21,89,0.95)] text-white text-[0.9375rem] placeholder:text-white/40 focus:outline-none focus:border-accent-purple focus:bg-[rgba(45,28,110,0.98)] transition-colors"
          aria-label="Search projects"
          @update:model-value="$emit('update:modelValue', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
