export default defineNuxtRouteMiddleware(async (to) => {
  const { user, isLoggedIn } = useAuth()
  const { fetchMyAcademyRole } = useAcademy()

  if (!isLoggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  if (user.value?.email) {
    const role = await fetchMyAcademyRole(user.value.email)
    if (!role.is_teacher && !role.is_admin) {
      return navigateTo('/academy')
    }
  }
})
