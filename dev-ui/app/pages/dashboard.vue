<template>
  <ClientOnly>
    <SuperAdminDashboard />
    <template #fallback>
      <div class="h-screen w-full flex items-center justify-center bg-violet-600">
        <div class="w-12 h-12 border-4 border-violet-400 border-t-white rounded-full animate-spin"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>