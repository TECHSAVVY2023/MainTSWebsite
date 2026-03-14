<template>
  <div class="font-inter text-white min-h-screen bg-violet">
    <LayoutPageHeader />
    <main class="bg-violet pt-8 pb-20 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32 relative overflow-hidden flex flex-col">
      <SectionWires gradient-id-prefix="swg-contact" />
      <div class="relative z-10 isolate flex-1 flex flex-col">
        <ContactSection />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useContactPage()
</script>
