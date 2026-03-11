<template>
  <div class="dashboard-main font-inter">
    <!-- Mobile overlay: close sidebar when tapping outside -->
    <div
      class="dashboard-overlay md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
      :class="mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
      @click="mobileMenuOpen = false"
    />

    <!-- Sidebar: collapsible; on mobile = drawer -->
    <aside
      class="sidebar-violet shrink-0 transition-[width,padding,transform] duration-300 ease-out overflow-hidden dashboard-sidebar"
      :class="[sidebarCollapsed ? 'w-[72px] px-3' : 'w-[340px] p-6', { 'mobile-open': mobileMenuOpen }]"
    >
      <NuxtLink
        to="/"
        class="flex items-center mb-8 transition-all duration-200"
        :class="sidebarCollapsed ? 'justify-center gap-0' : 'gap-3'"
      >
        <img
          v-if="!logoError"
          :src="logoUrl"
          alt="Logo"
          class="h-14 w-14 rounded-full object-cover bg-white/10 shrink-0"
          @error="logoError = true"
        />
        <div v-else class="h-14 w-14 rounded-full bg-accent-purple/30 flex items-center justify-center shrink-0">
          <i class="fas fa-code text-2xl text-accent-purple"></i>
        </div>
        <span v-show="!sidebarCollapsed" class="font-extrabold text-2xl text-white whitespace-nowrap">TECH SAVVY</span>
      </NuxtLink>
      <p v-show="!sidebarCollapsed" class="text-white/70 text-sm font-semibold uppercase tracking-wider mb-4">Admin</p>
      <nav class="space-y-1 flex-1 min-h-0 overflow-hidden">
        <NuxtLink
          to="/admin-dashboard"
          class="nav-item flex items-center relative"
          :class="[isOverviewActive ? 'active text-white' : 'text-white/80', sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5']"
          @click="mobileMenuOpen = false"
        >
          <i class="fas fa-th-large w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">Overview</span>
        </NuxtLink>
        <NuxtLink
          to="/admin-dashboard#submissions"
          class="nav-item flex items-center relative"
          :class="[currentView === 'main' && route.hash === '#submissions' ? 'active text-white' : 'text-white/80', sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5']"
          @click="mobileMenuOpen = false"
        >
          <i class="fas fa-newspaper w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">Submissions</span>
        </NuxtLink>
        <NuxtLink
          to="/admin-dashboard#events"
          class="nav-item flex items-center relative"
          :class="[currentView === 'events' ? 'active text-white' : 'text-white/80', sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5']"
          @click="mobileMenuOpen = false"
        >
          <i class="fas fa-calendar-alt w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">Calendar Events</span>
        </NuxtLink>
      </nav>
      <div class="border-t border-white/10 mt-2 pt-2"></div>
      <button
        type="button"
        class="nav-item flex items-center w-full border-none bg-transparent cursor-pointer text-inherit rounded-[10px] transition-all duration-200"
        :class="sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5'"
        :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="toggleSidebar"
      >
        <i class="fas fa-columns w-5 text-center shrink-0 text-white/80"></i>
        <span v-show="!sidebarCollapsed" class="font-semibold text-lg text-white/80">Toggle Sidebar</span>
      </button>
      <div class="settings-block relative">
        <button
          type="button"
          class="nav-item settings-trigger flex items-center relative w-full border-none bg-transparent cursor-pointer text-left"
          :class="[
            sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5',
            (sidebarCollapsed && settingsOpen) ? 'active text-white' : ''
          ]"
          :aria-expanded="settingsOpen"
          aria-controls="settingsDropdown"
          @click="settingsOpen = !settingsOpen"
        >
          <i class="fas fa-cog w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">Settings</span>
          <i v-show="sidebarCollapsed && settingsOpen" class="fas fa-ellipsis-v ml-1 text-white/70 text-xs shrink-0" aria-hidden="true"></i>
        </button>
        <!-- Inline dropdown when sidebar expanded -->
        <div
          v-show="!sidebarCollapsed"
          id="settingsDropdown"
          class="settings-dropdown"
          role="menu"
          :aria-hidden="!settingsOpen"
          :class="{ open: settingsOpen }"
        >
          <NuxtLink to="/admin-dashboard#settings" class="settings-item flex items-center" :class="{ active: currentView === 'settings' }" title="Edit profile" @click="mobileMenuOpen = false">
            <i class="fas fa-pen"></i>
            <span class="settings-item-text">Edit profile</span>
          </NuxtLink>
          <NuxtLink to="/admin-dashboard#notification" class="settings-item flex items-center" :class="{ active: currentView === 'notification' }" title="Notification" @click="mobileMenuOpen = false">
            <i class="fas fa-bell"></i>
            <span class="settings-item-text">Notification</span>
          </NuxtLink>
          <NuxtLink to="/" class="settings-item flex items-center" title="Logout" @click="mobileMenuOpen = false">
            <i class="fas fa-sign-out-alt"></i>
            <span class="settings-item-text">Logout</span>
          </NuxtLink>
        </div>
        <!-- Inline icon-only rows when sidebar collapsed (stacked below Settings, no floating panel) -->
        <div
          v-show="sidebarCollapsed && settingsOpen"
          class="settings-collapsed-inline space-y-1"
          role="menu"
          aria-label="Settings menu"
        >
          <NuxtLink to="/admin-dashboard#settings" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" :class="{ active: currentView === 'settings' }" title="Edit profile" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-pen w-5 text-center"></i>
          </NuxtLink>
          <NuxtLink to="/admin-dashboard#notification" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" :class="{ active: currentView === 'notification' }" title="Notification" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-bell w-5 text-center"></i>
          </NuxtLink>
          <NuxtLink to="/" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" title="Logout" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-sign-out-alt w-5 text-center"></i>
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Main content (scrollable) -->
    <main class="dashboard-main-content flex-1 min-h-0 p-8 pl-4 pr-10 overflow-y-auto">
      <!-- Mobile: menu button -->
      <button
        type="button"
        class="md:hidden fixed top-4 left-4 z-30 p-2.5 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors"
        aria-label="Open menu"
        @click="mobileMenuOpen = true"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>
      <!-- View: Overview (dashboard-style: filters, KPIs, charts) -->
      <div v-show="isOverviewActive" class="main-view w-full overview-dashboard">
        <header class="flex flex-wrap justify-between items-center gap-4 mb-6 pt-12 md:pt-0">
          <h1 class="text-xl md:text-2xl font-normal text-white/90">Welcome back, Admin</h1>
          <NuxtLink to="/admin-dashboard#submissions" class="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold">
            <i class="fas fa-newspaper"></i> View submissions
          </NuxtLink>
        </header>

        <!-- Filter bar (date range + segment) -->
        <div class="overview-filters flex flex-wrap items-center gap-3 mb-6">
          <div class="overview-filter-pill">
            <i class="fas fa-calendar-alt text-white/50 text-sm"></i>
            <span class="text-white/80 text-sm">{{ overviewDateLabel }}</span>
          </div>
          <div class="overview-filter-pill">
            <i class="fas fa-filter text-white/50 text-sm"></i>
            <span class="text-white/80 text-sm">All submissions</span>
          </div>
        </div>

        <!-- KPI cards with trend -->
        <section class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          <button type="button" class="kpi-card kpi-card-clickable" @click="goToSubmissionsWithFilter('all')">
            <p class="kpi-label">{{ dashboardContent.sections.overview.statistics.totalSubmissions }}</p>
            <p class="kpi-value text-white">{{ overviewStats.total }}</p>
            <p class="kpi-trend"><span class="kpi-trend-text">vs previous 30 days</span><span class="kpi-trend-pct text-green-400">—</span></p>
          </button>
          <button type="button" class="kpi-card kpi-card-clickable" @click="goToSubmissionsWithFilter('pending')">
            <p class="kpi-label">{{ dashboardContent.sections.overview.statistics.pending }}</p>
            <p class="kpi-value text-accent-gold">{{ overviewStats.pending }}</p>
            <p class="kpi-trend"><span class="kpi-trend-text">vs previous 30 days</span><span class="kpi-trend-pct text-green-400">—</span></p>
          </button>
          <button type="button" class="kpi-card kpi-card-clickable" @click="goToSubmissionsWithFilter('approved')">
            <p class="kpi-label">{{ dashboardContent.sections.overview.statistics.approved }}</p>
            <p class="kpi-value text-green-400">{{ overviewStats.approved }}</p>
            <p class="kpi-trend"><span class="kpi-trend-text">vs previous 30 days</span><span class="kpi-trend-pct text-green-400">—</span></p>
          </button>
          <button type="button" class="kpi-card kpi-card-clickable" @click="goToSubmissionsWithFilter('rejected')">
            <p class="kpi-label">{{ dashboardContent.sections.overview.statistics.rejected }}</p>
            <p class="kpi-value text-red-400">{{ overviewStats.rejected }}</p>
            <p class="kpi-trend"><span class="kpi-trend-text">vs previous 30 days</span><span class="kpi-trend-pct text-green-400">—</span></p>
          </button>
          <button type="button" class="kpi-card kpi-card-clickable col-span-2 sm:col-span-1" @click="goToEvents()">
            <p class="kpi-label">{{ dashboardContent.sections.overview.statistics.upcomingEvents }}</p>
            <p class="kpi-value text-white">{{ overviewStats.upcomingEvents }}</p>
            <p class="kpi-trend"><span class="kpi-trend-text">scheduled</span><span class="kpi-trend-pct text-green-400">—</span></p>
          </button>
        </section>

        <!-- Charts row: donut, activity, events -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="overview-chart-card">
            <h3 class="overview-chart-title">Submissions by status</h3>
            <div class="overview-donut-wrap">
              <div class="overview-donut" :style="submissionsDonutStyle"></div>
              <div class="overview-donut-center">
                <span class="overview-donut-total">{{ overviewStats.total }}</span>
                <span class="overview-donut-label">Total</span>
              </div>
            </div>
            <div class="overview-legend">
              <span class="overview-legend-item"><i class="fas fa-circle text-accent-gold"></i> Pending {{ overviewStats.pending }}</span>
              <span class="overview-legend-item"><i class="fas fa-circle text-green-400"></i> Approved {{ overviewStats.approved }}</span>
              <span class="overview-legend-item"><i class="fas fa-circle text-red-400"></i> Rejected {{ overviewStats.rejected }}</span>
            </div>
          </div>
          <div class="overview-chart-card">
            <h3 class="overview-chart-title">Activity</h3>
            <div class="overview-bars">
              <div v-for="(bar, i) in activityBars" :key="i" class="overview-bar-row">
                <span class="overview-bar-label">{{ bar.label }}</span>
                <div class="overview-bar-track"><div class="overview-bar-fill" :class="bar.color" :style="{ width: bar.pct + '%' }"></div></div>
                <span class="overview-bar-value">{{ bar.value }}</span>
              </div>
            </div>
          </div>
          <div class="overview-chart-card">
            <h3 class="overview-chart-title">Upcoming events</h3>
            <div v-if="upcomingEventsList.length === 0" class="text-white/50 text-sm py-6">No upcoming events</div>
            <ul v-else class="overview-events-list">
              <li v-for="ev in upcomingEventsList" :key="ev.id" class="overview-event-item">
                <span class="overview-event-title">{{ ev.title || 'Untitled' }}</span>
                <span class="overview-event-date">{{ formatEventDate(ev.date) }}{{ ev.time ? ' · ' + ev.time : '' }}</span>
              </li>
            </ul>
            <NuxtLink v-if="upcomingEventsList.length > 0" to="/admin-dashboard#events" class="overview-chart-link">View all events <i class="fas fa-arrow-right text-xs"></i></NuxtLink>
          </div>
        </section>
      </div>

      <!-- View: Submissions (filter + list) -->
      <div v-show="currentView === 'main' && route.hash === '#submissions'" class="main-view w-full">
        <header class="flex flex-wrap justify-between items-center gap-4 mb-6 pt-12 md:pt-0">
          <h1 class="text-xl md:text-2xl font-normal text-white/90">Submissions</h1>
          <NuxtLink to="/admin-dashboard" class="text-white/70 hover:text-white text-sm font-medium inline-flex items-center gap-1">
            <i class="fas fa-th-large"></i> Back to overview
          </NuxtLink>
        </header>

        <section class="glass-card p-6 mb-6">
          <h2 class="text-lg font-bold text-white mb-4">{{ dashboardContent.sections.overview.filterTitle }}</h2>
          <p class="text-white/60 text-sm mb-4">{{ dashboardContent.sections.overview.filterDescription }}</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="f in dashboardContent.filters"
              :key="f.value"
              type="button"
              class="filter-pill"
              :class="{ active: currentFilter === f.value }"
              :data-filter="f.value"
              @click="currentFilter = f.value"
            >
              {{ f.label }}
            </button>
          </div>
        </section>

        <section id="submissions" class="glass-card p-8">
          <h2 class="text-xl font-bold mb-4 text-white">{{ dashboardContent.sections.overview.submissionsTitle }}</h2>
          <p class="text-white/60 text-sm mb-6">{{ dashboardContent.sections.overview.submissionsDescription }}</p>
          <div v-if="filteredSubmissions.length === 0" class="text-white/50 py-8">{{ dashboardContent.sections.overview.emptySubmissions }}</div>
          <div v-else class="space-y-4">
            <div
              v-for="item in filteredSubmissions"
              :key="item.id"
              class="p-5 rounded-xl bg-white/5 border border-white/10"
            >
              <div class="flex flex-wrap justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-white truncate">{{ item.title || 'Untitled' }}</h3>
                  <p class="text-white/60 text-sm mt-1">{{ (item.summary || '').slice(0, 120) }}{{ (item.summary || '').length > 120 ? '…' : '' }}</p>
                  <p class="text-white/50 text-xs mt-2">{{ formatDate(item.date) }} · <span :class="statusClass(item.status)">{{ item.status }}</span></p>
                </div>
                <img v-if="item.imageUrl" :src="item.imageUrl" alt="" class="w-20 h-20 rounded-lg object-cover shrink-0" @error="($event.target as HTMLImageElement).style.display = 'none'">
              </div>
              <template v-if="(item.status || 'pending') === 'pending'">
                <div class="flex gap-2 mt-3">
                  <button type="button" class="btn-approve px-4 py-2 text-sm font-semibold" @click="setStatus(item.id, 'approved')"><i class="fas fa-check mr-1"></i> Approve</button>
                  <button type="button" class="btn-reject px-4 py-2 text-sm font-semibold" @click="setStatus(item.id, 'rejected')"><i class="fas fa-times mr-1"></i> Reject</button>
                </div>
              </template>
              <p v-else class="text-sm mt-2 text-white/50">Status: <span :class="statusClass(item.status)">{{ item.status }}</span></p>
            </div>
          </div>
        </section>
      </div>

      <!-- View: Calendar Events -->
      <div v-show="currentView === 'events'" class="main-view w-full">
        <div class="event-view-layout w-full">
          <div class="event-form-wrap">
            <header class="mb-6">
              <h1 class="text-2xl font-normal text-white/90">{{ dashboardContent.sections.events.pageTitle }}</h1>
              <p class="text-white/60 text-sm mt-1">{{ dashboardContent.sections.events.pageDescription }}</p>
            </header>
            <section class="glass-card p-6 mb-6">
              <h2 class="text-lg font-bold text-white mb-4">{{ dashboardContent.sections.events.addEventTitle }}</h2>
              <form class="space-y-4" @submit.prevent="onEventSubmit">
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Event title</label>
                  <input v-model="eventForm.title" type="text" required placeholder="e.g. Code Camp Workshop" class="input-field w-full px-4 py-3" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Date</label>
                    <input v-model="eventForm.date" type="date" required class="input-field w-full px-4 py-3" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Time <span class="text-white/50 font-normal">(optional)</span></label>
                    <input v-model="eventForm.time" type="text" placeholder="e.g. 2:00 PM" class="input-field w-full px-4 py-3" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Description <span class="text-white/50 font-normal">(optional)</span></label>
                  <textarea v-model="eventForm.description" rows="2" placeholder="Short description for the event" class="input-field w-full px-4 py-3 resize-none" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Link <span class="text-white/50 font-normal">(optional)</span></label>
                  <input v-model="eventForm.link" type="url" placeholder="https://..." class="input-field w-full px-4 py-3" />
                </div>
                <div class="flex gap-3">
                  <button type="submit" class="btn-primary px-5 py-2.5 inline-flex items-center gap-2">
                    <i :class="editingEventId ? 'fas fa-save' : 'fas fa-plus'"></i> {{ editingEventId ? 'Save changes' : 'Add event' }}
                  </button>
                  <button v-show="editingEventId" type="button" class="btn-secondary px-5 py-2.5" @click="cancelEventEdit">Cancel edit</button>
                </div>
              </form>
            </section>
            <section class="glass-card p-6">
              <h2 class="text-lg font-bold text-white mb-4">{{ dashboardContent.sections.events.upcomingTitle }}</h2>
              <div v-if="calendarEvents.length === 0" class="text-white/50 py-4">{{ dashboardContent.sections.events.emptyEvents }}</div>
              <div v-else class="space-y-3">
                <div
                  v-for="ev in sortedEvents"
                  :key="ev.id"
                  class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap justify-between items-start gap-2"
                >
                  <div class="min-w-0">
                    <h3 class="font-bold text-white">{{ ev.title || 'Untitled' }}</h3>
                    <p class="text-white/60 text-sm mt-1">{{ formatEventDate(ev.date) }}{{ ev.time?.trim() ? ' · ' + ev.time.trim() : '' }}</p>
                    <p v-if="ev.description?.trim()" class="text-white/70 text-sm mt-2">{{ (ev.description || '').slice(0, 120) }}{{ (ev.description || '').length > 120 ? '…' : '' }}</p>
                  </div>
                  <div class="flex gap-2 shrink-0">
                    <button type="button" class="btn-secondary px-3 py-1.5 text-sm" @click="editEvent(ev)"><i class="fas fa-pen mr-1"></i> Edit</button>
                    <button type="button" class="px-3 py-1.5 text-sm rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-400/30" @click="deleteEvent(ev.id)"><i class="fas fa-trash mr-1"></i> Delete</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <aside class="event-right-panel">
            <h3 class="panel-title"><i class="fas fa-eye"></i> Preview on landing</h3>
            <div class="event-preview-card">
              <div class="preview-date">{{ eventPreviewDate }}</div>
              <h4 class="preview-title">{{ eventForm.title || 'Event title will appear here' }}</h4>
              <p class="preview-desc">{{ eventForm.description?.trim() || 'Description (if added) shows here.' }}</p>
            </div>
            <h3 class="panel-title"><i class="fas fa-lightbulb"></i> Tips</h3>
            <ul class="event-tips-list">
              <li v-for="(tip, i) in dashboardContent.tips.event" :key="i"><i class="fas" :class="tip.icon"></i><span>{{ tip.text }}</span></li>
            </ul>
          </aside>
        </div>
      </div>

      <!-- View: Settings > Edit profile -->
      <div v-show="currentView === 'settings'" class="main-view w-full">
        <div class="profile-settings-layout w-full">
          <div class="profile-form-wrap">
            <section class="glass-card p-8">
              <h2 class="text-2xl font-bold text-white mb-6">{{ dashboardContent.sections.profile.pageTitle }}</h2>
              <div class="profile-photo-wrap">
                <input
                  ref="profilePhotoInputRef"
                  type="file"
                  accept="image/*"
                  class="sr-only"
                  aria-label="Upload profile photo"
                  @change="onProfilePhotoChange"
                />
                <div class="profile-photo-large profile-photo-clickable" @click="triggerPhotoInput">
                  <img v-if="profile.avatar" :src="profile.avatar" alt="Profile" class="profile-photo-img" />
                  <span v-else>{{ profileInitial }}</span>
                </div>
                <button type="button" class="profile-photo-upload-btn" @click="triggerPhotoInput">
                  <i class="fas fa-camera mr-1"></i> Upload photo
                </button>
              </div>
              <form class="space-y-5" @submit.prevent="onProfileSubmit">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">First Name</label>
                    <input v-model="profile.firstName" type="text" class="input-field w-full px-4 py-3" placeholder="e.g. John" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Last Name</label>
                    <input v-model="profile.lastName" type="text" class="input-field w-full px-4 py-3" placeholder="e.g. Doe" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Middle Name <span class="text-white/50 font-normal">(optional)</span></label>
                  <input v-model="profile.middleName" type="text" class="input-field w-full px-4 py-3" placeholder="e.g. Miguel" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Email</label>
                  <input v-model="profile.email" type="email" class="input-field w-full px-4 py-3" placeholder="you@example.com" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Address</label>
                  <input v-model="profile.address" type="text" class="input-field w-full px-4 py-3" placeholder="e.g. 123 Main St, Apt 4" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Contact Number</label>
                  <div class="contact-number-wrap">
                    <span class="contact-prefix">+63</span>
                    <input
                      v-model="profile.contactNumber"
                      type="tel"
                      inputmode="numeric"
                      maxlength="10"
                      class="input-field flex-1 min-w-0 px-4 py-3"
                      placeholder="917 123 4567"
                      autocomplete="tel"
                      @input="onContactNumberInput"
                    />
                  </div>
                  <p class="form-hint mt-1"><i class="fas fa-info-circle"></i> Philippine mobile number (10 digits, no +63)</p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Province</label>
                    <select v-model="profile.state" class="input-field w-full px-4 py-3 select-dash" :class="{ 'select-placeholder': !profile.state }">
                      <option v-for="opt in profileStates" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">City</label>
                    <select v-model="profile.city" class="input-field w-full px-4 py-3 select-dash" :class="{ 'select-placeholder': !profile.city }" :disabled="!profile.state">
                      <option v-for="opt in profileCities" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Date of Birth <span class="text-white/50 font-normal">(optional)</span></label>
                    <input v-model="profile.dateOfBirth" type="date" class="input-field w-full px-4 py-3" />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-white/80 mb-2">Gender <span class="text-white/50 font-normal">(optional)</span></label>
                    <select v-model="profile.gender" class="input-field w-full px-4 py-3 select-dash" :class="{ 'select-placeholder': !profile.gender }">
                      <option v-for="opt in profileGenders" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Occupation / Job Title <span class="text-white/50 font-normal">(optional)</span></label>
                  <input v-model="profile.occupation" type="text" class="input-field w-full px-4 py-3" placeholder="e.g. Software Developer" />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Bio / About <span class="text-white/50 font-normal">(optional)</span></label>
                  <textarea v-model="profile.bio" rows="3" class="input-field w-full px-4 py-3 textarea-dash" placeholder="A short intro about yourself..." />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Password</label>
                  <div class="password-input-wrap">
                    <input
                      v-model="profile.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="input-field w-full px-4 py-3 pr-12"
                      placeholder="Leave blank to keep current"
                      autocomplete="new-password"
                    />
                    <button type="button" class="password-toggle" aria-label="Toggle password visibility" @click="showPassword = !showPassword">
                      <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-white/80 mb-2">Confirm Password</label>
                  <div class="password-input-wrap">
                    <input
                      v-model="profile.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="input-field w-full px-4 py-3 pr-12"
                      placeholder="Re-enter password to confirm"
                      autocomplete="new-password"
                    />
                    <button type="button" class="password-toggle" aria-label="Toggle confirm password visibility" @click="showConfirmPassword = !showConfirmPassword">
                      <i class="fas" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                    </button>
                  </div>
                </div>
                <div class="flex gap-3 pt-2">
                  <button type="submit" class="btn-primary px-6 py-3">Save</button>
                  <NuxtLink to="/admin-dashboard" class="btn-outline px-6 py-3">Cancel</NuxtLink>
                </div>
              </form>
            </section>
          </div>
          <aside class="profile-right-panel">
            <h3 class="panel-title"><i class="fas fa-lightbulb"></i> Tips</h3>
            <ul class="profile-tips-list">
              <li v-for="(tip, i) in dashboardContent.tips.profile" :key="i"><i class="fas" :class="tip.icon"></i><span>{{ tip.text }}</span></li>
            </ul>
          </aside>
        </div>
      </div>

      <!-- View: Notifications -->
      <div v-show="currentView === 'notification'" class="main-view w-full">
        <div class="notification-view-layout w-full">
          <div class="notification-list-wrap">
            <header class="mb-6">
              <h1 class="text-2xl font-normal text-white/90">{{ dashboardContent.sections.notifications.pageTitle }}</h1>
              <p class="text-white/60 text-sm mt-1">{{ dashboardContent.sections.notifications.pageDescription }}</p>
            </header>
            <section class="glass-card p-6">
              <div v-if="notifications.length === 0" class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>{{ dashboardContent.sections.notifications.emptyTitle }}</p>
                <p class="text-sm mt-1">{{ dashboardContent.sections.notifications.emptyDescription }}</p>
              </div>
              <div v-else class="space-y-0">
                <div
                  v-for="(n, idx) in notifications"
                  :key="idx"
                  class="notification-item"
                  :class="{ unread: !n.read }"
                >
                  <div class="notif-icon"><i class="fas" :class="n.icon || 'fa-bell'"></i></div>
                  <div class="notif-body">
                    <div class="notif-title">{{ n.title || 'Notification' }}</div>
                    <div class="notif-text">{{ n.text }}</div>
                    <div class="notif-time">{{ n.time }}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <aside class="notification-prefs-panel">
            <h3 class="panel-title"><i class="fas fa-cog"></i> {{ dashboardContent.sections.preferences.panelTitle }}</h3>
            <div class="pref-row">
              <span>{{ dashboardContent.sections.preferences.emailLabel }}</span>
              <button type="button" class="toggle-switch" :class="{ on: prefEmail }" aria-label="Toggle email notifications" @click="prefEmail = !prefEmail" />
            </div>
            <div class="pref-row">
              <span>{{ dashboardContent.sections.preferences.inAppLabel }}</span>
              <button type="button" class="toggle-switch" :class="{ on: prefInApp }" aria-label="Toggle in-app notifications" @click="prefInApp = !prefInApp" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const SIDEBAR_COLLAPSED_KEY = 'dashboardSidebarCollapsed'
