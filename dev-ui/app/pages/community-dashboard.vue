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
      <p v-show="!sidebarCollapsed" class="text-white/70 text-sm font-semibold uppercase tracking-wider mb-4">Menu</p>
      <nav class="space-y-1 flex-1 min-h-0 overflow-hidden">
        <NuxtLink
          to="/community-dashboard"
          class="nav-item flex items-center relative"
          :class="[currentView === 'mynews' ? 'active text-white' : 'text-white/80', sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5']"
          @click="mobileMenuOpen = false"
        >
          <i class="fas fa-home w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">My News and Updates</span>
        </NuxtLink>
        <NuxtLink
          to="/community-dashboard#upload"
          class="nav-item flex items-center relative"
          :class="[currentView === 'upload' ? 'active text-white' : 'text-white/80', sidebarCollapsed ? 'justify-center px-2 py-3.5' : 'gap-4 px-5 py-3.5']"
          @click="mobileMenuOpen = false"
        >
          <i class="fas fa-upload w-5 text-center shrink-0"></i>
          <span v-show="!sidebarCollapsed" class="font-semibold text-lg">Upload News and Updates</span>
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
        <div
          v-show="!sidebarCollapsed"
          id="settingsDropdown"
          class="settings-dropdown"
          role="menu"
          :aria-hidden="!settingsOpen"
          :class="{ open: settingsOpen }"
        >
          <NuxtLink to="/community-dashboard#settings" class="settings-item flex items-center" :class="{ active: currentView === 'settings' }" title="Edit profile" @click="mobileMenuOpen = false">
            <i class="fas fa-pen"></i>
            <span class="settings-item-text">Edit profile</span>
          </NuxtLink>
          <NuxtLink to="/community-dashboard#notification" class="settings-item flex items-center" :class="{ active: currentView === 'notification' }" title="Notification" @click="mobileMenuOpen = false">
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
          <NuxtLink to="/community-dashboard#settings" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" :class="{ active: currentView === 'settings' }" title="Edit profile" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-pen w-5 text-center"></i>
          </NuxtLink>
          <NuxtLink to="/community-dashboard#notification" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" :class="{ active: currentView === 'notification' }" title="Notification" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-bell w-5 text-center"></i>
          </NuxtLink>
          <NuxtLink to="/" class="nav-item flex items-center justify-center px-2 py-3.5 rounded-[10px] text-white/80 hover:bg-white/10 hover:text-white" title="Logout" @click="settingsOpen = false; mobileMenuOpen = false">
            <i class="fas fa-sign-out-alt w-5 text-center"></i>
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Main content -->
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
      <!-- View: My News -->
      <div v-show="currentView === 'mynews'" class="main-view w-full">
        <header class="flex flex-wrap justify-between items-center gap-4 mb-8 pt-12 md:pt-0">
          <h1 class="text-xl md:text-2xl font-normal text-white/90">{{ dashboardContent.sections.myNews.welcomeTitle }}</h1>
          <NuxtLink to="/community-dashboard#upload" class="btn-primary inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base">
            <i class="fas fa-plus"></i> <span class="hidden sm:inline">Upload News and Updates</span><span class="sm:hidden">Upload</span>
          </NuxtLink>
        </header>
        <section class="mb-10">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-white mb-1">{{ dashboardContent.sections.myNews.sectionTitle }}</h2>
            <p class="text-white/60">{{ dashboardContent.sections.myNews.sectionSubtitle }}</p>
          </div>
          <div v-if="mySubmissions.length === 0" class="text-white/50 col-span-full py-8">
            {{ dashboardContent.sections.myNews.emptyMessage }}
          </div>
          <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article
              v-for="item in mySubmissions"
              :key="item.id"
              class="news-card-dash"
              :class="{ 'with-img': item.imageUrl && !brokenImageIds.has(item.id) }"
            >
              <img
                v-if="item.imageUrl && !brokenImageIds.has(item.id)"
                :src="item.imageUrl"
                alt=""
                class="news-card-dash-img"
                loading="lazy"
                @error="markImageBroken(item.id)"
              />
              <div class="news-card-dash-body">
                <div class="flex items-center justify-between">
                  <span class="news-card-dash-date">{{ formatDateUppercase(item.date) }}</span>
                  <span class="w-2 h-2 rounded-full bg-accent-gold shadow-lg shadow-accent-gold/30 shrink-0"></span>
                </div>
                <h3 class="news-card-dash-title">{{ item.title }}</h3>
                <p class="news-card-dash-summary">{{ item.summary }}</p>
                <div class="news-card-dash-actions">
                  <span class="text-xs" :class="statusClass(item.status)">{{ item.status }}</span>
                  <button type="button" class="text-accent-purple hover:text-accent-light font-semibold text-sm inline-flex items-center gap-1" @click="openEditModal(item)">
                    <i class="fas fa-pen text-xs"></i> Edit
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>

      <!-- View: Upload -->
      <div v-show="currentView === 'upload'" class="main-view w-full">
        <div class="upload-view-layout w-full">
          <div class="upload-form-wrap">
            <section id="upload" class="upload-form-card">
              <h2 class="form-title">{{ dashboardContent.sections.upload.formTitle }}</h2>
              <p class="form-subtitle">{{ dashboardContent.sections.upload.formSubtitle }}</p>
              <form class="space-y-5" @submit.prevent="onNewsSubmit" @reset="onNewsReset">
                <div>
                  <label class="form-label" for="newsTitle">Title</label>
                  <input
                    id="newsTitle"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="e.g. Code Camp Season 4 — Coming soon"
                    class="input-field w-full"
                  />
                </div>
                <div>
                  <label class="form-label" for="newsSummary">Tagline</label>
                  <input
                    id="newsSummary"
                    v-model="form.summary"
                    type="text"
                    required
                    placeholder="Brief tagline shown on the card"
                    class="input-field w-full"
                  />
                </div>
                <div>
                  <label class="form-label" for="newsDescription">Full article</label>
                  <textarea
                    id="newsDescription"
                    v-model="form.description"
                    rows="5"
                    placeholder="Full story or details. Shown on the full article view."
                    class="input-field w-full textarea-dash"
                  />
                  <p class="form-hint"><i class="fas fa-info-circle"></i> Optional. Use this for the full article or about section.</p>
                </div>
                <div>
                  <label class="form-label" for="newsImageFile">Upload from file explorer</label>
                  <input
                    id="newsImageFile"
                    ref="newsImageFileRef"
                    type="file"
                    accept="image/*"
                    multiple
                    class="input-field w-full file-input-dash"
                    aria-label="Choose up to 6 images from your device"
                    @change="onNewsImageFileChange"
                  />
                  <p class="form-hint"><i class="fas fa-info-circle"></i> Optional. Choose up to 6 images. Pick one as the headline image for cards.</p>
                  <div v-if="form.images.length > 0" class="mt-3 space-y-2">
                    <p class="text-sm font-semibold text-white/80">Images ({{ form.images.length }}/6)</p>
                    <div class="flex flex-wrap gap-3">
                      <div
                        v-for="(img, idx) in form.images"
                        :key="idx"
                        class="relative group"
                      >
                        <div
                          class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer"
                          :class="form.headlineIndex === idx ? 'border-accent-gold ring-2 ring-accent-gold/30' : 'border-white/20 hover:border-white/40'"
                          @click="form.headlineIndex = idx"
                        >
                          <img :src="img" alt="" class="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500/90 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                          @click.stop="removeFormImage(idx)"
                        >
                          <i class="fas fa-times"></i>
                        </button>
                        <span v-if="form.headlineIndex === idx" class="absolute bottom-0 left-0 right-0 bg-accent-gold/90 text-[10px] font-semibold text-center py-0.5">Headline</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label class="form-label" for="newsDate">Date</label>
                    <input id="newsDate" v-model="form.date" type="date" required class="input-field w-full" />
                  </div>
                  <div>
                    <label class="form-label" for="newsLink">Read more link <span class="text-white/50 font-normal">(optional)</span></label>
                    <input id="newsLink" v-model="form.link" type="url" placeholder="https://..." class="input-field w-full" />
                  </div>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn-primary px-6 py-3 inline-flex items-center gap-2 text-base">
                    <i class="fas fa-paper-plane"></i> Submit for review
                  </button>
                  <button type="reset" class="btn-secondary px-6 py-3">Clear</button>
                </div>
              </form>
            </section>
          </div>
          <aside class="upload-right-panel">
            <h3 class="panel-title"><i class="fas fa-eye"></i> {{ dashboardContent.sections.upload.previewTitle }}</h3>
            <div class="upload-preview-card">
              <div class="preview-image-wrap">
                <img
                  :src="previewImageUrl"
                  class="preview-img"
                  alt=""
                  @error="previewImageError = true"
                />
              </div>
              <div class="preview-body">
                <p class="preview-meta">{{ previewDateStr }}{{ previewDateStr ? ' · ' : '' }}TECH SAVVY</p>
                <h4 class="preview-title">{{ form.title || 'Your title will appear here' }}</h4>
                <p class="preview-summary">{{ form.summary || 'Tagline will show here.' }}</p>
                <span class="preview-read">READ MORE</span>
              </div>
            </div>
            <h3 class="panel-title"><i class="fas fa-lightbulb"></i> Tips</h3>
            <ul class="upload-tips-list">
              <li v-for="(tip, i) in dashboardContent.tips.upload" :key="i"><i class="fas" :class="tip.icon"></i><span>{{ tip.text }}</span></li>
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
                  <NuxtLink to="/community-dashboard" class="btn-outline px-6 py-3">Cancel</NuxtLink>
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

  <!-- Edit modal -->
  <Teleport to="body">
    <div
      v-show="editModalOpen"
      class="modal-overlay open"
      aria-hidden="false"
      @click.self="closeEditModal"
    >
      <div class="modal-box">
        <h3 class="text-xl font-bold text-white mb-4">Edit news or update</h3>
        <form v-if="editItem" class="space-y-4" @submit.prevent="onEditSubmit">
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Title</label>
            <input v-model="editItem.title" type="text" class="input-field w-full px-4 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Tagline</label>
            <input v-model="editItem.summary" type="text" class="input-field w-full px-4 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Full article</label>
            <textarea v-model="editItem.description" rows="4" class="input-field w-full px-4 py-2 textarea-dash" placeholder="Full story or details (optional)" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Upload from file explorer</label>
            <input
              ref="editImageFileRef"
              type="file"
              accept="image/*"
              multiple
              class="input-field w-full px-4 py-2 file-input-dash"
              aria-label="Choose up to 6 images"
              @change="onEditImageFileChange"
            />
            <p class="text-white/50 text-xs mt-1">Up to 6 images. Click one to set as headline for cards.</p>
            <div v-if="editItem && (editItem.images?.length || 0) > 0" class="mt-3 flex flex-wrap gap-2">
              <div
                v-for="(img, idx) in editItem.images"
                :key="idx"
                class="relative group"
              >
                <div
                  class="w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer"
                  :class="(editItem.headlineIndex ?? 0) === idx ? 'border-accent-gold ring-2 ring-accent-gold/30' : 'border-white/20 hover:border-white/40'"
                  @click="editItem.headlineIndex = idx"
                >
                  <img :src="img" alt="" class="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  class="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500/90 text-white text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                  @click.stop="removeEditImage(idx)"
                >
                  <i class="fas fa-times"></i>
                </button>
                <span v-if="(editItem.headlineIndex ?? 0) === idx" class="absolute bottom-0 left-0 right-0 bg-accent-gold/90 text-[9px] font-semibold text-center py-0.5">Headline</span>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Date</label>
            <input v-model="editItem.date" type="date" class="input-field w-full px-4 py-2" required />
          </div>
          <div>
            <label class="block text-sm font-semibold text-white/80 mb-1">Read more link</label>
            <input v-model="editItem.link" type="url" class="input-field w-full px-4 py-2" />
          </div>
          <div class="flex gap-3 pt-2">
            <button type="submit" class="btn-primary px-4 py-2 text-sm">Save changes</button>
            <button type="button" class="btn-secondary px-4 py-2 text-sm" @click="closeEditModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>

  <!-- Profile photo crop modal -->
  <Teleport to="body">
    <div
      v-show="cropModalOpen"
      class="modal-overlay open"
      aria-hidden="false"
      @click.self="closeCropModal"
    >
      <div class="crop-modal-box">
        <h3 class="text-xl font-bold text-white mb-4">Adjust profile photo</h3>
        <p class="text-white/70 text-sm mb-4">You see the full image at first. Drag to reposition, use the slider to zoom in on any part.</p>
        <div class="crop-container">
          <div
            ref="cropViewportRef"
            class="crop-viewport"
            @mousedown="onCropDragStart"
          >
            <div
              class="crop-image-wrap"
              :style="cropImageStyle"
            >
              <img
                v-if="cropImageData"
                :src="cropImageData"
                alt=""
                class="crop-image"
                draggable="false"
                @load="onCropImageLoad"
              />
            </div>
            <div class="crop-circle-overlay" aria-hidden="true"></div>
          </div>
        </div>
        <div class="crop-controls mt-4">
          <label class="flex items-center gap-3">
            <span class="text-white/80 text-sm w-12">Zoom</span>
            <input
              v-model.number="cropState.scale"
              type="range"
              min="1"
              max="3"
              step="0.05"
              class="crop-zoom-slider flex-1"
              @input="clampCropScale"
            />
          </label>
        </div>
        <div class="flex gap-3 mt-6">
          <button type="button" class="btn-primary px-4 py-2 text-sm" @click="applyCrop">
            Apply
          </button>
          <button type="button" class="btn-secondary px-4 py-2 text-sm" @click="closeCropModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const api = useDashboardApi()

