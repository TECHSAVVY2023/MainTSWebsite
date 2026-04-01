<template>
  <div class="font-inter relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-4 py-6 sm:px-6 sm:py-8">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(145,88,255,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,125,86,0.18),transparent_42%),linear-gradient(120deg,#060817_0%,#0d1125_52%,#070a1b_100%)]" aria-hidden="true" />
    <SectionWires gradient-id-prefix="swg-login-page" />
    <NuxtLink :to="backToHomeHref" class="absolute left-5 top-5 z-20 inline-flex items-center gap-2 text-sm text-white/90 no-underline transition-colors hover:text-accent-gold">
      <i class="fas fa-arrow-left" :aria-hidden="true" /> Back to Home
    </NuxtLink>
    <div class="relative z-10 w-full max-w-[1020px] overflow-hidden rounded-[34px] border border-white/20 bg-white shadow-[0_24px_72px_rgba(2,6,23,0.58)]">
      <div class="flex flex-col lg:flex-row lg:min-h-[620px]">
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
