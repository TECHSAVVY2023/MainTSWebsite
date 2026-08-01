<template>
  <div 
    class="relative flex min-h-0 min-h-[100dvh] overflow-hidden bg-white font-[Roboto,sans-serif] text-[#1a0533] supports-[height:100dvh]:min-h-[100dvh]"
  >
    <template v-if="!showAllContent">
      <!-- ── Sidebar ────────────────────────────────────────────── -->
      <aside class="hidden lg:flex w-72 h-screen flex-col bg-white border-r border-violet-100 p-6 z-40 shrink-0">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-12 px-2 group cursor-pointer" @click="activeView = 'Hub'">
          <div class="w-12 h-12 flex items-center justify-center transition-all duration-300">
            <img :src="logoUrl" alt="Logo" class="h-8 w-auto object-contain" />
          </div>
          <span class="font-black text-2xl text-[#1a0533] uppercase tracking-tighter">TechSavvy</span>
        </div>

        <!-- Primary Action -->
        <button
          @click="handleNewContent"
          class="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-sm font-bold uppercase tracking-widest bg-emerald-500 text-white transition-all duration-300 mb-10 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
        >
          <i class="fas fa-star text-xs" /> Share Update
        </button>

        <!-- Navigation Menu -->
        <nav class="custom-scrollbar flex-1 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-slate-100 hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
          <p class="text-[11px] font-black text-[#1a0533]/50 uppercase tracking-[0.25em] px-4 mb-5">Community Center</p>
          <template v-for="item in navItems" :key="item.label">
            <template v-if="item.isCollapsible">
              <div class="space-y-1">
                <button
                  @click="item.action ? item.action() : null"
                  class="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group relative"
                  :class="item.active ? 'bg-violet-600 text-white shadow-xl' : 'text-[#1a0533]/60 hover:bg-violet-50 hover:text-violet-600'"
                >
                  <div class="flex min-w-0 flex-1 items-center gap-3.5">
                    <i :class="[item.icon, item.active ? 'text-white' : 'text-violet-600 group-hover:text-violet-700']" class="shrink-0 text-sm transition-colors" />
                    <span class="min-w-0 truncate text-left text-[13px] font-bold uppercase tracking-wider transition-colors">{{ item.label }}</span>
                  </div>
                  <i class="fas text-xs transition-transform duration-200" :class="[item.isExpanded ? 'fa-chevron-down' : 'fa-chevron-right', item.active ? 'text-white' : 'text-slate-400']" />
                </button>

                <div v-if="item.isExpanded" class="pl-4 space-y-1">
                  <button
                    v-for="subItem in item.subItems"
                    :key="subItem.tab"
                    @click="subItem.action()"
                    class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200"
                    :class="subItem.active ? 'bg-violet-100 text-violet-800 font-extrabold shadow-sm' : 'text-[#1a0533]/65 hover:bg-violet-50 hover:text-violet-700'"
                  >
                    <i :class="subItem.icon" class="text-xs text-violet-600 shrink-0" />
                    <span class="truncate">{{ subItem.label }}</span>
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <button
                @click="item.action ? item.action() : null"
                class="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group relative"
                :class="item.active ? 'bg-violet-600 text-white shadow-xl' : 'text-[#1a0533]/60 hover:bg-violet-50 hover:text-violet-600'"
              >
                <div class="flex min-w-0 flex-1 items-center gap-3.5">
                  <i :class="[item.icon, item.active ? 'text-white' : 'text-violet-600 group-hover:text-violet-700']" class="shrink-0 text-sm transition-colors" />
                  <span class="min-w-0 truncate text-left text-[13px] font-bold uppercase tracking-wider transition-colors">{{ item.label }}</span>
                  <span
                    v-if="item.badge != null && item.badge > 0"
                    class="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black tabular-nums"
                    :class="item.active ? 'bg-white/25 text-white' : 'bg-amber-500 text-white'"
                  >
                    {{ item.badge }}
                  </span>
                </div>
                <div v-if="item.active" class="absolute right-2 w-1.5 h-6 rounded-full bg-violet-600" />
              </button>
            </template>
          </template>
        </nav>

        <!-- Promo Card (Sidebar Bottom) -->
        <div class="mt-8 pt-8 border-t border-violet-100">
          <div class="bg-violet-50 border-2 border-violet-100 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
             <div class="w-16 h-16 bg-white border border-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <i class="fas fa-mobile-alt text-violet-600 text-2xl" />
             </div>
             <h4 class="text-[13px] font-black uppercase text-[#1a0533] mb-2 tracking-tight">Get Mobile App</h4>
             <p class="text-[10px] text-[#1a0533]/70 font-bold uppercase tracking-wide leading-relaxed mb-6  px-2">Experience the community on your device</p>
             <div class="flex justify-center gap-4">
                <i class="fab fa-apple text-green-600 text-xl hover:text-violet-600 cursor-pointer transition-all hover:scale-110" />
                <i class="fab fa-google-play text-green-600 text-xl hover:text-violet-600 cursor-pointer transition-all hover:scale-110" />
             </div>
          </div>
        </div>
      </aside>

      <!-- ── Main Content Area ──────────────────────────────────── -->
      <div class="relative z-10 flex h-[100dvh] max-h-[100dvh] min-h-0 flex-1 flex-col overflow-hidden bg-white lg:h-screen lg:max-h-none">
        
        <!-- Top Bar -->
        <header class="z-30 flex shrink-0 flex-wrap items-center gap-2 border-b border-violet-100 bg-white px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 lg:h-24 lg:flex-nowrap lg:px-8 xl:px-10">
          <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-4 lg:gap-8">
            <button
              type="button"
              @click="drawerOpen = true"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-transform lg:hidden"
              aria-label="Open menu"
            >
              <i class="fas fa-bars text-lg" />
            </button>
            <div class="group relative min-w-0 flex-1 lg:max-w-xl">
              <i class="fas fa-search pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm text-violet-600 group-focus-within:text-violet-800 sm:left-4 sm:text-base" />
              <input
                v-model="contentSearch"
                type="search"
                placeholder="Search highlights…"
                class="h-10 w-full rounded-xl border-2 border-violet-100 bg-white py-2 pl-9 pr-3 text-xs font-bold uppercase tracking-wider text-[#1a0533] outline-none transition-all placeholder:text-violet-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-600/5 sm:h-12 sm:pl-11 sm:pr-4 sm:text-sm sm:tracking-widest"
              />
            </div>
          </div>

          <div class="flex shrink-0 items-center gap-1 sm:gap-2 lg:ml-4 lg:gap-3">
            <div class="relative">
              <button
                type="button"
                class="relative flex h-9 w-9 items-center justify-center rounded-xl text-violet-600 transition-all hover:bg-violet-50 hover:text-violet-800 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                aria-label="Notifications"
                @click.stop="toggleNotificationsDropdown"
              >
                <i class="far fa-bell text-base sm:text-lg" />
                <span
                  v-if="unreadCount > 0"
                  class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white ring-2 ring-white"
                >
                  {{ unreadCount }}
                </span>
              </button>

              <!-- Notifications Dropdown Popover -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="showNotificationsDropdown"
                  class="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-violet-100 bg-white p-4 shadow-2xl ring-1 ring-violet-50"
                  @click.stop
                >
                  <div class="flex items-center justify-between border-b border-violet-50 pb-3 mb-3">
                    <div class="flex items-center gap-2">
                      <h4 class="text-xs font-black uppercase tracking-wider text-[#1a0533]">Notifications</h4>
                      <span class="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-black text-violet-700">{{ unreadCount }} New</span>
                    </div>
                    <button
                      type="button"
                      class="text-[10px] font-bold text-violet-600 hover:text-violet-900 transition-colors uppercase tracking-wider"
                      @click="markAllNotificationsAsRead"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div class="max-h-72 overflow-y-auto space-y-2 custom-scrollbar">
                    <div
                      v-for="notif in dynamicNotifications"
                      :key="notif.id"
                      class="flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer"
                      :class="notif.read ? 'bg-slate-50/50 hover:bg-slate-50' : 'bg-violet-50/60 border border-violet-100/60 hover:bg-violet-50'"
                      @click="markNotificationRead(notif)"
                    >
                      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="notif.bgClass">
                        <i :class="[notif.iconClass, 'text-xs']" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center justify-between gap-1">
                          <p class="text-[11px] font-bold text-[#1a0533] leading-snug truncate">{{ notif.title }}</p>
                          <span class="text-[8px] font-bold text-slate-400 whitespace-nowrap">{{ notif.time }}</span>
                        </div>
                        <p class="text-[10px] text-slate-500 leading-tight mt-0.5 line-clamp-2">{{ notif.message }}</p>
                      </div>
                    </div>
                    <div v-if="dynamicNotifications.length === 0" class="py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                      No notifications
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <div class="relative">
              <button
                type="button"
                class="hidden h-9 w-9 items-center justify-center rounded-xl text-violet-600 transition-all hover:bg-violet-50 hover:text-violet-800 sm:flex sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                aria-label="Settings"
                @click.stop="toggleSettingsDropdown"
              >
                <i class="fas fa-cog text-base sm:text-lg" :class="{ 'animate-spin-slow': showSettingsDropdown }" />
              </button>

              <!-- Settings Dropdown Popover -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 -translate-y-2"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 -translate-y-2"
              >
                <div
                  v-if="showSettingsDropdown"
                  class="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-violet-100 bg-white p-4 shadow-2xl ring-1 ring-violet-50"
                  @click.stop
                >
                  <div class="flex items-center justify-between border-b border-violet-50 pb-3 mb-3">
                    <div class="flex items-center gap-2">
                      <h4 class="text-xs font-black uppercase tracking-wider text-[#1a0533]">Platform Settings</h4>
                      <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700">Online</span>
                    </div>
                    <button
                      type="button"
                      class="text-violet-400 hover:text-violet-700 transition-colors"
                      @click="showSettingsDropdown = false"
                    >
                      <i class="fas fa-times text-xs" />
                    </button>
                  </div>

                  <div class="space-y-3">
                    <div class="space-y-1.5">
                      <span class="text-[9px] font-black uppercase tracking-widest text-slate-400 px-1">Quick Actions</span>
                      <button
                        type="button"
                        class="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-violet-50 text-left transition-colors text-xs font-bold text-[#1a0533] group"
                        @click="activeView = 'Profile'; showSettingsDropdown = false"
                      >
                        <span class="flex items-center gap-2">
                          <i class="fas fa-user-edit text-violet-600 group-hover:scale-110 transition-transform" />
                          Edit Account Profile
                        </span>
                        <i class="fas fa-chevron-right text-[10px] text-slate-400" />
                      </button>

                      <button
                        type="button"
                        class="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-violet-50 text-left transition-colors text-xs font-bold text-[#1a0533] group"
                        @click="refreshDashboardData"
                      >
                        <span class="flex items-center gap-2">
                          <i class="fas fa-sync-alt text-violet-600 group-hover:rotate-180 transition-transform duration-500" :class="{ 'animate-spin': isRefreshingData }" />
                          Refresh Vault Records
                        </span>
                        <span class="text-[9px] font-bold text-violet-600">{{ isRefreshingData ? 'Syncing...' : 'Sync' }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <button type="button" class="flex h-9 w-9 items-center justify-center rounded-xl text-violet-600 transition-all hover:bg-violet-50 hover:text-violet-800 sm:h-10 sm:w-10 lg:h-12 lg:w-12" aria-label="Log out" @click="handleLogout">
              <i class="fas fa-sign-out-alt text-base sm:text-lg" />
            </button>
            
            <div class="mx-1 hidden h-8 w-px bg-violet-100 sm:block" />
            
            <div class="flex min-w-0 cursor-pointer items-center gap-2 pl-1 sm:gap-3 sm:pl-2 group" @click="activeView = 'Profile'">
              <div class="relative shrink-0 transition-transform duration-300">
                <img v-if="profileImage" :src="profileImage" alt="Profile"
                  class="h-9 w-9 rounded-lg border border-violet-100 object-cover sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12"
                  @error="handleImageError" />
                <div v-else class="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 sm:h-10 sm:w-10 sm:rounded-xl lg:h-12 lg:w-12">
                  <span class="text-xs font-black text-white sm:text-sm">{{ userInitials }}</span>
                </div>
                <div class="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400 sm:-bottom-1 sm:-right-1 sm:h-4 sm:w-4 sm:border-[3px]" />
              </div>
              <div class="hidden min-w-0 max-w-[140px] md:block md:max-w-[200px] lg:max-w-xs">
                <div class="lg:mt-1">
                  <p class="truncate text-left text-xs font-black uppercase leading-tight text-[#1a0533] group-hover:text-violet-600 sm:text-sm">{{ user?.name || 'User' }}</p>
                  <p class="truncate text-[9px] font-bold tracking-widest text-slate-600 sm:text-[10px]">{{ user?.email || 'User' }}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content (Scrollable) -->
        <main class="custom-scrollbar relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-slate-100 hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent sm:p-6 lg:p-8 xl:p-12">
          
          <template v-if="activeView === 'Hub'">
            <!-- Hub / Overview -->
            <div class="space-y-8 sm:space-y-12 lg:space-y-16">
              <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
                <div class="min-w-0">
                  <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-600 px-3 py-1 sm:mb-6">
                    <span class="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span class="text-[9px] font-black uppercase tracking-widest text-white sm:text-[10px]">Season 4 Analytics</span>
                  </div>
                  <h1 class="text-3xl font-black uppercase leading-none tracking-tighter text-[#1a0533] sm:text-4xl md:text-5xl">
                    Stats <span class="text-violet-600">Overview</span>
                  </h1>
                </div>
                <div class="flex shrink-0 items-center rounded-2xl border border-violet-100 bg-violet-50 p-1.5">
                  <button type="button" class="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-[9px] font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-600/20 sm:h-11 sm:px-8 sm:text-[10px]">
                    <i class="fas fa-th-large" /> Grid View
                  </button>
                </div>
              </div>

              <!-- Flat Stats -->
              <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
                <div
                  v-for="(stat, idx) in statCards" :key="stat.label"
                  class="group relative min-w-0 cursor-pointer overflow-hidden rounded-2xl border border-violet-50 bg-white p-4 transition-colors duration-300 hover:border-violet-100 sm:rounded-3xl sm:p-6 lg:rounded-[2.5rem] lg:p-8"
                  :class="stat.borderClass"
                >
                  <div class="mb-4 flex items-center justify-between sm:mb-10">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl" :class="[stat.iconBg, stat.iconText, stat.iconBorder]">
                      <i :class="stat.icon" class="text-base sm:text-lg" />
                    </div>
                    <i class="fas fa-ellipsis-h shrink-0 text-sm text-violet-600 sm:text-base" />
                  </div>
                  <h3 class="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#1a0533] sm:mb-2 sm:text-2xl lg:text-3xl">{{ stat.value }}</h3>
                  <p class="break-words text-[8px] font-black uppercase leading-snug tracking-[0.2em] sm:text-[9px] sm:tracking-[0.25em] lg:text-[10px] lg:tracking-[0.3em]" :class="stat.labelText">{{ stat.label }}</p>
                </div>
              </div>

              <!-- Charts Removed as per request -->
            </div>
          </template>

          <template v-else-if="activeView === 'Profile'">
            <div class="relative mx-auto mb-8 w-full max-w-6xl space-y-6 sm:mb-12 sm:space-y-10">
               
               <!-- LOADING STATE -->
               <div v-if="loadingMember || profileRedirectPending" class="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-violet-100 bg-white p-8 text-center sm:min-h-[50vh] sm:rounded-[3rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                  <div class="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin mb-6"></div>
                  <h3 class="text-xs font-black uppercase text-violet-800 tracking-[0.3em]">
                    {{ profileRedirectPending ? 'Redirecting…' : 'Syncing Member Data...' }}
                  </h3>
               </div>

               <!-- ERROR STATE (API failure only — not “redirecting to login”) -->
               <div v-else-if="memberError" class="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-8 text-center sm:min-h-[50vh] sm:rounded-[3rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                  <i class="fas fa-exclamation-circle text-red-400 text-4xl mb-4"></i>
                  <h3 class="text-[13px] font-black uppercase text-red-500 tracking-wider">Member Details Unavailable</h3>
                  <p v-if="memberErrorMessage" class="max-w-md text-xs font-medium text-red-600/90 leading-relaxed">
                    {{ memberErrorMessage }}
                  </p>
               </div>

               <!-- Signed in with Google but no row in members API yet -->
               <div v-else-if="memberDirectoryMiss" class="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-8 text-center sm:min-h-[50vh] sm:rounded-[3rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                  <i class="fas fa-user-clock text-amber-500 text-4xl mb-2"></i>
                  <h3 class="text-[13px] font-black uppercase text-amber-800 tracking-wider">You’re signed in</h3>
                  <p class="max-w-md text-xs font-medium text-amber-900/80 leading-relaxed">
                    <span class="font-bold">{{ user?.email }}</span> is not in the community member list yet. <br>
                    You are currently browsing as a <span class="font-black text-amber-900">Guest Account</span>.
                  </p>
                  <p class="max-w-full text-xs font-medium text-amber-900/80 leading-relaxed">
                    Visit <a href="https://www.techsavvies.space/membership" target="_blank" rel="noopener noreferrer" 
                    class="font-black text-violet-700 cursor-pointer">www.techsavvies.space/membership</a> to become a member, or ask an admin to add your account.
                  </p>
               </div>

               <!-- Participant Role Signed In (Restricted from Super Admin Dashboard) -->
               <div v-else-if="isParticipantAccessDenied" class="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-2xl border border-sky-100 bg-sky-50 p-8 text-center sm:min-h-[50vh] sm:rounded-[3rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                  <div class="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200 bg-white text-sky-600 shadow-sm mb-2">
                    <i class="fas fa-user-shield text-3xl"></i>
                  </div>
                  <h3 class="text-[13px] font-black uppercase text-sky-900 tracking-wider">Participant Account Notice</h3>
                  <p class="max-w-md text-xs font-medium text-sky-900/80 leading-relaxed">
                    <span class="font-bold">{{ user?.email }}</span> is registered with the <span class="font-black text-sky-900">Participant</span> role.<br>
                    Administrative controls on the Super Admin Dashboard are restricted to Core Members, Mentors, and Administrators.
                  </p>
                  <div class="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <NuxtLink to="/" class="inline-flex h-10 items-center justify-center rounded-xl bg-sky-600 px-5 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-sky-700 transition-all">
                      Back to Main Site
                    </NuxtLink>
                    <button type="button" @click="confirmLogout" class="inline-flex h-10 items-center justify-center rounded-xl border border-sky-200 bg-white px-5 text-xs font-black uppercase tracking-wider text-sky-700 hover:bg-sky-100/50 transition-all">
                      Sign Out
                    </button>
                  </div>
               </div>

               <!-- PROFILE CONTENT -->
               <div v-else-if="member" class="space-y-8">
                 
                 <!-- TOP CARD: Identity & Quick Stats -->
                 <div class="group relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 sm:gap-8 sm:rounded-3xl sm:p-8 lg:flex-row lg:items-start lg:gap-7 lg:rounded-[3.5rem] lg:p-10 xl:p-14">
                    <div class="absolute -top-40 -right-40 w-96 h-96 bg-violet-50 rounded-full blur-3xl opacity-60 z-0 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>
                    
                    <!-- Portrait -->
                     <div class="perspective relative z-10 h-40 w-40 shrink-0 sm:h-48 sm:w-48 lg:h-56 lg:w-56">
                       <div class="relative w-full h-full mx-auto transition-transform duration-500 transform-style-3d group-hover:rotate-y-180 cursor-pointer">
                         <div class="absolute w-full h-full backface-hidden rounded-[2.5rem] border-[6px] border-white shadow-[0_20px_40px_-15px_rgba(124,58,237,0.15)] ring-1 ring-violet-50 overflow-hidden bg-violet-50 flex items-center justify-center">
                           <img v-if="displayProfileImage" :src="displayProfileImage" class="h-full w-full object-cover object-[50%_35%] rounded-[2rem]" alt="Profile picture" />
                           <div v-else class="h-full w-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center rounded-[2rem]">
                             <span class="text-4xl sm:text-5xl font-black text-white tracking-widest">{{ userInitials }}</span>
                           </div>
                         </div>
                       </div>
                     </div>

                    <!-- Main Info -->
                    <div class="relative z-10 w-full flex-1 py-2 text-center lg:text-left">
                       <div class="mb-4 gap-4 lg:items-center">
                         <h1 class="break-words text-2xl font-black uppercase leading-tight tracking-tighter text-[#1a0533] sm:text-3xl md:text-4xl lg:text-5xl">
                           <template v-if="profileDisplayLast && (profileDisplayRest || profileDisplayLast)">
                             <span v-if="profileDisplayRest">{{ profileDisplayRest }}</span>
                             <span class="text-violet-600" :class="profileDisplayRest ? 'ml-2 sm:ml-2.5' : ''">{{ profileDisplayLast }}</span>
                           </template>
                           <template v-else>{{ fullName || 'No Name Provided' }}</template>
                         </h1>
                       </div>
                       
                       <p class="mb-6 break-all text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 sm:mb-8 sm:text-[11px] sm:tracking-[0.3em]">{{ member.email }}</p>

                       <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-3">
                             <i class="fas fa-star text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Credit Points</span>
                               <span class="text-[14px] font-black leading-tight">{{ totalPoints }}</span>
                             </div>
                          </div>
                          
                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 flex items-center gap-3">
                             <i class="fas fa-id-card text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Community ID</span>
                               <span class="text-[14px] font-black leading-tight">{{ member.idNumber || 'N/A' }}</span>
                             </div>
                          </div>

                          <div class="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center gap-3">
                             <i class="fas fa-calendar-alt text-sm w-4 text-center"></i>
                             <div class="flex flex-col text-left">
                               <span class="text-[8px] font-black uppercase tracking-widest leading-none opacity-80 mb-0.5">Member Since</span>
                               <span class="text-[14px] font-black leading-tight">{{ memberSinceYear }}</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- TWO-COL GRID FOR DETAILS -->
                 <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    
                    <!-- Contact & Web -->
                    <div class="group relative overflow-hidden rounded-2xl border border-violet-100 p-4 sm:rounded-3xl sm:p-8 lg:rounded-[3rem] lg:p-10">
                       <div class="mb-5 flex items-center justify-between sm:mb-8">
                          <h4 class="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#1a0533] sm:gap-3 sm:text-xs">
                             <i class="fas fa-address-book text-violet-600"></i> Contact Details
                          </h4>
                          <button type="button" @click="openEditProfileModal" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-violet-200 bg-violet-50 text-[10px] font-black uppercase tracking-wider text-violet-800 hover:bg-violet-600 hover:text-white transition-all shadow-xs">
                             <i class="fas fa-edit text-xs"></i> Edit Contact Details
                          </button>
                       </div>
                       
                       <div class="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-3">
                          <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                            <span class="shrink-0 text-[8px] font-black uppercase tracking-widest text-violet-900 sm:text-[10px]">Birthdate</span>
                            <input v-model="member.birthdate" class="w-full min-w-0 cursor-help border-0 bg-transparent text-left text-[12px] font-bold text-[#1a0533] outline-none sm:text-[13px] lg:w-1/2 lg:text-right" @mouseenter="hover.birthdate = true" @mouseleave="hover.birthdate = false" />
                          </div>
                          <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                            <span class="shrink-0 text-[8px] font-black uppercase tracking-widest text-violet-900 sm:text-[10px]">Mobile Number</span>
                            <input v-model="member.mobile" class="w-full min-w-0 cursor-help border-0 bg-transparent text-left text-[12px] font-bold text-[#1a0533] outline-none sm:text-[13px] lg:w-1/2 lg:text-right" @mouseenter="hover.mobile = true" @mouseleave="hover.mobile = false" />
                          </div>
                          <div class="group/item col-span-2 flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4 lg:col-span-1 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                            <span class="shrink-0 text-[8px] font-black uppercase tracking-widest text-violet-900 sm:text-[10px]">Primary Email</span>
                            <input v-model="member.email" class="w-full min-w-0 cursor-help break-all border-0 bg-transparent text-left text-[11px] font-bold text-[#1a0533] outline-none sm:text-[13px] lg:w-1/2 lg:text-right" @mouseenter="hover.email = true" @mouseleave="hover.email = false" />
                          </div>
                          <div class="group/item col-span-2 flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4 lg:col-span-1 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
                            <span class="shrink-0 text-[8px] font-black uppercase tracking-widest text-violet-900 sm:text-[10px]">Website</span>
                            <span class="min-w-0 cursor-pointer break-all text-left text-[12px] font-bold text-violet-600 hover:underline sm:text-[13px] lg:max-w-[50%] lg:pl-4 lg:text-right">{{ member.website || '--' }}</span>
                          </div>
                       </div>
                    </div>

                    <!-- Earnings & Achievements -->
                    <div class="relative rounded-2xl border border-green-100 p-4 sm:rounded-3xl sm:p-8 lg:rounded-[3rem] lg:p-10">
                       <h4 class="mb-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#1a0533] sm:mb-8 sm:gap-3 sm:text-xs"><i class="fas fa-trophy text-violet-600"></i> Credit Points</h4>

                       <div class="relative z-10 grid grid-cols-2 gap-2 sm:gap-3">
                          <template v-if="!member.role?.includes('Founder') || member.role?.includes('Co-Founder')">
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Project Points</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-2xl">PHP {{ member.gcashPoints || 0 }}</span>
                            </div>
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Honorariums</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-2xl">PHP {{ member.honorariumPoints || 0 }}</span>
                            </div>
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Annual Bonus</span>
                               <span class="text-lg font-black tabular-nums text-green-500 sm:text-2xl">$ {{ member.bonusPoints || 0 }}</span>
                            </div>
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Projects</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-xl md:text-2xl">{{ member.numberOfProjects || 0 }}</span>
                            </div>
                            <div class="group/item col-span-2 flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Vouchers</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-xl">{{ member.voucherPoints || 0 }}</span>
                            </div>
                          </template>

                          <template v-else>
                            <div class="col-span-2 rounded-xl border border-green-100 bg-green-100 p-4 text-left shadow-sm sm:rounded-2xl sm:p-6">
                               <p class="mb-2 flex items-center justify-start gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-green-700 sm:mb-3 sm:text-[10px]"><i class="fas fa-users shrink-0"></i> Community Role</p>
                               <p class="text-xs font-black uppercase leading-snug tracking-wide text-green-900 sm:text-sm">President & Share Holder (75%)</p>
                            </div>
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Team Assets</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-xl">25%</span>
                            </div>
                            <div class="group/item flex min-w-0 flex-col gap-1 rounded-xl border border-transparent bg-white p-3 text-left transition-colors hover:border-violet-100 sm:rounded-2xl sm:p-4">
                               <span class="text-[8px] font-black uppercase leading-tight tracking-widest text-violet-900 sm:text-[10px]">Partners</span>
                               <span class="text-lg font-black tabular-nums text-[#1a0533] sm:text-xl">3</span>
                            </div>
                          </template>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Library'">
            <!-- CMS Table (Library Feed) -->
            <div class="space-y-4 sm:space-y-8">
               <div class="flex flex-col gap-4 px-0 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-2">
                 <div class="min-w-0">
                   <h1 class="text-2xl font-black uppercase leading-tight tracking-tighter text-[#1a0533] sm:text-3xl md:text-4xl">
                     Library <span class="text-violet-600">feed</span>
                   </h1>
                   <p class="mt-2 max-w-xl text-[10px] font-bold uppercase tracking-widest text-slate-600">Your community highlights — create, edit, approve, or remove published library posts.</p>
                 </div>
                 <button type="button" @click="handleNewContent" class="w-full shrink-0 rounded-xl border border-violet-200 bg-violet-600 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-700 sm:w-auto sm:px-4 sm:py-2.5">+ New Highlight</button>
              </div>
              <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white sm:rounded-3xl lg:rounded-[3rem]">
                <!-- Empty State -->
                <div v-if="recentContentItems.length === 0" class="py-16 text-center px-4">
                  <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-8 ring-violet-50/50 mb-4">
                    <i class="fas fa-newspaper text-2xl" />
                  </div>
                  <h3 class="text-sm font-black uppercase tracking-wider text-[#1a0533]">No Library Highlights Found</h3>
                  <p class="mt-1 text-xs font-bold text-slate-500 max-w-sm mx-auto">
                    {{ contentSearch ? 'No library posts match your search query.' : 'There are no highlights available in the library feed yet.' }}
                  </p>
                  <button
                    type="button"
                    class="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-violet-600/20 hover:bg-violet-700 transition-all"
                    @click="handleNewContent"
                  >
                    <i class="fas fa-plus" />
                    Create First Highlight
                  </button>
                </div>

                <template v-else>
                  <!-- Narrow screens: stacked cards (no horizontal scroll) -->
                  <ul class="divide-y divide-violet-50 md:hidden" role="list">
                    <li
                      v-for="item in recentContentItems"
                      :key="'m-' + item.id"
                      class="p-4"
                    >
                      <div class="flex items-start justify-between gap-3">
                        <div class="min-w-0 flex-1">
                          <p class="break-words text-xs font-black uppercase leading-snug text-[#1a0533]">
                            {{ item.title }}
                          </p>
                          <p v-if="item.authors" class="text-[10px] font-bold text-slate-400 mt-0.5 truncate">
                            By {{ item.authors }}
                          </p>
                          <p class="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                            {{ formatItemDate(item.created_at) }}
                          </p>
                        </div>
                        <div class="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-violet-600 transition-colors hover:bg-violet-100 hover:text-violet-900 active:bg-violet-100"
                            aria-label="Edit"
                            @click="handleEdit(item)"
                          >
                            <i class="fas fa-edit" />
                          </button>
                          <button
                            type="button"
                            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-violet-600 transition-colors hover:bg-red-50 hover:text-red-600 active:bg-red-50"
                            aria-label="Delete"
                            @click="handleDelete(item.id)"
                          >
                            <i class="fas fa-trash-alt" />
                          </button>
                        </div>
                      </div>
                      <div class="mt-3 flex items-center gap-2">
                        <span class="inline-block rounded-lg border border-violet-200 bg-violet-50 px-2 py-0.5 text-[9px] font-black uppercase text-violet-900">{{ getPrimaryCategory(item.filters) }}</span>
                        <span
                          class="inline-block rounded-lg px-2 py-0.5 text-[9px] font-black uppercase"
                          :class="{
                            'bg-emerald-100 text-emerald-700 border border-emerald-200': (item.approval_status || 'approved').toLowerCase() === 'approved',
                            'bg-amber-100 text-amber-700 border border-amber-200': (item.approval_status || '').toLowerCase() === 'pending',
                            'bg-rose-100 text-rose-700 border border-rose-200': (item.approval_status || '').toLowerCase() === 'rejected'
                          }"
                        >
                          {{ item.approval_status || 'Approved' }}
                        </span>
                      </div>
                    </li>
                  </ul>

                  <!-- md+: table fits width -->
                  <div class="hidden md:block">
                    <table class="w-full table-fixed border-collapse text-left">
                      <colgroup>
                        <col class="w-[30%]">
                        <col class="w-[20%]">
                        <col class="w-[18%]">
                        <col class="w-[18%]">
                        <col class="w-[14%]">
                      </colgroup>
                      <thead class="border-b border-violet-200 bg-violet-100">
                        <tr>
                          <th class="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-8 lg:py-5">Topic</th>
                          <th class="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-6">Category</th>
                          <th class="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-6">Status</th>
                          <th class="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-6">Modified</th>
                          <th class="px-3 py-4 pr-6 text-right text-[10px] font-black uppercase tracking-widest text-violet-900 lg:pr-10">Manage</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-violet-50">
                        <tr v-for="item in recentContentItems" :key="item.id" class="group transition-colors hover:bg-violet-50/50">
                          <td class="px-4 py-4 align-top lg:px-8 lg:py-5">
                            <span class="block break-words text-sm font-black uppercase text-[#1a0533] transition-colors group-hover:text-violet-600">{{ item.title }}</span>
                            <span v-if="item.authors" class="block text-[10px] font-bold text-slate-400 mt-0.5 truncate">By {{ item.authors }}</span>
                          </td>
                          <td class="px-3 py-4 align-top lg:px-6 lg:py-5">
                            <span class="inline-block break-words rounded-xl border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-black uppercase leading-snug text-violet-900">{{ getPrimaryCategory(item.filters) }}</span>
                          </td>
                          <td class="px-3 py-4 align-top lg:px-6 lg:py-5">
                            <span
                              class="inline-block break-words rounded-xl px-2 py-1 text-[10px] font-black uppercase leading-snug"
                              :class="{
                                'bg-emerald-100 text-emerald-700 border border-emerald-200': (item.approval_status || 'approved').toLowerCase() === 'approved',
                                'bg-amber-100 text-amber-700 border border-amber-200': (item.approval_status || '').toLowerCase() === 'pending',
                                'bg-rose-100 text-rose-700 border border-rose-200': (item.approval_status || '').toLowerCase() === 'rejected'
                              }"
                            >
                              {{ item.approval_status || 'Approved' }}
                            </span>
                          </td>
                          <td class="break-words px-3 py-4 align-top text-[10px] font-bold uppercase leading-snug text-slate-600 lg:px-6 lg:py-5 lg:text-[11px]">
                            {{ formatItemDate(item.created_at) }}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 pr-6 text-right align-middle lg:pr-10">
                            <button type="button" class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-violet-600 transition-colors hover:bg-violet-100 hover:text-violet-900" aria-label="Edit" @click="handleEdit(item)"><i class="fas fa-edit" /></button>
                            <button type="button" class="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-violet-600 transition-colors hover:bg-red-50 hover:text-red-600 lg:ml-2" aria-label="Delete" @click="handleDelete(item.id)"><i class="fas fa-trash-alt" /></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Reviews'">
            <div class="space-y-4 sm:space-y-8">
              <div class="flex flex-col gap-4 px-0 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-2">
                <div class="min-w-0">
                  <h1 class="text-2xl font-black uppercase leading-tight tracking-tighter text-[#1a0533] sm:text-3xl md:text-4xl">
                    Review <span class="text-violet-600">uploads</span>
                  </h1>
                  <p class="mt-2 max-w-xl text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Pending highlights from members (non–super-admin authors). Approve to publish or reject to send back.
                  </p>
                </div>
                <div class="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2">
                  <span class="text-2xl font-black tabular-nums text-amber-900">{{ pendingMemberSubmissions.length }}</span>
                  <span class="text-[9px] font-black uppercase tracking-widest text-amber-800">Awaiting review</span>
                </div>
              </div>

              <div v-if="pendingMemberSubmissions.length === 0" class="rounded-2xl border border-violet-100 bg-violet-50/50 p-10 text-center sm:rounded-3xl">
                <i class="fas fa-check-circle mb-3 text-3xl text-violet-500" aria-hidden="true" />
                <p class="text-sm font-bold text-violet-900">No pending member uploads.</p>
                <p class="mt-1 text-xs font-medium text-violet-700/80">New submissions will appear here.</p>
              </div>

              <div v-else class="overflow-hidden rounded-2xl border border-violet-100 bg-white sm:rounded-3xl lg:rounded-[3rem]">
                <ul class="divide-y divide-violet-50 md:hidden" role="list">
                  <li
                    v-for="item in pendingMemberSubmissions"
                    :key="'rev-m-' + item.id"
                    class="cursor-pointer rounded-xl p-4 transition-colors hover:bg-violet-50/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                    role="button"
                    tabindex="0"
                    @click="openReviewDetail(item)"
                    @keyup.enter="openReviewDetail(item)"
                  >
                    <p class="break-words text-xs font-black uppercase leading-snug text-[#1a0533]">
                      {{ item.title }}
                    </p>
                    <p class="mt-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                      {{ formatItemDate(item.created_at) }}
                    </p>
                    <p class="mt-2 break-all text-[10px] font-medium text-slate-600">
                      <span class="font-black text-violet-700">Authors:</span> {{ item.authors || '—' }}
                    </p>
                    <p class="mt-1 break-words text-[10px] font-black uppercase text-violet-900">
                      {{ getPrimaryCategory(item.filters) }}
                    </p>
                    <div class="mt-3 flex flex-wrap gap-2" @click.stop>
                      <button
                        type="button"
                        class="rounded-lg bg-emerald-600 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white"
                        @click="approveMemberSubmission(item.id)"
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-red-800"
                        @click="rejectMemberSubmission(item.id)"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        class="rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-[9px] font-black uppercase tracking-widest text-violet-800"
                        @click="handleEdit(item)"
                      >
                        Open editor
                      </button>
                    </div>
                    <p class="mt-2 text-[9px] font-bold uppercase tracking-widest text-violet-500">
                      Tap row for full details
                    </p>
                  </li>
                </ul>
                <div class="hidden md:block">
                  <table class="w-full table-fixed border-collapse text-left">
                    <colgroup>
                      <col class="w-[28%]">
                      <col class="w-[22%]">
                      <col class="w-[18%]">
                      <col class="w-[32%]">
                    </colgroup>
                    <thead class="border-b border-violet-200 bg-violet-100">
                      <tr>
                        <th class="px-4 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-8">Topic</th>
                        <th class="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900">Authors</th>
                        <th class="px-3 py-4 text-left text-[10px] font-black uppercase tracking-widest text-violet-900">Category</th>
                        <th class="px-3 py-4 pr-6 text-right text-[10px] font-black uppercase tracking-widest text-violet-900 lg:pr-10">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-violet-50">
                      <tr
                        v-for="item in pendingMemberSubmissions"
                        :key="'rev-' + item.id"
                        class="cursor-pointer transition-colors hover:bg-violet-50/50"
                        @click="openReviewDetail(item)"
                      >
                        <td class="px-4 py-4 align-top lg:px-8">
                          <span class="block break-words text-sm font-black uppercase text-[#1a0533]">{{ item.title }}</span>
                          <span class="mt-1 block text-[9px] font-bold uppercase text-slate-500">{{ formatItemDate(item.created_at) }}</span>
                          <span class="mt-1 block text-[8px] font-bold uppercase tracking-widest text-violet-400">View details</span>
                        </td>
                        <td class="break-words px-3 py-4 align-top text-[10px] font-medium text-slate-700">
                          {{ item.authors || '—' }}
                        </td>
                        <td class="px-3 py-4 align-top">
                          <span class="inline-block break-words rounded-lg border border-violet-200 bg-violet-50 px-2 py-1 text-[10px] font-black uppercase text-violet-900">{{ getPrimaryCategory(item.filters) }}</span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 pr-6 text-right align-middle lg:pr-10" @click.stop>
                          <button type="button" class="rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[9px] font-black uppercase text-white" @click="approveMemberSubmission(item.id)">Approve</button>
                          <button type="button" class="ml-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[9px] font-black uppercase text-red-800" @click="rejectMemberSubmission(item.id)">Reject</button>
                          <button type="button" class="ml-1 rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-[9px] font-black uppercase text-violet-800" @click="handleEdit(item)">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Drive'">
            <div class="space-y-6 sm:space-y-10">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div class="min-w-0">
                  <h1 class="text-2xl font-black uppercase leading-tight tracking-tighter text-[#1a0533] sm:text-3xl md:text-4xl">
                    My <span class="text-violet-600">Drive</span>
                  </h1>
                  <p class="mt-2 max-w-xl text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Cloud storage with folders, uploads, and file management.
                  </p>
                </div>
                <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <button
                    type="button"
                    class="w-full rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-violet-700 hover:bg-violet-50 sm:w-auto sm:text-[10px]"
                    @click="toggleDriveFolderForm"
                  >
                    {{ showCreateFolderForm ? 'Cancel' : 'New Folder' }}
                  </button>
                  <button
                    type="button"
                    class="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700 sm:w-auto sm:text-[10px]"
                    :disabled="driveUploading || !currentUserEmail"
                    @click="triggerDriveUpload"
                  >
                    {{ driveUploading ? 'Uploading...' : 'Upload Asset' }}
                  </button>
                </div>
              </div>

              <input
                ref="driveFileInput"
                type="file"
                multiple
                class="hidden"
                @change="handleDriveUpload"
              >

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-3">
                <input
                  v-model="driveSearch"
                  type="search"
                  placeholder="Search files..."
                  class="h-11 rounded-xl border border-violet-100 bg-white px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300"
                >
                <select
                  v-model="selectedFolderFilter"
                  class="h-11 rounded-xl border border-violet-100 bg-white px-3 text-xs font-bold uppercase tracking-wider text-[#1a0533] outline-none transition-colors focus:border-violet-300"
                >
                  <option value="">All folders</option>
                  <option v-for="folder in driveFolders" :key="`sel-${folder.id}`" :value="String(folder.id)">
                    {{ folder.name }}
                  </option>
                </select>
                <select
                  v-model="driveSort"
                  class="h-11 rounded-xl border border-violet-100 bg-white px-3 text-xs font-bold uppercase tracking-wider text-[#1a0533] outline-none transition-colors focus:border-violet-300"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="name">Name A-Z</option>
                </select>
                <select
                  v-model="driveViewMode"
                  class="h-11 rounded-xl border border-violet-100 bg-white px-3 text-xs font-bold uppercase tracking-wider text-[#1a0533] outline-none transition-colors focus:border-violet-300"
                >
                  <option value="grid">Grid view</option>
                  <option value="list">List view</option>
                  <option value="compact">Compact view</option>
                </select>
              </div>

              <div v-if="showCreateFolderForm" class="rounded-2xl border border-violet-100 bg-white p-4 sm:p-5">
                <div class="flex flex-col gap-2 sm:flex-row">
                  <input
                    v-model="newFolderName"
                    type="text"
                    maxlength="120"
                    placeholder="Folder name"
                    class="h-11 flex-1 rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                    @keyup.enter="createDriveFolder"
                  >
                  <button
                    type="button"
                    class="h-11 rounded-xl bg-violet-600 px-5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-violet-700"
                    :disabled="driveLoading || !newFolderName.trim()"
                    @click="createDriveFolder"
                  >
                    Create
                  </button>
                </div>
              </div>

              <p v-if="driveError" class="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                {{ driveError }}
              </p>

              <div class="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                <button
                  type="button"
                  class="group rounded-2xl border p-4 text-left transition-colors"
                  :class="selectedFolderFilter === '' ? 'border-violet-300 bg-violet-50' : 'border-violet-100 bg-white hover:bg-violet-50'"
                  @click="selectedFolderFilter = ''"
                >
                  <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600">
                    <i class="fas fa-layer-group" />
                  </div>
                  <p class="text-xs font-black uppercase text-[#1a0533]">All Files</p>
                  <p class="mt-1 text-[10px] font-bold uppercase text-violet-600">{{ driveFiles.length }} items</p>
                </button>
                <button
                  v-for="folder in driveFolders"
                  :key="folder.id"
                  type="button"
                  class="group rounded-2xl border p-4 text-left transition-colors"
                  :class="selectedFolderFilter === String(folder.id) ? 'border-violet-300 bg-violet-50' : 'border-violet-100 bg-white hover:bg-violet-50'"
                  @click="selectedFolderFilter = String(folder.id)"
                >
                  <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <i class="fas fa-folder" />
                  </div>
                  <p class="truncate text-xs font-black uppercase text-[#1a0533]">{{ folder.name }}</p>
                  <p class="mt-1 text-[10px] font-bold uppercase text-violet-600">{{ folder.files_count || 0 }} items</p>
                </button>
              </div>

              <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 sm:p-6 lg:p-8">
                <h4 class="mb-4 text-[10px] font-black uppercase text-[#1a0533] sm:text-xs">Files</h4>
                <div v-if="filteredDriveFiles.length === 0" class="rounded-xl border border-dashed border-violet-200 bg-violet-50/50 px-4 py-8 text-center text-xs font-bold uppercase tracking-widest text-violet-600">
                  No files yet
                </div>
                <div v-else-if="driveViewMode === 'grid'" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  <div
                    v-for="file in filteredDriveFiles"
                    :key="file.id"
                    class="rounded-2xl border border-violet-100 bg-violet-50/40 p-3"
                  >
                    <a
                      :href="file.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mb-3 flex aspect-square items-center justify-center rounded-xl border border-violet-100 bg-white text-violet-600"
                    >
                      <img v-if="isImageDriveFile(file)" :src="file.url" :alt="file.original_name" class="h-full w-full rounded-xl object-cover">
                      <i v-else class="fas fa-file-alt text-2xl" />
                    </a>
                    <p class="truncate text-[10px] font-black uppercase text-[#1a0533]">{{ file.original_name }}</p>
                    <p class="mt-1 text-[9px] font-bold uppercase text-violet-600">{{ formatDriveSize(file.size_bytes) }}</p>
                    <div class="mt-3 flex items-center gap-2">
                      <a
                        :href="file.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex flex-1 items-center justify-center rounded-lg bg-white px-2 py-1.5 text-[9px] font-black uppercase tracking-widest text-violet-700"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        class="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600"
                        @click="deleteDriveFile(file.id)"
                      >
                        <i class="fas fa-trash text-[10px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else-if="driveViewMode === 'list'" class="divide-y divide-violet-100 rounded-xl border border-violet-100">
                  <div
                    v-for="file in filteredDriveFiles"
                    :key="`list-${file.id}`"
                    class="flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
                  >
                    <div class="flex min-w-0 flex-1 items-center gap-3">
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600">
                        <img v-if="isImageDriveFile(file)" :src="file.url" :alt="file.original_name" class="h-full w-full rounded-xl object-cover">
                        <i v-else class="fas fa-file-alt text-sm" />
                      </div>
                      <div class="min-w-0">
                        <p class="truncate text-xs font-black uppercase text-[#1a0533]">{{ file.original_name }}</p>
                        <p class="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-600">
                          {{ file.folder_name || 'Unsorted' }} · {{ formatDriveSize(file.size_bytes) }} · {{ formatDriveDate(file.created_at) }}
                        </p>
                      </div>
                    </div>
                    <div class="flex shrink-0 items-center gap-2">
                      <a
                        :href="file.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-8 items-center justify-center rounded-lg bg-violet-50 px-3 text-[9px] font-black uppercase tracking-widest text-violet-700"
                      >
                        Open
                      </a>
                      <button
                        type="button"
                        class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600"
                        @click="deleteDriveFile(file.id)"
                      >
                        <i class="fas fa-trash text-[10px]" />
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="file in filteredDriveFiles"
                    :key="`compact-${file.id}`"
                    class="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/30 px-3 py-2"
                  >
                    <i class="fas fa-file text-violet-500 text-xs" />
                    <a :href="file.url" target="_blank" rel="noopener noreferrer" class="min-w-0 flex-1 truncate text-[11px] font-bold text-[#1a0533] hover:underline">
                      {{ file.original_name }}
                    </a>
                    <span class="text-[10px] font-bold uppercase text-violet-600">{{ formatDriveSize(file.size_bytes) }}</span>
                    <button
                      type="button"
                      class="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600"
                      @click="deleteDriveFile(file.id)"
                    >
                      <i class="fas fa-trash text-[9px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeView === 'Directory'">
            <!-- Member Directory -->
            <div class="space-y-4 sm:space-y-8">
               <div class="px-0 sm:px-2">
                 <h2 class="text-[10px] font-black uppercase leading-snug tracking-[0.25em] text-violet-900 sm:text-xs sm:tracking-[0.3em]">{{ isSuperAdmin(user?.email) ? 'Global Member directory' : 'Community Members' }}</h2>
              </div>
              <div class="overflow-hidden rounded-2xl border border-violet-100 bg-white p-3 sm:rounded-3xl sm:p-4 lg:rounded-[3rem] lg:p-10">
                <SuperAdminDashboardMembersList :isAdmin="isSuperAdmin(user?.email)" />
              </div>
            </div>
          </template>

          <template v-else-if="activeView === 'MainPageCMS'">
            <SuperAdminDashboardMainPageCmsManager
              :user-role="member?.role || 'Member'"
              :is-super-admin="isSuperAdmin(user?.email)"
              :initial-tab="mainPageCmsTab"
            />
          </template>

          <template v-else-if="activeView === 'Stats'">
            <div class="space-y-6 sm:space-y-8">
              <div class="px-0 sm:px-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div class="min-w-0">
                  <h1 class="text-2xl font-black uppercase leading-tight tracking-tighter text-[#1a0533] sm:text-3xl md:text-4xl">
                    Community <span class="text-violet-600">Stats & Analytics</span>
                  </h1>
                  <p class="mt-2 max-w-xl text-[10px] font-bold uppercase tracking-widest text-slate-600">
                    Live performance overview, role distributions, content metrics, and platform health.
                  </p>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-violet-800 transition-colors hover:bg-violet-100 shrink-0"
                  @click="refreshDashboardData"
                >
                  <i class="fas fa-sync-alt text-xs" :class="{ 'animate-spin': isRefreshingData }" />
                  Refresh Analytics
                </button>
              </div>

              <!-- 4 Key Top Metric Cards -->
              <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
                <div class="group relative min-w-0 cursor-default overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 sm:rounded-3xl sm:p-6 lg:rounded-[2.5rem] lg:p-8 hover:border-emerald-200 transition-all shadow-xs">
                  <div class="mb-4 flex items-center justify-between sm:mb-8">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-transform sm:h-12 sm:w-12 sm:rounded-2xl">
                      <i class="fas fa-users text-base sm:text-lg" />
                    </div>
                    <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black text-emerald-700 uppercase">Active</span>
                  </div>
                  <h3 class="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#1a0533] sm:mb-2 sm:text-2xl lg:text-3xl">{{ totalMembersCount }}</h3>
                  <p class="break-words text-[8px] font-black uppercase leading-snug tracking-[0.2em] text-emerald-600 sm:text-[9px] sm:tracking-[0.25em] lg:text-[10px]">Total Members</p>
                </div>

                <div class="group relative min-w-0 cursor-default overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 sm:rounded-3xl sm:p-6 lg:rounded-[2.5rem] lg:p-8 hover:border-violet-200 transition-all shadow-xs">
                  <div class="mb-4 flex items-center justify-between sm:mb-8">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-100 bg-violet-50 text-violet-600 transition-transform sm:h-12 sm:w-12 sm:rounded-2xl">
                      <i class="fas fa-newspaper text-base sm:text-lg" />
                    </div>
                    <span class="rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-black text-violet-700 uppercase">{{ allItems.length }} Posts</span>
                  </div>
                  <h3 class="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#1a0533] sm:mb-2 sm:text-2xl lg:text-3xl">{{ approvedCmsCount }}</h3>
                  <p class="break-words text-[8px] font-black uppercase leading-snug tracking-[0.2em] text-violet-600 sm:text-[9px] sm:tracking-[0.25em] lg:text-[10px]">Approved Highlights</p>
                </div>

                <div class="group relative min-w-0 cursor-default overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 sm:rounded-3xl sm:p-6 lg:rounded-[2.5rem] lg:p-8 hover:border-amber-200 transition-all shadow-xs">
                  <div class="mb-4 flex items-center justify-between sm:mb-8">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 transition-transform sm:h-12 sm:w-12 sm:rounded-2xl">
                      <i class="fas fa-clock text-base sm:text-lg" />
                    </div>
                    <span v-if="pendingCmsCount > 0" class="rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black text-white uppercase animate-pulse">Review Required</span>
                    <span v-else class="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-500 uppercase">Clear</span>
                  </div>
                  <h3 class="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#1a0533] sm:mb-2 sm:text-2xl lg:text-3xl">{{ pendingCmsCount }}</h3>
                  <p class="break-words text-[8px] font-black uppercase leading-snug tracking-[0.2em] text-amber-600 sm:text-[9px] sm:tracking-[0.25em] lg:text-[10px]">Pending Reviews</p>
                </div>

                <div class="group relative min-w-0 cursor-default overflow-hidden rounded-2xl border border-violet-100 bg-white p-4 sm:rounded-3xl sm:p-6 lg:rounded-[2.5rem] lg:p-8 hover:border-sky-200 transition-all shadow-xs">
                  <div class="mb-4 flex items-center justify-between sm:mb-8">
                    <div class="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600 transition-transform sm:h-12 sm:w-12 sm:rounded-2xl">
                      <i class="fas fa-folder text-base sm:text-lg" />
                    </div>
                    <span class="rounded-full bg-sky-100 px-2 py-0.5 text-[9px] font-black text-sky-700 uppercase">Drive</span>
                  </div>
                  <h3 class="mb-1 text-xl font-black uppercase leading-none tracking-tight text-[#1a0533] sm:mb-2 sm:text-2xl lg:text-3xl">{{ driveFiles.length }}</h3>
                  <p class="break-words text-[8px] font-black uppercase leading-snug tracking-[0.2em] text-sky-600 sm:text-[9px] sm:tracking-[0.25em] lg:text-[10px]">Vault Cloud Files</p>
                </div>
              </div>

              <!-- Analytics Breakdown Grid (Community Roles + Library Categories) -->
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                <!-- Member Roles Distribution -->
                <div class="rounded-2xl border border-violet-100 bg-white p-5 sm:rounded-3xl sm:p-8 lg:rounded-[3rem] lg:p-10 shadow-xs space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#1a0533] sm:text-sm">
                        <i class="fas fa-users-cog text-violet-600" /> Community Role Distribution
                      </h4>
                      <p class="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Breakdown of roles in the community</p>
                    </div>
                    <span class="rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-black text-violet-700">{{ totalMembersCount }} Total</span>
                  </div>

                  <div class="space-y-4">
                    <div v-for="roleStat in memberRoleStats" :key="roleStat.role" class="space-y-1.5">
                      <div class="flex items-center justify-between text-xs font-bold text-[#1a0533]">
                        <span class="flex items-center gap-2">
                          <span class="h-2.5 w-2.5 rounded-full" :class="roleStat.dotColor" />
                          {{ roleStat.role }}s
                        </span>
                        <span class="font-mono text-[11px] text-slate-600">{{ roleStat.count }} ({{ roleStat.percent }}%)</span>
                      </div>
                      <div class="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-700" :class="roleStat.barColor" :style="{ width: `${roleStat.percent}%` }" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Library Content & Category Overview -->
                <div class="rounded-2xl border border-violet-100 bg-white p-5 sm:rounded-3xl sm:p-8 lg:rounded-[3rem] lg:p-10 shadow-xs space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#1a0533] sm:text-sm">
                        <i class="fas fa-shapes text-violet-600" /> Library Category Ratios
                      </h4>
                      <p class="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Published content across library classifications</p>
                    </div>
                    <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700">{{ allItems.length }} Items</span>
                  </div>

                  <div class="grid grid-cols-3 gap-3">
                    <div class="p-4 rounded-2xl bg-violet-50/60 border border-violet-100 text-center space-y-1">
                      <i class="fas fa-newspaper text-violet-600 text-lg mb-1" />
                      <p class="text-xl font-black text-[#1a0533] leading-none">{{ newsCount }}</p>
                      <p class="text-[9px] font-black uppercase tracking-wider text-violet-600">News & Events</p>
                    </div>

                    <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center space-y-1">
                      <i class="fas fa-graduation-cap text-amber-600 text-lg mb-1" />
                      <p class="text-xl font-black text-[#1a0533] leading-none">{{ coursesCount }}</p>
                      <p class="text-[9px] font-black uppercase tracking-wider text-amber-600">Courses</p>
                    </div>

                    <div class="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 text-center space-y-1">
                      <i class="fas fa-project-diagram text-sky-600 text-lg mb-1" />
                      <p class="text-xl font-black text-[#1a0533] leading-none">{{ projectsCount }}</p>
                      <p class="text-[9px] font-black uppercase tracking-wider text-sky-600">Projects</p>
                    </div>
                  </div>

                  <div class="p-4 rounded-2xl bg-violet-50/40 border border-violet-100/60 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                        <i class="fas fa-check-circle text-sm" />
                      </div>
                      <div>
                        <p class="text-xs font-bold text-[#1a0533]">Publication Approval Ratio</p>
                        <p class="text-[10px] text-slate-500 font-bold">{{ approvedCmsCount }} Approved • {{ pendingCmsCount }} Pending Review</p>
                      </div>
                    </div>
                    <span class="rounded-full bg-violet-600 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                      {{ Math.round((approvedCmsCount / (allItems.length || 1)) * 100) }}% Live
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>

        </main>
      </div>

      <!-- ── Mobile Drawer ────────────────────────────────────── -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-[400ms] ease-out"
          leave-active-class="transition-opacity duration-[400ms] ease-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="drawerOpen" class="fixed inset-0 z-[150] bg-[#1a0533]/20 lg:hidden" @click="drawerOpen = false" />
        </Transition>
        <Transition
          enter-active-class="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
          leave-active-class="transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
          enter-from-class="-translate-x-full"
          leave-to-class="-translate-x-full"
        >
          <aside
            v-if="drawerOpen"
            class="fixed left-0 top-0 z-[160] flex h-[100dvh] max-h-[100dvh] w-[min(20rem,calc(100vw-0.75rem))] flex-col border-r border-violet-100 bg-white shadow-2xl sm:left-3 sm:top-3 sm:bottom-3 sm:h-auto sm:max-h-none sm:w-80 sm:rounded-[2rem] sm:border lg:hidden lg:rounded-[3rem]"
          >
            <div class="flex h-full min-h-0 flex-col p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
              <div class="mb-6 flex shrink-0 items-center justify-between sm:mb-10">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 flex items-center justify-center translate-x-[-4px]">
                    <img :src="logoUrl" alt="Logo" class="h-7 w-auto" />
                  </div>
                  <span class="font-black text-xl text-[#1a0533] uppercase tracking-tighter leading-none">TechSavvy</span>
                </div>
                <button @click="drawerOpen = false" class="text-violet-600 hover:text-violet-900 group"><i class="fas fa-times text-lg" /></button>
              </div>

              <nav class="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-slate-100 hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent sm:space-y-3">
                <template v-for="item in navItems" :key="item.label">
                  <button type="button" @click="item.action ? item.action() : null" class="flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 transition-all sm:rounded-2xl sm:px-6 sm:py-4" :class="item.active ? 'bg-violet-600 text-white' : 'text-violet-800'">
                    <div class="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <i :class="item.icon" class="shrink-0 text-sm" />
                      <span class="truncate text-left text-[11px] font-extrabold uppercase sm:text-[12px]">{{ item.label }}</span>
                    </div>
                    <span
                      v-if="item.badge != null && item.badge > 0"
                      class="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black tabular-nums"
                      :class="item.active ? 'bg-white/25 text-white' : 'bg-amber-500 text-white'"
                    >
                      {{ item.badge }}
                    </span>
                  </button>
                </template>
              </nav>

              <button type="button" @click="handleLogout" class="mt-4 flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 py-3.5 text-[9px] font-black uppercase tracking-widest text-red-500 sm:mt-8 sm:gap-3 sm:rounded-2xl sm:py-4 sm:text-[10px]">
                <i class="fas fa-power-off" /> Sign out
              </button>
            </div>
          </aside>
        </Transition>
      </Teleport>

      <!-- Modals (Flat) -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-[400ms] ease-out"
          leave-active-class="transition-opacity duration-[400ms] ease-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="showDeleteModal" class="fixed inset-0 z-[200] flex w-full max-w-[100vw] items-end justify-center overflow-x-hidden p-0 sm:items-center sm:p-4 md:p-6">
            <div class="absolute inset-0 bg-[#1a0533]/20 backdrop-blur-3xl" @click="showDeleteModal = false" />
            <div class="relative z-10 mx-auto w-full max-w-sm rounded-t-[2rem] border-2 border-violet-100 bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:rounded-[2.5rem] sm:p-10 sm:pb-10 md:rounded-[3.5rem] md:p-12 md:pb-12" :class="showDeleteModal ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.98]'">
              <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 sm:mb-8 sm:h-24 sm:w-24 sm:rounded-3xl">
                <i class="fas fa-trash-alt text-2xl text-red-400 sm:text-3xl" />
              </div>
              <h3 class="mb-2 text-xl font-black uppercase tracking-tighter text-[#1a0533] sm:mb-4 sm:text-2xl md:text-3xl">Delete Post.</h3>
              <p class="mb-6 text-[9px] font-bold uppercase tracking-widest text-slate-600 sm:mb-10 sm:text-[10px]">This update will be removed <br class="hidden sm:inline" /> from the community feed.</p>
              <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <button type="button" @click="showDeleteModal = false" class="flex-1 rounded-xl bg-violet-50 py-3.5 text-[10px] font-black uppercase text-violet-700 sm:py-4">Keep</button>
                <button type="button" @click="confirmDeleteItem" class="flex-1 rounded-xl bg-red-500 py-3.5 text-[10px] font-black uppercase text-white sm:py-4">Delete</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-[400ms] ease-out"
          leave-active-class="transition-opacity duration-[400ms] ease-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div v-if="showLogoutModal" class="fixed inset-0 z-[200] flex w-full max-w-[100vw] items-end justify-center overflow-x-hidden p-0 sm:items-center sm:p-4 md:p-6">
            <div class="absolute inset-0 bg-[#1a0533]/20 backdrop-blur-3xl" @click="showLogoutModal = false" />
            <div class="relative z-10 mx-auto w-full max-w-sm rounded-t-[2rem] border-2 border-violet-100 bg-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center transition-transform duration-[400ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:rounded-[2.5rem] sm:p-10 sm:pb-10 md:rounded-[3.5rem] md:p-12 md:pb-12" :class="showLogoutModal ? 'translate-y-0 scale-100' : 'translate-y-3 scale-[0.98]'">
              <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 sm:mb-8 sm:h-24 sm:w-24 sm:rounded-3xl">
                <i class="fas fa-sign-out-alt text-2xl text-violet-700 sm:text-3xl" />
              </div>
              <h3 class="mb-2 text-xl font-black uppercase tracking-tighter text-[#1a0533] sm:mb-4 sm:text-2xl md:text-3xl">Log Out</h3>
              <p class="mb-6 text-[9px] font-bold uppercase tracking-widest text-slate-600 sm:mb-10 sm:text-[10px]">Are you sure you want <br class="hidden sm:inline" /> to log out?</p>
              <div class="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <button type="button" @click="showLogoutModal = false" class="flex-1 rounded-xl bg-violet-50 py-3.5 text-[10px] font-black uppercase text-violet-700 sm:py-4">Close</button>
                <button type="button" @click="confirmLogout" class="flex-1 rounded-xl bg-violet-600 py-3.5 text-[10px] font-black uppercase text-white sm:py-4">Yes</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Review upload: read-only detail modal (row / card tap) -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-[220ms] ease-out"
          leave-active-class="transition-opacity duration-[220ms] ease-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showReviewDetailModal && reviewDetailItem"
            class="fixed inset-0 z-[188] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
            role="presentation"
          >
            <div
              class="absolute inset-0 bg-[#1a0533]/45 backdrop-blur-sm"
              aria-hidden="true"
              @click="closeReviewDetail"
            />
            <div
              class="relative flex max-h-[min(92dvh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.75rem] border-2 border-violet-100 bg-white shadow-[0_25px_80px_-20px_rgba(26,5,51,0.38)] transition-all duration-[280ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:max-h-[min(88vh,820px)] sm:max-w-2xl sm:rounded-[2rem]"
              :class="showReviewDetailModal ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.98] opacity-0'"
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-detail-title"
              @click.stop
            >
              <div class="flex shrink-0 items-start justify-between gap-3 border-b border-violet-200 bg-gradient-to-br from-amber-50/90 via-white to-violet-50/80 px-4 py-4 sm:px-6 sm:py-5">
                <div class="min-w-0 flex-1">
                  <p class="text-[9px] font-black uppercase tracking-[0.2em] text-amber-800">
                    Pending review
                  </p>
                  <h2 id="review-detail-title" class="mt-1 break-words text-lg font-black uppercase leading-tight tracking-tight text-[#1a0533] sm:text-xl">
                    {{ reviewDetailItem.title }}
                  </h2>
                  <p class="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {{ formatItemDate(reviewDetailItem.created_at) }}
                    <span class="mx-2 text-violet-300">·</span>
                    ID {{ reviewDetailItem.id }}
                  </p>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded-xl border-2 border-violet-200 bg-white p-2.5 text-violet-700 transition-colors hover:bg-violet-100"
                  aria-label="Close"
                  @click="closeReviewDetail"
                >
                  <i class="fas fa-times text-sm" aria-hidden="true" />
                </button>
              </div>

              <div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-slate-100 hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent sm:px-6 sm:py-5">
                <dl class="space-y-5 text-sm">
                  <div>
                    <dt class="text-[9px] font-black uppercase tracking-widest text-violet-600">
                      Authors
                    </dt>
                    <dd class="mt-1 break-all text-[13px] font-medium text-slate-800">
                      {{ reviewDetailItem.authors || '—' }}
                    </dd>
                  </div>
                  <div>
                    <dt class="text-[9px] font-black uppercase tracking-widest text-violet-600">
                      Category
                    </dt>
                    <dd class="mt-2">
                      <span class="inline-block rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-black uppercase text-violet-900">{{ getPrimaryCategory(reviewDetailItem.filters) }}</span>
                    </dd>
                  </div>
                  <div>
                    <dt class="text-[9px] font-black uppercase tracking-widest text-violet-600">
                      Description
                    </dt>
                    <dd class="mt-2 whitespace-pre-wrap break-words text-[13px] leading-relaxed text-slate-700">
                      {{ reviewDetailDescription || 'No description provided.' }}
                    </dd>
                  </div>
                  <div v-if="reviewDetailLinksList.length">
                    <dt class="text-[9px] font-black uppercase tracking-widest text-violet-600">
                      Links
                    </dt>
                    <dd class="mt-2 space-y-2">
                      <a
                        v-for="(link, li) in reviewDetailLinksList"
                        :key="'rdl-' + li"
                        :href="link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block break-all text-[12px] font-semibold text-violet-700 underline decoration-violet-200 underline-offset-2 hover:text-violet-900"
                      >{{ link }}</a>
                    </dd>
                  </div>
                  <div v-if="reviewDetailFilesList.length">
                    <dt class="text-[9px] font-black uppercase tracking-widest text-violet-600">
                      Attachments
                    </dt>
                    <dd class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <template v-for="(file, fi) in reviewDetailFilesList" :key="'rdf-' + fi">
                        <a
                          v-if="isImageAssetUrl(resolveCmsAssetUrl(file.url))"
                          :href="resolveCmsAssetUrl(file.url)"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="group overflow-hidden rounded-xl border border-violet-100 bg-violet-50/50"
                        >
                          <img
                            :src="resolveCmsAssetUrl(file.url)"
                            :alt="file.name"
                            class="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                          <span class="block truncate px-2 py-1.5 text-[9px] font-bold uppercase text-violet-900">{{ file.name }}</span>
                        </a>
                        <a
                          v-else
                          :href="resolveCmsAssetUrl(file.url)"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex min-h-[5.5rem] flex-col items-center justify-center rounded-xl border border-violet-200 bg-white p-3 text-center transition-colors hover:bg-violet-50"
                        >
                          <i class="fas fa-file-alt mb-2 text-lg text-violet-400" aria-hidden="true" />
                          <span class="break-all text-[10px] font-bold uppercase leading-snug text-violet-900">{{ file.name }}</span>
                        </a>
                      </template>
                    </dd>
                  </div>
                </dl>
              </div>

              <div class="flex shrink-0 flex-wrap gap-2 border-t border-violet-100 bg-violet-50/40 px-4 py-3 sm:px-6 sm:py-4">
                <button
                  type="button"
                  class="min-w-[7rem] flex-1 rounded-xl bg-emerald-600 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:bg-emerald-700"
                  @click="approveMemberSubmission(reviewDetailItem.id)"
                >
                  Approve
                </button>
                <button
                  type="button"
                  class="min-w-[7rem] flex-1 rounded-xl border border-red-200 bg-red-50 py-3 text-[10px] font-black uppercase tracking-widest text-red-800 transition-colors hover:bg-red-100"
                  @click="rejectMemberSubmission(reviewDetailItem.id)"
                >
                  Reject
                </button>
                <button
                  type="button"
                  class="w-full min-w-[7rem] rounded-xl border-2 border-violet-200 bg-white py-3 text-[10px] font-black uppercase tracking-widest text-violet-800 transition-colors hover:bg-violet-100 sm:flex-1"
                  @click="handleEdit(reviewDetailItem)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- CMS create/edit: modal on top of dashboard (not a full-page takeover) -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-[220ms] ease-out"
          leave-active-class="transition-opacity duration-[220ms] ease-out"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showContentForm"
            class="fixed inset-0 z-[185] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
            role="presentation"
          >
            <div
              class="absolute inset-0 bg-[#1a0533]/50 backdrop-blur-sm"
              aria-hidden="true"
              @click.self="closeContentForm"
            />
            <div
              class="relative flex max-h-[min(96dvh,880px)] w-full max-w-4xl flex-col overflow-hidden rounded-t-[1.75rem] border-2 border-violet-100 bg-white shadow-[0_25px_80px_-20px_rgba(26,5,51,0.35)] transition-all duration-[280ms] ease-[cubic-bezier(0.19,1,0.22,1)] sm:max-h-[min(92vh,880px)] sm:rounded-[2rem]"
              :class="showContentForm ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-[0.6rem] scale-[0.98] opacity-0'"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cms-overlay-title"
              @click.stop
            >
              <div class="flex shrink-0 flex-col gap-3 border-b border-violet-200 bg-gradient-to-r from-violet-50 to-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
                <div class="min-w-0 flex-1 pr-0 sm:pr-2">
                  <h2 id="cms-overlay-title" class="truncate text-xs font-black uppercase tracking-widest text-violet-950 sm:text-sm">
                    Highlight
                  </h2>
                  <p class="mt-1 line-clamp-2 text-[9px] font-bold uppercase tracking-widest text-violet-700 sm:text-[10px]">
                    {{ cmsModalSubtitle }}
                  </p>
                </div>
                <button
                  type="button"
                  class="w-full shrink-0 rounded-xl border-2 border-violet-200 bg-white px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-violet-800 transition-colors hover:bg-violet-100 sm:w-auto sm:px-4 sm:text-[11px]"
                  @click="closeContentForm"
                >
                  <i class="fas fa-times mr-2" aria-hidden="true" />Close
                </button>
              </div>
              <div class="custom-scrollbar min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-slate-100 hover:[&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-track]:bg-transparent">
                <DashboardCmsForm
                  ref="contentFormRef"
                  :member-content-scope="!isSuperAdmin(user?.email)"
                  @saved="onContentFormSaved"
                  @meta="onCmsFormMeta"
                />
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Edit Contact Details Modal -->
      <Teleport to="body">
        <Transition name="fade">
          <div v-if="showEditProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 transition-all duration-300">
            <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-xl w-full border border-violet-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div class="flex items-center justify-between mb-6 pb-4 border-b border-violet-50">
                <div>
                  <h3 class="text-xl font-black text-[#1a0533] uppercase tracking-tight">Edit Contact Details</h3>
                  <p class="text-xs font-bold text-violet-600 uppercase tracking-wider mt-0.5">Update your community vault records</p>
                </div>
                <button type="button" @click="closeEditProfileModal" class="w-9 h-9 flex items-center justify-center rounded-xl bg-violet-50 text-violet-900 hover:text-red-500 transition-all">
                  <i class="fas fa-times text-sm" />
                </button>
              </div>

              <form @submit.prevent="saveProfileDetails" class="space-y-4">
                <div v-if="profileSaveError" class="p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600">
                  {{ profileSaveError }}
                </div>

                <div v-if="profileSaveSuccess" class="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 flex items-center gap-2">
                  <i class="fas fa-check-circle text-sm" /> Profile updated successfully!
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">First Name</label>
                    <input v-model="editProfileForm.firstname" required class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Last Name</label>
                    <input v-model="editProfileForm.lastname" required class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Middle Name (Optional)</label>
                  <input v-model="editProfileForm.middlename" placeholder="Middle Name" class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Mobile Number</label>
                    <input v-model="editProfileForm.mobile" placeholder="09xxxxxxxxx" class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Email Address</label>
                    <input v-model="editProfileForm.email" type="email" required class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Birthdate (YYYY-MM-DD)</label>
                    <input v-model="editProfileForm.birthdate" type="date" class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                  <div>
                    <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Website / Portfolio</label>
                    <input v-model="editProfileForm.website" placeholder="https://github.com/username" class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                  </div>
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Talk Focus / Bio Line</label>
                  <input v-model="editProfileForm.speaker_topic" placeholder="e.g. Full-Stack Developer & Community Mentor" class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white" />
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Profile Picture (Optional)</label>
                  <input ref="editProfileFileInput" type="file" accept="image/*" class="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2 text-xs font-semibold text-violet-900 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-1.5 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:text-white hover:file:bg-violet-700" />
                </div>

                <div class="flex gap-3 pt-4 border-t border-violet-50">
                  <button type="button" @click="closeEditProfileModal" class="flex-1 px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" :disabled="savingProfile" class="flex-1 px-5 py-3 bg-violet-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-violet-700 shadow-md shadow-violet-600/20 transition-all disabled:opacity-50">
                    {{ savingProfile ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </Teleport>

    </template>
    <template v-else>
      <CreateContent @close="showAllContent = false" />
    </template>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import moment from 'moment'
import { cmsItemHasAuthorEmail, type CmsFileEntry, type CmsRaw } from '~/composables/useDashboardCmsList'
import { updateCMSPost } from '~/utils/api'
import DashboardCmsForm from './ContentFormAndList.vue'
import CreateContent from './CreateContent.vue'

// ── Views Management ────────────────────────────────────────────
const activeView = ref('Profile')

const { user, setAuth, logout } = useAuth()
const { isSuperAdmin, superAdminEmails } = useSuperAdmin()

// ── Refs & Auth ─────────────────────────────────────────────────
const showAllContent = ref(false)
const contentFormRef = ref<InstanceType<typeof DashboardCmsForm> | null>(null)

const { logoUrl } = useAppLogo()

const {
  apiBase,
  allItems,
  loadingItems,
  fetchItems,
  getFiltersText,
  getPrimaryCategory,
  formatItemDate
} = useDashboardCmsList()

// ── UI States ───────────────────────────────────────────────────
const drawerOpen = ref(false)
const currentTime = ref('')
const currentDate = ref('')
const greeting = ref('')
const showLogoutModal = ref(false)
const showDeleteModal = ref(false)
const pendingDeleteId = ref<number | null>(null)
const profileImage = ref<string | null>(null)
const contentSearch = ref('')
const showContentForm = ref(false)
const cmsModalSubtitle = ref('Create a new highlight for the library feed')
const showReviewDetailModal = ref(false)
const reviewDetailItem = ref<CmsRaw | null>(null)

function normalizeReviewLinks (raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return raw.map(l => String(l || '').trim()).filter(Boolean)
}

function normalizeReviewFiles (raw: unknown): { name: string; url: string }[] {
  if (!Array.isArray(raw)) return []
  const out: { name: string; url: string }[] = []
  for (const f of raw) {
    if (f && typeof f === 'object' && 'url' in f) {
      const url = String((f as CmsFileEntry).url || '').trim()
      if (url) {
        out.push({
          name: (String((f as CmsFileEntry).name || '').trim() || 'Attachment'),
          url
        })
      }
    }
  }
  return out
}

function resolveCmsAssetUrl (path: string): string {
  const p = String(path || '').trim()
  if (!p || /^https?:\/\//i.test(p)) return p
  const base = apiBase.replace(/\/$/, '')
  return `${base}${p.startsWith('/') ? '' : '/'}${p}`
}

function isImageAssetUrl (url: string): boolean {
  return /\.(jpe?g|png|gif|webp|svg|bmp)(\?|#|$)/i.test(url)
}

function openReviewDetail (item: CmsRaw) {
  reviewDetailItem.value = item
  showReviewDetailModal.value = true
}

function closeReviewDetail () {
  showReviewDetailModal.value = false
  reviewDetailItem.value = null
}

const reviewDetailDescription = computed(() => String(reviewDetailItem.value?.descriptions || '').trim())
const reviewDetailLinksList = computed(() => normalizeReviewLinks(reviewDetailItem.value?.links))
const reviewDetailFilesList = computed(() => normalizeReviewFiles(reviewDetailItem.value?.files))

let reviewDetailEscCleanup: (() => void) | null = null

function onCmsFormMeta (payload: { mode: string; title?: string }) {
  if (payload.mode === 'edit' && payload.title?.trim()) {
    cmsModalSubtitle.value = `Editing · ${payload.title.trim()}`
    return
  }
  cmsModalSubtitle.value = 'Create a new highlight for the library feed'
}
const coreMembersCount = ref(0)
const rawMembersList = ref<any[]>([])

const totalMembersCount = computed(() => rawMembersList.value.length || coreMembersCount.value)

const memberRoleStats = computed(() => {
  const total = rawMembersList.value.length || 1
  const counts: Record<string, number> = {
    Admin: 0,
    Mentor: 0,
    Member: 0,
    Participant: 0,
    Sponsor: 0,
  }

  for (const m of rawMembersList.value) {
    const role = String(m?.role || 'Member').trim()
    if (role.toLowerCase().includes('admin') || role.toLowerCase().includes('founder')) {
      counts.Admin = (counts.Admin || 0) + 1
    } else if (role.toLowerCase().includes('mentor')) {
      counts.Mentor = (counts.Mentor || 0) + 1
    } else if (role.toLowerCase().includes('parti')) {
      counts.Participant = (counts.Participant || 0) + 1
    } else if (role.toLowerCase().includes('sponsor')) {
      counts.Sponsor = (counts.Sponsor || 0) + 1
    } else {
      counts.Member = (counts.Member || 0) + 1
    }
  }

  return [
    {
      role: 'Admin',
      count: counts.Admin || 0,
      percent: Math.round(((counts.Admin || 0) / total) * 100),
      barColor: 'bg-violet-600',
      dotColor: 'bg-violet-600',
    },
    {
      role: 'Mentor',
      count: counts.Mentor || 0,
      percent: Math.round(((counts.Mentor || 0) / total) * 100),
      barColor: 'bg-sky-500',
      dotColor: 'bg-sky-500',
    },
    {
      role: 'Member',
      count: counts.Member || 0,
      percent: Math.round(((counts.Member || 0) / total) * 100),
      barColor: 'bg-emerald-500',
      dotColor: 'bg-emerald-500',
    },
    {
      role: 'Participant',
      count: counts.Participant || 0,
      percent: Math.round(((counts.Participant || 0) / total) * 100),
      barColor: 'bg-amber-500',
      dotColor: 'bg-amber-500',
    },
    {
      role: 'Sponsor',
      count: counts.Sponsor || 0,
      percent: Math.round(((counts.Sponsor || 0) / total) * 100),
      barColor: 'bg-rose-500',
      dotColor: 'bg-rose-500',
    },
  ]
})

const approvedCmsCount = computed(() =>
  allItems.value.filter(i => (i.approval_status || 'approved').toLowerCase() === 'approved').length
)
const pendingCmsCount = computed(() =>
  allItems.value.filter(i => (i.approval_status || '').toLowerCase() === 'pending').length
)

const vibrantColorClasses = ['bg-emerald-500', 'bg-amber-500', 'bg-sky-500', 'bg-rose-500', 'bg-violet-600']

// ── Profile Mod Stats / Member ──────────────────────────────────
const dollarConversion = ref(60)
const loadingMember = ref(true)
const memberError = ref(false)
const memberErrorMessage = ref('')
/** Logged in (JWT) but email not returned from member/list — do not force logout */
const memberDirectoryMiss = ref(false)
/** True if member is registered with Participant role — show restricted notice without forcing logout */
const isParticipantAccessDenied = ref(false)
/** True while signing out / navigating away so we don’t flash “unavailable” before login */
const profileRedirectPending = ref(false)
const member = ref<any>(null)

function normalizeMembersList (raw: unknown): any[] {
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>
    if (Array.isArray(o.results)) return o.results
    if (Array.isArray(o.data)) return o.data
    if (Array.isArray(o.members)) return o.members
  }
  return []
}

function isParticipantRole (role: unknown): boolean {
  return String(role || '').trim().toLowerCase().includes('parti')
}

const hover = reactive({
  id: false,
  mobile: false,
  email: false,
  birthdate: false,
})

// ── Notifications Center State & Methods ──────────────────────────
interface DashboardNotification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  bgClass: string
  iconClass: string
  action?: () => void
}

const showNotificationsDropdown = ref(false)
const readNotificationIds = ref<Set<string>>(new Set())

const dynamicNotifications = computed<DashboardNotification[]>(() => {
  const list: DashboardNotification[] = []

  // 1. Pending Submission Reviews (Actionable for SuperAdmin / Admin)
  if (pendingMemberSubmissions.value.length > 0) {
    const id = `pending-reviews-${pendingMemberSubmissions.value.length}`
    list.push({
      id,
      title: `${pendingMemberSubmissions.value.length} Pending Highlight${pendingMemberSubmissions.value.length > 1 ? 's' : ''}`,
      message: 'New member highlight submissions are awaiting review and approval.',
      time: 'Requires Action',
      read: readNotificationIds.value.has(id),
      bgClass: 'bg-amber-100 text-amber-700',
      iconClass: 'fas fa-clock',
      action: () => { activeView.value = 'Reviews' }
    })
  }

  // 2. Recent Approved Highlights
  const recentApproved = allItems.value
    .filter(i => (i.approval_status || 'approved').toLowerCase() === 'approved')
    .slice(0, 3)

  for (const item of recentApproved) {
    const id = `approved-item-${item.id}`
    list.push({
      id,
      title: item.title ? `Approved: ${item.title}` : 'Highlight Approved',
      message: item.authors ? `Authored by ${item.authors} — published in Library Feed.` : 'Highlight is approved and published in the community feed.',
      time: item.created_at ? formatItemDate(item.created_at) : 'Recent',
      read: readNotificationIds.value.has(id),
      bgClass: 'bg-emerald-100 text-emerald-700',
      iconClass: 'fas fa-check-circle',
      action: () => { activeView.value = 'Library' }
    })
  }

  // 3. User Profile & Role Info
  if (member.value) {
    const id = `user-role-${member.value.id || member.value.idNumber}`
    list.push({
      id,
      title: `Role: ${member.value.role || 'Member'}`,
      message: `Community ID: ${member.value.idNumber || 'N/A'}. Self-service profile updates enabled.`,
      time: 'Active',
      read: readNotificationIds.value.has(id),
      bgClass: 'bg-violet-100 text-violet-700',
      iconClass: 'fas fa-user-shield',
      action: () => { activeView.value = 'Profile' }
    })
  }

  // 4. PayMongo Gateway Status
  const paymongoId = 'paymongo-gateway-active'
  list.push({
    id: paymongoId,
    title: 'PayMongo Gateway Connected',
    message: 'Active payment verification enabled for merchandise orders.',
    time: 'Online',
    read: readNotificationIds.value.has(paymongoId),
    bgClass: 'bg-sky-100 text-sky-700',
    iconClass: 'fas fa-credit-card'
  })

  return list
})

const unreadCount = computed(() => dynamicNotifications.value.filter(n => !n.read).length)

function toggleNotificationsDropdown () {
  showNotificationsDropdown.value = !showNotificationsDropdown.value
  if (showNotificationsDropdown.value) {
    showSettingsDropdown.value = false
  }
}

function markNotificationRead (notif: DashboardNotification) {
  readNotificationIds.value.add(notif.id)
  if (notif.action) {
    notif.action()
    showNotificationsDropdown.value = false
  }
}

function markAllNotificationsAsRead () {
  dynamicNotifications.value.forEach(n => readNotificationIds.value.add(n.id))
}

// ── Settings Center State & Methods ──────────────────────────────
const showSettingsDropdown = ref(false)
const isRefreshingData = ref(false)

const publicApiBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || 'http://localhost:8000/api/techsavvy/')
})