const COMMUNITY_DASHBOARD_DATA_URL = '/data/community-dashboard.json'

const defaultCommunityContent = {
  sections: {
    myNews: { welcomeTitle: 'Welcome back, Community Member', sectionTitle: 'My News and Updates', sectionSubtitle: 'Latest from the community', emptyMessage: 'No news or updates yet. Use the form below to add one.' },
    upload: { formTitle: 'Upload News and Updates', formSubtitle: 'Submit your news or update for review. Approved items will appear on the landing page.', previewTitle: 'Card preview' },
    notifications: { pageTitle: 'Notifications', pageDescription: 'Updates about your submissions and community.', emptyTitle: 'No notifications yet.', emptyDescription: "When your news is reviewed or we have updates, they'll show here." },
    profile: { pageTitle: 'Edit profile' },
    preferences: { panelTitle: 'Preferences', emailLabel: 'Email notifications', inAppLabel: 'In-app notifications' }
  },
  tips: {
    upload: [{ icon: 'fa-check', text: 'Keep the title clear and under 60 characters for best display.' }, { icon: 'fa-image', text: 'Upload up to 6 images. Click one to set it as the headline for cards.' }, { icon: 'fa-clock', text: 'After submitting, an admin will review before it appears on the landing page.' }],
    profile: [{ icon: 'fa-lock', text: 'Leave password blank to keep your current password.' }, { icon: 'fa-envelope', text: 'Use a valid email so we can reach you.' }, { icon: 'fa-map-marker-alt', text: 'City and state help us show local events and news.' }]
  },
  sampleData: {
    submissions: [] as Array<{ id: string; title: string; summary: string; description?: string; imageUrl: string; images?: string[]; headlineIndex?: number; date: string; link: string; status: string; author?: string }>,
    notifications: [] as Array<{ title?: string; text?: string; time?: string; read?: boolean; icon?: string }>
  }
}

