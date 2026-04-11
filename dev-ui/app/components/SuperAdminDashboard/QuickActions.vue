<template>
  <div>
    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        class=" rounded-2xl shadow p-6 hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-purple-100 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <h3 class=" text-sm mb-1">Profile</h3>
        <p class="text-2xl font-bold ">View</p>
      </div>

      <div
        class=" rounded-2xl shadow p-6 hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-blue-100 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
        <h3 class=" text-sm mb-1">Projects</h3>
        <p class="text-2xl font-bold ">0</p>
      </div>

      <div
        class=" rounded-2xl shadow p-6 hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-green-100 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
        </div>
        <h3 class=" text-sm mb-1">Tasks</h3>
        <p class="text-2xl font-bold ">0</p>
      </div>

      <div
        class=" rounded-2xl shadow p-6 hover:shadow-xl transition-shadow cursor-pointer"
        @click="handleLogout"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-red-100 p-3 rounded-xl">
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </div>
        <h3 class=" text-sm mb-1">Logout</h3>
        <p class="text-2xl font-bold ">Exit</p>
      </div>
    </div>

      <div>
    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all"
      >
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4"
          >
            <svg
              class="h-8 w-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
          <p class=" mb-6">
            Are you sure you want to logout from your account?
          </p>
          <div class="flex gap-4">
            <button
              @click="showLogoutModal = false"
              class="flex-1 px-6 py-3 bg-gray-200  rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmLogout"
              class="flex-1 px-6 py-3 bg-red-600  rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


  </div>
</template>


<script setup>
const { logout } = useAuth()
// props


// const props = defineProps({
//     handleLogout: {
//         type: Function,
//         default: () => {}
//     }
// })

const showLogoutModal = ref(false)

const handleLogout = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  showLogoutModal.value = false
  logout()
}

</script>