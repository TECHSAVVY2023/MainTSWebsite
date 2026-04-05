<template>
    <div class="min-h-screen p-3">
        <div class="">
            <SuperAdminDashboardHeader />
            <SuperAdminDashboardContentFormAndList />
            <SuperAdminDashboardMembersList class="mb-20" v-if="user?.email === 'jorenleeluna24@gmail.com'" />
            <SuperAdminDashboardQuickActions :handleLogout="handleLogout" />
            <SuperAdminDashboardRecentActivity />
        </div>
        <Logout />
    </div>
</template>

<script setup>
definePageMeta({
    middleware: "auth",
});
const { user, setAuth } = useAuth()

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