function toggleSettingsDropdown () {
  showSettingsDropdown.value = !showSettingsDropdown.value
  if (showSettingsDropdown.value) {
    showNotificationsDropdown.value = false
  }
}

async function refreshDashboardData () {
  isRefreshingData.value = true
  try {
    await Promise.all([
      fetchMembersCount(),
      fetchItems(),
      fetchDriveData(),
    ])
  } catch (e) {
    console.error('Error refreshing dashboard data', e)
  } finally {
    setTimeout(() => {
      isRefreshingData.value = false
    }, 600)
  }
}

const closeDropdownsOnOutsideClick = () => {
  if (showNotificationsDropdown.value) {
    showNotificationsDropdown.value = false
  }
  if (showSettingsDropdown.value) {
    showSettingsDropdown.value = false
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('click', closeDropdownsOnOutsideClick)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('click', closeDropdownsOnOutsideClick)
  }
})

// ── Profile Edit Modal States & Handlers ───────────────────────
const showEditProfileModal = ref(false)
const savingProfile = ref(false)
const profileSaveError = ref('')
const profileSaveSuccess = ref(false)
const editProfileFileInput = ref<HTMLInputElement | null>(null)
const editProfileForm = ref({
  firstname: '',
  middlename: '',
  lastname: '',
  mobile: '',
  email: '',
  website: '',
  birthdate: '',
  speaker_topic: '',
})

