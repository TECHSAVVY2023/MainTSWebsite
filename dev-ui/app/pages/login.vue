<template>
  <div class="flex flex-col lg:flex-row min-h-screen lg:h-screen overflow-hidden font-roboto bg-white">
    <LoginWelcomeBanner class="w-full lg:w-1/2" />
    <LoginFormSection :login="login" @submit="login.onSubmit" class="w-full lg:w-1/2 pt-3 pb-10 lg:min-h-0 relative" />
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
