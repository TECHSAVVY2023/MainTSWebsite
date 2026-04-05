<template>
  <div>
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform"
      :class="{ '-translate-y-full opacity-0 pointer-events-none': isFooterVisible }"
    >
      <!-- Maintenance Banner -->
      <div class="relative w-full bg-indigo-200 overflow-hidden">
        <!-- Shimmer effect -->
        <div
          class="inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] animate-[shimmer_2.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
        <div class="relative flex items-center justify-center gap-2.5 px-4 py-2.5">
          <!-- Pulse dot -->
          <span class="relative flex h-2 w-2 shrink-0">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <!-- Icon -->
          <svg class="w-3.5 h-3.5 text-white/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.63-4.126-.174-.087a2.55 2.55 0 0 0-2.762.463l-3.3 3.3" />
          </svg>
          <p class="text-indigo-900 text-xs sm:text-sm font-semibold tracking-wide">
            🚧 <span class="font-bold">TechSavvy Core Members are updating the contents</span>
            <span class="hidden sm:inline text-indigo-900 font-normal"> - Some features may be temporarily unavailable.
              They will be completed soon.</span>
          </p>
        </div>
      </div>
      <nav class="relative transition-all duration-300 ease-in-out"
        :class="{ 
          'bg-white/80 backdrop-blur-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white/20 shadow-lg': headerScrolled,
          'bg-white/95 backdrop-blur-[16px]': !headerScrolled 
        }">
        <div class="container mx-auto px-5 sm:px-8">
          <div class="flex items-center justify-between h-16">
            <NuxtLink to="/" class="flex items-center shrink-0 pr-4" aria-label="Home">
              <img :src="logoUrl" alt="TechSavvy" class="h-12" />
            </NuxtLink>

            <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
              <a href="#news"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#news')">News</a>
              <a href="#courses"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#courses')">Courses</a>
              <a href="#about"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#about')">About</a>
              <a href="#projects"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#projects')">Projects</a>
              <a href="#merch"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#merch')">Merch</a>
              <a href="#events-reminders"
                class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple"
                @click.prevent="scrollToSection('#events-reminders')">Events Reminder</a>
            </div>

            <div class="hidden md:flex shrink-0 pl-4 items-center">
              <form role="search" class="group relative flex items-center min-w-0" @submit.prevent="onSearch">
                <label for="header-search"
                  class="absolute w-px h-px p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 clip-[rect(0,0,0,0)]">Search
                  anything...</label>
                <i class="fas fa-search absolute left-3.5 text-dark/65 text-sm pointer-events-none transition-colors group-focus-within:text-accent-purple"
                  aria-hidden="true" />
                <input id="header-search" v-model="headerSearchQuery" type="search" autocomplete="off"
                  placeholder="Search anything..."
                  class="w-full min-w-[12rem] max-w-[16rem] py-2.5 pl-9 pr-4 rounded-full bg-white border border-dark/20 text-dark text-sm font-semibold tracking-wide shadow-sm shadow-black/5 outline-none transition-all placeholder:text-dark/60 hover:border-accent-purple/40 hover:shadow-md hover:shadow-accent-purple/10 focus:border-accent-purple/60 focus:ring-[3px] focus:ring-accent-purple/20"
                  aria-label="Search anything..." />
              </form>
            </div>

            <button type="button"
              class="md:hidden p-2.5 rounded-lg text-dark/70 hover:text-dark hover:bg-neutral-gray transition-colors"
              aria-label="Open menu" :aria-expanded="mobileMenuOpen" aria-controls="mobileMenu"
              @click="mobileMenuOpen = !mobileMenuOpen">
              <i class="fas fa-bars text-xl" />
            </button>
          </div>
        </div>
        <div
          class="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/35 via-accent-purple/35 to-transparent opacity-80"
          aria-hidden="true" />
      </nav>

      <!-- Mobile menu backdrop -->
      <div
        class="fixed inset-0 z-[39] bg-black/25 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"
        :class="{ 'opacity-100 pointer-events-auto': mobileMenuOpen }" aria-hidden="true"
        @click="mobileMenuOpen = false" />

      <!-- Mobile menu -->
      <div id="mobileMenu"
        class="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] z-40 bg-white/98 backdrop-blur-xl py-12 px-6 overflow-y-auto shadow-2xl transition-transform duration-300 md:hidden text-center"
        role="dialog" aria-label="Navigation menu" :aria-hidden="!mobileMenuOpen"
        :class="mobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'">
        <button type="button"
          class="absolute top-4 right-4 p-2 text-dark/80 bg-transparent border-none cursor-pointer text-2xl leading-none"
          aria-label="Close menu" @click="mobileMenuOpen = false">
          <i class="fas fa-times" />
        </button>
        <form role="search" class="relative flex items-center w-full mb-3" @submit.prevent="onSearch">
          <i class="fas fa-search absolute left-4 text-dark/65 text-sm pointer-events-none" aria-hidden="true" />
          <input v-model="headerSearchQuery" type="search" autocomplete="off"
            placeholder="Search news, courses, projects..."
            class="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white border border-dark/20 text-dark text-[0.9375rem] font-medium shadow-sm shadow-black/5 outline-none transition-all placeholder:text-dark/60 hover:border-accent-purple/35 focus:border-accent-purple/60 focus:ring-[3px] focus:ring-accent-purple/20"
            aria-label="Search" />
        </form>
        <a href="#news"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#news')">News</a>
        <a href="#courses"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#courses')">Courses</a>
        <a href="#about"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#about')">About</a>
        <a href="#projects"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#projects')">Projects</a>
        <a href="#merch"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#merch')">Merch</a>
        <a href="#events-reminders"
          class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark"
          @click.prevent="go('#events-reminders')">Events Reminder</a>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const { logoUrl } = useAppLogo()

const mobileMenuOpen = ref(false)
const headerScrolled = ref(false)
const headerSearchQuery = ref('')
const isFooterVisible = ref(false)

const props = defineProps<{
  scrollToSection: (id: string) => void
}>()

const emit = defineEmits<{
  search: [query: string]
}>()

function go(id: string) {
  props.scrollToSection(id)
  mobileMenuOpen.value = false
}

function onSearch() {
  mobileMenuOpen.value = false
  const q = headerSearchQuery.value?.trim() || ''
  emit('search', q)
}

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
    threshold: 0.1 // Triggers when 10% of footer is visible
  })

  const footer = document.querySelector('#main-footer')
  if (footer) observer.observe(footer)

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    if (footer) observer.unobserve(footer)
    observer.disconnect()
  })
})

watch(mobileMenuOpen, (open) => {
  if (import.meta.client && document?.body) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>