function openEditProfileModal () {
  if (!member.value) return
  editProfileForm.value = {
    firstname: member.value.firstname || '',
    middlename: member.value.middlename || '',
    lastname: member.value.lastname || '',
    mobile: member.value.mobile || '',
    email: member.value.email || '',
    website: member.value.website || '',
    birthdate: member.value.birthdate || '',
    speaker_topic: member.value.speaker_topic || '',
  }
  profileSaveError.value = ''
  profileSaveSuccess.value = false
  showEditProfileModal.value = true
}

function closeEditProfileModal () {
  showEditProfileModal.value = false
  savingProfile.value = false
  profileSaveError.value = ''
  profileSaveSuccess.value = false
}

async function saveProfileDetails () {
  if (!member.value?.id) return
  savingProfile.value = true
  profileSaveError.value = ''
  profileSaveSuccess.value = false

  try {
    const config = useRuntimeConfig()
    const apiBase = String(config.public.apiBase || '').replace(/\/$/, '')
    const formData = new FormData()

    for (const [key, val] of Object.entries(editProfileForm.value)) {
      formData.append(key, String(val || ''))
    }

    const files = editProfileFileInput.value?.files
    if (files && files[0]) {
      formData.append('profilePicture', files[0])
    }

    const updated = await $fetch<any>(`${apiBase}/member/${member.value.id}/update/`, {
      method: 'PATCH',
      body: formData,
      headers: { Accept: 'application/json' },
    })

    if (updated) {
      member.value = { ...member.value, ...updated }
    }
    profileSaveSuccess.value = true
    setTimeout(() => {
      closeEditProfileModal()
    }, 900)
  } catch (err: any) {
    console.error('Failed to update profile details', err)
    profileSaveError.value = err?.data?.detail || err?.message || 'Failed to update profile'
  } finally {
    savingProfile.value = false
  }
}

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png",
)
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png",
)

