<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4">
    <h2 class="text-xl font-semibold text-center text-gray-800">Buy Ticket</h2>

    <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg" />
    <input v-model.number="amount" type="number" placeholder="Amount (min 5000)" class="w-full px-4 py-2 border rounded-lg" />
    <input v-model="eventName" type="text" placeholder="Event Name" class="w-full px-4 py-2 border rounded-lg" />

    <button @click="pay" :disabled="loading"
      class="w-full bg-blue-500 text-white py-3 rounded-lg flex justify-center gap-2 mt-4">

      <span>{{ loading ? 'Processing...' : 'Pay Now' }}</span>
    </button>
  </div>
</template>

<script setup>
const email = ref('jorenleeluna24@gmail.com')
const amount = ref(5000)
const eventName = ref('Tech Event')
const loading = ref(false)

const pay = async () => {
  if (!email.value || !amount.value || !eventName.value) {
    alert('Please fill all fields')
    return
  }

  if (amount.value < 5000) {
    alert('Minimum amount is ₱50')
    return
  }

  loading.value = true

  try {
    const res = await fetch(
      `${config.apiBase}/api/paymongo-experiment/create-checkout-session/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.value,
          amount: amount.value,
          event_name: eventName.value
        })
      }
    )

    const data = await res.json()

    if (data?.url) {
      window.location.href = data.url
    } else {
      console.error(data)
      alert(data?.error?.join(", ") || 'Checkout failed')
    }

  } catch (err) {
    console.error(err)
    alert('Payment failed')
  } finally {
    loading.value = false
  }
}
</script>