const dashboardContent = ref<typeof defaultCommunityContent>(defaultCommunityContent)

const SIDEBAR_COLLAPSED_KEY = 'dashboardSidebarCollapsed'
const { getItem: getStorage, setItem: setStorage } = useSafeStorage()
const logoUrl = '/assets/codebev-logo.png'
const logoError = ref(false)
const settingsOpen = ref(false)
const sidebarCollapsed = ref(false)
const mobileMenuOpen = ref(false)
const editModalOpen = ref(false)
const editItem = ref<{ id: string; title: string; summary: string; description?: string; imageUrl: string; images?: string[]; headlineIndex?: number; date: string; link: string } | null>(null)
const prefEmail = ref(true)
const prefInApp = ref(true)
const previewImageError = ref(false)
const brokenImageIds = ref(new Set<string>())

function markImageBroken(id: string) {
  brokenImageIds.value = new Set([...brokenImageIds.value, id])
}

const submissions = ref<Array<{
  id: string
  title: string
  summary: string
  description?: string
  imageUrl: string
  images?: string[]
  headlineIndex?: number
  date: string
  link: string
  status: string
  author: string
  createdAt?: string
}>>([])

const profilePhotoInputRef = ref<HTMLInputElement | null>(null)
const newsImageFileRef = ref<HTMLInputElement | null>(null)
const editImageFileRef = ref<HTMLInputElement | null>(null)
const cropViewportRef = ref<HTMLDivElement | null>(null)