const fullName = computed(() =>
  [member.value?.firstname, member.value?.middlename, member.value?.lastname]
    .filter(Boolean)
    .join(" "),
)

/** First + middle (trimmed) for heading; last name styled like “Stats” accent */
const profileDisplayRest = computed(() =>
  [member.value?.firstname, member.value?.middlename]
    .filter((s) => s != null && String(s).trim() !== '')
    .map((s) => String(s).trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim(),
)
const profileDisplayLast = computed(() =>
  String(member.value?.lastname || "").trim(),
)

const totalPoints = computed(
  () =>
    Number(member.value?.gcashPoints || 0) +
    Number((member.value?.bonusPoints || 0) * dollarConversion.value) +
    Number(member.value?.voucherPoints || 0) +
    Number(member.value?.honorariumPoints || 0),
)

function cleanImageUrl(url: string) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) {
    return url.match(/^.*\.(jpg|jpeg|png|gif|webp)/i)?.[0] || url
  }
  const config = useRuntimeConfig()
  const origin = String(config.public.apiBase || '').replace(/\/api\/techsavvy\/?$/i, '').replace(/\/$/, '')
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}
const userInitials = computed(() => {
  const name = user.value?.name || 'USER'
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0]![0]! + parts[1]![0]!).toUpperCase()
    : name.substring(0, 2).toUpperCase()
})

