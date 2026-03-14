<template>
  <div class="font-inter text-white min-h-screen bg-violet">
    <LayoutPageHeader />
    <main class="bg-violet pt-8 pb-20 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-about" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative flex-1 flex flex-col">
          <div class="mb-10 sm:mb-12">
            <span class="block text-xs font-semibold tracking-widest uppercase text-accent-purple mb-2">About</span>
            <h1 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-white mb-4">
              About Page
            </h1>
            <p class="text-white/85 text-base leading-relaxed">This is my new page.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Uses AppPageHeader (useBackToHome) and SectionWires; no extra logic needed.
</script>
