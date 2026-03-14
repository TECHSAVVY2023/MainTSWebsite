<template>
  <section class="flex flex-wrap items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
    <div class="min-w-0">
      <h1 class="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-[-0.03em] leading-tight mb-2 bg-gradient-to-r from-accent-purple to-accent-gold bg-clip-text text-transparent">
        Search
      </h1>
      <p class="text-[0.9375rem] text-white/70 leading-relaxed mb-0">
        Find content in News &amp; Updates, Courses, and Featured Projects
      </p>
    </div>
    <div class="shrink-0 min-w-[200px] max-w-[320px] w-full sm:w-[280px] ml-auto">
      <form
        role="search"
        class="flex items-stretch gap-0 max-w-[28rem] rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        @submit.prevent="$emit('submit')"
      >
        <div class="group flex-1 relative flex items-center bg-[rgba(56,42,82,0.9)] border border-accent-purple/25 border-r-0 focus-within:border-accent-purple/50 focus-within:shadow-[0_0_0_2px_rgba(181,163,255,0.15)] transition-colors">
          <i class="fas fa-search absolute left-[1.125rem] text-white/50 text-base pointer-events-none group-focus-within:text-accent-purple transition-colors" aria-hidden="true" />
          <input
            :model-value="modelValue"
            type="search"
            autocomplete="off"
            placeholder="Search news, courses, projects..."
            class="w-full py-3.5 pl-10 pr-4 bg-transparent border-none text-white text-[0.9375rem] outline-none placeholder:text-white/45 transition-colors"
            aria-label="Search"
            @update:model-value="$emit('update:modelValue', $event)"
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center gap-2 px-6 bg-accent-gold text-violet font-bold text-sm border-none cursor-pointer transition-all hover:bg-[#ffe066] hover:translate-x-0.5"
        >
          Search
          <i class="fas fa-arrow-right text-xs opacity-90" />
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  submit: []
  'update:modelValue': [value: string]
}>()
</script>
