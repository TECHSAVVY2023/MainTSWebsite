<template>
  <div>
    <!-- Header Card -->
    <div class="bg-linear-to-r rounded-3xl shadow p-8 mb-6">
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
      >
        <!-- User Info Section -->
        <div class="flex items-center gap-6">
          <div class="relative">
            <div
              v-if="profileImage"
              class="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white"
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
              class="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center"
            >
              <span class=" text-2xl font-bold">{{
                userInitials
              }}</span>
            </div>
            <div
              class="absolute -bottom-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-white"
            ></div>
          </div>

          <div class="">
            <h1 class="text-3xl font-bold mb-1 flex items-center gap-2">
              Good {{ greeting }} 👋
            </h1>
            <p class="text-sm opacity-90 mb-2">
              Welcome back to your dashboard
            </p>

            <div
              class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block"
            >
              <p class="font-bold text-lg">
                {{ user?.name?.toUpperCase() || "USER" }}
              </p>
              <p class="text-xs opacity-90">{{ user?.email || "" }}</p>
            </div>
          </div>
        </div>

        <!-- Clock Section -->
        <div
          class="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 "
        >
          <div class="flex items-center gap-2 justify-center text-sm">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ currentDate }}</span>
          </div>
          <div class="flex items-center gap-3">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-3xl font-bold font-mono">{{ currentTime }}</span>
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
