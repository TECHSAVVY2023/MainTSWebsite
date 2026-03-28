<template>
  <section class="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
    <div class="min-w-0">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-2">
        Featured Projects
      </h1>
      <p class="text-[0.9375rem] sm:text-base text-dark/70 leading-relaxed mb-0">
        Ecommerce websites developed by our community
      </p>
    </div>
    <div class="shrink-0 min-w-[200px] max-w-[320px] w-full sm:w-[280px] ml-auto">
      <div class="relative">
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-dark/50 text-base pointer-events-none" aria-hidden="true" />
        <input
          :model-value="modelValue"
          type="text"
          placeholder="Search projects..."
          class="w-full py-3.5 pl-11 pr-4 rounded-xl border border-neutral-border bg-white text-dark text-[0.9375rem] placeholder:text-dark/40 focus:outline-none focus:border-accent-purple transition-colors"
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