const { getItem: getStorage, setItem: setStorage } = useSafeStorage()
const api = useDashboardApi()

const route = useRoute()
const router = useRouter()

const logoUrl = '/assets/codebev-logo.png'
const logoError = ref(false)
const settingsOpen = ref(false)
const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)
const currentFilter = ref<string>('all')
const prefEmail = ref(true)
const prefInApp = ref(true)
const editingEventId = ref<string | null>(null)

const ADMIN_DASHBOARD_DATA_URL = '/data/admin-dashboard.json'

const defaultAdminContent = {
  sections: {
    overview: { filterTitle: 'Filter submissions', filterDescription: 'Choose which submissions to show on the landing page. Only approved items appear in News & Updates.', submissionsTitle: 'News & updates submissions', submissionsDescription: 'Approve or reject community submissions. Approved items will appear on the landing page.', emptySubmissions: 'No submissions match the current filter.', statistics: { totalSubmissions: 'Total submissions', pending: 'Pending', approved: 'Approved', rejected: 'Rejected', upcomingEvents: 'Upcoming events' } },
    events: { pageTitle: 'Calendar Events', pageDescription: 'Add events to show on the landing page Community Calendar section.', addEventTitle: 'Add event', upcomingTitle: 'Upcoming events', emptyEvents: 'No events yet. Add one above to show on the landing page.' },
    notifications: { pageTitle: 'Notifications', pageDescription: 'Updates about submissions and calendar.', emptyTitle: 'No notifications yet.', emptyDescription: "When there's activity, it'll show here." },
    profile: { pageTitle: 'Edit profile' },
    preferences: { panelTitle: 'Preferences', emailLabel: 'Email notifications', inAppLabel: 'In-app notifications' }
  },
  tips: {
    event: [{ icon: 'fa-calendar-check', text: 'Use a clear date so visitors see when the event is.' }, { icon: 'fa-clock', text: 'Add time (e.g. 2:00 PM) for better clarity.' }, { icon: 'fa-link', text: 'Link to registration or more info if you have one.' }],
    profile: [{ icon: 'fa-lock', text: 'Leave password blank to keep your current password.' }, { icon: 'fa-envelope', text: 'Use a valid email so we can reach you.' }, { icon: 'fa-map-marker-alt', text: 'City and state help us show local events and news.' }]
  },
  filters: [{ value: 'all', label: 'All' }, { value: 'pending', label: 'Pending' }, { value: 'approved', label: 'Approved' }, { value: 'rejected', label: 'Rejected' }],
  sampleData: { submissions: [] as Array<{ id: string; title: string; summary: string; imageUrl: string; date: string; link: string; status: string; author?: string }>, calendarEvents: [] as Array<{ id: string; title: string; date: string; time?: string; description?: string; link?: string }>, notifications: [] as Array<{ title?: string; text?: string; time?: string; read?: boolean; icon?: string }> }
}

