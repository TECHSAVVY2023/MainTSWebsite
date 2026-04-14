<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-[#e8e2f4] font-roboto lg:h-screen lg:flex-row lg:bg-white">
    <LoginWelcomeBanner class="w-full shrink-0 lg:w-1/2 lg:min-h-0" />
    <LoginFormSection
      :login="login"
      class="relative flex w-full flex-1 flex-col justify-center px-4 pb-10 pt-2 sm:px-6 lg:w-1/2 lg:flex-none lg:min-h-0 lg:px-8 lg:pb-10 lg:pt-3"
      @submit="login.onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
const login = useLogin()
const { login: oauthLogin } = useAuth()

useLoginPage()

login.onSubmit = () => {
  oauthLogin()
}
</script>
