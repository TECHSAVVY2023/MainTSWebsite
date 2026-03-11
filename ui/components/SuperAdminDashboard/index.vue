<template>
  <div
    class="min-h-screen bg-linear-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e] p-3"
  >
    <div class="">
      <SuperAdminDashboardHeader />
      <SuperAdminDashboardQuickActions :handleLogout="handleLogout" />
      <SuperAdminDashboardRecentActivity />
      <SuperAdminDashboardMembersList
        class="mb-20 hidden"
        v-if="user?.email === 'jorenleeluna24@gmail.com'"
      />
      <SuperAdminDashboardContentFormAndList />
    </div>
    <Logout />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

const { setAuth } = useAuth();

onMounted(() => {
  // Read token from URL if coming from OAuth callback
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");
  if (urlToken) {
    setAuth(urlToken);
    window.history.replaceState({}, "/login", "/dashboard");
  } else {
    const { init } = useAuth();
    init();
  }
});
</script>
