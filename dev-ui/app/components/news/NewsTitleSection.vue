<template>
  <section class="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 bg-neutral-gray">
    <div class="min-w-0">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-dark tracking-tight mb-2">
        News &amp; Updates
      </h1>
      <p class="text-[0.9375rem] sm:text-base text-dark/70 leading-relaxed mb-0">
        Latest from the community
      </p>
    </div>
    <div class="w-full sm:ml-auto sm:w-[280px] sm:max-w-[320px]">
      <div class="relative">
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-dark/50 text-base pointer-events-none" aria-hidden="true" />
        <input
          :value="modelValueStr"
          type="text"
          placeholder="Search news..."
          class="w-full py-3.5 pl-11 pr-4 rounded-xl border border-neutral-border bg-white text-dark text-[0.9375rem] placeholder:text-dark/40 focus:outline-none focus:border-accent-purple focus:bg-white transition-colors"
          aria-label="Search news"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | unknown
}>()

const modelValueStr = computed(() =>
  typeof props.modelValue === 'string' ? props.modelValue : ''
)

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
