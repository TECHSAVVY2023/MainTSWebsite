<template>
  <section class="h-screen flex flex-col justify-center pt-16 pb-14 sm:pt-20 sm:pb-20 relative overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${heroBgUrl})` }"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-violet via-violet-dark to-black opacity-[0.72]" />

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-3xl mx-auto text-center rounded-2xl bg-white/[0.08] shadow-xl py-4 px-3.5 sm:p-5 flex flex-col items-center gap-3 sm:gap-4">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/30">
          <span class="text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-white">Season 4</span>
          <span class="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
        </div>

        <h1 class="font-black text-white tracking-tight leading-tight text-[clamp(1.5rem,5vw,3.25rem)]">
          <span class="inline-block bg-gradient-to-r from-accent-purple to-accent-gold bg-clip-text text-transparent">CODE CAMP</span>
        </h1>

        <p class="text-sm sm:text-lg text-accent-light mb-0 font-light">
          Code · Create · Connect
        </p>

        <p class="text-xs sm:text-base text-white/70 mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed">
          A growing IT community in Misamis Occidental, empowering developers through full-stack web development and career growth.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            class="px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-accent-gold text-violet font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-accent-gold/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-gold/25"
          >
            Coming Soon!
          </button>
          <a
            href="#news"
            class="inline-block px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-violet/70 border border-accent-purple/30 backdrop-blur-[5px] text-white font-medium text-sm sm:text-base transition-all duration-300 hover:bg-accent-purple/10 hover:-translate-y-0.5"
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
