// @ts-ignore
import moment from 'moment'

export function useDashboardHeader () {
  const { user } = useAuth()

  const profileImage = ref<string | null>(null)
  const currentTime = ref('')
  const currentDate = ref('')
  const greeting = ref('')

  const userInitials = computed(() => {
    const name = user.value?.name || 'USER'
    const nameParts = String(name).split(' ').filter(Boolean)
    if (nameParts.length >= 2) {
      return `${nameParts[0]?.[0] || ''}${nameParts[1]?.[0] || ''}`.toUpperCase()
    }
    return String(name).substring(0, 2).toUpperCase()
  })

  function updateTime () {
    const now = moment()
    currentTime.value = now.format('hh:mm:ss A')
    currentDate.value = now.format('dddd, MMMM DD, YYYY')

    const hour = now.hour()
    if (hour < 12) greeting.value = 'Morning'
    else if (hour < 18) greeting.value = 'Afternoon'
    else greeting.value = 'Evening'
  }

  function handleImageError () {
    profileImage.value = null
  }

  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  watch(
    () => user.value?.image,
    (newImage) => {
      profileImage.value = newImage || null
    },
    { immediate: true },
  )

  return {
    user,
    profileImage,
    currentTime,
    currentDate,
    greeting,
    userInitials,
    handleImageError,
  }
}
