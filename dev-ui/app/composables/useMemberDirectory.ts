import {
  createEmptyMemberForm,
  createMemberRequest,
  formatMemberCreateError,
} from './useMemberFormUtils'

export function useMemberDirectory (isAdmin: MaybeRefOrGetter<boolean>) {
  const config = useRuntimeConfig()
  const apiBase = computed(() => String(config.public.apiBase || '').replace(/\/$/, ''))
  const { cleanImageUrl } = useImageUrl()

  const members = ref<any[]>([])
  const selectedMember = ref<any | null>(null)
  const showModal = ref(false)
  const showAddModal = ref(false)
  const savingStates = ref<Record<string, string>>({})
  const uploadingStates = ref<Record<string, boolean>>({})
  const fileInputs = ref<Record<string, HTMLInputElement | null>>({})
  const addFileInput = ref<HTMLInputElement | null>(null)
  const searchQuery = ref('')
  const roleFilter = ref('members')
  const addLoading = ref(false)
  const addSuccess = ref(false)
  const addError = ref('')
  const addForm = ref(createEmptyMemberForm())

  const isSaving = computed(() =>
    Object.keys(savingStates.value).some(k => savingStates.value[k] === 'saving'),
  )

  const filteredMembers = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    return members.value.filter((m) => {
      const matchesRole = roleFilter.value === 'participants'
        ? isParticipantRole(m.role)
        : !isParticipantRole(m.role)
      if (!matchesRole) return false
      if (!q) return true
      return (
        m.firstname?.toLowerCase().includes(q) ||
        m.lastname?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.idNumber?.toLowerCase().includes(q)
      )
    })
  })

  function normalizeMemberList (raw: any) {
    if (Array.isArray(raw)) return raw
    if (raw && typeof raw === 'object' && Array.isArray(raw.results)) return raw.results
    return []
  }

  async function fetchMembers () {
    if (!apiBase.value) return
    try {
      const raw = await $fetch(`${apiBase.value}/member/list/`)
      members.value = normalizeMemberList(raw)
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  function openDetails (member: any) {
    selectedMember.value = { ...member }
    showModal.value = true
  }

  function closeModal () {
    showModal.value = false
  }

  function isParticipantRole (role: string) {
    return String(role || '').toLowerCase().includes('parti')
  }

  function toggleParticipantView () {
    roleFilter.value = roleFilter.value === 'participants' ? 'members' : 'participants'
  }

  function resetAddForm () {
    addForm.value = createEmptyMemberForm()
    if (addFileInput.value) addFileInput.value.value = ''
  }

  function openAddModal () {
    addError.value = ''
    addSuccess.value = false
    showAddModal.value = true
  }

  function closeAddModal () {
    showAddModal.value = false
    addLoading.value = false
  }

  async function submitAddMember () {
    addLoading.value = true
    addSuccess.value = false
    addError.value = ''

    if (!apiBase.value) {
      addError.value = 'NUXT_PUBLIC_API_BASE is not set. Add your API URL to .env.'
      addLoading.value = false
      return
    }

    try {
      await createMemberRequest(apiBase.value, addForm.value, addFileInput.value?.files?.[0])
      await fetchMembers()
      addSuccess.value = true
      resetAddForm()
      setTimeout(() => {
        closeAddModal()
        addSuccess.value = false
      }, 900)
    } catch (err) {
      addError.value = formatMemberCreateError(err)
    } finally {
      addLoading.value = false
    }
  }

  async function promoteParticipant (member: any) {
    if (!member?.id || !isParticipantRole(member.role)) return
    await updateField(member.id, 'role', 'Member')
    member.role = 'Member'
    if (selectedMember.value?.id === member.id) selectedMember.value.role = 'Member'
  }

  async function syncField (fieldName: string) {
    if (!selectedMember.value) return
    await updateField(selectedMember.value.id, fieldName, selectedMember.value[fieldName])
  }

  function getRoleColor (role: string) {
    const r = (role || '').toLowerCase()
    if (r.includes('admin')) return 'bg-violet-50 text-violet-600 border-violet-100'
    if (r.includes('mentor') || r.includes('lead')) return 'bg-emerald-50 text-emerald-600 border-emerald-100'
    if (r.includes('parti')) return 'bg-sky-50 text-sky-600 border-sky-100'
    if (r.includes('spons')) return 'bg-rose-50 text-rose-600 border-rose-100'
    return 'bg-gray-50 text-gray-500 border-gray-100'
  }

  function triggerFileUpload (memberId: string | number) {
    const input = fileInputs.value[String(memberId)]
    if (input) input.click()
  }

  async function handleProfilePictureUpload (memberId: string | number, event: Event) {
    const target = event.target as HTMLInputElement | null
    const file = target?.files?.[0]
    if (!file || !apiBase.value) return

    try {
      uploadingStates.value[String(memberId)] = true
      const formData = new FormData()
      formData.append('profilePicture', file)
      await $fetch(`${apiBase.value}/member/${memberId}/update/`, { method: 'PATCH', body: formData })
      await fetchMembers()
    } catch (error) {
      console.error('Error uploading profile picture:', error)
    } finally {
      uploadingStates.value[String(memberId)] = false
    }
  }

  async function updateField (memberId: string | number, fieldName: string, value: unknown) {
    if (!apiBase.value) return
    const stateKey = `${memberId}-${fieldName}`
    try {
      savingStates.value[stateKey] = 'saving'
      const formData = new FormData()
      formData.append(fieldName, value === null || value === undefined ? '' : String(value))
      await $fetch(`${apiBase.value}/member/${memberId}/update/`, { method: 'PATCH', body: formData })
      savingStates.value[stateKey] = 'saved'

      const mIdx = members.value.findIndex(m => m.id === memberId)
      if (mIdx !== -1) members.value[mIdx][fieldName] = value

      setTimeout(() => {
        delete savingStates.value[stateKey]
      }, 2000)
    } catch (error) {
      console.error(`Error updating ${fieldName}:`, error)
      savingStates.value[stateKey] = 'error'
    }
  }

  onMounted(async () => {
    await fetchMembers()
  })

  return {
    cleanImageUrl,
    members,
    selectedMember,
    showModal,
    showAddModal,
    savingStates,
    uploadingStates,
    fileInputs,
    addFileInput,
    searchQuery,
    roleFilter,
    addLoading,
    addSuccess,
    addError,
    addForm,
    isSaving,
    filteredMembers,
    openDetails,
    closeModal,
    isParticipantRole,
    toggleParticipantView,
    openAddModal,
    closeAddModal,
    submitAddMember,
    promoteParticipant,
    syncField,
    getRoleColor,
    triggerFileUpload,
    handleProfilePictureUpload,
  }
}
