// @ts-ignore
import moment from 'moment'
import { useImageUrl } from '~/composables/useImageUrl'

export function useDashboardContentForm (
  props: { hidePostList?: boolean, memberContentScope?: boolean },
  emit: (event: string, payload?: any) => void,
) {
  const { cleanImageUrl } = useImageUrl()
  const { user, init } = useAuth()
  const { isSuperAdmin } = useSuperAdmin()

  onMounted(() => {
    init()
  })

  const {
    posts,
    loading,
    error,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
    uploadMultipleFiles,
  } = useCMS()

  const formData = ref({
    content_id: `CMS${moment().valueOf()}`,
    title: '',
    authors: 'jorenleeluna24@gmail.com, info@techsavvies.space',
    filters: '',
    descriptions: '',
    approval_status: 'pending',
    links: [] as string[],
    files: [] as any[],
    logs: [] as any[],
  })

  const eventDetailFields = ref({
    event_date: '',
    event_time: '',
    end_time: '',
    venue: '',
    tagline: '',
    event_kind: 'event',
  })

  const selectedFiles = ref<any[]>([])
  const manualFiles = ref<any[]>([])
  const isDragging = ref(false)
  const isEditing = ref(false)
  const editingId = ref<any>(null)
  const successMessage = ref('')
  const fileInput = ref<HTMLInputElement | null>(null)
  const searchQuery = ref('')
  const showForm = ref(false)
  const isDarkMode = ref(false)
  const toasts = ref<any[]>([])
  let toastIdCounter = 0
  const imageViewerOpen = ref(false)
  const currentImageUrl = ref('')
  const currentImageName = ref('')
  const zoomLevel = ref(1)
  const draggedIndex = ref<number | null>(null)
  const dragOverIndex = ref<number | null>(null)
  const draggedSelectedIndex = ref<number | null>(null)
  const dragOverSelectedIndex = ref<number | null>(null)

  const mainCategories = [
    { value: 'News and update', label: 'News & updates' },
    { value: 'News Highlights', label: 'News highlights' },
    { value: 'Announcements', label: 'Announcements' },
    { value: 'Events', label: 'Events (schedule)' },
    { value: 'Courses', label: 'Courses' },
    { value: 'Featured Projects', label: 'Featured projects' },
    { value: 'Merchandise', label: 'Merchandise' },
  ]

  const memberCategoryOptions = [
    { value: 'News and update', label: 'News & updates' },
    { value: 'News Highlights', label: 'News highlights' },
    { value: 'Featured Projects', label: 'Featured projects' },
  ]

  const categoriesForForm = computed(() =>
    props.memberContentScope ? memberCategoryOptions : mainCategories,
  )

  const selectedCategories = ref<string[]>([])
  const editingStoredCategoryRaw = ref('')

  function normalizeCategoryKey (s: unknown) {
    return String(s || '').trim().toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ')
  }

  function mapStoredCategoryToCheckboxValue (raw: unknown) {
    const k = normalizeCategoryKey(raw)
    if (!k) return null

    const exact = categoriesForForm.value.find(c => normalizeCategoryKey(c.value) === k)
    if (exact) return exact.value

    if (props.memberContentScope) {
      const m = new Map([
        [normalizeCategoryKey('News'), 'News and update'],
        [normalizeCategoryKey('News and Update'), 'News and update'],
        [normalizeCategoryKey('NEWS AND UPDATE'), 'News and update'],
        [normalizeCategoryKey('News Highlights'), 'News Highlights'],
        [normalizeCategoryKey('News highlights'), 'News Highlights'],
        [normalizeCategoryKey('Featured Projects'), 'Featured Projects'],
        [normalizeCategoryKey('Featured projects'), 'Featured Projects'],
        [normalizeCategoryKey('Course'), 'News Highlights'],
        [normalizeCategoryKey('Courses'), 'News Highlights'],
        [normalizeCategoryKey('Events'), 'News Highlights'],
        [normalizeCategoryKey('Announcements'), 'News and update'],
        [normalizeCategoryKey('Announcement'), 'News and update'],
        [normalizeCategoryKey('Merchandise'), 'Featured Projects'],
      ])
      if (m.has(k)) return m.get(k) || null
      if (k.includes('project')) return 'Featured Projects'
      if (k.includes('highlight')) return 'News Highlights'
      if (k.includes('news')) return 'News and update'
      return null
    }

    const aliases = new Map([
      [normalizeCategoryKey('News'), 'News and update'],
      [normalizeCategoryKey('News and Update'), 'News and update'],
      [normalizeCategoryKey('NEWS AND UPDATE'), 'News and update'],
      [normalizeCategoryKey('Course'), 'Courses'],
      [normalizeCategoryKey('Courses'), 'Courses'],
      [normalizeCategoryKey('Featured Projects'), 'Featured Projects'],
      [normalizeCategoryKey('Featured projects'), 'Featured Projects'],
      [normalizeCategoryKey('Merchandise'), 'Merchandise'],
      [normalizeCategoryKey('MERCHANDISE'), 'Merchandise'],
      [normalizeCategoryKey('Events'), 'Events'],
      [normalizeCategoryKey('Announcements'), 'Announcements'],
      [normalizeCategoryKey('Announcement'), 'Announcements'],
      [normalizeCategoryKey('News Highlights'), 'News Highlights'],
      [normalizeCategoryKey('News highlights'), 'News Highlights'],
    ])
    if (aliases.has(k)) return aliases.get(k) || null

    if (k.includes('announce')) return 'Announcements'
    if (k.includes('event')) return 'Events'
    if (k.includes('merch')) return 'Merchandise'
    if (k.includes('course')) return 'Courses'
    if (k.includes('project') || k.includes('highlight')) return 'Featured Projects'
    if (k.includes('news')) return 'News and update'
    return null
  }

  function collectCategoryTokensFromFilters (raw: any) {
    const tokens: string[] = []
    if (raw == null || raw === '') return tokens

    if (typeof raw === 'object' && !Array.isArray(raw)) {
      const cat = raw.category
      if (typeof cat === 'string' && cat.trim()) {
        cat.split(/[|,]/).forEach((p: string) => {
          const t = p.trim()
          if (t) tokens.push(t)
        })
      }
      return tokens
    }

    if (typeof raw === 'string') {
      const s = raw.trim()
      if (s.startsWith('{')) {
        try {
          const o = JSON.parse(s)
          if (o && typeof o.category === 'string' && o.category.trim()) {
            o.category.split(/[|,]/).forEach((p: string) => {
              const t = p.trim()
              if (t) tokens.push(t)
            })
          }
          return tokens
        } catch {
          // ignore parse errors and fall back to split
        }
      }
      s.split(/[,|]/).forEach((p: string) => {
        const t = p.trim()
        if (t) tokens.push(t)
      })
    }

    return tokens
  }

  function checkboxValuesFromFilters (raw: any) {
    const out: string[] = []
    const seen = new Set<string>()
    for (const token of collectCategoryTokensFromFilters(raw)) {
      const v = mapStoredCategoryToCheckboxValue(token)
      if (v && !seen.has(v)) {
        seen.add(v)
        out.push(v)
      }
    }
    return out
  }

  function toPlainFilterObject (f: any) {
    if (f && typeof f === 'object' && !Array.isArray(f)) return { ...f }
    if (typeof f === 'string' && f.trim().startsWith('{')) {
      try {
        const o = JSON.parse(f)
        return o && typeof o === 'object' && !Array.isArray(o) ? { ...o } : null
      } catch {
        return null
      }
    }
    return null
  }

  const computedFilters = computed(() => selectedCategories.value.join(', '))

  watch(computedFilters, (newValue) => {
    const sel = selectedCategories.value
    const cur = formData.value.filters

    if (sel.length === 0) {
      if (isEditing.value && cur != null && String(cur).trim() !== '') return
      formData.value.filters = newValue
      return
    }

    const base = toPlainFilterObject(cur)
    if (base) {
      formData.value.filters = { ...base, category: newValue }
      return
    }

    formData.value.filters = newValue
  })

  watch(
    () => props.memberContentScope,
    (m) => {
      if (!m) return
      const allowed = new Set(memberCategoryOptions.map(c => c.value))
      selectedCategories.value = selectedCategories.value.filter(c => allowed.has(c))
    },
    { immediate: true },
  )

  const approvalStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  function normalizeApprovalForUi (status: unknown) {
    const x = String(status || '').trim().toLowerCase()
    if (x === 'published' || x === 'live' || x === 'verified') return 'approved'
    if (x === 'rejected' || x === 'approved') return x
    return 'pending'
  }

  const canSeeApprovalStatus = computed(() => isSuperAdmin(user.value?.email))

  function toggleTheme () {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('cms-theme', isDarkMode.value ? 'dark' : 'light')
  }

  function removeToast (id: number) {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) toasts.value.splice(index, 1)
  }

  function showToast (message: string, type = 'success', duration = 3000) {
    const id = ++toastIdCounter
    toasts.value.push({ id, message, type })
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }

  function showConfirmToast (message: string, onConfirm: () => Promise<void> | void) {
    const id = ++toastIdCounter
    const handleConfirm = async () => {
      removeToast(id)
      await onConfirm()
    }
    const handleCancel = () => removeToast(id)
    toasts.value.push({ id, message, type: 'confirm', onConfirm: handleConfirm, onCancel: handleCancel })
  }

  const filteredPosts = computed(() => {
    if (!searchQuery.value.trim()) return posts.value
    const query = searchQuery.value.toLowerCase().trim()

    return posts.value.filter((post: any) => {
      const titleMatch = post.title?.toLowerCase().includes(query)
      const authorsMatch = post.authors?.toLowerCase().includes(query)
      let filtersMatch = false
      if (post.filters) {
        if (Array.isArray(post.filters)) {
          filtersMatch = post.filters.some((filter: string) => filter.toLowerCase().includes(query))
        } else {
          filtersMatch = String(post.filters).toLowerCase().includes(query)
        }
      }
      const descriptionsMatch = post.descriptions?.toLowerCase().includes(query)
      const statusMatch = post.approval_status?.toLowerCase().includes(query)
      return titleMatch || authorsMatch || filtersMatch || descriptionsMatch || statusMatch
    })
  })

  function handleKeyPress (event: KeyboardEvent) {
    if (!imageViewerOpen.value) return
    switch (event.key) {
      case 'Escape':
        closeImageViewer()
        break
      case '+':
      case '=':
        zoomIn()
        break
      case '-':
        zoomOut()
        break
      case '0':
        resetZoom()
        break
    }
  }

  onMounted(async () => {
    await loadPosts()
    if (localStorage.getItem('cms-theme') === 'dark') {
      isDarkMode.value = true
    }
    window.addEventListener('keydown', handleKeyPress)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
    document.body.style.overflow = ''
  })

  function triggerFileInput () {
    fileInput.value?.click()
  }

  function handleFileSelect (event: Event) {
    const target = event.target as HTMLInputElement | null
    const files = Array.from(target?.files || [])
    selectedFiles.value.push(...files)
  }

  function handleFileDrop (event: DragEvent) {
    isDragging.value = false
    const files = Array.from(event.dataTransfer?.files || [])
    selectedFiles.value.push(...files)
  }

  function removeSelectedFile (index: number) {
    selectedFiles.value.splice(index, 1)
  }

  function removeUploadedFile (index: number) {
    formData.value.files.splice(index, 1)
  }

  function addManualFile () {
    manualFiles.value.push({ name: '', url: '' })
  }

  function removeManualFile (index: number) {
    manualFiles.value.splice(index, 1)
  }

  function formatFileSize (bytes: number) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
  }

  function isImageFile (filename: string) {
    if (!filename) return false
    const cleanFilename = filename.split('?')[0]
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
    const ext = cleanFilename.toLowerCase().substring(cleanFilename.lastIndexOf('.'))
    return imageExtensions.includes(ext)
  }

  function getFileExtension (filename: string) {
    if (!filename) return ''
    const cleanFilename = filename.split('?')[0]
    return cleanFilename.substring(cleanFilename.lastIndexOf('.') + 1).toUpperCase()
  }

  function getCleanFilename (filename: string) {
    if (!filename) return ''
    let cleanName = filename.split('?')[0]
    if (cleanName.includes('/')) cleanName = cleanName.split('/').pop() || cleanName
    const underscoreMatch = cleanName.match(/^([^_]+)_.*?\.([a-zA-Z0-9]+)$/)
    if (underscoreMatch) return `${underscoreMatch[1]}.${underscoreMatch[2]}`
    const simpleMatch = cleanName.match(/^(.+?)\.([a-zA-Z0-9]+)/)
    if (simpleMatch) return `${simpleMatch[1]}.${simpleMatch[2]}`
    return cleanName
  }

  function handleImageError (event: Event, file: any) {
    const target = event.target as HTMLImageElement | null
    console.error('Image failed to load:', { url: file.url, name: file.name, error: event })
    if (target) {
      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EError%3C/text%3E%3C/svg%3E'
    }
  }

  function openImageViewer (url: string, name: string) {
    currentImageUrl.value = url
    currentImageName.value = name
    imageViewerOpen.value = true
    zoomLevel.value = 1
    document.body.style.overflow = 'hidden'
  }

  function closeImageViewer () {
    imageViewerOpen.value = false
    currentImageUrl.value = ''
    currentImageName.value = ''
    zoomLevel.value = 1
    document.body.style.overflow = ''
  }

  function zoomIn () {
    if (zoomLevel.value < 3) zoomLevel.value += 0.25
  }

  function zoomOut () {
    if (zoomLevel.value > 0.5) zoomLevel.value -= 0.25
  }

  function resetZoom () {
    zoomLevel.value = 1
  }

  function handleDragStart (index: number) {
    draggedIndex.value = index
  }

  function handleDragEnter (index: number) {
    dragOverIndex.value = index
  }

  function handleDragLeave () {
    setTimeout(() => {
      dragOverIndex.value = null
    }, 50)
  }

  function handleDrop (dropIndex: number) {
    if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
      draggedIndex.value = null
      dragOverIndex.value = null
      return
    }
    const files = [...formData.value.files]
    const draggedFile = files[draggedIndex.value]
    files.splice(draggedIndex.value, 1)
    files.splice(dropIndex, 0, draggedFile)
    formData.value.files = files
    draggedIndex.value = null
    dragOverIndex.value = null
  }

  function handleSelectedDragStart (index: number) {
    draggedSelectedIndex.value = index
  }

  function handleSelectedDragEnter (index: number) {
    dragOverSelectedIndex.value = index
  }

  function handleSelectedDragLeave () {
    setTimeout(() => {
      dragOverSelectedIndex.value = null
    }, 50)
  }

  function handleSelectedDrop (dropIndex: number) {
    if (draggedSelectedIndex.value === null || draggedSelectedIndex.value === dropIndex) {
      draggedSelectedIndex.value = null
      dragOverSelectedIndex.value = null
      return
    }
    const files = [...selectedFiles.value]
    const draggedFile = files[draggedSelectedIndex.value]
    files.splice(draggedSelectedIndex.value, 1)
    files.splice(dropIndex, 0, draggedFile)
    selectedFiles.value = files
    draggedSelectedIndex.value = null
    dragOverSelectedIndex.value = null
  }

  function getFilePreviewUrl (file: any) {
    if (file instanceof File) return URL.createObjectURL(file)
    return file.url || ''
  }

  function addLink () {
    if (!formData.value.links) formData.value.links = []
    formData.value.links.push('')
  }

  function removeLink (index: number) {
    formData.value.links.splice(index, 1)
  }

  function buildFiltersForApi () {
    const prev = toPlainFilterObject(formData.value.filters) || {}
    const parts = selectedCategories.value
    const categoryStr = parts.length > 0 ? parts.join(', ') : String(prev.category || '').trim()
    const out: Record<string, any> = { ...prev }

    if (categoryStr) out.category = categoryStr
    else delete out.category

    if (props.memberContentScope) {
      delete out.event_date
      delete out.event_time
      delete out.end_time
      delete out.venue
      delete out.event_kind
    } else if (parts.includes('Events')) {
      const e = eventDetailFields.value
      const setIf = (key: string, val: any) => {
        const v = typeof val === 'string' ? val.trim() : val
        if (v) out[key] = v
        else delete out[key]
      }
      setIf('event_date', e.event_date)
      setIf('event_time', e.event_time)
      setIf('end_time', e.end_time)
      setIf('venue', e.venue)
      setIf('tagline', e.tagline)
      out.event_kind = e.event_kind || 'event'
    } else {
      delete out.event_date
      delete out.event_time
      delete out.end_time
      delete out.venue
      delete out.event_kind
    }

    return out
  }

  function loadEventDetailFieldsFromPost (filters: any) {
    const plain = toPlainFilterObject(filters) || {}
    eventDetailFields.value = {
      event_date: String(plain.event_date || ''),
      event_time: String(plain.event_time || ''),
      end_time: String(plain.end_time || ''),
      venue: String(plain.venue || ''),
      tagline: String(plain.tagline || ''),
      event_kind: ['event', 'task', 'reminder', 'appointment'].includes(String(plain.event_kind || '').toLowerCase())
        ? String(plain.event_kind).toLowerCase()
        : 'event',
    }
  }

  async function handleSubmit () {
    try {
      successMessage.value = ''
      error.value = ''

      if (selectedFiles.value.length > 0) {
        const uploadedFiles = await uploadMultipleFiles(selectedFiles.value)
        if (!formData.value.files) formData.value.files = []
        formData.value.files.push(...uploadedFiles)
        selectedFiles.value = []
      }

      if (manualFiles.value.length > 0) {
        const validManualFiles = manualFiles.value.filter(file => file.name && file.url)
        if (!formData.value.files) formData.value.files = []
        formData.value.files.push(...validManualFiles)
        manualFiles.value = []
      }

      const submitData = {
        content_id: formData.value.content_id,
        title: formData.value.title,
        authors: formData.value.authors,
        descriptions: formData.value.descriptions,
        approval_status: props.memberContentScope ? 'pending' : formData.value.approval_status,
        filters: buildFiltersForApi(),
        links: formData.value.links || [],
        files: formData.value.files || [],
        logs: formData.value.logs || [],
      }

      if (isEditing.value && editingId.value) {
        await updatePost(editingId.value, submitData)
        showToast('Content updated successfully!', 'success')
      } else {
        await createPost(submitData)
        showToast('Content created successfully!', 'success')
      }

      clearForm()
      await loadPosts()
      emit('saved')
    } catch (err: any) {
      let errorMessage = 'Failed to submit form'
      if (err.data && err.data.errors) errorMessage = `Validation errors: ${JSON.stringify(err.data.errors)}`
      else if (err.message) errorMessage = err.message
      showToast(errorMessage, 'error', 5000)
    }
  }

  function editPost (post: any) {
    isEditing.value = true
    editingId.value = post.id
    showForm.value = true
    emit('meta', { mode: 'edit', title: post.title || '' })

    const tokens = collectCategoryTokensFromFilters(post.filters)
    editingStoredCategoryRaw.value = tokens.length ? tokens.join(' Â· ') : ''
    const extractedCategories = checkboxValuesFromFilters(post.filters)

    formData.value = {
      content_id: post.content_id || '',
      title: post.title || '',
      authors: post.authors || '',
      filters: post.filters || '',
      descriptions: post.descriptions || '',
      approval_status: normalizeApprovalForUi(post.approval_status),
      links: post.links || [],
      files: post.files || [],
      logs: post.logs || [],
    }

    selectedCategories.value = [...extractedCategories]
    loadEventDetailFieldsFromPost(post.filters)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function confirmDelete (id: number) {
    showConfirmToast('Are you sure you want to delete this content?', async () => {
      try {
        await deletePost(id)
        showToast('Content deleted successfully!', 'success')
        await loadPosts()
      } catch {
        showToast('Failed to delete content', 'error')
      }
    })
  }

  async function updateApprovalStatus (id: number, status: string) {
    try {
      await updatePost(id, { approval_status: status })
      showToast(`Approval status updated to ${status}!`, 'success')
      await loadPosts()
    } catch {
      showToast('Failed to update approval status', 'error')
    }
  }

  function openNewContentForm () {
    clearForm()
    showForm.value = true
    editingStoredCategoryRaw.value = ''
    emit('meta', { mode: 'create' })
  }

  function defaultAuthorsLine () {
    const u = (user.value?.email || '').trim()
    return u ? `${u}, info@techsavvies.space` : 'info@techsavvies.space'
  }

  function clearForm () {
    isEditing.value = false
    editingId.value = null
    selectedFiles.value = []
    manualFiles.value = []
    selectedCategories.value = []
    editingStoredCategoryRaw.value = ''
    eventDetailFields.value = {
      event_date: '',
      event_time: '',
      end_time: '',
      venue: '',
      tagline: '',
      event_kind: 'event',
    }
    formData.value = {
      content_id: `CMS${moment().valueOf()}`,
      title: '',
      authors: defaultAuthorsLine(),
      filters: '',
      descriptions: '',
      approval_status: 'pending',
      links: [],
      files: [],
      logs: [],
    }
    if (fileInput.value) fileInput.value.value = ''
  }

  function isVideoUrl (url: string) {
    if (!url) return false
    const videoPatterns = [
      /youtube\.com\/watch/i,
      /youtube\.com\/embed/i,
      /youtube\.com\/shorts/i,
      /youtu\.be\//i,
      /facebook\.com\/.*\/videos/i,
      /facebook\.com\/share\/r\//i,
      /facebook\.com\/share\/v\//i,
      /fb\.watch/i,
      /facebook\.com\/reel/i,
      /instagram\.com\/reel/i,
      /vimeo\.com/i,
      /tiktok\.com/i,
    ]
    return videoPatterns.some(pattern => pattern.test(url))
  }

  function getYouTubeEmbedUrl (url: string) {
    if (!url) return ''
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('/embed/')) return url
      let videoId = ''
      if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0].split('&')[0]
      else if (url.includes('/shorts/')) videoId = url.split('/shorts/')[1].split('?')[0].split('&')[0]
      else if (url.includes('watch?v=')) videoId = url.split('watch?v=')[1].split('&')[0]
      else if (url.includes('&v=')) videoId = url.split('&v=')[1].split('&')[0]
      if (videoId) return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=734`
    }
    if (url.includes('instagram.com/reel')) {
      const reelId = url.split('/reel/')[1]?.split('/')[0]
      if (reelId) return `https://www.instagram.com/reel/${reelId}/embed`
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      if (videoId) return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  return {
    props,
    cleanImageUrl,
    user,
    posts,
    loading,
    error,
    loadPosts,
    formData,
    eventDetailFields,
    selectedFiles,
    manualFiles,
    isDragging,
    isEditing,
    editingId,
    successMessage,
    fileInput,
    searchQuery,
    showForm,
    isDarkMode,
    toasts,
    imageViewerOpen,
    currentImageUrl,
    currentImageName,
    zoomLevel,
    draggedIndex,
    dragOverIndex,
    draggedSelectedIndex,
    dragOverSelectedIndex,
    categoriesForForm,
    selectedCategories,
    editingStoredCategoryRaw,
    approvalStatuses,
    canSeeApprovalStatus,
    filteredPosts,
    toggleTheme,
    showToast,
    removeToast,
    showConfirmToast,
    triggerFileInput,
    handleFileSelect,
    handleFileDrop,
    removeSelectedFile,
    removeUploadedFile,
    addManualFile,
    removeManualFile,
    formatFileSize,
    isImageFile,
    getFileExtension,
    getCleanFilename,
    handleImageError,
    openImageViewer,
    closeImageViewer,
    zoomIn,
    zoomOut,
    resetZoom,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleSelectedDragStart,
    handleSelectedDragEnter,
    handleSelectedDragLeave,
    handleSelectedDrop,
    getFilePreviewUrl,
    addLink,
    removeLink,
    handleSubmit,
    editPost,
    confirmDelete,
    updateApprovalStatus,
    openNewContentForm,
    clearForm,
    isVideoUrl,
    getYouTubeEmbedUrl,
  }
}
