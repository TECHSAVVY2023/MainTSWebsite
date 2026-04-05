<template>
  <div v-if="safeTotalPages > 1" class="mt-12 flex flex-wrap items-center justify-center gap-2">
    <NuxtLink
      v-if="safeCurrentPage > 1"
      :to="{ path: basePath, query: safePageQuery(safeCurrentPage - 1) }"
      class="inline-flex items-center py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-[rgba(35,21,89,0.95)] border border-white/20 no-underline transition-colors hover:bg-[rgba(45,28,110,0.98)] hover:text-white hover:border-white/35"
      aria-label="Previous page"
    >
      <i class="fas fa-chevron-left mr-1" /> Previous
    </NuxtLink>
    <span
      v-else
      class="inline-flex items-center py-2 px-2.5 rounded-lg opacity-50 pointer-events-none cursor-default text-xs sm:text-sm font-semibold text-white/90 bg-[rgba(35,21,89,0.95)] border border-white/20"
      aria-hidden="true"
    >
      <i class="fas fa-chevron-left mr-1" /> Previous
    </span>
    <template v-for="(p, pIdx) in safePageNumbers" :key="'p-' + pIdx">
      <NuxtLink
        v-if="p !== '…'"
        :to="{ path: basePath, query: safePageQuery(p as number) }"
        class="inline-flex items-center justify-center min-w-[2.5rem] py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold no-underline transition-colors"
        :class="safeCurrentPage === p ? 'bg-[#B5A3FF] text-[#14082E] border border-[#B5A3FF] hover:bg-[#C4B5FF]' : 'text-white/90 bg-[rgba(35,21,89,0.95)] border border-white/20 hover:bg-[rgba(45,28,110,0.98)] hover:text-white hover:border-white/35'"
      >
        {{ p }}
      </NuxtLink>
      <span v-else class="px-2 text-white/50">…</span>
    </template>
    <NuxtLink
      v-if="safeCurrentPage < safeTotalPages"
      :to="{ path: basePath, query: safePageQuery(safeCurrentPage + 1) }"
      class="inline-flex items-center py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-[rgba(35,21,89,0.95)] border border-white/20 no-underline transition-colors hover:bg-[rgba(45,28,110,0.98)] hover:text-white hover:border-white/35"
      aria-label="Next page"
    >
      Next <i class="fas fa-chevron-right ml-1" />
    </NuxtLink>
    <span
      v-else
      class="inline-flex items-center py-2 px-2.5 rounded-lg opacity-50 pointer-events-none cursor-default text-xs sm:text-sm font-semibold text-white/90 bg-[rgba(35,21,89,0.95)] border border-white/20"
      aria-hidden="true"
    >
      Next <i class="fas fa-chevron-right ml-1" />
    </span>
  </div>
  <p v-if="safeTotalItems > 0" class="mt-4 text-center text-xs sm:text-sm text-dark/60">
    Page {{ safeCurrentPage }} of {{ safeTotalPages }} ({{ safeTotalItems }} total{{ searchLabel ? ' matching' : '' }})
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  basePath: string
  currentPage?: number | unknown
  totalPages?: number | unknown
  totalItems?: number | unknown
  pageNumbers?: (number | '…')[] | unknown
  pageQuery?: ((page: number) => Record<string, string>) | unknown
  searchLabel?: boolean
}>()

const safeCurrentPage = computed(() => {
  const v = props.currentPage
  return typeof v === 'number' ? v : 1
})
const safeTotalPages = computed(() => {
  const v = props.totalPages
  return typeof v === 'number' ? v : 1
})
const safeTotalItems = computed(() => {
  const v = props.totalItems
  return typeof v === 'number' ? v : 0
})
const safePageNumbers = computed(() => {
  const v = props.pageNumbers
  return Array.isArray(v) ? v : []
})
const safePageQuery = computed(() => {
  const fn = props.pageQuery
  return typeof fn === 'function' ? fn : () => ({})
})
</script>