const dashboardContent = ref<typeof defaultAdminContent>(defaultAdminContent)

const submissions = ref<Array<{ id: string; title: string; summary: string; description?: string; imageUrl: string; images?: string[]; headlineIndex?: number; date: string; link: string; status: string; author?: string }>>([])
const calendarEvents = ref<Array<{ id: string; title: string; date: string; time?: string; description?: string; link?: string }>>([])
const profilePhotoInputRef = ref<HTMLInputElement | null>(null)
const { states: profileStates, getCitiesForProvince, fetchCitiesFromApi, hasLocationsApi, genders: profileGenders } = useProfileOptions()
const profile = ref({
  firstName: '', lastName: '', middleName: '', email: '', address: '', contactNumber: '', city: '', state: '',
  dateOfBirth: '', gender: '', occupation: '', bio: '', password: '', confirmPassword: '', avatar: '' as string
})
const profileCities = ref<{ value: string; label: string }[]>([])

const profileCitiesOptions = computed(() => {
  if (!profile.value.state) return [{ value: '', label: 'Select province first' }]
  return getCitiesForProvince(profile.value.state)
})

watch(() => profile.value.state, async (newProvince, oldProvince) => {
  if (newProvince !== oldProvince) {
    const cities = getCitiesForProvince(newProvince || '')
    const cityValues = cities.map((c) => c.value).filter(Boolean)
    if (profile.value.city && !cityValues.includes(profile.value.city)) {
      profile.value.city = ''
    }
    if (hasLocationsApi && newProvince) {
      const apiCities = await fetchCitiesFromApi(newProvince)
      profileCities.value = apiCities.length > 0 ? [{ value: '', label: 'Select city' }, ...apiCities] : cities
    } else {
      profileCities.value = cities
    }
  }
}, { immediate: true })

