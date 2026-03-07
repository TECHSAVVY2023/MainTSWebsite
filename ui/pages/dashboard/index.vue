<template>
  <div class="min-h-screen bg-linear-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] p-3">
    <div class="">
      <!-- Header Card -->
      <div class="bg-linear-to-r from-[#2d8659] to-[#1a5c3a] rounded-3xl shadow-2xl p-8 mb-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <!-- User Info Section -->
          <div class="flex items-center gap-6">
            <div class="relative">
              <div v-if="profileImage" class="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                <img
                  :src="profileImage"
                  alt="Profile"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div v-else class="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span class="text-white text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <div class="absolute -bottom-1 -right-1 bg-green-400 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>

            <div class="text-white">
              <h1 class="text-3xl font-bold mb-1 flex items-center gap-2">
                Good {{ greeting }} 👋
              </h1>
              <p class="text-sm opacity-90 mb-2">Welcome back to your dashboard</p>

              <div class="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                <p class="font-bold text-lg">{{ user?.name?.toUpperCase() || 'USER' }}</p>
                <p class="text-xs opacity-90">{{ user?.email || '' }}</p>
              </div>

              <div class="flex items-center gap-2 mt-3 text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{{ currentDate }}</span>
              </div>
            </div>
          </div>

          <!-- Clock Section -->
          <div class="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 text-white">
            <div class="flex items-center gap-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-3xl font-bold font-mono">{{ currentTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-purple-100 p-3 rounded-xl">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-600 text-sm mb-1">Profile</h3>
          <p class="text-2xl font-bold text-gray-800">View</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-blue-100 p-3 rounded-xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-600 text-sm mb-1">Projects</h3>
          <p class="text-2xl font-bold text-gray-800">0</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-green-100 p-3 rounded-xl">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-600 text-sm mb-1">Tasks</h3>
          <p class="text-2xl font-bold text-gray-800">0</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" @click="handleLogout">
          <div class="flex items-center justify-between mb-4">
            <div class="bg-red-100 p-3 rounded-xl">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          <h3 class="text-gray-600 text-sm mb-1">Logout</h3>
          <p class="text-2xl font-bold text-gray-800">Exit</p>
        </div>
      </div>


      <div class="mb-20" v-if="user?.email === 'jorenleeluna24@gmail.com'">
        <Members />
      </div>

      <div>
         <ContentFormAndList/>
      </div>

      <!-- Content Area -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <p class="text-gray-600">No recent activity to display.</p>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to logout from your account?</p>
          <div class="flex gap-4">
            <button
              @click="showLogoutModal = false"
              class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmLogout"
              class="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'
import ContentFormAndList from '~/components/ContentFormAndList.vue'

definePageMeta({
  middleware: 'auth'
})

const { user, setAuth, logout } = useAuth()

const currentTime = ref('')
const currentDate = ref('')
const greeting = ref('')
const showLogoutModal = ref(false)
const profileImage = ref(null)

const userInitials = computed(() => {
  const name = user.value?.name || 'USER'
  const nameParts = name.split(' ')
  if (nameParts.length >= 2) {
    return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
})

const updateTime = () => {
  const now = moment()
  currentTime.value = now.format('hh:mm:ss A')
  currentDate.value = now.format('dddd, MMMM DD, YYYY')

  const hour = now.hour()
  if (hour < 12) {
    greeting.value = 'Morning'
  } else if (hour < 18) {
    greeting.value = 'Afternoon'
  } else {
    greeting.value = 'Evening'
  }
}

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  showLogoutModal.value = false
  logout()
}

const handleImageError = () => {
  profileImage.value = null
}

onMounted(() => {
  // Read token from URL if coming from OAuth callback
  const urlParams = new URLSearchParams(window.location.search)
  const urlToken = urlParams.get('token')
  if (urlToken) {
    setAuth(urlToken)
    window.history.replaceState({}, '', '/dashboard')
  } else {
    const { init } = useAuth()
    init()
  }

  updateTime()
  setInterval(updateTime, 1000)

  if (user.value?.image) {
    profileImage.value = user.value.image
  }
})

watch(() => user.value?.image, (newImage) => {
  if (newImage) profileImage.value = newImage
})
</script>
