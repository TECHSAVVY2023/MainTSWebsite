<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-blue-100 space-y-6 relative overflow-hidden group hover:shadow-blue-100 transition-all duration-300">
    <!-- Brand Accent -->
    <div class="absolute top-0 left-0 h-1.5 w-full animate-gradient-pan bg-[length:200%_auto] bg-gradient-to-r from-[#00b9ff] via-[#25e297] to-[#00b9ff]"></div>

    <!-- Header -->
    <div class="text-center space-y-3">
      <div class="flex justify-center">
        <div class="relative">
          <div class="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div class="relative bg-white p-4 rounded-2xl border border-blue-50 shadow-sm">
            <svg class="w-10 h-10 text-[#00b9ff]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Wise Checkout</h2>
        <p class="text-sm text-gray-500 font-medium mt-1">Pay securely via official Wise portal</p>
      </div>
    </div>

    <!-- Summary Card -->
    <div class="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold text-gray-400 uppercase">Product</span>
        <span class="text-sm font-semibold text-gray-700">{{ eventName }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold text-gray-400 uppercase">Amount</span>
        <span class="text-lg font-black text-blue-600">₱{{ (amount / 100).toFixed(2) }}</span>
      </div>
    </div>

    <!-- Form Inputs -->
    <div class="space-y-4">
      <div class="relative">
        <label class="absolute -top-2 left-3 bg-white px-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest z-10">Email Address</label>
        <input
          v-model="email"
          type="email"
          class="w-full px-4 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-blue-400 transition-all duration-200 outline-none text-gray-700 font-medium"
        />
      </div>
    </div>

    <!-- Action -->
    <button
      @click="handlePayment"
      :disabled="loading"
      class="w-full bg-[#00b9ff] hover:bg-[#00a4e4] active:scale-[0.98] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-3 overflow-hidden relative"
    >
      <div v-if="loading" class="absolute inset-0 bg-blue-600/10 backdrop-blur-sm flex items-center justify-center">
        <svg class="w-6 h-6 animate-spin text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      </div>
      
      <span class="relative">Proceed to Wise Checkout</span>
      <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </button>

    <div class="text-center">
      <span class="text-[10px] text-gray-400 font-medium inline-flex items-center gap-1">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        Secured by Wise hosted redirect
      </span>
    </div>
  </div>
</template>

<script setup>
const email = ref('jorenleeluna24@gmail.com')
const amount = ref(5000) // Default 50 PHP
const eventName = ref('Tech Event (Wise Native)')
const loading = ref(false)

const handlePayment = async () => {
  if (!email.value) {
    alert('Please enter your email')
    return
  }

  loading.value = true

  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const apiBase = isLocal ? 'http://127.0.0.1:8000' : 'https://api.techsavvies.space'

    const res = await fetch(`${apiBase}/api/wise-experiment/create-payment-link/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        amount: amount.value,
        event_name: eventName.value,
        currency: 'PHP'
      })
    })

    const data = await res.json()

    if (data?.url) {
      // Direct Native Redirect to Wise (as requested)
      console.log('🚀 Redirecting to Official Wise Checkout:', data.url)
      window.location.href = data.url
    } else {
      throw new Error(data?.error || 'Integration failed')
    }

  } catch (error) {
    console.error('🔥 Wise Redirect Error:', error)
    alert('Failed to initiate Wise checkout. Please check console.')
  } finally {
    loading.value = false
  }
}
</script>