const displayProfileImage = computed(() => {
  if (member.value?.profilePicture) {
    return cleanImageUrl(member.value.profilePicture)
  }
  const authPic = user.value?.image || user.value?.picture
  if (authPic) {
    return authPic
  }
  return ''
})

const memberSinceYear = computed(() => {
  if (member.value?.created_at) {
    const year = new Date(member.value.created_at).getFullYear()
    if (!isNaN(year)) return String(year)
  }
  if (member.value?.idNumber) {
    const match = String(member.value.idNumber).match(/^(\d{4})/)
    if (match && match[1]) return match[1]
  }
  return new Date().getFullYear().toString()
})

const updateTime = () => {
  const now = moment()
  currentTime.value = now.format('hh:mm:ss A')
  currentDate.value = now.format('dddd, MMM DD, YYYY')
  const h = now.hour()
  greeting.value = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
}

// ── Core Stats ──────────────────────────────────────────────────
const newsCount = computed(() =>
  allItems.value.filter(i => {
    const f = getFiltersText(i.filters)
    if (!f.trim()) return true
    return ['News', 'Events', 'Announcements'].some(c => f.toLowerCase().includes(c.toLowerCase()))
  }).length
)
const coursesCount = computed(() => allItems.value.filter(i => getFiltersText(i.filters).toLowerCase().includes('course')).length)
const projectsCount = computed(() => allItems.value.filter(i => getFiltersText(i.filters).toLowerCase().includes('project')).length)
const pendingCount = computed(() => allItems.value.filter(i => i.approval_status === 'pending').length)

