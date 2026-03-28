<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <nav
      class="relative bg-white/95 backdrop-blur-[16px] border-b border-neutral-border transition-colors duration-200"
      :class="{ 'bg-white': headerScrolled }"
    >
      <div class="container mx-auto px-5 sm:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink
            to="/"
            class="flex items-center shrink-0 pr-4"
            aria-label="Home"
          >
            <img
              :src="logoUrl"
              alt="CODEDEV Solutions"
              class="h-11 w-11 md:h-12 md:w-12 rounded-full object-cover border border-neutral-border opacity-95 hover:opacity-100 transition-opacity"
            />
          </NuxtLink>

          <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            <a href="#news" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#news')">News</a>
            <a href="#courses" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#courses')">Courses</a>
            <a href="#about" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#about')">About</a>
            <a href="#projects" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#projects')">Projects</a>
            <a href="#merch" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#merch')">Merch</a>
            <a href="#events-reminders" class="text-dark/85 text-lg font-medium tracking-wide pt-2 pb-2 border-b-2 border-transparent transition-colors hover:text-dark hover:border-accent-purple" @click.prevent="scrollToSection('#events-reminders')">Events Reminder</a>
          </div>

          <div class="hidden md:flex shrink-0 pl-4 items-center">
            <form role="search" class="group relative flex items-center min-w-0" @submit.prevent="onSearch">
              <label for="header-search" class="absolute w-px h-px p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0 clip-[rect(0,0,0,0)]">Search news, courses, and featured projects</label>
              <i class="fas fa-search absolute left-3.5 text-dark/65 text-sm pointer-events-none transition-colors group-focus-within:text-accent-purple" aria-hidden="true" />
              <input
                id="header-search"
                v-model="headerSearchQuery"
                type="search"
                autocomplete="off"
                placeholder="Search news, courses, projects..."
                class="w-full min-w-[12rem] max-w-[16rem] py-2.5 pl-9 pr-4 rounded-full bg-white border border-dark/20 text-dark text-sm font-semibold tracking-wide shadow-sm shadow-black/5 outline-none transition-all placeholder:text-dark/60 hover:border-accent-purple/40 hover:shadow-md hover:shadow-accent-purple/10 focus:border-accent-purple/60 focus:ring-[3px] focus:ring-accent-purple/20"
                aria-label="Search news, courses, and featured projects"
              />
            </form>
          </div>

          <button
            type="button"
            class="md:hidden p-2.5 rounded-lg text-dark/70 hover:text-dark hover:bg-neutral-gray transition-colors"
            aria-label="Open menu"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobileMenu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <i class="fas fa-bars text-xl" />
          </button>
        </div>
      </div>
      <div
        class="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/35 via-accent-purple/35 to-transparent opacity-80"
        aria-hidden="true"
      />
    </nav>

    <!-- Mobile menu backdrop -->
    <div
      class="fixed inset-0 z-[39] bg-black/25 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"
      :class="{ 'opacity-100 pointer-events-auto': mobileMenuOpen }"
      aria-hidden="true"
      @click="mobileMenuOpen = false"
    />

    <!-- Mobile menu -->
    <div
      id="mobileMenu"
      class="fixed top-0 right-0 bottom-0 w-[280px] max-w-[85vw] z-40 bg-white/98 backdrop-blur-xl py-12 px-6 overflow-y-auto shadow-2xl transition-transform duration-300 md:hidden text-center"
      role="dialog"
      aria-label="Navigation menu"
      :aria-hidden="!mobileMenuOpen"
      :class="mobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'"
    >
      <button
        type="button"
        class="absolute top-4 right-4 p-2 text-dark/80 bg-transparent border-none cursor-pointer text-2xl leading-none"
        aria-label="Close menu"
        @click="mobileMenuOpen = false"
      >
        <i class="fas fa-times" />
      </button>
      <form role="search" class="relative flex items-center w-full mb-3" @submit.prevent="onSearch">
        <i class="fas fa-search absolute left-4 text-dark/65 text-sm pointer-events-none" aria-hidden="true" />
        <input
          v-model="headerSearchQuery"
          type="search"
          autocomplete="off"
          placeholder="Search news, courses, projects..."
          class="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white border border-dark/20 text-dark text-[0.9375rem] font-medium shadow-sm shadow-black/5 outline-none transition-all placeholder:text-dark/60 hover:border-accent-purple/35 focus:border-accent-purple/60 focus:ring-[3px] focus:ring-accent-purple/20"
          aria-label="Search"
        />
      </form>
      <a href="#news" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#news')">News</a>
      <a href="#courses" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#courses')">Courses</a>
      <a href="#about" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#about')">About</a>
      <a href="#projects" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#projects')">Projects</a>
      <a href="#merch" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#merch')">Merch</a>
      <a href="#events-reminders" class="block py-3 text-[0.9375rem] font-medium text-dark/90 no-underline border-b border-neutral-border text-center transition-colors hover:text-dark" @click.prevent="go('#events-reminders')">Events Reminder</a>
    </div>
  </header>
</template>

<script setup lang="ts">
const { logoUrl } = useAppLogo()

const mobileMenuOpen = ref(false)
const headerScrolled = ref(false)
const headerSearchQuery = ref('')

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
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
})

watch(mobileMenuOpen, (open) => {
  if (import.meta.client && document?.body) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})
</script>
