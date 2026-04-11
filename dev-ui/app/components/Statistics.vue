<template>
  <section 
    :class="[
      'py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300',
          isDarkMode
        ? 'bg-[#09010c]'
        : 'bg-white'
    ]"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-300"
          :class="isDarkMode ? 'text-white' : 'bg-gradient-to-b from-blue-600 to-purple-600 bg-clip-text text-transparent'"
        >
          #TECHSAVVY Activities
        </h2>
        <p
          class="text-base sm:text-lg max-w-2xl mx-auto transition-colors duration-300"
          :class="isDarkMode ? 'text-white/80' : 'text-gray-600'"
        >
          Milestones Throughout All Seasons
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        <!-- Stat 1: Events Held -->
        <div class="text-center group cursor-default" @mouseenter="animateStat(0)">
          <div class="mb-3 sm:mb-4 flex justify-center items-baseline">
            <span 
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'bg-gradient-to-b from-blue-600 to-purple-600 bg-clip-text text-transparent'"
            >
              {{ displayStats.eventsHeld }}
            </span>
            <span 
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-blue-600'"
            >
              +
            </span>
          </div>
          <p 
            class="text-sm sm:text-base md:text-lg font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-white/80' : 'text-gray-600'"
          >
            Projects
          </p>
        </div>

        <!-- Stat 2: Live Shows -->
        <div class="text-center group cursor-default" @mouseenter="animateStat(1)">
          <div class="mb-3 sm:mb-4 flex justify-center items-baseline">
            <span 
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'bg-gradient-to-b from-pink-600 to-indigo-600 bg-clip-text text-transparent'"
            >
              {{ displayStats.liveShows }}
            </span>
            <span 
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-purple-600'"
            >
              +
            </span>
          </div>
          <p 
            class="text-sm sm:text-base md:text-lg font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-white/80' : 'text-gray-600'"
          >
            Partners and Collaborators
          </p>
        </div>

        <!-- Stat 3: Artists Managed -->
        <div class="text-center group cursor-default" @mouseenter="animateStat(2)">
          <div class="mb-3 sm:mb-4 flex justify-center items-baseline">
            <span 
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'bg-gradient-to-b from-pink-600 to-indigo-600 bg-clip-text text-transparent'"
            >
              {{ displayStats.artistsManaged }}
            </span>
            <span 
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-pink-600'"
            >
              +
            </span>
          </div>
          <p 
            class="text-sm sm:text-base md:text-lg font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-white/80' : 'text-gray-600'"
          >
            Core Members
          </p>
        </div>

        <!-- Stat 4: Happy Clients -->
        <div class="text-center group cursor-default" @mouseenter="animateStat(3)">
          <div class="mb-3 sm:mb-4 flex justify-center items-baseline">
            <span 
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent'"
            >
              {{ displayStats.happyClients }}
            </span>
            <!-- <span 
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-red-600'"
            >
              K
            </span> -->
             <span 
              class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-1 transition-colors duration-300"
              :class="isDarkMode ? 'text-white' : 'text-pink-600'"
            >
              +
            </span>
          </div>
          <p 
            class="text-sm sm:text-base md:text-lg font-medium transition-colors duration-300"
            :class="isDarkMode ? 'text-white/80' : 'text-gray-600'"
          >
            Participants
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Stats data
const stats = {
  eventsHeld: 10,
  liveShows: 20,
  artistsManaged: 50,
  happyClients: 800
}

// Display stats (for animation)
const displayStats = ref({
  eventsHeld: 0,
  liveShows: 0,
  artistsManaged: 0,
  happyClients: 0
})

// Animation state
const animatedStats = ref([false, false, false, false])

// Animate individual stat on hover
const animateStat = (index) => {
  animatedStats.value[index] = true
  setTimeout(() => {
    animatedStats.value[index] = false
  }, 500)
}

// Counter animation
const animateCounter = (key, target, duration = 2000) => {
  const start = 0
  const increment = target / (duration / 16) // 60fps
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      displayStats.value[key] = target
      clearInterval(timer)
    } else {
      displayStats.value[key] = Math.floor(current)
    }
  }, 16)
}

// Animate all counters on mount
onMounted(() => {
  setTimeout(() => {
    animateCounter('eventsHeld', stats.eventsHeld, 2000)
    animateCounter('liveShows', stats.liveShows, 2200)
    animateCounter('artistsManaged', stats.artistsManaged, 2400)
    animateCounter('happyClients', stats.happyClients, 2600)
  }, 300)
})
</script>

<style scoped>
/* Smooth transitions for numbers and labels */
span, p {
  display: inline-block;
}
</style>