const cropModalOpen = ref(false)
const cropImageData = ref<string | null>(null)
const cropState = ref({
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  imgWidth: 0,
  imgHeight: 0,
  viewportSize: 200
})
const cropDrag = ref({ active: false, startX: 0, startY: 0, startOffsetX: 0, startOffsetY: 0 })
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

const form = ref({
  title: '',
  summary: '',
  description: '',
  images: [] as string[],
  headlineIndex: 0,
  date: '',
  link: ''
})

const currentView = computed(() => {
  const h = (route.hash || '').replace('#', '')
  if (h === 'upload') return 'upload'
  if (h === 'settings') return 'settings'
  if (h === 'notification') return 'notification'
  return 'mynews'
})

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  if (import.meta.client) setStorage(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed.value))
}

const mySubmissions = computed(() =>
  submissions.value.filter((item) => item.author === 'community')
)

const profileInitial = computed(() => {
  const p = profile.value
  const first = (p.firstName || '').trim().charAt(0)
  const last = (p.lastName || '').trim().charAt(0)
  return (first || last || '?').toUpperCase()
})

const previewDateStr = computed(() => {
  const d = form.value.date
  if (!d) return ''
  const date = new Date(d)
  return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
})

const previewImageUrl = computed(() => {
  if (previewImageError.value) return 'https://picsum.photos/400/240?random=preview'
  const imgs = form.value.images
  const idx = Math.min(form.value.headlineIndex, imgs.length - 1)
  if (imgs.length > 0 && idx >= 0) return imgs[idx]
  return 'https://picsum.photos/400/240?random=preview'
})

const MAX_IMAGES = 6

function onNewsImageFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input?.files || []).filter((f) => f.type.startsWith('image/'))
  if (files.length === 0) return
  const current = form.value.images
  const remaining = MAX_IMAGES - current.length
  const toAdd = files.slice(0, remaining)
  if (toAdd.length === 0) {
    if (input) input.value = ''
    return
  }
  let loaded = 0
  toAdd.forEach((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      form.value.images = [...form.value.images, dataUrl].slice(0, MAX_IMAGES)
      form.value.headlineIndex = Math.min(form.value.headlineIndex, form.value.images.length - 1)
      previewImageError.value = false
      loaded++
      if (loaded === toAdd.length && input) input.value = ''
    }
    reader.readAsDataURL(file)
  })
}