const statCards = computed(() => [
  { 
    label: 'Core Members', 
    value: coreMembersCount.value, 
    icon: 'fas fa-users-cog',
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
    iconBorder: 'border-emerald-100',
    borderClass: 'hover:border-emerald-200',
    labelText: 'text-emerald-600'
  },
  { 
    label: 'Courses', 
    value: coursesCount.value, 
    icon: 'fas fa-graduation-cap',
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    iconBorder: 'border-amber-100',
    borderClass: 'hover:border-amber-200',
    labelText: 'text-amber-600'
  },
  { 
    label: 'Partners & Collaborators', 
    value: assetsCount.value, 
    icon: 'fas fa-handshake',
    iconBg: 'bg-sky-50',
    iconText: 'text-sky-600',
    iconBorder: 'border-sky-100',
    borderClass: 'hover:border-sky-200',
    labelText: 'text-sky-600'
  },
  { 
    label: 'Sponsors', 
    value: pendingCount.value, 
    icon: 'fas fa-crown',
    iconBg: 'bg-rose-50',
    iconText: 'text-rose-600',
    iconBorder: 'border-rose-100',
    borderClass: 'hover:border-rose-200',
    labelText: 'text-rose-600'
  }
])

// Placeholder assets count
const assetsCount = ref(0)