watch(profileCitiesOptions, (opts) => {
  if (!hasLocationsApi) profileCities.value = opts
}, { immediate: true })
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const notifications = ref<Array<{ title?: string; text?: string; time?: string; read?: boolean; icon?: string }>>([])

const eventForm = ref({ title: '', date: '', time: '', description: '', link: '' })

const currentView = computed(() => {
  const h = (route.hash || '').replace('#', '')
  if (h === 'events') return 'events'
  if (h === 'settings') return 'settings'
  if (h === 'notification') return 'notification'
  return 'main'
})

const isOverviewActive = computed(() => currentView.value === 'main' && route.hash !== '#submissions')

const filteredSubmissions = computed(() => {
  let list = submissions.value
  const filter = currentFilter.value
  if (filter && filter !== 'all') list = list.filter((x) => (x.status || 'pending') === filter)
  return list
})

const overviewStats = computed(() => {
  const list = submissions.value
  const today = new Date().toISOString().slice(0, 10)
  const pending = list.filter((x) => (x.status || 'pending') === 'pending').length
  const approved = list.filter((x) => (x.status || 'pending') === 'approved').length
  const rejected = list.filter((x) => (x.status || 'pending') === 'rejected').length
  const upcomingEvents = calendarEvents.value.filter((e) => (e.date || '') >= today).length
  return {
    total: list.length,
    pending,
    approved,
    rejected,
    upcomingEvents
  }
})

