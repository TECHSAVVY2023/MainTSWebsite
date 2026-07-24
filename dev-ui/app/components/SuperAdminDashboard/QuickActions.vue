<template>
  <div>
    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <!-- Profile Card -->
      <div
        class="group relative rounded-3xl border border-violet-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-3.5 rounded-2xl shadow-md shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">Account</span>
        </div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Profile</h3>
        <p class="text-2xl font-black text-[#1a0533]">Active</p>
      </div>

      <!-- Projects Card -->
      <div
        class="group relative rounded-3xl border border-violet-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3.5 rounded-2xl shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Portfolio</span>
        </div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Projects</h3>
        <p class="text-2xl font-black text-[#1a0533]">0 Active</p>
      </div>

      <!-- Tasks Card -->
      <div
        class="group relative rounded-3xl border border-violet-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer overflow-hidden"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-3.5 rounded-2xl shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Workflow</span>
        </div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Tasks</h3>
        <p class="text-2xl font-black text-[#1a0533]">0 Pending</p>
      </div>

      <!-- Logout Card -->
      <div
        class="group relative rounded-3xl border border-rose-100/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-500/10 cursor-pointer overflow-hidden"
        @click="handleLogout"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="bg-gradient-to-br from-rose-500 to-red-600 text-white p-3.5 rounded-2xl shadow-md shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">Session</span>
        </div>
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Logout</h3>
        <p class="text-2xl font-black text-rose-600">Sign Out</p>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 transition-all duration-300"
    >
      <div
        class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-slate-100 transform transition-all"
      >
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 mb-4 shadow-sm">
            <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <h3 class="text-xl font-black text-[#1a0533] uppercase tracking-tight mb-2">Confirm Sign Out</h3>
          <p class="text-xs font-medium text-slate-600 mb-6">
            Are you sure you want to log out of your session?
          </p>
          <div class="flex gap-3">
            <button
              @click="showLogoutModal = false"
              class="flex-1 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="confirmLogout"
              class="flex-1 px-5 py-3 bg-rose-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all"
            >
              Sign Out
            </button>
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