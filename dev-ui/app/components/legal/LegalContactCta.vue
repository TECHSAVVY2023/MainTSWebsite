<template>
  <div class="bg-violet p-4 px-6 w-fit max-w-full border-none shadow-none outline-none mt-16 sm:mt-20 pt-12 border-t border-white/10">
    <p class="text-white/70 text-sm sm:text-base mb-4">{{ message }}</p>
    <NuxtLink
      to="/contact"
      class="inline-flex items-center py-2 px-5 bg-accent-gold text-violet font-bold text-sm rounded-full no-underline transition-all hover:bg-[#ffe066] hover:shadow-[0_4px_20px_rgba(255,215,74,0.4)] hover:-translate-y-px"
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
