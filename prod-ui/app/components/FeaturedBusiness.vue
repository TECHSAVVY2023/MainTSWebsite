<template>
  <section class="py-12 bg-white overflow-hidden">
    <div class="container mx-auto px-4 mb-10 text-center">
      <h2 class="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-slate-400 mb-2">
        Powered By Our Community
      </h2>
    </div>

    <!-- Infinite Scroll Container -->
    <div class="relative w-full overflow-hidden h-16 sm:h-20">
      <!-- Gradient Overlays for Fade Effect -->
      <div class="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div class="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <!-- The Marquee Track (Triple Buffered for perfect loop) -->
      <div 
        class="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
      >
        <!-- Use 3 separate sets for perfect math -->
        <div v-for="set in 3" :key="`set-${set}`" class="flex items-center" :aria-hidden="set > 1">
          <div v-for="i in 12" :key="`logo-${set}-${i}`" class="flex-shrink-0 pr-16 sm:pr-24">
            <img 
              :src="logoUrl" 
              alt="TechSavvy" 
              class="h-8 sm:h-11 w-auto object-contain opacity-35 hover:opacity-100 transition-all duration-500 cursor-pointer scale-90 hover:scale-100" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAppLogo } from '~/composables/useAppLogo'

const { logoUrl } = useAppLogo()
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% / 3)); }
}

.animate-marquee {
  display: inline-flex;
  animation: marquee 45s linear infinite;
  width: max-content;
  will-change: transform;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
