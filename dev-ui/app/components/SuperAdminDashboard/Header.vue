<template>
  <div class="relative mb-6 sm:mb-8">
    <!-- Header Banner Card -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-950 p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 border border-white/10">
      <!-- Ambient Lighting Layer -->
      <div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />
      <div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <!-- User Info Section -->
        <div class="flex items-center gap-5 sm:gap-6">
          <div class="relative shrink-0">
            <div
              v-if="profileImage"
              class="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md"
            >
              <img
                :src="profileImage"
                alt="Profile"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div
              v-else
              class="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl border-2 border-white/20 shadow-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 flex items-center justify-center backdrop-blur-md"
            >
              <span class="text-2xl font-black text-white tracking-wider">{{ userInitials }}</span>
            </div>
            <!-- Live Status Indicator -->
            <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center" aria-label="Online">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-indigo-950 bg-emerald-500" />
            </span>
          </div>

          <div class="min-w-0">
            <h1 class="text-2xl sm:text-3xl font-black tracking-tight mb-1 flex items-center gap-2">
              Good {{ greeting }} <span class="animate-bounce inline-block text-xl sm:text-2xl">👋</span>
            </h1>
            <p class="text-xs sm:text-sm text-purple-200/90 font-medium mb-3">
              Welcome back to your command center
            </p>

            <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2 inline-block shadow-inner">
              <p class="font-black text-sm sm:text-base tracking-wide text-white">
                {{ user?.name?.toUpperCase() || "ADMINISTRATOR" }}
              </p>
              <p class="text-[11px] font-mono text-purple-200/80 truncate">{{ user?.email || "" }}</p>
            </div>
          </div>
        </div>

        <!-- Clock & Date Section -->
        <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-4 shrink-0 flex flex-col justify-center text-center shadow-lg">
          <div class="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-200/90 mb-1.5">
            <i class="far fa-calendar-alt text-violet-300" />
            <span>{{ currentDate }}</span>
          </div>
          <div class="flex items-center justify-center gap-2.5">
            <i class="far fa-clock text-lg text-emerald-400 animate-pulse" />
            <span class="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  user,
  profileImage,
  currentTime,
  currentDate,
  greeting,
  userInitials,
  handleImageError,
} = useDashboardHeader()
</script>
