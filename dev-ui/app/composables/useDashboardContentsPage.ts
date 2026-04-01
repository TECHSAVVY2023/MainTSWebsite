/**
 * Dashboard “all content” page: paginated CMS table, search, edit/delete, content form.
 */
import ContentFormAndList from '~/components/ContentFormAndList.vue'
import type { CmsRaw } from '~/composables/useDashboardCmsList'

const PAGE_SIZE = 10

export function useDashboardContentsPage () {
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
      (i) =>
        i.title?.toLowerCase().includes(q)
        || getFiltersText(i.filters).toLowerCase().includes(q)
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
      await $fetch(`${apiBase}/techsavvy_app/cms/delete/${pendingDeleteId.value}/`, { method: 'DELETE' })
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

  useHead({ title: 'All content — Dashboard' })

  return {
    allItems,
    loadingItems,
    fetchItems,
    getPrimaryCategory,
    getStatusClass,
    getStatusDot,
    formatItemDate,
    contentSearch,
    currentPage,
    filteredContentItems,
    totalPages,
    paginatedItems,
    pageStart,
    pageEnd,
    contentFormRef,
    formSectionRef,
    showContentForm,
    showDeleteModal,
    handleEdit,
    handleNewContent,
    handleDelete,
    confirmDeleteItem,
    onSaved
  }
}
