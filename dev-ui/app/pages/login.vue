<template>
  <div class="font-inter min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-br from-[#f5f7fa] via-[#f1f3f7] to-[#eceff4] relative">
    <NuxtLink :to="backToHomeHref" class="absolute top-5 left-5 inline-flex items-center gap-2 text-dark/90 text-sm no-underline transition-colors hover:text-accent-purple">
      <i class="fas fa-arrow-left" :aria-hidden="true" /> Back to Home
    </NuxtLink>
    <div class="w-full max-w-[1080px] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(46,19,104,0.08),0_0_0_1px_rgba(224,224,224,0.8)]">
      <div class="flex flex-col lg:flex-row">
        <LoginWelcomeBanner />
        <LoginFormSection :login="login" @submit="login.onSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const login = useLogin()
const { login: oauthLogin } = useAuth()

useLoginPage()

login.onSubmit = () => {
  oauthLogin()
}
</script>
