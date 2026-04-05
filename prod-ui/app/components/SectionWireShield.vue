<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Opaque backdrop matching the section surface so SectionWires don’t read through
 * semi-transparent typography (e.g. text-dark/60).
 */
const props = withDefaults(
  defineProps<{
    variant?: 'gray' | 'white'
    /** Full-width strip for section headers (title + subtitle + CTA row) */
    wide?: boolean
  }>(),
  { variant: 'gray', wide: true }
)

const wrapperClass = computed(() => {
  const bg = props.variant === 'white' ? 'bg-white' : 'bg-neutral-gray'
  const layout = props.wide ? 'w-full max-w-full' : 'inline-block max-w-full align-top'
  return [
    'relative z-[2] rounded-sm',
    bg,
    layout,
    'px-2.5 py-2 sm:px-3 sm:py-2.5'
  ].join(' ')
})
</script>
