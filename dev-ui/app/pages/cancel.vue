<template>
  <div class="min-h-screen flex items-center justify-center bg-red-50">
    <div class="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
      <h1 class="text-2xl font-bold text-red-600 mb-4">❌ Payment Cancelled</h1>
      <p class="text-gray-600 mb-6">
        Your payment was not completed. You can try again anytime.
      </p>

      <NuxtLink to="/" class="bg-red-500 text-white px-6 py-3 rounded-lg">
        Try Again
      </NuxtLink>
    </div>
  </div>
</template>