const driveFileInput = ref<HTMLInputElement | null>(null)
const driveLoading = ref(false)
const driveUploading = ref(false)
const driveError = ref('')
const driveFolders = ref<any[]>([])
const driveFiles = ref<any[]>([])
const driveSearch = ref('')
const driveSort = ref<'newest' | 'oldest' | 'name'>('newest')
const driveViewMode = ref<'grid' | 'list' | 'compact'>('grid')
const selectedFolderFilter = ref('')
const showCreateFolderForm = ref(false)
const newFolderName = ref('')

const currentUserEmail = computed(() => String(user.value?.email || '').trim().toLowerCase())

const filteredDriveFiles = computed(() => {
  let rows = driveFiles.value.slice()
  if (selectedFolderFilter.value) {
    rows = rows.filter(f => String(f.folder || '') === String(selectedFolderFilter.value))
  }
  const q = driveSearch.value.trim().toLowerCase()
  if (q) {
    rows = rows.filter((f) => String(f.original_name || '').toLowerCase().includes(q))
  }
  if (driveSort.value === 'name') {
    rows.sort((a, b) => String(a.original_name || '').localeCompare(String(b.original_name || '')))
  } else if (driveSort.value === 'oldest') {
    rows.sort((a, b) => +new Date(String(a.created_at || 0)) - +new Date(String(b.created_at || 0)))
  } else {
    rows.sort((a, b) => +new Date(String(b.created_at || 0)) - +new Date(String(a.created_at || 0)))
  }
  return rows
})

