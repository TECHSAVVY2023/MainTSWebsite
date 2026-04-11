<template>
  <div class="min-h-screen bg-gray-50 p-8 font-inter">
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Back Link -->
      <NuxtLink to="/prototypes" class="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 group transition-colors">
        <svg class="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        Back to Prototypes
      </NuxtLink>

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Wise Panel</h1>
          <p class="text-gray-500 mt-1">Real-time oversight of Wise Checkout transactions.</p>
        </div>
        <div class="flex gap-3">
          <button @click="fetchPayments" class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            Refresh Data
          </button>
          <div class="px-4 py-2 bg-blue-600 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-200">
            Live Feed Active
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Volume</p>
          <p class="text-2xl font-black text-gray-900">₱{{ totalVolume.toLocaleString() }}</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Successful</p>
          <p class="text-2xl font-black text-green-600">{{ paidCount }} Transactions</p>
        </div>
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending</p>
          <p class="text-2xl font-black text-amber-500">{{ pendingCount }} Pending</p>
        </div>
      </div>

      <!-- Table Container -->
      <div class="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-50">
                <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Transaction ID</th>
                <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer Email</th>
                <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th class="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date Created</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="p in payments" :key="p.id" class="hover:bg-blue-50/30 transition-colors group">
                <td class="px-8 py-6">
                  <span class="font-mono text-xs text-gray-400 group-hover:text-blue-500 transition-colors">#WISE-TX-{{ p.id }}</span>
                </td>
                <td class="px-8 py-6 font-semibold text-gray-700">{{ p.email }}</td>
                <td class="px-8 py-6 font-black text-gray-900">₱{{ p.amount.toFixed(2) }}</td>
                <td class="px-8 py-6">
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm',
                      p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    ]"
                  >
                    {{ p.status }}
                  </span>
                </td>
                <td class="px-8 py-6 text-sm text-gray-400 font-medium">{{ p.created_at }}</td>
              </tr>

              <!-- Empty State -->
              <tr v-if="payments.length === 0">
                <td colspan="5" class="px-8 py-20 text-center space-y-2">
                  <div class="text-4xl font-bold text-gray-100 italic">No Data to Display</div>
                  <p class="text-sm text-gray-400 font-medium leading-relaxed">Transactions will appear here in real-time<br>once users initiate the Wise Hosted Redirect.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const payments = ref([])
const loading = ref(false)

const fetchPayments = async () => {
  loading.value = true
  try {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const apiBase = isLocal ? 'http://127.0.0.1:8000' : 'https://api.techsavvies.space'
    
    const res = await fetch(`${apiBase}/api/wise-experiment/list-payments/`)
    const data = await res.json()
    payments.value = data || []
  } catch (error) {
    console.error('❌ Panel Error:', error)
  } finally {
    loading.value = false
  }
}

const totalVolume = computed(() => payments.value.reduce((acc, curr) => acc + (curr.status === 'paid' ? curr.amount : 0), 0))
const paidCount = computed(() => payments.value.filter(p => p.status === 'paid').length)
const pendingCount = computed(() => payments.value.filter(p => p.status === 'pending').length)

onMounted(() => {
  fetchPayments()
  // Refresh every 30 seconds
  setInterval(fetchPayments, 30000)
})

useHead({
  title: 'Wise Panel - Tech Savvy'
})
</script>

<style scoped>
/* Any additional premium styling can go here */
</style>