const sortedEvents = computed(() => [...calendarEvents.value].sort((a, b) => (a.date || '').localeCompare(b.date || '')))

const todayIso = computed(() => new Date().toISOString().slice(0, 10))
const overviewDateLabel = computed(() => {
  const d = new Date()
  const start = new Date(d.getFullYear(), d.getMonth(), 1)
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0)
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
})

const submissionsDonutStyle = computed(() => {
  const { pending, approved, rejected } = overviewStats.value
  const total = pending + approved + rejected
  if (total === 0) return { background: 'conic-gradient(rgba(255,255,255,0.15) 0deg 360deg)' }
  const pctP = (pending / total) * 100
  const pctA = (approved / total) * 100
  const pctR = (rejected / total) * 100
  const degP = (pctP / 100) * 360
  const degA = (pctA / 100) * 360
  const degR = (pctR / 100) * 360
  return {
    background: `conic-gradient(#FFD74A 0deg ${degP}deg, #22c55e ${degP}deg ${degP + degA}deg, #ef4444 ${degP + degA}deg 360deg)`
  }
})

const activityBars = computed(() => {
  const { pending, approved, rejected, total } = { ...overviewStats.value, total: overviewStats.value.total }
  const max = Math.max(total, 1)
  return [
    { label: 'Pending', value: pending, pct: (pending / max) * 100, color: 'bg-accent-gold' },
    { label: 'Approved', value: approved, pct: (approved / max) * 100, color: 'bg-green-400' },
    { label: 'Rejected', value: rejected, pct: (rejected / max) * 100, color: 'bg-red-400' }
  ]
})

const upcomingEventsList = computed(() => {
  const today = todayIso.value
  return [...calendarEvents.value]
    .filter((e) => (e.date || '') >= today)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
    .slice(0, 5)
})

const profileInitial = computed(() => {
  const p = profile.value
  const first = (p.firstName || '').trim().charAt(0)
  const last = (p.lastName || '').trim().charAt(0)
  return (first || last || '?').toUpperCase()
})

const eventPreviewDate = computed(() => {
  const d = eventForm.value.date
  const t = eventForm.value.time?.trim()
  if (!d) return ''
  try {
    const x = new Date(d + 'T12:00:00')
    if (isNaN(x.getTime())) return d + (t ? ' · ' + t : '')
    const m = x.toLocaleDateString('en-US', { month: 'short' })
    const day = x.getDate()
    const y = x.getFullYear()
    return t ? `${m} ${day}, ${y} · ${t}` : `${m} ${day}, ${y}`
  } catch {
    return d + (t ? ' · ' + t : '')
  }
})

function statusClass(status: string) {
  if (status === 'approved') return 'text-green-400'
  if (status === 'rejected') return 'text-red-400'
  return 'text-accent-gold'
}

function goToSubmissionsWithFilter(filter: string) {
  currentFilter.value = filter
  router.push('/admin-dashboard#submissions')
}

function goToEvents() {
  router.push('/admin-dashboard#events')
}

function formatDate(str: string) {
  if (!str) return '—'
  const d = new Date(str)
  return isNaN(d.getTime()) ? str : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatEventDate(d: string) {
  if (!d) return '—'
  const x = new Date(d)
  return isNaN(x.getTime()) ? d : x.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

async function loadSubmissions() {
  if (import.meta.client) submissions.value = await api.getSubmissions()
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  if (import.meta.client) setStorage(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed.value))
}

async function setStatus(id: string, status: string) {
  const item = submissions.value.find((x) => x.id === id)
  if (!item) return
  const ok = await api.setSubmissionStatus(id, status)
  if (!ok) return
  item.status = status
  if (status === 'approved') {
    const approved = await api.getApprovedNews()
    if (!approved.find((x: { id: string }) => x.id === id)) {
      approved.push({
        id: item.id,
        title: item.title,
        summary: item.summary,
        description: item.description,
        imageUrl: item.imageUrl,
        images: item.images,
        headlineIndex: item.headlineIndex,
        date: item.date,
        link: item.link || '#'
      })
      await api.saveApprovedNews(approved)
    }
  } else if (status === 'rejected') {
    const approved = (await api.getApprovedNews()).filter((x: { id: string }) => x.id !== id)
    await api.saveApprovedNews(approved)
  }
}

async function loadCalendarEvents() {
  if (import.meta.client) calendarEvents.value = await api.getCalendarEvents()
}

async function saveCalendarEvents() {
  await api.saveCalendarEvents(calendarEvents.value)
}

async function onEventSubmit() {
  const f = eventForm.value
  const id = editingEventId.value || 'ev_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
  const payload = { id, title: f.title.trim(), date: f.date, time: f.time.trim(), description: f.description.trim(), link: f.link.trim() }
  if (editingEventId.value) {
    const idx = calendarEvents.value.findIndex((e) => e.id === editingEventId.value)
    if (idx >= 0) {
      calendarEvents.value[idx] = payload
      await api.updateCalendarEvent(id, payload)
    } else {
      calendarEvents.value.push(payload)
      await saveCalendarEvents()
    }
  } else {
    const created = await api.createCalendarEvent({ title: payload.title, date: payload.date, time: payload.time, description: payload.description, link: payload.link })
    if (created) calendarEvents.value.push({ ...payload, id: created.id })
    else calendarEvents.value.push(payload)
    await saveCalendarEvents()
  }
  eventForm.value = { title: '', date: '', time: '', description: '', link: '' }
  editingEventId.value = null
}

function editEvent(ev: (typeof calendarEvents.value)[0]) {
  eventForm.value = { title: ev.title, date: ev.date, time: ev.time || '', description: ev.description || '', link: ev.link || '' }
  editingEventId.value = ev.id
}

function cancelEventEdit() {
  eventForm.value = { title: '', date: '', time: '', description: '', link: '' }
  editingEventId.value = null
}

async function deleteEvent(id: string) {
  if (import.meta.client && !confirm('Delete this event?')) return
  const ok = await api.deleteCalendarEvent(id)
  if (ok) calendarEvents.value = calendarEvents.value.filter((e) => e.id !== id)
}

function onContactNumberInput(e: Event) {
  const input = e.target as HTMLInputElement
  const digits = (input.value || '').replace(/\D/g, '').slice(0, 10)
  profile.value.contactNumber = digits
}

async function loadProfile() {
  if (import.meta.client) {
    const p = await api.getProfile()
    profile.value = { ...profile.value, ...p, password: '', confirmPassword: '' }
  }
}

function triggerPhotoInput() {
  profilePhotoInputRef.value?.click()
}

async function onProfilePhotoChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
  profile.value.avatar = await resizeImageDataUrl(dataUrl, 300)
  input.value = ''
}