function toggleDriveFolderForm () {
  showCreateFolderForm.value = !showCreateFolderForm.value
}

function triggerDriveUpload () {
  if (!currentUserEmail.value) return
  driveFileInput.value?.click()
}

function formatDriveSize (size: number) {
  const bytes = Number(size || 0)
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const val = bytes / Math.pow(1024, power)
  return `${val.toFixed(power === 0 ? 0 : 1)} ${units[power]}`
}

function formatDriveDate (value: string) {
  if (!value) return '--'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '--'
  return d.toLocaleDateString()
}

function isImageDriveFile (file: any) {
  const name = String(file?.original_name || '').toLowerCase()
  const mime = String(file?.mime_type || '').toLowerCase()
  return mime.startsWith('image/') || /\.(png|jpe?g|gif|webp|svg)$/.test(name)
}

async function fetchDriveData () {
  if (!apiBase || !currentUserEmail.value) return
  driveLoading.value = true
  driveError.value = ''
  try {
    const [foldersRaw, filesRaw] = await Promise.all([
      $fetch<any[]>(`${apiBase}/drive/folders/?owner_email=${encodeURIComponent(currentUserEmail.value)}`),
      $fetch<any[]>(`${apiBase}/drive/files/?owner_email=${encodeURIComponent(currentUserEmail.value)}`),
    ])
    driveFolders.value = Array.isArray(foldersRaw) ? foldersRaw : []
    driveFiles.value = Array.isArray(filesRaw) ? filesRaw : []
    assetsCount.value = driveFiles.value.length
  } catch (e: any) {
    driveError.value = e?.message || 'Failed to load drive files.'
  } finally {
    driveLoading.value = false
  }
}

async function createDriveFolder () {
  const name = newFolderName.value.trim()
  if (!name || !apiBase || !currentUserEmail.value) return
  driveLoading.value = true
  driveError.value = ''
  try {
    await $fetch(`${apiBase}/drive/folders/`, {
      method: 'POST',
      body: {
        owner_email: currentUserEmail.value,
        name,
      },
    })
    newFolderName.value = ''
    showCreateFolderForm.value = false
    await fetchDriveData()
  } catch (e: any) {
    driveError.value = e?.data?.detail || e?.message || 'Failed to create folder.'
  } finally {
    driveLoading.value = false
  }
}

async function handleDriveUpload (event: Event) {
  const target = event.target as HTMLInputElement | null
  const files = target?.files
  if (!files?.length || !apiBase || !currentUserEmail.value) return
  driveUploading.value = true
  driveError.value = ''
  try {
    const fd = new FormData()
    fd.append('owner_email', currentUserEmail.value)
    if (selectedFolderFilter.value) fd.append('folder_id', selectedFolderFilter.value)
    Array.from(files).forEach((file) => fd.append('files', file))
    await $fetch(`${apiBase}/drive/files/`, {
      method: 'POST',
      body: fd,
    })
    await fetchDriveData()
  } catch (e: any) {
    driveError.value = e?.data?.detail || e?.message || 'Upload failed.'
  } finally {
    driveUploading.value = false
    if (target) target.value = ''
  }
}

async function deleteDriveFile (fileId: number) {
  if (!apiBase || !currentUserEmail.value) return
  if (!window.confirm('Delete this file?')) return
  try {
    await $fetch(`${apiBase}/drive/files/${fileId}/?owner_email=${encodeURIComponent(currentUserEmail.value)}`, {
      method: 'DELETE',
    })
    await fetchDriveData()
  } catch (e: any) {
    driveError.value = e?.data?.detail || e?.message || 'Delete failed.'
  }
}

// Library feed: show all CMS rows if user is SuperAdmin, or filter by author / approved status for regular users
const myLibraryItems = computed(() => {
  if (isSuperAdmin(user.value?.email)) {
    return allItems.value
  }
  return allItems.value.filter(i =>
    cmsItemHasAuthorEmail(i, user.value?.email) || (i.approval_status || '').toLowerCase() === 'approved'
  )
})

const filteredContentItems = computed(() => {
  const q = contentSearch.value.trim().toLowerCase()
  const base = myLibraryItems.value
  if (!q) return base
  return base.filter(i =>
    i.title?.toLowerCase().includes(q) ||
    getFiltersText(i.filters).toLowerCase().includes(q)
  )
})

const recentContentItems = computed(() => filteredContentItems.value)

function authorEmailsLower (authors?: string): string[] {
  return String(authors || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
}

/** Pending rows where at least one author is not a configured super-admin email. */
function isPendingMemberSubmission (item: CmsRaw): boolean {
  if (String(item.approval_status || '').toLowerCase() !== 'pending') return false
  const authors = authorEmailsLower(item.authors)
  if (authors.length === 0) return true
  return authors.some(e => !superAdminEmails.value.includes(e))
}

const pendingMemberSubmissions = computed(() =>
  allItems.value.filter(isPendingMemberSubmission),
)

const mainPageCmsTab = ref<'projects' | 'events' | 'sponsors'>('projects')
const cmsMenuExpanded = ref(true)

// ── Navigation (after CMS list — uses pendingMemberSubmissions badge) ──
const navItems = computed(() => {
  const items: {
    label: string
    icon: string
    active: boolean
    action: () => void
    badge?: number
    isCollapsible?: boolean
    isExpanded?: boolean
    subItems?: { label: string; icon: string; tab: 'projects' | 'events' | 'sponsors'; active: boolean; action: () => void }[]
  }[] = [
    { label: 'My Profile', icon: 'fas fa-user-circle', active: activeView.value === 'Profile', action: () => { activeView.value = 'Profile'; drawerOpen.value = false } },
    { label: 'Library Feed', icon: 'fas fa-newspaper', active: activeView.value === 'Library', action: () => { activeView.value = 'Library'; drawerOpen.value = false } },
    {
      label: 'Main Page CMS',
      icon: 'fas fa-sliders-h',
      active: activeView.value === 'MainPageCMS',
      isCollapsible: true,
      isExpanded: cmsMenuExpanded.value,
      action: () => {
        activeView.value = 'MainPageCMS'
        cmsMenuExpanded.value = !cmsMenuExpanded.value
      },
      subItems: [
        {
          label: 'Featured Projects',
          icon: 'fas fa-rocket',
          tab: 'projects',
          active: activeView.value === 'MainPageCMS' && mainPageCmsTab.value === 'projects',
          action: () => { activeView.value = 'MainPageCMS'; mainPageCmsTab.value = 'projects'; drawerOpen.value = false }
        },
        {
          label: 'Event Reminders',
          icon: 'fas fa-calendar-alt',
          tab: 'events',
          active: activeView.value === 'MainPageCMS' && mainPageCmsTab.value === 'events',
          action: () => { activeView.value = 'MainPageCMS'; mainPageCmsTab.value = 'events'; drawerOpen.value = false }
        },
        {
          label: 'Sponsors & Partners',
          icon: 'fas fa-handshake',
          tab: 'sponsors',
          active: activeView.value === 'MainPageCMS' && mainPageCmsTab.value === 'sponsors',
          action: () => { activeView.value = 'MainPageCMS'; mainPageCmsTab.value = 'sponsors'; drawerOpen.value = false }
        }
      ]
    },
    { label: 'Community Stats', icon: 'fas fa-th-large', active: activeView.value === 'Stats', action: () => { activeView.value = 'Stats'; drawerOpen.value = false } },
    { label: 'Members', icon: 'fas fa-users', active: activeView.value === 'Directory', action: () => { activeView.value = 'Directory'; drawerOpen.value = false } },
  ]
  if (isSuperAdmin(user.value?.email)) {
    const n = pendingMemberSubmissions.value.length
    items.push({
      label: 'Review Uploads',
      icon: 'fas fa-clipboard-check',
      active: activeView.value === 'Reviews',
      badge: n > 0 ? n : undefined,
      action: () => { activeView.value = 'Reviews'; drawerOpen.value = false },
    })
  }
  items.push(
    { label: 'My Assets', icon: 'fas fa-folder-open', active: activeView.value === 'Drive', action: () => { activeView.value = 'Drive'; drawerOpen.value = false } },
  )
  return items.filter((item) => {
    if (item.label === 'Members' && !isSuperAdmin(user.value?.email)) return false
    return true
  })
})

// ── Handlers ────────────────────────────────────────────────────
function closeContentForm () {
  showContentForm.value = false
  cmsModalSubtitle.value = 'Create a new highlight for the library feed'
}

async function onContentFormSaved () {
  await fetchItems()
  showContentForm.value = false
}

function handleEdit (item: CmsRaw) {
  closeReviewDetail()
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => {
    contentFormRef.value?.editPost(item)
  })
}

function handleNewContent () {
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => {
    contentFormRef.value?.openNewContentForm()
  })
}

function handleDelete (id: number) {
  pendingDeleteId.value = id
  showDeleteModal.value = true
}

async function confirmDeleteItem () {
  if (!pendingDeleteId.value || !useDashboardCmsList().apiBase) return
  try {
    await $fetch(`${useDashboardCmsList().apiBase}/cms/delete/${pendingDeleteId.value}/`, { method: 'DELETE' })
    showDeleteModal.value = false
    pendingDeleteId.value = null
    await fetchItems()
    contentFormRef.value?.loadPosts()
  } catch { /* silent */ }
}

async function approveMemberSubmission (id: number) {
  closeReviewDetail()
  try {
    await updateCMSPost(id, { approval_status: 'approved' })
    await fetchItems()
    contentFormRef.value?.loadPosts?.()
  } catch (e) {
    console.error('approveMemberSubmission', e)
  }
}

async function rejectMemberSubmission (id: number) {
  closeReviewDetail()
  try {
    await updateCMSPost(id, { approval_status: 'rejected' })
    await fetchItems()
    contentFormRef.value?.loadPosts?.()
  } catch (e) {
    console.error('rejectMemberSubmission', e)
  }
}

function handleLogout () { showLogoutModal.value = true }
function confirmLogout () { showLogoutModal.value = false; logout() }
function handleImageError () { profileImage.value = null }

onMounted(() => {
  if (process.client) {
    const storedMode = localStorage.getItem('drive_view_mode')
    if (storedMode === 'grid' || storedMode === 'list' || storedMode === 'compact') {
      driveViewMode.value = storedMode
    }
  }
  const urlToken = new URLSearchParams(window.location.search).get('token')
  if (urlToken) {
    setAuth(urlToken)
    window.history.replaceState({}, '', '/dashboard')
  } else {
    useAuth().init()
  }
  updateTime()
  setInterval(updateTime, 1000)
  if (user.value?.image) profileImage.value = user.value.image
  fetchItems()
  fetchMembersCount()
  fetchDriveData()
})

const fetchMembersCount = async () => {
  memberError.value = false
  memberErrorMessage.value = ''
  memberDirectoryMiss.value = false
  isParticipantAccessDenied.value = false
  try {
    const config = useRuntimeConfig()
    const apiBase = String(config.public.apiBase || '').replace(/\/$/, '')
    if (!apiBase) {
      memberError.value = true
      memberErrorMessage.value = 'NUXT_PUBLIC_API_BASE is not set. Add it to .env so the dashboard can load members from the API.'
      return
    }

    const raw = await $fetch<unknown>(`${apiBase}/member/list/`)
    const membersList = normalizeMembersList(raw)
    rawMembersList.value = membersList
    coreMembersCount.value = membersList.filter((m: { role?: string }) => !isParticipantRole(m?.role)).length

    const email = (user.value?.email || '').trim().toLowerCase()
    if (!email) {
      profileRedirectPending.value = true
      logout()
      return
    }

    const currentMember = membersList.find(
      (m: { email?: string }) => String(m?.email || '').trim().toLowerCase() === email
    )

    if (!currentMember) {
      member.value = null
      memberDirectoryMiss.value = true
      return
    }

    if (isParticipantRole(currentMember.role)) {
      member.value = currentMember
      isParticipantAccessDenied.value = true
      return
    }

    member.value = currentMember
  } catch (e: unknown) {
    console.error('Failed to fetch members count', e)
    memberError.value = true
    const err = e as { data?: { detail?: string }; message?: string }
    memberErrorMessage.value =
      (typeof err?.data?.detail === 'string' && err.data.detail) ||
      err?.message ||
      'Could not reach the API. Start Django (apiv1), check NUXT_PUBLIC_API_BASE, and ensure CORS allows this site.'
  } finally {
    if (!profileRedirectPending.value) {
      loadingMember.value = false
    }
  }
}


watch(() => user.value?.image, (img) => { if (img) profileImage.value = img })
watch(() => user.value?.email, () => {
  fetchDriveData()
})
watch(driveViewMode, (mode) => {
  if (!process.client) return
  localStorage.setItem('drive_view_mode', mode)
})

watch([showContentForm, showReviewDetailModal], ([form, review]) => {
  if (!process.client) return
  document.body.style.overflow = form || review ? 'hidden' : ''
})

watch(showReviewDetailModal, (open) => {
  if (!process.client) return
  reviewDetailEscCleanup?.()
  reviewDetailEscCleanup = null
  if (open) {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeReviewDetail()
    }
    window.addEventListener('keydown', fn)
    reviewDetailEscCleanup = () => window.removeEventListener('keydown', fn)
  }
})

onUnmounted(() => {
  reviewDetailEscCleanup?.()
  if (process.client) document.body.style.overflow = ''
})
</script>
