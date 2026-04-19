import {
  createEmptyMemberForm,
  createMemberRequest,
  formatMemberCreateError,
} from './useMemberFormUtils'

const TECH_SAVVY_LOGO_URL = 'https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png'
const WORKFLOW_LOGO_URL = 'https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png'

export function useMemberAdd () {
  const config = useRuntimeConfig()
  const apiBase = computed(() => String(config.public.apiBase || '').replace(/\/$/, ''))

  const loading = ref(false)
  const success = ref(false)
  const error = ref('')
  const fileInput = ref<HTMLInputElement | null>(null)
  const sparkles = ref<Array<{ left: string, top: string, animationDelay: string }>>([])
  const form = ref(createEmptyMemberForm())

  onMounted(() => {
    sparkles.value = Array.from({ length: 35 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 6}s`,
    }))
  })

  function resetForm () {
    form.value = createEmptyMemberForm()
    if (fileInput.value) fileInput.value.value = ''
  }

  async function submitForm () {
    loading.value = true
    success.value = false
    error.value = ''

    if (!apiBase.value) {
      error.value = 'NUXT_PUBLIC_API_BASE is not set. Add your API URL to .env.'
      loading.value = false
      return
    }

    try {
      await createMemberRequest(apiBase.value, form.value, fileInput.value?.files?.[0])
      success.value = true
      resetForm()
    } catch (err) {
      error.value = formatMemberCreateError(err)
    } finally {
      loading.value = false
    }
  }

  return {
    techSavvyLogo: TECH_SAVVY_LOGO_URL,
    workflowLogo: WORKFLOW_LOGO_URL,
    loading,
    success,
    error,
    fileInput,
    sparkles,
    form,
    submitForm,
  }
}