function removeFormImage(idx: number) {
  const imgs = [...form.value.images]
  imgs.splice(idx, 1)
  form.value.images = imgs
  form.value.headlineIndex = Math.min(form.value.headlineIndex, Math.max(0, imgs.length - 1))
}

function onEditImageFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input?.files || []).filter((f) => f.type.startsWith('image/'))
  if (!editItem.value || files.length === 0) {
    if (input) input.value = ''
    return
  }
  const current = editItem.value.images || []
  const remaining = MAX_IMAGES - current.length
  const toAdd = files.slice(0, remaining)
  if (toAdd.length === 0) {
    if (input) input.value = ''
    return
  }
  let loaded = 0
  toAdd.forEach((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const imgs = [...(editItem.value?.images || []), dataUrl].slice(0, MAX_IMAGES)
      if (editItem.value) {
        editItem.value.images = imgs
        editItem.value.imageUrl = imgs[editItem.value.headlineIndex ?? 0] || imgs[0] || editItem.value.imageUrl
        editItem.value.headlineIndex = Math.min(editItem.value.headlineIndex ?? 0, imgs.length - 1)
      }
      loaded++
      if (loaded === toAdd.length && input) input.value = ''
    }
    reader.readAsDataURL(file)
  })
}

function removeEditImage(idx: number) {
  if (!editItem.value?.images) return
  const imgs = [...editItem.value.images]
  imgs.splice(idx, 1)
  editItem.value.images = imgs
  const hi = Math.min(editItem.value.headlineIndex ?? 0, Math.max(0, imgs.length - 1))
  editItem.value.headlineIndex = hi
  editItem.value.imageUrl = imgs[hi] || editItem.value.imageUrl
}

function statusClass(status: string) {
  if (status === 'approved') return 'text-green-400'
  if (status === 'rejected') return 'text-red-400'
  return 'text-accent-gold'
}

function formatDateUppercase(str: string) {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d.getTime())) return str
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase().replace(/\s+/g, ' ')
}

async function loadSubmissions() {
  if (import.meta.client) {
    const list = await api.getSubmissions()
    submissions.value = list.map((s) => ({ ...s, author: s.author ?? 'community' }))
  }
}

async function onNewsSubmit() {
  const f = form.value
  const imgs = f.images.slice(0, MAX_IMAGES)
  const headlineIdx = Math.min(f.headlineIndex, Math.max(0, imgs.length - 1))
  const imageUrl = (imgs.length > 0 ? imgs[headlineIdx] : '') || 'https://picsum.photos/500/320?random=' + Date.now()
  const payload = {
    title: f.title.trim(),
    summary: f.summary.trim(),
    description: f.description?.trim() || '',
    imageUrl,
    images: imgs,
    headlineIndex: imgs.length > 0 ? headlineIdx : 0,
    date: f.date,
    link: f.link.trim() || '#',
    status: 'pending' as const,
    author: 'community',
    createdAt: new Date().toISOString()
  }
  const created = await api.createSubmission(payload)
  if (created) submissions.value.unshift({ ...created, author: created.author ?? 'community' })
  else {
    const fallback: (typeof submissions.value)[0] = {
      id: 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9),
      ...payload,
      imageUrl
    }
    submissions.value.unshift(fallback)
  }
  form.value = { title: '', summary: '', description: '', images: [], headlineIndex: 0, date: '', link: '' }
  previewImageError.value = false
  if (import.meta.client && newsImageFileRef.value) newsImageFileRef.value.value = ''
  if (import.meta.client) alert('Your news has been submitted for review. It will appear on the landing page once approved.')
  router.push('/community-dashboard')
}

function onNewsReset() {
  form.value = { title: '', summary: '', description: '', images: [], headlineIndex: 0, date: '', link: '' }
  previewImageError.value = false
  nextTick(() => {
    if (newsImageFileRef.value) newsImageFileRef.value.value = ''
  })
}

function openEditModal(item: typeof submissions.value[0]) {
  const imgs = item.images && item.images.length > 0 ? item.images : (item.imageUrl ? [item.imageUrl] : [])
  const hi = item.headlineIndex ?? 0
  editItem.value = {
    ...item,
    description: item.description ?? '',
    images: imgs,
    headlineIndex: Math.min(hi, imgs.length - 1)
  }
  editModalOpen.value = true
}

function closeEditModal() {
  editModalOpen.value = false
  editItem.value = null
}

