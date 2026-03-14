<template>
  <header class="sticky top-0 left-0 right-0 z-50 bg-[rgba(20,8,46,0.98)] border-b border-accent-purple/10">
    <nav class="container mx-auto px-5 sm:px-8">
      <div class="flex items-center justify-between h-16">
        <NuxtLink
          :to="backHref"
          class="flex items-center gap-2 sm:gap-3 text-white/90 hover:text-white transition-colors text-sm sm:text-base"
          aria-label="Go back"
        >
          <i class="fas fa-arrow-left text-base sm:text-lg" aria-hidden="true" />
          <span class="font-medium">{{ backText }}</span>
        </NuxtLink>
        <NuxtLink to="/" class="flex items-center shrink-0" aria-label="Home">
          <img
            :src="logoUrl"
            alt="TECH SAVVY"
            class="h-8 sm:h-9 w-auto object-contain opacity-90"
          />
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const { logoUrl } = useAppLogo()

interface Props {
  backText?: string
  backHref?: string
}

const props = withDefaults(defineProps<Props>(), {
  backText: 'Back to Home',
  backHref: undefined
})

const backHref = computed(() => props.backHref ?? backToHomeHref.value)
</script>
