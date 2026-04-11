<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">

    <!-- Title -->
    <h2 class="text-xl font-semibold text-center text-gray-800">
      Buy Ticket
    </h2>

    <!-- Email -->
    <input
      v-model="email"
      type="email"
      placeholder="Enter your email"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />

    <!-- Amount -->
    <input
      v-model.number="amount"
      type="number"
      placeholder="Amount (in cents, min 5000)"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />

    <!-- Event Name -->
    <input
      v-model="eventName"
      type="text"
      placeholder="Event Name"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
    />

    <!-- Pay Button -->
    <button
      @click="pay"
      :disabled="loading"
      class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <svg
        v-if="loading"
        class="w-5 h-5 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>

      <span>{{ loading ? 'Processing...' : 'Pay with Stripe' }}</span>
    </button>

  </div>
</template>

<script setup>
const email = ref('jorenleeluna24@gmail.com')
const amount = ref(5000) // Default 50 PHP (Stripe minimum)
const eventName = ref('Tech Event')
const loading = ref(false)

const pay = async () => {
  if (!email.value || !amount.value || !eventName.value) {
    alert('Please fill all fields')
    return
  }

  // Stripe minimum validation for PHP
  if (amount.value < 5000) {
    alert('Minimum ticket amount is ₱50 (5000 cents).')
    return
  }

  loading.value = true

  try {
    const res = await fetch('https://api.techsavvies.space/api/stripe-experiment/create-checkout-session/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        amount: amount.value,
        event_name: eventName.value
      })
    })

    const text = await res.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      console.error('❌ Backend returned HTML instead of JSON:', text)
      alert('Server error. Check console.')
      return
    }

    console.log('✅ Stripe response:', data)

    if (data?.url) {
      window.location.href = data.url
    } else {
      console.error('❌ No checkout URL:', data)
      alert(data?.error || 'Checkout failed')
    }

  } catch (error) {
    console.error('🔥 Stripe error:', error)
    alert('Payment failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>