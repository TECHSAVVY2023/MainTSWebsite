<template>
  <section class="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-center md:justify-between md:gap-8">
    <div class="min-w-0 flex-1">
      <h1 class="mb-2 bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 bg-clip-text text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.1] tracking-[-0.04em] text-transparent">
        Search
      </h1>
      <p class="mb-0 max-w-xl text-[0.9375rem] leading-relaxed text-dark/70">
        Find content in News &amp; Updates, Courses, and Featured Projects.
      </p>
    </div>
    <div class="w-full shrink-0 md:max-w-[min(100%,22rem)] lg:max-w-md">
      <form
        role="search"
        class="flex max-w-full items-stretch overflow-hidden rounded-xl border border-neutral-border bg-white shadow-[0_4px_24px_rgba(46,19,104,0.08)] focus-within:border-accent-purple/35 focus-within:ring-2 focus-within:ring-accent-purple/15"
        @submit.prevent="$emit('submit')"
      >
        <div class="group relative flex flex-1 items-center border-r border-neutral-border/80 bg-white">
          <i
            class="fas fa-search pointer-events-none absolute left-3.5 text-base text-dark/40 transition-colors group-focus-within:text-accent-purple"
            aria-hidden="true"
          />
          <input
            :model-value="modelValue"
            type="search"
            autocomplete="off"
            placeholder="Search news, courses, projects…"
            class="w-full border-none bg-transparent py-3 pl-10 pr-3 text-[0.9375rem] text-dark outline-none placeholder:text-dark/40"
            aria-label="Search"
            @update:model-value="$emit('update:modelValue', $event)"
          />
        </div>
        <button
          type="submit"
          class="inline-flex shrink-0 cursor-pointer items-center gap-2 border-none bg-[#2E1368] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#6126B1] sm:px-6"
        >
          Search
          <i class="fas fa-arrow-right text-xs opacity-90" aria-hidden="true" />
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
