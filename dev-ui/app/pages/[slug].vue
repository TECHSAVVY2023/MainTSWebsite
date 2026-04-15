<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const seconds = ref(3)
const slug = route.params.slug

onMounted(() => {
  const interval = setInterval(() => {
    seconds.value--

    if (seconds.value === 0) {
      clearInterval(interval)
      router.push('/')
    }
  }, 1000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50 px-4">
    
    <div class="text-center max-w-lg">

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
        TECHSAVVY,
        <span class="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
          CODE CAMP.
        </span>
      </h1>


      <!-- Countdown -->
      <div class="mb-6">
        <p class="text-lg text-gray-600">
          Redirecting in 
          <span class="font-bold text-purple-600">{{ seconds }}</span> 
          second<span v-if="seconds > 1">s</span>...
        </p>
      </div>

      <!-- Button fallback -->
      <button
        @click="router.push('/')"
        class="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:opacity-90 transition"
      >
        Go Now
      </button>

      <!-- Small note -->
      <p class="text-xs text-gray-400 mt-4">
        If not redirected automatically, click the button above.
      </p>

    </div>
  </div>
</template>