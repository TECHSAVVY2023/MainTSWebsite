<template>
  <div class="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class=" rounded-3xl shadow-2xl p-8 ">
        <div class="flex justify-center">
          <img
            :src="techSavvyLogo"
            alt="TechSavvy Logo"
            class="w-48 h-auto"
          />
        </div>

        <button
          @click="handleLogin"
          class="mb-4 w-full hover:bg-[#720372] bg-[#970b97] text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          LOGIN
        </button>

        <button
          @click="goToHomepage"
          class="w-full bg-white hover:bg-gray-50 text-[#1a472a] font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 border-2 border-gray-200 hover:border-[#1a472a]"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Homepage
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login } = useAuth()

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png"
);

const handleLogin = () => {
  login()
};

const goToHomepage = () => {
  navigateTo("/");
};
</script>