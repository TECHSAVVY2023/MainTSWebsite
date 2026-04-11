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
  // Use a flat white surface so the wire mask visually disappears
  // against current section backgrounds while still blocking wires.
  const bg = 'bg-white'
  const layout = props.wide ? 'w-full max-w-full' : 'inline-block max-w-full align-top'
  return [
    // Keep this layer above decorative wire SVG in every section.
    'relative isolate z-[60] rounded-none',
    bg,
    layout,
    'px-2.5 py-2 sm:px-3 sm:py-2.5'
  ].join(' ')
})
</script>
