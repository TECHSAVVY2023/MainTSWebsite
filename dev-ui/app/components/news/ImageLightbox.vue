<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
        @click.self="$emit('close')"
      >
        <button
          type="button"
          class="absolute top-4 right-4 z-[100] w-11 h-11 rounded-full bg-[#ECEFF1]/95 text-[#283593] border-0 cursor-pointer flex items-center justify-center text-xl transition-all hover:bg-[#DDE4EE] hover:scale-105 shadow-lg"
          aria-label="Close"
          @click="$emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute left-6 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 rounded-full bg-[#ECEFF1]/95 text-[#283593] border-0 cursor-pointer flex items-center justify-center text-2xl transition-all hover:bg-[#DDE4EE] hover:scale-105 shadow-lg"
          aria-label="Previous image"
          @click.stop="$emit('prev')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="max-w-[90vw] max-h-[90vh] flex flex-col items-center justify-center gap-4">
          <img
            :src="images[currentIndex]"
            :alt="`${title} – image ${currentIndex + 1}`"
            class="max-w-full max-h-[85vh] object-contain pointer-events-none"
            @click.stop
          />
          <p v-if="images.length > 1" class="text-white/90 text-sm font-medium">
            {{ currentIndex + 1 }} of {{ images.length }}
          </p>
        </div>
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute right-6 top-1/2 -translate-y-1/2 z-[100] w-14 h-14 rounded-full bg-[#ECEFF1]/95 text-[#283593] border-0 cursor-pointer flex items-center justify-center text-2xl transition-all hover:bg-[#DDE4EE] hover:scale-105 shadow-lg"
          aria-label="Next image"
          @click.stop="$emit('next')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  images: string[]
  currentIndex: number
  title: string
}>()

defineEmits<{
  close: []
  prev: []
  next: []
}>()
</script>