function resizeImageDataUrl(dataUrl: string, maxSize: number): Promise<string> {
  if (!import.meta.client) return Promise.resolve(dataUrl)
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.onload = () => {
      let w = img.width
      let h = img.height
      if (w <= maxSize && h <= maxSize) { resolve(dataUrl); return }
      if (w > h) { h = Math.round((h * maxSize) / w); w = maxSize } else { w = Math.round((w * maxSize) / h); h = maxSize }
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(dataUrl); return }
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

async function onProfileSubmit() {
  const p = profile.value
  const pw = (p.password || '').trim()
  const confirm = (p.confirmPassword || '').trim()
  if (pw && pw !== confirm) {
    if (import.meta.client) alert('Password and Confirm password do not match.')
    return
  }
  const contactDigits = (p.contactNumber || '').replace(/\D/g, '').slice(0, 10)
  const toSave = {
    firstName: p.firstName.trim(), lastName: p.lastName.trim(), middleName: (p.middleName || '').trim(),
    email: p.email.trim(), address: p.address.trim(), contactNumber: contactDigits, city: (p.city || '').trim(), state: (p.state || '').trim(),
    dateOfBirth: (p.dateOfBirth || '').trim(), gender: (p.gender || '').trim(), occupation: (p.occupation || '').trim(), bio: (p.bio || '').trim(),
    avatar: p.avatar
  }
  const ok = await api.saveProfile(toSave)
  profile.value.password = ''
  profile.value.confirmPassword = ''
  if (import.meta.client) alert(ok ? 'Profile saved.' : 'Failed to save profile.')
  router.push('/admin-dashboard')
}

async function loadNotifications() {
  if (import.meta.client) notifications.value = await api.getNotifications()
}

useHead({
  title: 'Admin Dashboard — Manage News & Updates | TECH SAVVY',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
  ]
})

onMounted(async () => {
  if (import.meta.client) {
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.height = '100%'
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    try {
      sidebarCollapsed.value = getStorage(SIDEBAR_COLLAPSED_KEY) === 'true'
    } catch { /* ignore */ }
  }
  async function loadDashboardContent () {
    try {
      const res = await fetch(ADMIN_DASHBOARD_DATA_URL)
      if (res.ok) {
        const data = await res.json()
        if (data.sections) {
          dashboardContent.value.sections = {
            ...defaultAdminContent.sections,
            ...data.sections,
            overview: { ...defaultAdminContent.sections.overview, ...data.sections.overview }
          }
        }
        if (data.tips) dashboardContent.value.tips = { ...defaultAdminContent.tips, ...data.tips }
        if (data.filters?.length) dashboardContent.value.filters = data.filters
        if (data.sampleData) dashboardContent.value.sampleData = data.sampleData
      }
    } catch { /* use defaults */ }
  }
  await loadDashboardContent()
  await loadSubmissions()
  await loadCalendarEvents()
  loadProfile()
  await loadNotifications()
  const content = dashboardContent.value
  if (submissions.value.length === 0 && content.sampleData?.submissions?.length) submissions.value = [...content.sampleData.submissions]
  if (calendarEvents.value.length === 0 && content.sampleData?.calendarEvents?.length) calendarEvents.value = [...content.sampleData.calendarEvents]
  if (notifications.value.length === 0 && content.sampleData?.notifications?.length) notifications.value = [...content.sampleData.notifications]
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.documentElement.style.overflow = ''
    document.documentElement.style.height = ''
    document.body.style.overflow = ''
    document.body.style.height = ''
  }
})
</script>

<style scoped>
.dashboard-main {
  background: linear-gradient(258.29deg, rgba(20, 8, 46, 0.97) 1%, rgba(35, 21, 89, 0.95) 91.78%);
  height: 100vh;
  max-height: 100vh;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', system-ui, sans-serif;
}
</style>

