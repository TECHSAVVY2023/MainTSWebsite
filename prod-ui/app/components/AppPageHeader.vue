<template>
  <header class="sticky top-0 left-0 right-0 z-50 bg-white/98 border-b border-neutral-border">
    <nav class="container mx-auto px-5 sm:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          :to="backToHomeHref"
          class="flex items-center gap-2 sm:gap-3 text-dark/90 hover:text-dark transition-colors text-sm sm:text-base"
        >
          <i class="fas fa-arrow-left text-base sm:text-lg" aria-hidden="true" />
          <span class="font-medium">Back to Home</span>
        </NuxtLink>
        <NuxtLink to="/" class="flex items-center shrink-0" aria-label="Home">
          <img
            :src="logoUrl"
            alt="TECH SAVVY"
            class="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border border-neutral-border opacity-90"
          />
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const { logoUrl } = useAppLogo()
</script>
