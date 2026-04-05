<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-10 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-10 opacity-0"
  >
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 text-white shadow-[0_8px_24px_rgba(124,58,237,0.35)] transition-all duration-300 hover:bg-violet-700 hover:shadow-[0_12px_32px_rgba(124,58,237,0.45)] hover:-translate-y-1 active:scale-95 group"
      aria-label="Scroll to top"
    >
      <i class="fas fa-chevron-up transition-transform duration-300 group-hover:-translate-y-0.5"></i>
      
      <!-- Subtle pulse ring -->
      <span class="absolute inset-0 rounded-2xl border-2 border-violet-400/30 animate-ping pointer-events-none" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)

const checkScroll = () => {
  // Show button after scrolling down 400px
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
