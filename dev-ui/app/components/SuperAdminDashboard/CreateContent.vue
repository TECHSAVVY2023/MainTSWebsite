<template>
  <div class="font-inter text-dark min-h-screen bg-neutral-gray">
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-[16px] border-b border-neutral-border">
      <div class="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <button
            type="button"
            class="shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-dark/60 hover:text-accent-purple transition-colors"
            @click="emit('close')"
          >
            <i class="fas fa-arrow-left text-[10px]" /> Dashboard
          </button>
          <span class="text-neutral-border hidden sm:inline">|</span>
          <span class="font-bold text-sm text-dark truncate">All content</span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-[11px] text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-1 rounded-full font-semibold hidden sm:inline">
            {{ allItems.length }} items
          </span>
          <button
            type="button"
            @click="handleNewContent"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-primary text-white hover:bg-secondary transition-colors whitespace-nowrap"
          >
            <i class="fas fa-plus text-[10px]" /> Add New
          </button>
        </div>
      </div>
    </header>

    <main class="px-4 sm:px-6 lg:px-8 py-5 max-w-[1400px] mx-auto">
      <section class="rounded-2xl bg-white border border-neutral-border overflow-hidden">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-border gap-3">
          <div>
            <h1 class="text-sm sm:text-base font-bold text-dark">CMS content</h1>
            <p class="text-[11px] text-dark/60 mt-0.5">Browse, edit, or delete any post. Use pagination for long lists.</p>
          </div>
        </div>

        <div class="px-4 sm:px-6 py-3 border-b border-neutral-border">
          <div class="relative w-full sm:max-w-md">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-dark/35 text-xs" />
            <input
              v-model="contentSearch"
              type="text"
              placeholder="Search by title or category..."
              class="w-full pl-9 pr-8 py-2 rounded-lg text-xs sm:text-sm bg-neutral-gray border border-neutral-border text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-accent-purple/40 focus:border-accent-purple/30"
            />
            <button
              v-if="contentSearch"
              type="button"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-dark/35 hover:text-accent-purple"
              @click="contentSearch = ''"
            >
              <i class="fas fa-times text-xs" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[520px]">
            <thead>
              <tr class="border-b border-neutral-border bg-neutral-gray">
                <th class="text-left text-[10px] font-semibold text-dark/45 uppercase tracking-widest px-4 sm:px-6 py-3">Title</th>
                <th class="text-left text-[10px] font-semibold text-dark/45 uppercase tracking-widest px-4 py-3">Category</th>
                <th class="text-left text-[10px] font-semibold text-dark/45 uppercase tracking-widest px-4 py-3">Status</th>
                <th class="text-left text-[10px] font-semibold text-dark/45 uppercase tracking-widest px-4 py-3 hidden md:table-cell">Date</th>
                <th class="text-left text-[10px] font-semibold text-dark/45 uppercase tracking-widest px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loadingItems">
                <td colspan="5" class="px-6 py-10 text-center text-dark/45 text-sm">Loading…</td>
              </tr>
              <tr v-else-if="paginatedItems.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-dark/45 text-sm">
                  {{ contentSearch ? 'No results found' : 'No content yet' }}
                </td>
              </tr>
              <tr
                v-for="item in paginatedItems"
                :key="item.id"
                class="border-b border-neutral-border hover:bg-neutral-gray transition-colors"
              >
                <td class="px-4 sm:px-6 py-3.5 max-w-[140px] sm:max-w-[240px]">
                  <p class="text-xs sm:text-sm font-medium text-dark/90 truncate">{{ item.title }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <span class="text-[11px] px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 font-medium whitespace-nowrap">
                    {{ getPrimaryCategory(item.filters) }}
                  </span>
                </td>
                <td class="px-4 py-3.5">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold" :class="getStatusClass(item.approval_status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDot(item.approval_status)" />
                    {{ item.approval_status }}
                  </span>
                </td>
                <td class="px-4 py-3.5 text-[11px] text-dark/55 hidden md:table-cell whitespace-nowrap">{{ formatItemDate(item.created_at) }}</td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <button type="button" class="mr-3 text-accent-purple hover:text-accent-light transition-colors" title="Edit" @click="handleEdit(item)">
                    <i class="fas fa-pen text-xs" />
                  </button>
                  <button type="button" class="text-red-400 hover:text-red-300 transition-colors" title="Delete" @click="handleDelete(item.id)">
                    <i class="fas fa-trash text-xs" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="!loadingItems && filteredContentItems.length > 0"
          class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-4 border-t border-neutral-border bg-neutral-gray/40"
        >
          <p class="text-[11px] text-dark/55 order-2 sm:order-1">
            Showing {{ pageStart }}–{{ pageEnd }} of {{ filteredContentItems.length }}
            <span v-if="contentSearch.trim()" class="text-dark/40">(filtered)</span>
          </p>
          <div class="flex items-center gap-2 order-1 sm:order-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-neutral-border bg-white text-dark/80 hover:border-accent-purple/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              :disabled="currentPage <= 1"
              @click="currentPage--"
            >
              Previous
            </button>
            <span class="text-[11px] text-dark/60 tabular-nums px-1">Page {{ currentPage }} / {{ totalPages }}</span>
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-neutral-border bg-white text-dark/80 hover:border-accent-purple/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              :disabled="currentPage >= totalPages"
              @click="currentPage++"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <Transition name="form-slide">
        <section v-if="showContentForm" ref="formSectionRef" class="mt-5">
          <div class="rounded-2xl bg-white border border-neutral-border overflow-hidden">
            <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-border">
              <div>
                <h2 class="text-xs sm:text-sm font-bold text-dark">Content Form</h2>
                <p class="text-[11px] text-dark/55 mt-0.5 hidden sm:block">Manage content for Tech Savvy</p>
              </div>
              <button
                type="button"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-neutral-gray border border-neutral-border text-dark/60 hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all"
                @click="showContentForm = false"
              >
                <i class="fas fa-times text-[10px]" /> Close Form
              </button>
            </div>
            <ContentFormAndList ref="contentFormRef" @saved="onSaved" />
          </div>
        </section>
      </Transition>
    </main>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false" />
          <div class="relative bg-white border border-red-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
            <div class="text-center">
              <div class="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-5">
                <i class="fas fa-trash text-red-400 text-xl" />
              </div>
              <h3 class="text-lg font-bold text-dark mb-2">Delete Content</h3>
              <p class="text-sm text-dark/60 mb-6">Are you sure? This cannot be undone.</p>
              <div class="flex gap-3">
                <button
                  type="button"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-neutral-gray border border-neutral-border text-dark font-semibold text-sm hover:bg-neutral-gray/80 transition-colors"
                  @click="showDeleteModal = false"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
                  @click="confirmDeleteItem"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ContentFormAndList from '~/components/ContentFormAndList.vue'
import type { CmsRaw } from '~/composables/useDashboardCmsList'

const emit = defineEmits(['close'])

definePageMeta({ middleware: 'auth' })

useHead({ title: 'All content — Dashboard' })

const PAGE_SIZE = 10

const {
  apiBase,
  allItems,
  loadingItems,
  fetchItems,
  getFiltersText,
  getPrimaryCategory,
  getStatusClass,
  getStatusDot,
  formatItemDate
} = useDashboardCmsList()

const contentSearch = ref('')
const currentPage = ref(1)

const filteredContentItems = computed(() => {
  const q = contentSearch.value.trim().toLowerCase()
  if (!q) return allItems.value
  return allItems.value.filter(
    i =>
      i.title?.toLowerCase().includes(q) ||
      getFiltersText(i.filters).toLowerCase().includes(q)
  )
})

const totalPages = computed(() => {
  const n = filteredContentItems.value.length
  return Math.max(1, Math.ceil(n / PAGE_SIZE) || 1)
})

const paginatedItems = computed(() => {
  const list = filteredContentItems.value
  const start = (currentPage.value - 1) * PAGE_SIZE
  return list.slice(start, start + PAGE_SIZE)
})

const pageStart = computed(() => {
  if (filteredContentItems.value.length === 0) return 0
  return (currentPage.value - 1) * PAGE_SIZE + 1
})

const pageEnd = computed(() => {
  return Math.min(currentPage.value * PAGE_SIZE, filteredContentItems.value.length)
})

watch(contentSearch, () => {
  currentPage.value = 1
})

watch(totalPages, (tp) => {
  if (currentPage.value > tp) currentPage.value = tp
})

const contentFormRef = ref<InstanceType<typeof ContentFormAndList> | null>(null)
const formSectionRef = ref<HTMLElement | null>(null)
const showContentForm = ref(false)
const showDeleteModal = ref(false)
const pendingDeleteId = ref<number | null>(null)

function scrollToForm () {
  nextTick(() => formSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function handleEdit (item: CmsRaw) {
  showContentForm.value = true
  nextTick(() => {
    contentFormRef.value?.editPost(item)
    scrollToForm()
  })
}

function handleNewContent () {
  showContentForm.value = true
  nextTick(() => {
    contentFormRef.value?.openNewContentForm()
    scrollToForm()
  })
}

function handleDelete (id: number) {
  pendingDeleteId.value = id
  showDeleteModal.value = true
}

async function confirmDeleteItem () {
  if (!pendingDeleteId.value || !apiBase) return
  try {
    await $fetch(`${apiBase}/api/techsavvy/cms/delete/${pendingDeleteId.value}/`, { method: 'DELETE' })
    showDeleteModal.value = false
    pendingDeleteId.value = null
    await fetchItems()
    contentFormRef.value?.loadPosts()
  } catch {
    /* silent */
  }
}

async function onSaved () {
  await fetchItems()
  contentFormRef.value?.loadPosts()
}

onMounted(() => {
  fetchItems()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.form-slide-enter-active {
  transition: all 0.3s ease;
}
.form-slide-leave-active {
  transition: all 0.2s ease;
}
.form-slide-enter-from,
.form-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
