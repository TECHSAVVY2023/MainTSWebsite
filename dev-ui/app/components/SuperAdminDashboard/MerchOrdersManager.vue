<template>
  <div class="space-y-6">
    <!-- ── Header & Title ────────────────────────────────────────── -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-xl font-black tracking-tight text-[#1a0533]">
          Merchandise Purchases & Orders Tracker
        </h2>
        <!-- <p class="text-xs font-semibold text-slate-400">
          Track and audit all customer orders, payments, shipping info, and inventory deductions.
        </p> -->
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          :disabled="loading"
          @click="refresh"
          class="flex items-center gap-2 rounded-xl border border-violet-100 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50"
        >
          <i class="fas fa-sync-alt text-xs" :class="{ 'animate-spin': loading }" />
          <span>Refresh</span>
        </button>
      </div>
    </div>

    <!-- ── Summary Stats Cards ───────────────────────────────────── -->
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <!-- Total Revenue Paid -->
      <div class="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-wider text-emerald-800">Total Revenue (Paid)</span>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <i class="fas fa-coins text-xs" />
          </div>
        </div>
        <div class="mt-2 text-xl font-black text-emerald-950">
          ₱{{ Math.round(totalPaidRevenue).toLocaleString() }}
        </div>
        <p class="text-[10px] font-bold text-emerald-700/80">{{ paidOrdersCount }} paid purchases</p>
      </div>

      <!-- Paid Orders -->
      <div class="rounded-2xl border border-violet-100 bg-violet-50/50 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-wider text-violet-800">Paid Orders</span>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
            <i class="fas fa-check-circle text-xs" />
          </div>
        </div>
        <div class="mt-2 text-xl font-black text-violet-950">
          {{ paidOrdersCount }}
        </div>
        <p class="text-[10px] font-bold text-violet-700/80">Inventory deducted</p>
      </div>

      <!-- Pending Orders -->
      <div class="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-wider text-amber-800">Pending Checkouts</span>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
            <i class="fas fa-clock text-xs" />
          </div>
        </div>
        <div class="mt-2 text-xl font-black text-amber-950">
          {{ pendingOrdersCount }}
        </div>
        <p class="text-[10px] font-bold text-amber-700/80">Awaiting gateway completion</p>
      </div>

      <!-- Failed / Cancelled Orders -->
      <div class="rounded-2xl border border-red-100 bg-red-50/50 p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-black uppercase tracking-wider text-red-800">Failed / Cancelled</span>
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-700">
            <i class="fas fa-times-circle text-xs" />
          </div>
        </div>
        <div class="mt-2 text-xl font-black text-red-950">
          {{ failedOrdersCount }}
        </div>
        <p class="text-[10px] font-bold text-red-700/80">Payment not completed</p>
      </div>
    </div>

    <!-- ── Search & Filter Controls ──────────────────────────────── -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap gap-1.5 rounded-xl border border-violet-100 bg-white p-1 shadow-sm">
        <button
          type="button"
          v-for="f in filterTabs"
          :key="f.value"
          @click="setFilter(f.value)"
          class="rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all"
          :class="currentFilter === f.value ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'"
        >
          {{ f.label }}
        </button>
      </div>

      <div class="relative w-full sm:w-72">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search by Reference, Email, Name..."
          class="w-full rounded-xl border border-violet-100 bg-white py-2 pl-9 pr-3 text-xs font-bold text-[#1a0533] outline-none shadow-sm transition-all focus:border-violet-500"
        />
      </div>
    </div>

    <!-- ── Orders Table / List ───────────────────────────────────── -->
    <div v-if="loading && orders.length === 0" class="flex flex-col items-center justify-center rounded-2xl border border-violet-100 bg-white py-16 text-center">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent mb-3" />
      <p class="text-xs font-bold text-slate-500">Loading purchase records...</p>
    </div>

    <div v-else-if="orders.length > 0" class="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="border-b border-violet-100 bg-slate-50/75 text-[10px] font-black uppercase tracking-wider text-slate-400">
            <tr>
              <th class="py-3.5 pl-4 pr-3">Order Ref</th>
              <th class="px-3 py-3.5">Date & Time</th>
              <th class="px-3 py-3.5">Customer</th>
              <th class="px-3 py-3.5">Items</th>
              <th class="px-3 py-3.5">Total Amount</th>
              <th class="px-3 py-3.5">Status</th>
              <th class="px-3 py-3.5">Stock</th>
              <th class="py-3.5 pl-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-violet-50 font-medium text-[#1a0533]">
            <tr
              v-for="order in orders"
              :key="order.id"
              class="transition-colors hover:bg-violet-50/40"
            >
              <!-- Order Ref -->
              <td class="py-3.5 pl-4 pr-3">
                <div class="flex items-center gap-1.5">
                  <span class="font-mono text-xs font-bold text-violet-700">{{ order.reference_number }}</span>
                  <button
                    type="button"
                    @click="copyRef(order.reference_number)"
                    class="text-slate-400 hover:text-violet-600"
                    title="Copy reference"
                  >
                    <i class="fas fa-copy text-[10px]" />
                  </button>
                </div>
              </td>

              <!-- Date -->
              <td class="px-3 py-3.5 text-[11px] text-slate-500 whitespace-nowrap">
                {{ formatDate(order.created_at) }}
              </td>

              <!-- Customer -->
              <td class="px-3 py-3.5">
                <div class="font-bold">{{ order.shipping_snapshot?.fullName || 'Customer' }}</div>
                <div class="text-[11px] text-slate-400">{{ order.buyer_email || 'No email' }}</div>
              </td>

              <!-- Items count & preview -->
              <td class="px-3 py-3.5">
                <div class="flex items-center gap-1.5">
                  <div class="flex -space-x-2 overflow-hidden">
                    <template v-for="(line, lIdx) in order.lines_json.slice(0, 3)" :key="lIdx">
                      <img
                        v-if="line.image"
                        :src="line.image"
                        :alt="line.name"
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover bg-slate-100"
                      />
                    </template>
                  </div>
                  <span class="text-[11px] font-bold text-slate-600">
                    {{ getTotalItemsCount(order) }} item(s)
                  </span>
                </div>
              </td>

              <!-- Total Amount -->
              <td class="px-3 py-3.5">
                <span class="font-black text-slate-900">₱{{ Math.round(order.total_php).toLocaleString() }}</span>
              </td>

              <!-- Status Badge -->
              <td class="px-3 py-3.5 whitespace-nowrap">
                <span
                  class="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm"
                  :class="statusBadgeClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>

              <!-- Stock Deducted -->
              <td class="px-3 py-3.5 whitespace-nowrap">
                <span
                  v-if="order.stock_deducted"
                  class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600"
                >
                  <i class="fas fa-check text-[9px]" /> Deducted
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400"
                >
                  <i class="fas fa-minus text-[9px]" /> None
                </span>
              </td>

              <!-- Actions -->
              <td class="py-3.5 pl-3 pr-4 text-right">
                <button
                  type="button"
                  @click="openDetails(order)"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-violet-100 bg-white px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm transition-colors hover:bg-violet-50 hover:border-violet-200"
                >
                  <i class="fas fa-eye text-[10px]" />
                  <span>Inspect</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-100 bg-white py-16 text-center">
      <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
        <i class="fas fa-shopping-bag text-2xl" />
      </div>
      <h3 class="text-base font-black uppercase tracking-tight text-[#1a0533]">No Purchase Records Found</h3>
      <p class="mt-1 max-w-sm text-xs font-medium text-slate-500">
        {{ searchQuery ? 'No purchases match your filter parameters.' : 'No purchases have been recorded yet.' }}
      </p>
    </div>

    <!-- ── Order Details Modal ────────────────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="selectedOrder"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="selectedOrder = null"
      >
        <div class="custom-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-violet-50 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <i class="fas fa-receipt text-sm" />
              </div>
              <div>
                <h3 class="text-base font-black uppercase text-[#1a0533]">
                  Order #{{ selectedOrder.reference_number }}
                </h3>
                <p class="text-[10px] font-semibold text-slate-400">
                  Created {{ formatDate(selectedOrder.created_at) }}
                </p>
              </div>
            </div>
            <button
              type="button"
              @click="selectedOrder = null"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <i class="fas fa-times text-xs" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="mt-5 space-y-6">
            <!-- Status & Payment Overview -->
            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">Status</span>
                <div class="mt-1">
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                    :class="statusBadgeClass(selectedOrder.status)"
                  >
                    {{ selectedOrder.status }}
                  </span>
                </div>
              </div>

              <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">Total Paid</span>
                <div class="mt-1 text-sm font-black text-slate-900">
                  ₱{{ Math.round(selectedOrder.total_php).toLocaleString() }}
                </div>
              </div>

              <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3 sm:col-span-1 col-span-2">
                <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">Inventory Status</span>
                <div class="mt-1 text-xs font-bold" :class="selectedOrder.stock_deducted ? 'text-emerald-600' : 'text-amber-600'">
                  {{ selectedOrder.stock_deducted ? 'Stock Deducted' : 'Not Deducted' }}
                </div>
              </div>
            </div>

            <!-- Customer & Shipping Information -->
            <div class="rounded-2xl border border-violet-100 bg-violet-50/30 p-4">
              <h4 class="text-xs font-black uppercase tracking-wider text-violet-900 mb-2 flex items-center gap-1.5">
                <i class="fas fa-truck text-[10px]" /> Shipping & Customer Details
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span class="text-slate-400 font-bold">Recipient:</span>
                  <span class="ml-1 font-bold text-slate-800">{{ selectedOrder.shipping_snapshot?.fullName || 'N/A' }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-bold">Email:</span>
                  <span class="ml-1 font-bold text-slate-800">{{ selectedOrder.buyer_email || selectedOrder.shipping_snapshot?.email || 'N/A' }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-bold">Phone:</span>
                  <span class="ml-1 font-bold text-slate-800">{{ selectedOrder.shipping_snapshot?.phone || 'N/A' }}</span>
                </div>
                <div>
                  <span class="text-slate-400 font-bold">Region/Province:</span>
                  <span class="ml-1 font-bold text-slate-800">
                    {{ selectedOrder.shipping_snapshot?.province || selectedOrder.shipping_snapshot?.region || 'N/A' }}
                  </span>
                </div>
                <div class="sm:col-span-2">
                  <span class="text-slate-400 font-bold">Complete Address:</span>
                  <span class="ml-1 font-bold text-slate-800">
                    {{ formatAddress(selectedOrder.shipping_snapshot) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Line Items Breakdown -->
            <div>
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <i class="fas fa-boxes text-[10px]" /> Purchased Items ({{ selectedOrder.lines_json.length }})
              </h4>
              <div class="divide-y divide-violet-50 rounded-2xl border border-violet-100 bg-white overflow-hidden">
                <div
                  v-for="(item, idx) in selectedOrder.lines_json"
                  :key="idx"
                  class="flex items-center justify-between p-3.5 text-xs"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="item.image"
                      :src="item.image"
                      :alt="item.name"
                      class="h-10 w-10 rounded-xl object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <h5 class="font-bold text-slate-900">{{ item.name }}</h5>
                      <p class="text-[10px] text-slate-400 font-mono">ID: {{ item.id || 'N/A' }}</p>
                    </div>
                  </div>

                  <div class="text-right">
                    <div class="font-black text-slate-900">
                      ₱{{ Math.round((item.unitAmountPhp || 0) * (item.quantity || 1)).toLocaleString() }}
                    </div>
                    <div class="text-[10px] text-slate-400">
                      {{ item.quantity || 1 }} × ₱{{ Math.round(item.unitAmountPhp || 0).toLocaleString() }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gateway Details -->
            <div class="text-[11px] text-slate-400 flex flex-col gap-1 border-t border-violet-50 pt-3">
              <div><span class="font-bold">PayMongo Session ID:</span> {{ selectedOrder.checkout_session_id || 'N/A' }}</div>
              <div><span class="font-bold">Receipt Email Sent:</span> {{ selectedOrder.receipt_email_sent_at ? formatDate(selectedOrder.receipt_email_sent_at) : 'Not sent or disabled' }}</div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useMerchOrders, type MerchOrder, type MerchShippingSnapshot } from '~/composables/useMerchOrders'

const { orders, loading, fetchOrders } = useMerchOrders()

const currentFilter = ref('all')
const searchQuery = ref('')
const selectedOrder = ref<MerchOrder | null>(null)

const filterTabs = [
  { label: 'All Orders', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
  { label: 'Cancelled', value: 'cancelled' }
]

const totalPaidRevenue = computed(() =>
  orders.value
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + o.total_php, 0)
)

const paidOrdersCount = computed(() => orders.value.filter(o => o.status === 'paid').length)
const pendingOrdersCount = computed(() => orders.value.filter(o => o.status === 'pending').length)
const failedOrdersCount = computed(() => orders.value.filter(o => o.status === 'failed' || o.status === 'cancelled').length)

onMounted(async () => {
  await fetchOrders()
})

async function refresh () {
  await fetchOrders(currentFilter.value, searchQuery.value)
}

function setFilter (val: string) {
  currentFilter.value = val
  fetchOrders(currentFilter.value, searchQuery.value)
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
function handleSearch () {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    fetchOrders(currentFilter.value, searchQuery.value)
  }, 300)
}

function getTotalItemsCount (order: MerchOrder) {
  return order.lines_json.reduce((sum, line) => sum + (Number(line.quantity) || 1), 0)
}

function statusBadgeClass (status: string) {
  switch (status) {
    case 'paid':
      return 'bg-emerald-100 text-emerald-800'
    case 'pending':
      return 'bg-amber-100 text-amber-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    case 'cancelled':
      return 'bg-slate-100 text-slate-700'
    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function formatDate (isoStr?: string) {
  if (!isoStr) return 'N/A'
  try {
    const d = new Date(isoStr)
    return d.toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return isoStr
  }
}

function formatAddress (ship?: MerchShippingSnapshot) {
  if (!ship) return 'N/A'
  const parts = [
    ship.street,
    ship.barangay,
    ship.city,
    ship.province,
    ship.region
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'No address provided'
}

function openDetails (order: MerchOrder) {
  selectedOrder.value = order
}

function copyRef (refText: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(refText)
  }
}
</script>
