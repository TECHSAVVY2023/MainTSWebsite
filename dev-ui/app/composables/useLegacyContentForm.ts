// @ts-ignore
import moment from 'moment'
import { useImageUrl } from '~/composables/useImageUrl'

export function useLegacyContentForm () {
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

  const categoryOptions = ['News and update', 'Courses', 'Featured Projects', 'Merchandise', 'Events']
  const categoryFieldConfig: Record<string, any[]> = {
    'News and update': [{ key: 'tagline', label: 'Tagline', placeholder: 'Enter news tagline' }],
    Courses: [
      { key: 'tagline', label: 'Tagline', placeholder: 'Enter course tagline' },
      { key: 'course_level', label: 'Course Level', placeholder: 'Beginner / Intermediate / Advanced' },
      { key: 'course_duration', label: 'Course Duration', placeholder: 'e.g. 8 weeks' },
      { key: 'course_type', label: 'Course Type', placeholder: 'Online / Hybrid / Onsite' },
    ],
    'Featured Projects': [
      { key: 'tagline', label: 'Tagline', placeholder: 'Enter project tagline' },
      { key: 'project_developer', label: 'Developer(s)', placeholder: 'e.g. Jane Doe, Team Alpha' },
      { key: 'project_client', label: 'Project Client', placeholder: 'Who is the client?' },
      { key: 'project_status', label: 'Project Status', placeholder: 'Ongoing / Completed' },
      { key: 'project_year', label: 'Project Year', placeholder: 'e.g. 2026' },
    ],
    Merchandise: [
      { key: 'unit_amount_php', label: 'Price (PHP)', placeholder: '549', inputType: 'number' },
      { key: 'tagline', label: 'Tagline', placeholder: 'Short product line' },
    ],
    Events: [
      { key: 'event_date', label: 'Event date', placeholder: '', inputType: 'date' },
      { key: 'event_time', label: 'Start time', placeholder: '10:30 AM' },
      { key: 'end_time', label: 'End time', placeholder: '11:45 AM' },
      { key: 'venue', label: 'Venue', placeholder: 'Online / address' },
      { key: 'tagline', label: 'Tagline', placeholder: 'Headline' },
      { key: 'event_kind', label: 'Kind', placeholder: 'event | reminder | task | appointment' },
    ],
  }

  function createEmptyFilters () {
    return {
      category: '',
      tagline: '',
      course_level: '',
      course_duration: '',
      course_type: '',
      project_client: '',
      project_developer: '',
      project_status: '',
      project_year: '',
      unit_amount_php: '',
      event_date: '',
      event_time: '',
      end_time: '',
      venue: '',
      event_kind: '',
    }
  }

  const formData = ref<any>({
    content_id: `CMS${moment().valueOf()}`,
    title: '',
    authors: 'jorenleeluna24@gmail.com, info@techsavvies.space',
    filters: createEmptyFilters(),
    descriptions: '',
    approval_status: 'pending',
    links: [],
    files: [],
    logs: [],
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

  function parseLegacyFilters (rawFilters: any) {
    if (!rawFilters) return createEmptyFilters()
    if (typeof rawFilters === 'object') return { ...createEmptyFilters(), ...rawFilters }
    const parsed = createEmptyFilters()
    const parts = String(rawFilters).split(',').map(item => item.trim()).filter(Boolean)
    if (parts.length > 0) parsed.category = parts[0]
    return parsed
  }

  function normalizeFiltersForSubmit (filters: any) {
    const parsed = parseLegacyFilters(filters)
    const category = parsed.category
    if (!category) return {}
    const allowedKeys = (categoryFieldConfig[category] || []).map(item => item.key)
    const normalized: Record<string, any> = { category }
    allowedKeys.forEach((key) => {
      const v = parsed[key]
      if (v === undefined || v === null) return
      if (typeof v === 'string' && v.trim() === '') return
      normalized[key] = v
    })
    return normalized
  }

  const activeCategoryFields = computed(() => {
    const category = formData.value?.filters?.category || ''
    return categoryFieldConfig[category] || []
  })

  const approvalStatuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

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
      const filtersSearchable = typeof post.filters === 'object'
        ? JSON.stringify(post.filters).toLowerCase()
        : String(post.filters || '').toLowerCase()
      const filtersMatch = filtersSearchable.includes(query)
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
    selectedFiles.value.push(...Array.from(target?.files || []))
  }

  function handleFileDrop (event: DragEvent) {
    isDragging.value = false
    selectedFiles.value.push(...Array.from(event.dataTransfer?.files || []))
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
        ...formData.value,
        filters: normalizeFiltersForSubmit(formData.value.filters),
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
    formData.value = {
      content_id: post.content_id || '',
      title: post.title || '',
      authors: post.authors || '',
      filters: parseLegacyFilters(post.filters),
      descriptions: post.descriptions || '',
      date: post.date || '',
      links: post.links || [],
      files: post.files || [],
      logs: post.logs || [],
    }
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
  }

  function clearForm () {
    isEditing.value = false
    editingId.value = null
    selectedFiles.value = []
    manualFiles.value = []
    formData.value = {
      content_id: `CMS${moment().valueOf()}`,
      title: '',
      authors: 'jorenleeluna24@gmail.com, info@techsavvies.space',
      filters: createEmptyFilters(),
      descriptions: '',
      date: '',
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
    cleanImageUrl,
    user,
    posts,
    loading,
    error,
    loadPosts,
    formData,
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
    categoryOptions,
    categoryFieldConfig,
    activeCategoryFields,
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