<style>
.sidebar-violet {
  background: #231559;
  border-radius: 40px;
  border: 1px solid rgba(181, 163, 255, 0.2);
  height: calc(100vh - 2rem);
  max-height: calc(100vh - 2rem);
  margin: 1rem 0 1rem 1.5rem;
  overflow: hidden !important;
  overflow-y: hidden !important;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.nav-item { border-radius: 10px; transition: background 0.2s, color 0.2s; }
.nav-item.active { background: rgba(255, 255, 255, 0.15); color: #fff; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); }
.nav-item.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 34px; background: #B5A3FF; border-radius: 70px; }
.nav-item:not(.active):hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
/* Mobile: drawer sidebar + main padding */
@media (max-width: 767px) {
  .dashboard-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    border-radius: 0;
    width: 280px !important;
    padding: 1.5rem !important;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .dashboard-sidebar.mobile-open { transform: translateX(0); }
  .dashboard-main-content { padding: 1rem !important; padding-top: 3.5rem !important; min-width: 0; }
  .glass-card { padding: 1rem 1.25rem !important; border-radius: 16px; }
  .main-view header h1 { font-size: 1.25rem; }
  section.glass-card h2 { font-size: 1rem; }
  .filter-pill { padding: 0.4rem 0.75rem; font-size: 0.875rem; }
  .btn-primary, .btn-secondary, .btn-approve, .btn-reject { padding: 0.5rem 0.75rem; font-size: 0.875rem; }
  .event-view-layout .event-form-wrap { flex: 1 1 100%; }
  .event-view-layout .event-right-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .profile-settings-layout .profile-form-wrap { flex: 1 1 100%; }
  .profile-settings-layout .profile-right-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .notification-view-layout .notification-list-wrap { flex: 1 1 100%; }
  .notification-view-layout .notification-prefs-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .glass-card, .event-form-wrap, .profile-form-wrap, .notification-list-wrap { font-size: 0.875rem; }
  .glass-card h2, .event-form-wrap h2, .profile-form-wrap h2 { font-size: 1rem; }
  .input-field { font-size: 0.875rem; padding: 0.5rem 0.75rem; }
  label, .form-label { font-size: 0.8125rem; }
  .settings-item { font-size: 1rem; }
  .event-preview-card .preview-title { font-size: 0.9375rem; }
  .event-preview-card .preview-desc { font-size: 0.75rem; }
  .notification-item .notif-title { font-size: 0.875rem; }
  .notification-item .notif-text { font-size: 0.75rem; }
  .pref-row { font-size: 0.8125rem; }
}
.glass-card { background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 20px; }

/* Overview stat cards */
.stat-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 16px;
  background: rgba(20, 8, 46, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(181, 163, 255, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border-color: rgba(181, 163, 255, 0.2);
}
.stat-card-icon-wrap {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-card-icon {
  font-size: 1rem;
  opacity: 0.95;
}
.stat-card-total { border-left: 3px solid rgba(181, 163, 255, 0.5); }
.stat-card-total .stat-card-icon-wrap { background: rgba(181, 163, 255, 0.25); color: #B5A3FF; }
.stat-card-pending { border-left: 3px solid rgba(255, 215, 74, 0.5); }
.stat-card-pending .stat-card-icon-wrap { background: rgba(255, 215, 74, 0.2); color: #FFD74A; }
.stat-card-approved { border-left: 3px solid rgba(34, 197, 94, 0.5); }
.stat-card-approved .stat-card-icon-wrap { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.stat-card-rejected { border-left: 3px solid rgba(239, 68, 68, 0.5); }
.stat-card-rejected .stat-card-icon-wrap { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.stat-card-events { border-left: 3px solid rgba(181, 163, 255, 0.5); }
.stat-card-events .stat-card-icon-wrap { background: rgba(181, 163, 255, 0.25); color: #B5A3FF; }
.stat-card-body { min-width: 0; }
.stat-card-label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0.25rem;
  line-height: 1.2;
}
.stat-card-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}
@media (min-width: 640px) {
  .stat-card { padding: 1.25rem 1.5rem; }
  .stat-card-icon-wrap { width: 44px; height: 44px; min-width: 44px; }
  .stat-card-icon { font-size: 1.125rem; }
  .stat-card-label { font-size: 0.75rem; }
  .stat-card-value { font-size: 1.75rem; }
}
@media (min-width: 1024px) {
  .stat-card-value { font-size: 2rem; }
}

/* Overview dashboard: filter bar, KPI cards, charts row */
.overview-dashboard .overview-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }
.overview-filter-pill {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.5rem 1rem; border-radius: 10px;
  background: rgba(20, 8, 46, 0.6); border: 1px solid rgba(181, 163, 255, 0.2);
  font-size: 0.8125rem;
}
.kpi-card {
  padding: 1rem 1.25rem; border-radius: 16px;
  background: rgba(20, 8, 46, 0.5); backdrop-filter: blur(12px);
  border: 1px solid rgba(181, 163, 255, 0.12);
}
.kpi-card-clickable {
  cursor: pointer; text-align: left; width: 100%; font: inherit; color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.kpi-card:hover {
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25); border-color: rgba(181, 163, 255, 0.2);
}
.kpi-label { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255, 255, 255, 0.55); margin-bottom: 0.25rem; line-height: 1.2; }
.kpi-value { font-size: 1.5rem; font-weight: 700; line-height: 1.2; font-variant-numeric: tabular-nums; margin-bottom: 0.25rem; }
.kpi-trend { font-size: 0.6875rem; color: rgba(255, 255, 255, 0.5); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
.kpi-trend-text { opacity: 0.85; }
.kpi-trend-pct { font-weight: 600; }
@media (min-width: 640px) {
  .kpi-card { padding: 1.25rem 1.5rem; }
  .kpi-label { font-size: 0.75rem; }
  .kpi-value { font-size: 1.75rem; }
}
@media (min-width: 1024px) {
  .kpi-value { font-size: 2rem; }
}

.overview-chart-card {
  background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px);
  border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 20px;
  padding: 1.25rem 1.5rem; min-height: 240px;
}
.overview-chart-title { font-size: 1rem; font-weight: 700; color: rgba(255, 255, 255, 0.95); margin-bottom: 1rem; }
.overview-donut-wrap { position: relative; width: 160px; height: 160px; margin: 0 auto 1rem; }
.overview-donut {
  width: 100%; height: 100%; border-radius: 50%;
  position: relative; z-index: 0;
}
.overview-donut::after {
  content: ''; position: absolute; inset: 22%; border-radius: 50%; background: rgba(20, 8, 46, 0.85); z-index: 1;
}
.overview-donut-center {
  position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 2; pointer-events: none;
}
.overview-donut-total { font-size: 1.5rem; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }
.overview-donut-label { font-size: 0.6875rem; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.05em; }
.overview-legend { display: flex; flex-wrap: wrap; gap: 0.75rem 1rem; justify-content: center; font-size: 0.75rem; color: rgba(255, 255, 255, 0.8); }
.overview-legend-item { display: inline-flex; align-items: center; gap: 0.35rem; }
.overview-legend-item i { font-size: 0.5rem; }

.overview-bars { display: flex; flex-direction: column; gap: 0.75rem; }
.overview-bar-row { display: grid; grid-template-columns: 80px 1fr 2rem; align-items: center; gap: 0.5rem; font-size: 0.8125rem; }
.overview-bar-label { color: rgba(255, 255, 255, 0.85); font-weight: 500; }
.overview-bar-track { height: 8px; border-radius: 4px; background: rgba(255, 255, 255, 0.1); overflow: hidden; }
.overview-bar-fill { height: 100%; border-radius: 4px; min-width: 4px; transition: width 0.3s ease; }
.overview-bar-value { color: rgba(255, 255, 255, 0.9); font-variant-numeric: tabular-nums; text-align: right; }

.overview-events-list { list-style: none; padding: 0; margin: 0 0 0.75rem; }
.overview-event-item { padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.8125rem; display: flex; flex-direction: column; gap: 0.125rem; }
.overview-event-item:last-child { border-bottom: none; }
.overview-event-title { color: rgba(255, 255, 255, 0.95); font-weight: 500; }
.overview-event-date { color: rgba(255, 255, 255, 0.55); font-size: 0.75rem; }
.overview-chart-link { font-size: 0.8125rem; font-weight: 600; color: #B5A3FF; text-decoration: none; display: inline-flex; align-items: center; gap: 0.35rem; }
.overview-chart-link:hover { color: #EEEAFF; text-decoration: underline; }

.btn-primary { background: #FFD74A; color: #14082E; font-weight: 700; box-shadow: 0 0 15px rgba(255, 215, 74, 0.35); border-radius: 10px; transition: transform 0.2s, box-shadow 0.2s; }
.btn-primary:hover { background: #ffe066; box-shadow: 0 0 20px rgba(255, 215, 74, 0.5); transform: translateY(-1px); }
.btn-approve { background: rgba(34, 197, 94, 0.9); color: #fff; border-radius: 10px; border: none; }
.btn-approve:hover { background: rgb(34, 197, 94); }
.btn-reject { background: rgba(239, 68, 68, 0.9); color: #fff; border-radius: 10px; border: none; }
.btn-reject:hover { background: rgb(239, 68, 68); }
.btn-secondary { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(181, 163, 255, 0.3); color: #EEEAFF; border-radius: 10px; }
.btn-secondary:hover { background: rgba(181, 163, 255, 0.15); }
.input-field { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(181, 163, 255, 0.2); border-radius: 10px; color: #fff; transition: border-color 0.2s, box-shadow 0.2s; }
.input-field::placeholder { color: rgba(255, 255, 255, 0.4); }
.input-field:focus { outline: none; border-color: #B5A3FF; box-shadow: 0 0 0 2px rgba(181, 163, 255, 0.2); }
.filter-pill { padding: 0.5rem 1rem; border-radius: 9999px; font-weight: 600; cursor: pointer; transition: background 0.2s, color 0.2s; border: none; }
.filter-pill.active { background: #B5A3FF; color: #14082E; }
.filter-pill:not(.active) { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
.filter-pill:not(.active):hover { background: rgba(181, 163, 255, 0.2); color: #fff; }
.settings-block { margin-top: 1.5rem; }
.settings-trigger { color: rgba(255,255,255,0.8); user-select: none; transition: background 0.2s, color 0.2s; }
.settings-trigger:hover { background: rgba(255,255,255,0.08); color: #fff; }
.settings-dropdown { overflow: hidden; max-height: 0; transition: max-height 0.25s ease-out; }
.settings-dropdown.open { max-height: 220px; }
.settings-dropdown .settings-item { margin-left: 1.25rem; }
.settings-item { border-radius: 10px; padding: 0.75rem 1rem 0.75rem 3rem; position: relative; color: rgba(255,255,255,0.85); font-weight: 500; font-size: 1.125rem; line-height: 1.75rem; transition: background 0.2s, color 0.2s; text-decoration: none; display: flex; align-items: center; }
.settings-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
.settings-item.active { background: rgba(255,255,255,0.12); color: #fff; }
.settings-item i:first-child { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); width: 1.25rem; text-align: center; font-size: 1rem; }
.settings-item span { margin-left: 0.5rem; }
.profile-photo-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; }
.profile-photo-large { width: 96px; height: 96px; border-radius: 50%; background: rgba(181, 163, 255, 0.25); color: #fff; font-size: 2.5rem; font-weight: 600; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
.profile-photo-large.profile-photo-clickable { cursor: pointer; }
.profile-photo-img { width: 100%; height: 100%; object-fit: cover; }
.profile-photo-upload-btn { margin-top: 0.75rem; font-size: 0.875rem; font-weight: 600; color: #B5A3FF; background: none; border: none; cursor: pointer; padding: 0.25rem 0; }
.profile-photo-upload-btn:hover { color: #EEEAFF; text-decoration: underline; }
.password-input-wrap { position: relative; }
.password-toggle { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; color: rgba(255, 255, 255, 0.5); cursor: pointer; padding: 0.25rem; font-size: 1rem; }
.password-toggle:hover { color: rgba(255, 255, 255, 0.85); }
.contact-number-wrap { display: flex; align-items: center; gap: 0; border-radius: 10px; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(181, 163, 255, 0.2); overflow: hidden; }
.contact-number-wrap:focus-within { border-color: #B5A3FF; box-shadow: 0 0 0 2px rgba(181, 163, 255, 0.2); }
.contact-prefix { padding: 0.75rem 0.75rem 0.75rem 1rem; color: rgba(255, 255, 255, 0.7); font-weight: 600; font-size: 0.9375rem; }
.select-dash { cursor: pointer; appearance: auto; }
.profile-form-wrap .select-dash.select-placeholder { color: rgba(255, 255, 255, 0.4); }
.profile-form-wrap .select-dash option,
.profile-form-wrap select.select-dash option { background: #1a0a2e; color: #fff; }
.profile-form-wrap .form-hint { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); display: flex; align-items: center; gap: 0.35rem; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.btn-outline { background: transparent; border: 2px solid #FFD74A; color: #FFD74A; border-radius: 10px; font-weight: 600; text-decoration: none; display: inline-block; }
.btn-outline:hover { background: rgba(255, 215, 74, 0.15); }
.event-view-layout { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; width: 100%; }
.event-view-layout .event-form-wrap { flex: 1 1 420px; min-width: 0; }
.event-view-layout .event-right-panel { flex: 1 1 340px; min-width: 300px; max-width: 420px; margin-top: 0; align-self: stretch; background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 24px; padding: 1.75rem; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03); }
@media (min-width: 900px) { .event-view-layout .event-right-panel { margin-top: 4.5rem; } }
.event-right-panel .panel-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.event-right-panel .panel-title i { color: #B5A3FF; }
.event-preview-card { border-radius: 16px; overflow: hidden; background: rgba(35, 21, 89, 0.8); border: 1px solid rgba(181, 163, 255, 0.2); padding: 1rem 1.25rem; margin-bottom: 1.5rem; }
.event-preview-card .preview-date { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.05em; color: #B5A3FF; text-transform: uppercase; margin-bottom: 0.375rem; }
.event-preview-card .preview-date:empty { display: none; }
.event-preview-card .preview-title { font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.3; }
.event-preview-card .preview-desc { font-size: 0.8125rem; color: rgba(255,255,255,0.7); line-height: 1.45; margin-top: 0.375rem; }
.event-tips-list { list-style: none; padding: 0; margin: 0; opacity: 0.7; }
.event-tips-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(181, 163, 255, 0.08); font-size: 0.8125rem; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
.event-tips-list li:last-child { border-bottom: none; }
.event-tips-list li i { width: 28px; height: 28px; border-radius: 8px; background: rgba(181, 163, 255, 0.15); color: rgba(181, 163, 255, 0.85); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; }
.profile-settings-layout { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; width: 100%; }
.profile-settings-layout .profile-form-wrap { flex: 1 1 420px; min-width: 0; }
.profile-settings-layout .profile-right-panel { flex: 1 1 320px; min-width: 280px; max-width: 380px; background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 24px; padding: 1.75rem; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03); }
.profile-right-panel .panel-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.profile-right-panel .panel-title i { color: #B5A3FF; }
.profile-tips-list { list-style: none; padding: 0; margin: 0; opacity: 0.7; }
.profile-tips-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(181, 163, 255, 0.08); font-size: 0.8125rem; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
.profile-tips-list li:last-child { border-bottom: none; }
.profile-tips-list li i { width: 28px; height: 28px; border-radius: 8px; background: rgba(181, 163, 255, 0.15); color: rgba(181, 163, 255, 0.85); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; }
.notification-view-layout { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; width: 100%; }
.notification-view-layout .notification-list-wrap { flex: 1 1 420px; min-width: 0; }
.notification-view-layout .notification-prefs-panel { flex: 1 1 320px; min-width: 280px; max-width: 380px; margin-top: 5.25rem; background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 24px; padding: 1.75rem; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03); }
.notification-prefs-panel .panel-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.notification-prefs-panel .panel-title i { color: #B5A3FF; }
.notification-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem 1.25rem; background: rgba(35, 21, 89, 0.6); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 16px; margin-bottom: 0.75rem; transition: background 0.2s, border-color 0.2s; }
.notification-item:hover { background: rgba(35, 21, 89, 0.8); border-color: rgba(181, 163, 255, 0.25); }
.notification-item.unread { border-left: 3px solid #B5A3FF; }
.notification-item .notif-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(181, 163, 255, 0.2); color: #B5A3FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.notification-item .notif-body { flex: 1; min-width: 0; }
.notification-item .notif-title { font-weight: 600; color: #fff; font-size: 0.9375rem; margin-bottom: 0.25rem; }
.notification-item .notif-text { font-size: 0.8125rem; color: rgba(255,255,255,0.7); line-height: 1.4; }
.notification-item .notif-time { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 0.5rem; }
.pref-row { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid rgba(181, 163, 255, 0.1); font-size: 0.875rem; color: rgba(255,255,255,0.9); }
.pref-row:last-child { border-bottom: none; }
.toggle-switch { width: 44px; height: 24px; border-radius: 12px; background: rgba(255,255,255,0.2); position: relative; cursor: pointer; transition: background 0.2s; flex-shrink: 0; border: none; }
.toggle-switch.on { background: #B5A3FF; }
.toggle-switch::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.toggle-switch.on::after { transform: translateX(20px); }
.notification-empty { text-align: center; padding: 3rem 2rem; color: rgba(255,255,255,0.6); font-size: 0.9375rem; }
.notification-empty i { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.6; }
</style>
