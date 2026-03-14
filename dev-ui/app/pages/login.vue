<template>
  <div class="font-inter min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 bg-gradient-to-br from-[#0f0718] via-[#1a0d2e] to-[#14082E]">
    <NuxtLink :to="backToHomeHref" class="inline-flex items-center gap-2 text-white/95 text-sm no-underline mb-4 self-start transition-colors hover:text-accent-purple">
      <i class="fas fa-arrow-left" :aria-hidden="true" /> Back to Home
    </NuxtLink>
    <div class="w-full max-w-[1080px] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(181,163,255,0.12)] flex flex-col flex-1 min-h-0">
      <div class="flex flex-col lg:flex-row min-h-0">
        <LoginWelcomeBanner />
        <LoginFormSection :login="login" @submit="login.onSubmit" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { backToHomeHref } = useBackToHome()
const login = useLogin()

useLoginPage()
</script>
