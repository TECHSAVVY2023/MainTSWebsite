<template>
  <div class="space-y-6 font-[Roboto,sans-serif] text-[#1a0533]">
    <!-- Header Card -->
    <div class="rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-black uppercase tracking-tight text-[#1a0533]">
              Merchandise CMS
            </h2>
            <!-- <span
              class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700"
            >
              <i class="fas fa-crown text-[10px]" />
              Super Admin Only
            </span> -->
          </div>
          <!-- <p class="mt-1 text-xs font-medium text-slate-500">
            Create, update, and manage official community merchandise items displayed on the public store and PayMongo checkout.
          </p> -->
        </div>

        <button
          type="button"
          @click="openAddModal"
          class="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-violet-600/30"
        >
          <i class="fas fa-plus text-xs" />
          Add Merchandise
        </button>
      </div>

      <!-- Quick Metrics Summary -->
      <div class="mt-6 grid grid-cols-2 gap-3 border-t border-violet-50 pt-5 sm:grid-cols-4">
        <div class="rounded-xl border border-violet-50 bg-violet-50/50 p-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-violet-600">Total Products</p>
          <p class="mt-1 text-xl font-black text-[#1a0533]">{{ merchandiseList.length }}</p>
        </div>
        <div class="rounded-xl border border-emerald-50 bg-emerald-50/50 p-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-emerald-600">Active in Store</p>
          <p class="mt-1 text-xl font-black text-emerald-800">{{ activeCount }}</p>
        </div>
        <div class="rounded-xl border border-amber-50 bg-amber-50/50 p-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-amber-600">Low Stock (&lt; 10)</p>
          <p class="mt-1 text-xl font-black text-amber-800">{{ lowStockCount }}</p>
        </div>
        <div class="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
          <p class="text-[10px] font-black uppercase tracking-wider text-slate-500">Hidden / Draft</p>
          <p class="mt-1 text-xl font-black text-slate-700">{{ merchandiseList.length - activeCount }}</p>
        </div>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative flex-1 max-w-md">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search products by name or slug…"
          class="w-full rounded-xl border border-violet-100 bg-white py-2 pl-9 pr-4 text-xs font-medium text-[#1a0533] placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-600/10"
        />
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="statusFilter = 'all'"
          class="rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
          :class="statusFilter === 'all' ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          All
        </button>
        <button
          type="button"
          @click="statusFilter = 'active'"
          class="rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
          :class="statusFilter === 'active' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          Active
        </button>
        <button
          type="button"
          @click="statusFilter = 'inactive'"
          class="rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
          :class="statusFilter === 'inactive' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        >
          Inactive
        </button>
        <button
          type="button"
          @click="refreshMerchandise"
          class="rounded-xl border border-violet-100 bg-white px-3 py-1.5 text-xs font-bold text-violet-600 transition-colors hover:bg-violet-50"
          title="Refresh merchandise"
        >
          <i class="fas fa-sync-alt" :class="{ 'animate-spin': loading }" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && merchandiseList.length === 0" class="flex h-64 items-center justify-center rounded-2xl border border-violet-100 bg-white">
      <div class="flex flex-col items-center gap-3">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
        <p class="text-xs font-bold uppercase tracking-wider text-violet-600">Loading merchandise catalog…</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <i class="fas fa-exclamation-triangle mb-2 text-2xl text-red-500" />
      <p class="text-sm font-bold text-red-700">{{ error }}</p>
      <button
        type="button"
        @click="refreshMerchandise"
        class="mt-3 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
      >
        <i class="fas fa-redo" /> Retry
      </button>
    </div>

    <!-- Merchandise Items Grid / List -->
    <div v-else-if="filteredMerchandise.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="item in filteredMerchandise"
        :key="item.id || item.item_id"
        class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
      >
        <div>
          <!-- Image container -->
          <div class="relative mb-3.5 aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
            <img
              :src="item.image || defaultProductImage"
              :alt="item.alt || item.name"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              :class="{ 'blur-[2px] opacity-75 grayscale-[30%]': item.stock <= 0 }"
              @error="(e: any) => { e.target.src = defaultProductImage }"
            />

            <!-- Top Left Status & Badge -->
            <div class="absolute left-2 top-2 flex flex-wrap gap-1">
              <span
                v-if="item.badge_label"
                class="rounded-md bg-violet-700/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm backdrop-blur-sm"
              >
                {{ item.badge_label }}
              </span>
              <span
                class="rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm"
                :class="item.is_active ? 'bg-emerald-600' : 'bg-slate-500'"
              >
                {{ item.is_active ? 'Active' : 'Draft' }}
              </span>
            </div>

            <!-- Top Right Shopee-Style Discount Badge -->
            <div
              v-if="item.discount_percentage && item.discount_percentage > 0"
              class="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-amber-500 to-rose-500 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md"
            >
              -{{ item.discount_percentage }}%
            </div>

            <!-- Sold Out Center Overlay -->
            <div
              v-if="item.stock <= 0"
              class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]"
            >
              <span class="rounded-xl border border-white/30 bg-black/80 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-white shadow-lg">
                SOLD OUT
              </span>
            </div>

            <!-- Bottom Price Tag -->
            <div class="absolute right-2 bottom-2 flex items-center gap-1.5 rounded-lg bg-black/75 px-2.5 py-1 text-xs font-black text-white backdrop-blur-sm">
              <span v-if="item.original_price_php && item.original_price_php > item.unit_amount_php" class="text-[10px] text-slate-400 line-through">
                ₱{{ Math.round(item.original_price_php).toLocaleString() }}
              </span>
              <span>₱{{ Math.round(item.unit_amount_php).toLocaleString() }}</span>
            </div>
          </div>

          <!-- Product Details -->
          <div>
            <h3 class="line-clamp-1 text-sm font-black text-[#1a0533]">{{ item.name }}</h3>
            <p class="text-[10px] font-semibold text-slate-400 font-mono">ID: {{ item.item_id }}</p>
            <p class="mt-1 line-clamp-2 text-xs font-medium text-slate-500">
              {{ item.subtitle || 'No description provided.' }}
            </p>
          </div>
        </div>

        <!-- Meta & Actions Footer -->
        <div class="mt-4 border-t border-violet-50 pt-3 flex items-center justify-between">
          <div class="flex items-center gap-1.5 text-[11px] font-bold" :class="item.stock < 10 ? 'text-amber-600' : 'text-slate-500'">
            <i class="fas fa-boxes text-[10px]" />
            <span>{{ item.stock }} in stock</span>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              type="button"
              @click="openEditModal(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 transition-colors hover:bg-violet-100 hover:text-violet-800"
              title="Edit merchandise"
            >
              <i class="fas fa-pen text-xs" />
            </button>
            <button
              type="button"
              @click="confirmDelete(item)"
              class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-colors hover:bg-red-100 hover:text-red-800"
              title="Delete merchandise"
            >
              <i class="fas fa-trash text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-100 bg-white py-16 text-center">
      <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
        <i class="fas fa-tshirt text-2xl" />
      </div>
      <h3 class="text-base font-black uppercase tracking-tight text-[#1a0533]">No Merchandise Items Found</h3>
      <p class="mt-1 max-w-sm text-xs font-medium text-slate-500">
        {{ searchQuery ? 'No items match your search filter.' : 'Click "Add Merchandise" above to add the first community product.' }}
      </p>
      <button
        v-if="!searchQuery"
        type="button"
        @click="openAddModal"
        class="mt-4 flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700"
      >
        <i class="fas fa-plus text-xs" /> Add Product Now
      </button>
    </div>

    <!-- ── Add / Edit Merchandise Modal ────────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="showModal = false"
      >
        <div class="custom-scrollbar max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-violet-100 bg-white p-6 shadow-2xl">
          <div class="flex items-center justify-between border-b border-violet-50 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <i class="fas fa-tshirt text-sm" />
              </div>
              <h3 class="text-base font-black uppercase text-[#1a0533]">
                {{ editingItem ? 'Edit Merchandise' : 'Add New Merchandise' }}
              </h3>
            </div>
            <button
              type="button"
              @click="showModal = false"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <i class="fas fa-times text-xs" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-5 space-y-4">
            <!-- Product Name -->
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Product Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Enter Merchandise name"
                class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
              />
            </div>

            <!-- Item ID / Slug -->
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Item Slug / ID
              </label>
              <input
                v-model="form.item_id"
                type="text"
                placeholder="Enter Merchandise unique identifier"
                class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
              />
            </div>

            <!-- Pricing: Price, Discount (%), Final Price -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Price (₱) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">₱</span>
                  <input
                    v-model.number="form.original_price_php"
                    @input="onPriceChange"
                    type="number"
                    min="0"
                    step="1"
                    required
                    placeholder="e.g. 500"
                    class="w-full rounded-xl border border-violet-100 bg-slate-50/50 py-3 pl-8 pr-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Discount (%)
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.discount_percentage"
                    @input="onDiscountChange"
                    type="number"
                    min="0"
                    max="99"
                    placeholder="0"
                    class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                  />
                  <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
                <div v-if="discountCalculationHint" class="mt-1 text-[10px] font-bold text-emerald-600">
                  {{ discountCalculationHint }}
                </div>
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Final Price (₱) <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">₱</span>
                  <input
                    v-model.number="form.unit_amount_php"
                    @input="onFinalPriceChange"
                    type="number"
                    min="0"
                    step="1"
                    required
                    placeholder="e.g. 400"
                    class="w-full rounded-xl border border-violet-100 bg-slate-50/50 py-3 pl-8 pr-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <!-- Badge Tag & Stock Count -->
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Badge Tag
                </label>
                <input
                  v-model="form.badge_label"
                  type="text"
                  placeholder="Official, Preferred, Sulit..."
                  class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>

              <div>
                <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                  Stock Inventory Count
                </label>
                <input
                  v-model.number="form.stock"
                  type="number"
                  min="0"
                  placeholder="100"
                  class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-bold text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                />
              </div>
            </div>

            <!-- Subtitle / Description -->
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Description / Material / Tagline
              </label>
              <textarea
                v-model="form.subtitle"
                rows="3"
                placeholder="e.g. Heavy cotton knit with embroidered mark — for meetups and late builds."
                class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-medium text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
              />
            </div>

            <!-- Image Upload / Image URL -->
            <div>
              <label class="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1">
                Product Image
              </label>
              <div class="space-y-2">
                <input
                  v-model="form.image"
                  type="url"
                  placeholder="https://example.com/product-image.jpg"
                  class="w-full rounded-xl border border-violet-100 bg-slate-50/50 p-3 text-xs font-medium text-[#1a0533] outline-none focus:border-violet-500 focus:bg-white"
                />
                
                <div class="flex items-center gap-3">
                  <label class="flex cursor-pointer items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700 transition-colors hover:bg-violet-100">
                    <i class="fas fa-upload text-xs" />
                    <span>{{ uploading ? 'Uploading…' : 'Upload Image File' }}</span>
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      :disabled="uploading"
                      @change="handleFileUpload"
                    />
                  </label>
                  <span v-if="form.image" class="text-[11px] font-medium text-emerald-600">
                    <i class="fas fa-check-circle" /> Image set
                  </span>
                </div>

                <!-- Preview Box -->
                <div v-if="form.image" class="mt-2 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2">
                  <img
                    :src="form.image"
                    alt="Preview"
                    class="h-12 w-12 rounded-lg object-cover"
                    @error="(e: any) => { e.target.src = defaultProductImage }"
                  />
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-xs font-bold text-slate-700">{{ form.name || 'Preview' }}</p>
                    <p class="truncate text-[10px] text-slate-400">{{ form.image }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Active Status Toggle -->
            <div class="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/50 p-3.5">
              <div>
                <p class="text-xs font-black text-[#1a0533]">Active in Public Store</p>
                <p class="text-[10px] font-medium text-slate-500">Make this product immediately visible to visitors on /merchandise.</p>
              </div>
              <label class="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  v-model="form.is_active"
                  class="peer sr-only"
                />
                <div class="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none" />
              </label>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex items-center justify-end gap-2 border-t border-violet-50 pt-4">
              <button
                type="button"
                @click="showModal = false"
                class="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-violet-600/20 hover:bg-violet-700 disabled:opacity-50"
              >
                <i v-if="saving" class="fas fa-spinner animate-spin text-xs" />
                <span>{{ saving ? 'Saving…' : (editingItem ? 'Update Merchandise' : 'Create Merchandise') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- ── Delete Confirmation Modal ────────────────────────────── -->
    <Teleport to="body">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        @click.self="deleteTarget = null"
      >
        <div class="w-full max-w-md rounded-3xl border border-red-100 bg-white p-6 shadow-2xl text-center">
          <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <i class="fas fa-exclamation-triangle text-2xl" />
          </div>
          <h3 class="text-base font-black uppercase text-[#1a0533]">Delete Merchandise?</h3>
          <p class="mt-2 text-xs font-medium text-slate-500 leading-relaxed">
            Are you sure you want to permanently delete <strong class="text-slate-800">{{ deleteTarget.name }}</strong>? This cannot be undone.
          </p>
          <div class="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              @click="deleteTarget = null"
              class="rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="executeDelete"
              class="rounded-xl bg-red-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-red-600/20 hover:bg-red-700"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { SAMPLE_MERCH } from '~/constants/sampleMedia'
import { useMerchandiseCms, type MerchandiseCmsItem } from '~/composables/useMerchandiseCms'

const defaultProductImage = SAMPLE_MERCH.tee

const {
  merchandiseList,
  loading,
  error,
  refreshMerchandise,
  saveMerchandise,
  removeMerchandise,
  uploadMultipleFiles
} = useMerchandiseCms()

const searchQuery = ref('')
const statusFilter = ref<'all' | 'active' | 'inactive'>('all')

const activeCount = computed(() => merchandiseList.value.filter(m => m.is_active).length)
const lowStockCount = computed(() => merchandiseList.value.filter(m => m.stock < 10).length)

const filteredMerchandise = computed(() => {
  let list = merchandiseList.value

  if (statusFilter.value === 'active') {
    list = list.filter(m => m.is_active)
  } else if (statusFilter.value === 'inactive') {
    list = list.filter(m => !m.is_active)
  }

  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(m =>
      (m.name || '').toLowerCase().includes(q) ||
      (m.item_id || '').toLowerCase().includes(q) ||
      (m.subtitle || '').toLowerCase().includes(q)
    )
  }

  return list
})

onMounted(async () => {
  await refreshMerchandise()
})

// ── Add / Edit Modal State ──
const showModal = ref(false)
const editingItem = ref<MerchandiseCmsItem | null>(null)
const saving = ref(false)
const uploading = ref(false)

const form = ref<Partial<MerchandiseCmsItem>>({
  name: '',
  item_id: '',
  price_label: '',
  original_price_php: 500,
  discount_percentage: 0,
  unit_amount_php: 500,
  badge_label: 'Official',
  subtitle: '',
  image: '',
  alt: '',
  stock: 100,
  is_active: true
})

function onPriceChange () {
  const price = Number(form.value.original_price_php) || 0
  const disc = Number(form.value.discount_percentage) || 0

  if (price > 0) {
    if (disc > 0) {
      form.value.unit_amount_php = Math.max(0, Math.round(price * (1 - disc / 100)))
    } else {
      form.value.unit_amount_php = price
    }
  }
}

function onDiscountChange () {
  const price = Number(form.value.original_price_php) || 0
  const disc = Number(form.value.discount_percentage) || 0
  const finalPrice = Number(form.value.unit_amount_php) || 0

  if (disc >= 0 && disc < 100) {
    if (price > 0) {
      form.value.unit_amount_php = Math.max(0, Math.round(price * (1 - disc / 100)))
    } else if (finalPrice > 0) {
      form.value.original_price_php = Math.round(finalPrice / (1 - disc / 100))
    }
  }
}

function onFinalPriceChange () {
  const price = Number(form.value.original_price_php) || 0
  const finalPrice = Number(form.value.unit_amount_php) || 0

  if (price > 0 && price > finalPrice) {
    form.value.discount_percentage = Math.max(0, Math.round(((price - finalPrice) / price) * 100))
  } else if (finalPrice > 0 && (!price || finalPrice >= price)) {
    form.value.original_price_php = finalPrice
    form.value.discount_percentage = 0
  }
}

const discountCalculationHint = computed(() => {
  const price = Number(form.value.original_price_php) || 0
  const finalPrice = Number(form.value.unit_amount_php) || 0
  const disc = Number(form.value.discount_percentage) || 0

  if (price > 0 && price > finalPrice && disc > 0) {
    const savings = price - finalPrice
    return `Save ₱${savings.toLocaleString()}`
  }
  return null
})

function openAddModal () {
  editingItem.value = null
  form.value = {
    name: '',
    item_id: '',
    price_label: '',
    original_price_php: 500,
    discount_percentage: 0,
    unit_amount_php: 500,
    badge_label: 'Official',
    subtitle: '',
    image: '',
    alt: '',
    stock: 100,
    is_active: true
  }
  showModal.value = true
}

function openEditModal (item: MerchandiseCmsItem) {
  editingItem.value = item
  form.value = { ...item }
  if (!form.value.original_price_php && form.value.unit_amount_php) {
    form.value.original_price_php = form.value.unit_amount_php
  }
  const price = Number(form.value.original_price_php) || 0
  const finalPrice = Number(form.value.unit_amount_php) || 0
  if (price > 0 && price > finalPrice && !form.value.discount_percentage) {
    form.value.discount_percentage = Math.max(0, Math.round(((price - finalPrice) / price) * 100))
  }
  showModal.value = true
}

async function handleFileUpload (event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  const files = Array.from(input.files)

  uploading.value = true
  try {
    const uploaded = await uploadMultipleFiles(files)
    if (uploaded && uploaded.length > 0) {
      const url = (uploaded[0] as any)?.url || (uploaded[0] as any)
      if (url) {
        form.value.image = url
      }
    }
  } catch (e) {
    console.error('Image upload failed:', e)
  } finally {
    uploading.value = false
  }
}

async function handleSubmit () {
  saving.value = true
  try {
    await saveMerchandise(form.value)
    showModal.value = false
  } catch (e) {
    console.error('Failed to save merchandise:', e)
  } finally {
    saving.value = false
  }
}

// ── Delete Modal State ──
const deleteTarget = ref<MerchandiseCmsItem | null>(null)

function confirmDelete (item: MerchandiseCmsItem) {
  deleteTarget.value = item
}

async function executeDelete () {
  if (!deleteTarget.value?.id) return
  const id = deleteTarget.value.id
  deleteTarget.value = null
  try {
    await removeMerchandise(id)
  } catch (e) {
    console.error('Delete failed:', e)
  }
}
</script>
