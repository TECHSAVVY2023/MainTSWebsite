<template>
  <section class="h-screen flex flex-col justify-center pt-16 pb-14 sm:pt-20 sm:pb-20 relative overflow-hidden isolate">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroBgUrl})` }"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-accent-purple/45" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(177,138,243,0.35),transparent_42%),radial-gradient(circle_at_80%_78%,rgba(255,196,82,0.25),transparent_36%)]" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-3xl mx-auto text-center rounded-3xl border border-white/30 bg-white/12 backdrop-blur-xl shadow-[0_30px_80px_-25px_rgba(5,8,16,0.8)] py-6 px-4 sm:px-8 sm:py-9 flex flex-col items-center gap-4 sm:gap-5">
        <div class="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/15 border border-white/35">
          <span class="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-white">Season 4</span>
          <span class="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
        </div>

        <h1 class="font-black text-white tracking-tight leading-tight text-[clamp(1.7rem,5.4vw,3.5rem)]">
          <span class="inline-block bg-gradient-to-r from-accent-purple to-accent-gold bg-clip-text text-transparent">CODE CAMP</span>
        </h1>

        <p class="text-sm sm:text-lg text-white/90 mb-0 font-medium tracking-wide">
          Code · Create · Connect
        </p>

        <p class="text-xs sm:text-base text-white/80 mb-5 sm:mb-7 max-w-xl mx-auto leading-relaxed">
          Think Smart, Code Smarter, Powering Businesses Through Technology.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          <button
            type="button"
            class="px-5 py-3 sm:px-7 rounded-xl bg-primary text-white font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-purple/40"
          >
            Coming Soon!
          </button>
          <a
            href="#news"
            class="inline-block px-5 py-3 sm:px-7 rounded-xl bg-[#ECEFF1]/95 border border-[#D1D8E3] text-[#283593] font-semibold text-sm sm:text-base transition-all duration-300 hover:bg-[#DDE4EE] hover:border-[#B8C4D8] hover:-translate-y-0.5"
            @click.prevent="scrollToSection('#news')"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const heroBgUrl = '/assets/hero_bg.jpg'

const props = defineProps<{
  scrollToSection: (id: string) => void
}>()
</script>
