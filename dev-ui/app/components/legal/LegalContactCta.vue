<template>
  <div class="bg-neutral-gray p-4 px-6 w-fit max-w-full border-none shadow-none outline-none mt-16 sm:mt-20 pt-12 border-t border-neutral-border">
    <p class="text-dark/70 text-sm sm:text-base mb-4">{{ message }}</p>
    <NuxtLink
      to="/contact"
      class="inline-flex items-center py-2 px-5 bg-primary text-white font-bold text-sm rounded-full no-underline transition-all hover:bg-secondary hover:-translate-y-px"
    >
      Contact Us
      <i class="fas fa-arrow-right ml-2 text-sm" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  {
    message: 'If you have any questions, please contact us.'
  }
)
</script>
