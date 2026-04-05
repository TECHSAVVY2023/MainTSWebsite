<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform"
    :class="{ 
      '-translate-y-full opacity-0 pointer-events-none': isFooterVisible 
    }"
  >
    <!-- Maintenance Banner (Simplified) -->
    <div class="relative w-full bg-indigo-200 overflow-hidden">
      <div class="relative flex items-center justify-center gap-2 px-4 py-1.5 sm:py-2">
        <span class="relative flex h-1.5 w-1.5 shrink-0">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
          <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
        </span>
        <p class="text-indigo-800 text-[10px] sm:text-[11px] font-bold tracking-tight uppercase">
          Updating contents... <span class="hidden sm:inline font-normal opacity-80">- Some features may be offline.</span>
        </p>
      </div>
    </div>

    <nav 
      class="relative transition-all duration-300 ease-in-out"
      :class="{ 
        'bg-white/80 backdrop-blur-[20px] shadow-lg border-b border-white/20': headerScrolled,
        'bg-white/95 backdrop-blur-[16px]': !headerScrolled 
      }"
    >
      <div class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16 sm:h-18">
          <NuxtLink
            :to="backHref"
            class="flex items-center gap-2 group text-dark/80 transition-all"
            aria-label="Go back"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-violet-50 border border-violet-100 text-violet-600 transition-all group-hover:bg-violet-600 group-hover:text-white">
              <i class="fas fa-arrow-left text-sm" aria-hidden="true" />
            </div>
            <span class="font-bold text-xs sm:text-sm uppercase tracking-widest text-[#1a0533] group-hover:text-violet-600">{{ backText }}</span>
          </NuxtLink>

          <NuxtLink to="/" class="flex items-center shrink-0 pr-4" aria-label="Home">
            <img 
              :src="logoUrl" 
              alt="TechSavvy" 
              class="h-9 sm:h-12 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity" 
            />
          </NuxtLink>
        </div>
      </div>
      
      <!-- Signature bottom gradient -->
      <div
        class="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/25 via-accent-purple/25 to-transparent opacity-80"
        aria-hidden="true" 
      />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const { backToHomeHref } = useBackToHome()
const { logoUrl } = useAppLogo()

const headerScrolled = ref(false)
const isFooterVisible = ref(false)

interface Props {
  backText?: string
  backHref?: string
}

const props = withDefaults(defineProps<Props>(), {
  backText: 'Back to Home',
  backHref: undefined
})

const backHref = computed(() => props.backHref ?? backToHomeHref.value)

onMounted(() => {
  const onScroll = () => {
    headerScrolled.value = window.scrollY > 30
  }
  window.addEventListener('scroll', onScroll)

  // Smart Hide: Detect when footer is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isFooterVisible.value = entry.isIntersecting
    })
  }, {
    threshold: 0.1
  })

  const footer = document.querySelector('#main-footer')
  if (footer) observer.observe(footer)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (footer) observer.unobserve(footer)
    observer.disconnect()
  })
})
</script>
