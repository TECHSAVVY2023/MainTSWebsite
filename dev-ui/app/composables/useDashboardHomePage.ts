/**
 * Dashboard home: drawer, stats, recent CMS table, content form, delete/logout modals, clock.
 */
// @ts-ignore — moment
import moment from 'moment'
import ContentFormAndList from '~/components/ContentFormAndList.vue'
import type { CmsRaw } from '~/composables/useDashboardCmsList'

export function useDashboardHomePage () {
  const contentFormRef = ref<InstanceType<typeof ContentFormAndList> | null>(null)
  const formSectionRef = ref<HTMLElement | null>(null)
  const contentTableRef = ref<HTMLElement | null>(null)

  const { user, setAuth, logout, init } = useAuth()
  const { logoUrl } = useAppLogo()

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

  const drawerOpen = ref(false)

  const currentTime = ref('')
  const currentDate = ref('')
  const greeting = ref('')
  const showLogoutModal = ref(false)
  const profileImage = ref<string | null>(null)

  const userInitials = computed(() => {
    const name = user.value?.name || 'USER'
    const parts = name.split(' ')
    return parts.length >= 2
      ? (parts[0]![0]! + parts[1]![0]!).toUpperCase()
      : name.substring(0, 2).toUpperCase()
  })

  function updateTime () {
    const now = moment()
    currentTime.value = now.format('hh:mm:ss A')
    currentDate.value = now.format('dddd, MMM DD, YYYY')
    const h = now.hour()
    greeting.value = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
  }

  const newsCount = computed(() =>
    allItems.value.filter((i) => {
      const f = getFiltersText(i.filters)
      if (!f.trim()) return true
      return ['News', 'News Highlights', 'Events', 'Announcements', 'News and update'].some((c) =>
        f.split(',').map((s) => s.trim()).includes(c))
    }).length
  )
  const coursesCount = computed(() =>
    allItems.value.filter((i) => getFiltersText(i.filters).toLowerCase().includes('course')).length
  )
  const projectsCount = computed(() =>
    allItems.value.filter((i) => getFiltersText(i.filters).toLowerCase().includes('project')).length
  )
  const pendingCount = computed(() =>
    allItems.value.filter((i) => i.approval_status === 'pending').length
  )

  const statCards = computed(() => [
    { label: 'Total News', value: newsCount.value, change: `+${newsCount.value} published`, positive: true, icon: 'fas fa-newspaper', iconBg: 'bg-accent-purple/15', iconColor: 'text-accent-purple', glow: 'rgba(181,163,255,0.12)' },
    { label: 'Courses', value: coursesCount.value, change: `${coursesCount.value} available`, positive: true, icon: 'fas fa-graduation-cap', iconBg: 'bg-accent-gold/15', iconColor: 'text-accent-gold', glow: 'rgba(255,215,74,0.12)' },
    { label: 'Projects', value: projectsCount.value, change: `${projectsCount.value} featured`, positive: true, icon: 'fas fa-folder-open', iconBg: 'bg-blue-400/15', iconColor: 'text-blue-400', glow: 'rgba(96,165,250,0.12)' },
    { label: 'Pending Review', value: pendingCount.value, change: pendingCount.value > 0 ? 'Needs attention' : 'All clear', positive: pendingCount.value === 0, icon: 'fas fa-clock', iconBg: 'bg-orange-400/15', iconColor: 'text-orange-400', glow: 'rgba(251,146,60,0.12)' }
  ])

  const contentStatus = computed(() => {
    const total = allItems.value.length || 1
    const approved = allItems.value.filter((i) => i.approval_status === 'approved' || i.approval_status === 'verified').length
    const pending = allItems.value.filter((i) => i.approval_status === 'pending').length
    const rejected = allItems.value.filter((i) => i.approval_status === 'rejected').length
    return [
      { label: 'Approved / Verified', count: approved, pct: Math.round(approved / total * 100), color: 'text-green-400', barColor: 'bg-green-400' },
      { label: 'Pending', count: pending, pct: Math.round(pending / total * 100), color: 'text-accent-gold', barColor: 'bg-accent-gold' },
      { label: 'Rejected', count: rejected, pct: Math.round(rejected / total * 100), color: 'text-red-400', barColor: 'bg-red-400' }
    ]
  })

  const showContentForm = ref(false)
  const contentSearch = ref('')
  const showDeleteModal = ref(false)
  const pendingDeleteId = ref<number | null>(null)

  const filteredContentItems = computed(() => {
    const q = contentSearch.value.trim().toLowerCase()
    if (!q) return allItems.value
    return allItems.value.filter(
      (i) =>
        i.title?.toLowerCase().includes(q)
        || getFiltersText(i.filters).toLowerCase().includes(q)
    )
  })

  const recentContentItems = computed(() => filteredContentItems.value.slice(0, 5))

  function scrollToForm () {
    nextTick(() => formSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function handleEdit (item: CmsRaw) {
    drawerOpen.value = false
    showContentForm.value = true
    nextTick(() => {
      contentFormRef.value?.editPost(item)
      scrollToForm()
    })
  }

  function handleNewContent () {
    drawerOpen.value = false
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
    } catch { /* silent */ }
  }

  function handleLogout () {
    showLogoutModal.value = true
  }
  function confirmLogout () {
    showLogoutModal.value = false
    logout()
  }
  function handleImageError () {
    profileImage.value = null
  }

  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlToken = urlParams.get('token')
    if (urlToken) {
      setAuth(urlToken)
      window.history.replaceState({}, '', '/dashboard')
    } else {
      init()
    }
    updateTime()
    setInterval(updateTime, 1000)
    if (user.value?.image) profileImage.value = user.value.image
    fetchItems()
  })

  watch(() => user.value?.image, (img) => {
    if (img) profileImage.value = img
  })

  return {
    contentFormRef,
    formSectionRef,
    contentTableRef,
    user,
    logoUrl,
    apiBase,
    allItems,
    loadingItems,
    fetchItems,
    getPrimaryCategory,
    getStatusClass,
    getStatusDot,
    formatItemDate,
    drawerOpen,
    currentTime,
    currentDate,
    greeting,
    showLogoutModal,
    profileImage,
    userInitials,
    statCards,
    contentStatus,
    showContentForm,
    contentSearch,
    showDeleteModal,
    pendingDeleteId,
    filteredContentItems,
    recentContentItems,
    handleEdit,
    handleNewContent,
    handleDelete,
    confirmDeleteItem,
    handleLogout,
    confirmLogout,
    handleImageError
  }
}