async function onEditSubmit() {
  if (!editItem.value) return
  const id = editItem.value.id
  const idx = submissions.value.findIndex((x) => x.id === id)
  const existing = idx >= 0 ? submissions.value[idx] : null
  if (!existing) { closeEditModal(); return }
  const e = editItem.value
  const imgs = e.images?.slice(0, MAX_IMAGES) || []
  const headlineIdx = Math.min(e.headlineIndex ?? 0, Math.max(0, imgs.length - 1))
  const imageUrl = (imgs.length > 0 ? imgs[headlineIdx] : (e.imageUrl?.trim() || existing.imageUrl)) || 'https://picsum.photos/500/320?random=' + Date.now()
  const updates = {
    title: e.title,
    summary: e.summary,
    description: e.description?.trim() ?? existing.description ?? '',
    imageUrl,
    images: imgs,
    headlineIndex: imgs.length > 0 ? headlineIdx : 0,
    date: e.date,
    link: e.link?.trim() || '#'
  }
  const ok = await api.updateSubmission(id, updates)
  if (ok || !api.hasApi()) {
    submissions.value[idx] = { ...existing, ...updates }
  }
  closeEditModal()
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

const CROP_VIEWPORT_SIZE = 200

const cropImageStyle = computed(() => {
  const s = cropState.value
  return {
    transform: `translate(${s.offsetX}px, ${s.offsetY}px) scale(${s.scale})`,
    width: `${CROP_VIEWPORT_SIZE}px`,
    height: `${CROP_VIEWPORT_SIZE}px`
  }
})

function openCropModal(dataUrl: string) {
  cropImageData.value = dataUrl
  cropState.value = {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    imgWidth: 0,
    imgHeight: 0,
    viewportSize: CROP_VIEWPORT_SIZE
  }
  cropModalOpen.value = true
}

function closeCropModal() {
  cropModalOpen.value = false
  cropImageData.value = null
  cropDrag.value.active = false
  if (import.meta.client) {
    window.removeEventListener('mousemove', onCropDragMove)
    window.removeEventListener('mouseup', onCropDragEnd)
  }
}

function onCropImageLoad(e: Event) {
  const img = e.target as HTMLImageElement
  if (img) {
    cropState.value.imgWidth = img.naturalWidth
    cropState.value.imgHeight = img.naturalHeight
  }
}

function clampCropScale() {
  const s = cropState.value.scale
  cropState.value.scale = Math.max(1, Math.min(3, s))
}

function onCropDragStart(e: MouseEvent) {
  cropDrag.value = {
    active: true,
    startX: e.clientX,
    startY: e.clientY,
    startOffsetX: cropState.value.offsetX,
    startOffsetY: cropState.value.offsetY
  }
  if (import.meta.client) {
    window.addEventListener('mousemove', onCropDragMove)
    window.addEventListener('mouseup', onCropDragEnd)
  }
}

function onCropDragMove(e: MouseEvent) {
  if (!cropDrag.value.active) return
  cropState.value.offsetX = cropDrag.value.startOffsetX + (e.clientX - cropDrag.value.startX)
  cropState.value.offsetY = cropDrag.value.startOffsetY + (e.clientY - cropDrag.value.startY)
}

function onCropDragEnd() {
  cropDrag.value.active = false
  if (import.meta.client) {
    window.removeEventListener('mousemove', onCropDragMove)
    window.removeEventListener('mouseup', onCropDragEnd)
  }
}

async function applyCrop() {
  if (!cropImageData.value) { closeCropModal(); return }
  const img = new Image()
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = cropImageData.value!
  })
  const s = cropState.value
  const size = CROP_VIEWPORT_SIZE
  const imgW = img.naturalWidth
  const imgH = img.naturalHeight
  const containScale = size / Math.max(imgW, imgH)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) { closeCropModal(); return }
  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.fillStyle = '#1a0a2e'
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size / 2, size / 2)
  ctx.translate(s.offsetX, s.offsetY)
  ctx.scale(s.scale * containScale, s.scale * containScale)
  ctx.drawImage(img, -imgW / 2, -imgH / 2, imgW, imgH)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
  profile.value.avatar = await resizeImageDataUrl(dataUrl, 300)
  closeCropModal()
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
  openCropModal(dataUrl)
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
  router.push('/community-dashboard')
}

async function loadNotifications() {
  if (import.meta.client) notifications.value = await api.getNotifications()
}

useHead({
  title: 'Community Dashboard — Upload News & Updates | TECH SAVVY',
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
      const res = await fetch(COMMUNITY_DASHBOARD_DATA_URL)
      if (res.ok) {
        const data = await res.json()
        if (data.sections) dashboardContent.value.sections = { ...defaultCommunityContent.sections, ...data.sections }
        if (data.tips) dashboardContent.value.tips = { ...defaultCommunityContent.tips, ...data.tips }
        if (data.sampleData) dashboardContent.value.sampleData = data.sampleData
      }
    } catch { /* use defaults */ }
  }
  await loadDashboardContent()
  await loadSubmissions()
  loadProfile()
  await loadNotifications()
  const content = dashboardContent.value
  if (submissions.value.length === 0 && content.sampleData?.submissions?.length) {
    submissions.value = content.sampleData.submissions.map((s: { id: string; title: string; summary: string; description?: string; imageUrl: string; images?: string[]; headlineIndex?: number; date: string; link: string; status: string; author?: string }) => ({ ...s, author: s.author ?? 'community' }))
  }
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
.nav-item {
  border-radius: 10px;
  transition: background 0.2s, color 0.2s;
}
.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 34px;
  background: #B5A3FF;
  border-radius: 70px;
}
.nav-item:not(.active):hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
.glass-card {
  background: rgba(20, 8, 46, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(181, 163, 255, 0.15);
  border-radius: 20px;
}
.btn-primary {
  background: #FFD74A;
  color: #14082E;
  font-weight: 700;
  box-shadow: 0 0 15px rgba(255, 215, 74, 0.35);
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-primary:hover {
  background: #ffe066;
  box-shadow: 0 0 20px rgba(255, 215, 74, 0.5);
  transform: translateY(-1px);
}
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(181, 163, 255, 0.3);
  color: #EEEAFF;
  border-radius: 10px;
}
.btn-secondary:hover { background: rgba(181, 163, 255, 0.15); }
.input-field {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 10px;
  color: #fff;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}
.input-field::placeholder { color: rgba(255, 255, 255, 0.4); }
.input-field:hover { border-color: rgba(181, 163, 255, 0.35); background: rgba(255, 255, 255, 0.08); }
.input-field:focus {
  outline: none;
  border-color: #B5A3FF;
  box-shadow: 0 0 0 3px rgba(181, 163, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
}
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
  .main-view header h1 { font-size: 1.25rem; }
  .upload-form-card { padding: 1.25rem 1rem; border-radius: 16px; }
  .upload-form-card .form-title { font-size: 1.25rem; }
  .upload-view-layout .upload-form-wrap { flex: 1 1 100%; }
  .upload-view-layout .upload-right-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .profile-settings-layout .profile-form-wrap { flex: 1 1 100%; }
  .profile-settings-layout .profile-right-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .notification-view-layout .notification-list-wrap { flex: 1 1 100%; }
  .notification-view-layout .notification-prefs-panel { flex: 1 1 100%; min-width: 0; max-width: none; margin-top: 1rem; }
  .news-card-dash { min-height: 260px; }
  .news-card-dash-title { font-size: 1.1rem; }
  .modal-box { margin: 1rem; max-height: 85vh; }
  .upload-form-card, .profile-form-wrap, .notification-list-wrap { font-size: 0.875rem; }
  .upload-form-card .form-title { font-size: 1.125rem; }
  .form-label { font-size: 0.8125rem; }
  .input-field { font-size: 0.875rem; padding: 0.5rem 0.75rem; }
  .upload-preview-card .preview-title { font-size: 0.9375rem; }
  .upload-preview-card .preview-summary { font-size: 0.75rem; }
  .news-card-dash-title { font-size: 1rem; }
  .news-card-dash-summary { font-size: 0.8125rem; }
  .news-card-dash-date { font-size: 0.6875rem; }
  .settings-item { font-size: 1rem; }
  .notification-item .notif-title { font-size: 0.875rem; }
  .notification-item .notif-text { font-size: 0.75rem; }
  .pref-row { font-size: 0.8125rem; }
}
.upload-form-card {
  background: rgba(20, 8, 46, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(181, 163, 255, 0.2);
  border-radius: 24px;
  padding: 2rem 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.upload-form-card .form-title { font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 0.375rem; letter-spacing: -0.02em; }
.upload-form-card .form-subtitle { font-size: 0.9375rem; color: rgba(255, 255, 255, 0.65); line-height: 1.5; margin-bottom: 1.75rem; }
.upload-form-card .form-label { display: block; font-size: 0.8125rem; font-weight: 600; color: rgba(255, 255, 255, 0.9); margin-bottom: 0.5rem; letter-spacing: 0.01em; }
.upload-form-card .form-hint { font-size: 0.75rem; color: rgba(255, 255, 255, 0.5); margin-top: 0.375rem; display: flex; align-items: center; gap: 0.375rem; }
.upload-form-card .form-hint i { color: #B5A3FF; opacity: 0.8; }
.upload-form-card .form-actions { padding-top: 1.5rem; margin-top: 1.5rem; border-top: 1px solid rgba(181, 163, 255, 0.15); display: flex; flex-wrap: wrap; gap: 0.75rem; }
.upload-form-card .input-field { padding: 0.75rem 1rem; border-radius: 12px; }
.textarea-dash { min-height: 120px; resize: vertical; padding: 0.75rem 1rem; }
.file-input-dash { cursor: pointer; }
.file-input-dash::file-selector-button { margin-right: 0.75rem; padding: 0.5rem 0.75rem; border-radius: 8px; border: none; background: rgba(181, 163, 255, 0.25); color: #EEEAFF; font-weight: 600; cursor: pointer; }
.file-input-dash::file-selector-button:hover { background: rgba(181, 163, 255, 0.35); }
.upload-view-layout { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; }
.upload-view-layout .upload-form-wrap { flex: 1 1 420px; min-width: 0; }
.upload-view-layout .upload-right-panel { flex: 1 1 360px; min-width: 320px; max-width: 480px; }
.upload-right-panel {
  background: rgba(20, 8, 46, 0.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(181, 163, 255, 0.15);
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03);
}
.upload-right-panel .panel-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.upload-right-panel .panel-title i { color: #B5A3FF; }
.upload-preview-card {
  border-radius: 0.75rem;
  overflow: hidden;
  background: #f8f7f5;
  color: #111827;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.25);
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}
.upload-preview-card .preview-image-wrap {
  width: 100%;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
}
.upload-preview-card .preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: rgba(0,0,0,0.08);
}
.upload-preview-card .preview-body {
  padding: 1.25rem 1.4rem 1.4rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
.upload-preview-card .preview-meta {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9ca3af;
  margin-bottom: 0.35rem;
}
.upload-preview-card .preview-title {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #111827;
  line-height: 1.3;
  margin-bottom: 0.35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upload-preview-card .preview-summary {
  font-size: 0.8125rem;
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.upload-preview-card .preview-read {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #111827;
  margin-top: auto;
}
.upload-tips-list { list-style: none; padding: 0; margin: 0; opacity: 0.7; }
.upload-tips-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid rgba(181, 163, 255, 0.08); font-size: 0.875rem; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
.upload-tips-list li:last-child { border-bottom: none; padding-bottom: 0; }
.upload-tips-list li i { width: 32px; height: 32px; border-radius: 10px; background: rgba(181, 163, 255, 0.15); color: rgba(181, 163, 255, 0.85); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.profile-settings-layout { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; width: 100%; }
.profile-settings-layout .profile-form-wrap { flex: 1 1 420px; min-width: 0; }
.profile-settings-layout .profile-right-panel { flex: 1 1 320px; min-width: 280px; max-width: 380px; background: rgba(20, 8, 46, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); border-radius: 24px; padding: 1.75rem; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03); }
.profile-right-panel .panel-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
.profile-right-panel .panel-title i { color: #B5A3FF; }
.profile-tips-list { list-style: none; padding: 0; margin: 0; opacity: 0.7; }
.profile-tips-list li { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.6rem 0; border-bottom: 1px solid rgba(181, 163, 255, 0.08); font-size: 0.8125rem; color: rgba(255, 255, 255, 0.6); line-height: 1.4; }
.profile-tips-list li:last-child { border-bottom: none; }
.profile-tips-list li i { width: 28px; height: 28px; border-radius: 8px; background: rgba(181, 163, 255, 0.15); color: rgba(181, 163, 255, 0.85); display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.75rem; }
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
.news-card-dash { min-height: 320px; border-radius: 1rem; background: rgba(20, 8, 46, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(181, 163, 255, 0.15); overflow: hidden; display: flex; flex-direction: column; }
.news-card-dash.with-img .news-card-dash-body { padding: 1.5rem; }
.news-card-dash-img { width: 100%; height: 180px; object-fit: cover; }
.news-card-dash-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
.news-card-dash-date { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; color: #B5A3FF; text-transform: uppercase; }
.news-card-dash-title { font-size: 1.25rem; font-weight: 700; color: #fff; line-height: 1.3; margin-top: 0.5rem; margin-bottom: 0.5rem; }
.news-card-dash-summary { font-size: 0.875rem; color: rgba(255,255,255,0.7); line-height: 1.5; flex: 1; }
.news-card-dash-actions { margin-top: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 100; padding: 1rem; }
.modal-overlay.open { display: flex; }
.modal-box { background: #231559; border: 1px solid rgba(181, 163, 255, 0.3); border-radius: 20px; max-width: 520px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 1.5rem; }
.crop-modal-box { background: #231559; border: 1px solid rgba(181, 163, 255, 0.3); border-radius: 20px; max-width: 420px; width: 100%; padding: 1.5rem; }
.crop-container { display: flex; justify-content: center; }
.crop-viewport {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: move;
  user-select: none;
  background: rgba(0, 0, 0, 0.3);
}
.crop-image-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
  transform-origin: center center;
}
.crop-image-wrap .crop-image {
  width: 200px;
  height: 200px;
  object-fit: contain;
  display: block;
  pointer-events: none;
}
.crop-circle-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  pointer-events: none;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.3);
}
.crop-zoom-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: rgba(181, 163, 255, 0.3);
}
.crop-zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #B5A3FF;
  cursor: pointer;
}
.crop-zoom-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #B5A3FF;
  cursor: pointer;
  border: none;
}
</style>
