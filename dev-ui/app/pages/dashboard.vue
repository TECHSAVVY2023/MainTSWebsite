<template>
  <div class="font-inter text-white min-h-screen bg-violet">

    <!-- ── Mobile drawer overlay ──────────────────────────────── -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="drawerOpen"
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          @click="drawerOpen = false"
        />
      </Transition>
      <Transition name="drawer">
        <aside
          v-if="drawerOpen"
          class="fixed top-0 left-0 h-full w-72 z-50 bg-violet-dark border-r border-white/[0.07] flex flex-col lg:hidden"
        >
          <!-- Drawer header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div class="flex items-center gap-2.5">
              <img :src="logoUrl" alt="Logo" class="h-10 w-auto object-contain" />
              <span class="font-bold text-sm text-white">Dashboard</span>
            </div>
            <button @click="drawerOpen = false" class="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors">
              <i class="fas fa-times" />
            </button>
          </div>

          <!-- User mini profile -->
          <div class="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3">
            <div class="relative shrink-0">
              <img v-if="profileImage" :src="profileImage" alt="Profile"
                class="w-10 h-10 rounded-xl border border-accent-purple/30 object-cover"
                @error="handleImageError" />
              <div v-else class="w-10 h-10 rounded-xl border border-accent-purple/30 bg-violet flex items-center justify-center">
                <span class="text-accent-purple text-xs font-bold">{{ userInitials }}</span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-violet-dark" />
            </div>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-white truncate">{{ user?.name || 'User' }}</p>
              <p class="text-[11px] text-white/40 truncate">{{ user?.email }}</p>
            </div>
          </div>

          <!-- Stat cards in drawer -->
          <div class="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <p class="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-1 mb-2">Overview</p>
            <div
              v-for="stat in statCards" :key="stat.label"
              class="group relative overflow-hidden rounded-xl bg-white/[0.04] border border-white/[0.07] p-4 hover:border-accent-purple/20 transition-all duration-200"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[11px] text-white/40 uppercase font-medium tracking-wider">{{ stat.label }}</p>
                  <p class="text-2xl font-bold text-white mt-0.5 leading-none">{{ stat.value }}</p>
                  <p v-if="stat.change" class="text-[11px] mt-1.5 font-medium" :class="stat.positive ? 'text-green-400' : 'text-red-400'">
                    {{ stat.change }}
                  </p>
                </div>
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="stat.iconBg">
                  <i :class="[stat.icon, stat.iconColor]" class="text-base" />
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer footer -->
          <div class="px-4 py-4 border-t border-white/[0.06] space-y-2">
            <button
              @click="drawerOpen = false; handleNewContent()"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-accent-purple text-violet hover:bg-accent-purple/90 transition-colors"
            >
              <i class="fas fa-plus text-xs" /> New Content
            </button>
            <button
              @click="handleLogout"
              class="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <i class="fas fa-sign-out-alt text-xs" /> Logout
            </button>
          </div>
        </aside>
      </Transition>
    </Teleport>

    <!-- ── Header ─────────────────────────────────────────────── -->
    <header class="sticky top-0 z-40 bg-violet/95 backdrop-blur-[16px] border-b border-white/[0.06]">
      <div class="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">

        <!-- Left: hamburger (mobile) + logo + title -->
        <div class="flex items-center gap-3">
          <button
            @click="drawerOpen = true"
            class="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/60 hover:text-white transition-colors"
          >
            <i class="fas fa-bars text-sm" />
          </button>
          <div class="flex items-center gap-2">
            <img :src="logoUrl" alt="Logo" class="h-10 w-auto object-contain shrink-0" />
            <span class="font-bold text-sm text-white">Dashboard</span>
          </div>
        </div>

        <!-- Right controls -->
        <div class="flex items-center gap-2">
          <!-- Profile avatar -->
          <div class="relative cursor-pointer">
            <img v-if="profileImage" :src="profileImage" alt="Profile"
              class="w-8 h-8 rounded-full border border-accent-purple/40 object-cover"
              @error="handleImageError" />
            <div v-else class="w-8 h-8 rounded-full border border-accent-purple/40 bg-violet-dark flex items-center justify-center">
              <span class="text-accent-purple text-[10px] font-bold">{{ userInitials }}</span>
            </div>
            <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-violet" />
          </div>
          <button class="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-white transition-colors">
            <i class="fas fa-cog text-sm" />
          </button>
          <button @click="handleLogout"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] text-white/40 hover:text-red-400 transition-colors">
            <i class="fas fa-sign-out-alt text-sm" />
          </button>
        </div>
      </div>
    </header>

    <!-- ── Main ───────────────────────────────────────────────── -->
    <main class="px-4 sm:px-6 lg:px-8 py-5 space-y-5 max-w-[1400px] mx-auto">

      <!-- Stat cards — desktop only (shown in drawer on mobile) ── -->
      <section class="hidden lg:grid grid-cols-4 gap-4">
        <div
          v-for="stat in statCards" :key="stat.label"
          class="group relative overflow-hidden rounded-2xl bg-violet-dark border border-white/[0.07] p-5 hover:border-accent-purple/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            :style="`background: radial-gradient(ellipse at 80% -10%, ${stat.glow} 0%, transparent 60%);`" />
          <div class="relative flex items-start justify-between">
            <div>
              <p class="text-[11px] text-white/40 tracking-widest uppercase font-medium">{{ stat.label }}</p>
              <p class="text-[1.75rem] font-bold text-white mt-1 leading-none tracking-tight">{{ stat.value }}</p>
              <p v-if="stat.change" class="text-xs mt-2 font-medium" :class="stat.positive ? 'text-green-400' : 'text-red-400'">
                {{ stat.change }}
              </p>
            </div>
            <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5" :class="stat.iconBg">
              <i :class="[stat.icon, stat.iconColor]" class="text-lg" />
            </div>
          </div>
        </div>
      </section>

      <!-- Welcome + side panel ────────────────────────────────── -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <!-- Welcome banner -->
        <div class="lg:col-span-2 relative overflow-hidden rounded-2xl bg-violet-dark border border-white/[0.07] p-5 sm:p-8">
          <div class="absolute inset-0 bg-gradient-to-br from-accent-purple/15 via-transparent to-accent-gold/5 pointer-events-none" />
          <div class="absolute -top-12 -right-12 w-56 h-56 bg-accent-purple/10 rounded-full blur-[70px] pointer-events-none" />
          <div class="absolute -bottom-12 -left-12 w-40 h-40 bg-accent-gold/[0.08] rounded-full blur-[60px] pointer-events-none" />

          <div class="relative z-10 flex items-start gap-4 sm:gap-5">
            <div class="relative shrink-0">
              <img v-if="profileImage" :src="profileImage" alt="Profile"
                class="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl border-2 border-accent-purple/30 object-cover shadow-lg shadow-accent-purple/15"
                @error="handleImageError" />
              <div v-else class="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl border-2 border-accent-purple/30 bg-violet flex items-center justify-center shadow-lg shadow-accent-purple/15">
                <span class="text-accent-purple text-xl sm:text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-[3px] border-violet-dark" />
            </div>
            <div class="min-w-0">
              <p class="text-[11px] font-semibold tracking-[0.18em] uppercase text-accent-gold mb-1">Welcome back,</p>
              <h1 class="text-lg sm:text-3xl font-bold tracking-tight text-white truncate">{{ user?.name || 'User' }}</h1>
              <p class="text-[11px] sm:text-sm text-white/45 mt-1 truncate">{{ user?.email }}</p>
              <p class="text-[11px] sm:text-sm text-white/35 mt-1.5">Good {{ greeting }}! Glad to see you again.</p>
            </div>
          </div>

          <div class="relative z-10 mt-5 flex flex-wrap items-center gap-3">
            <div class="bg-white/[0.07] border border-white/10 rounded-xl px-3 sm:px-4 py-2">
              <span class="text-sm sm:text-xl font-bold font-mono text-white tracking-tight">{{ currentTime }}</span>
            </div>
            <div class="text-[11px] sm:text-sm text-white/35 flex items-center gap-1.5">
              <i class="fas fa-calendar-alt" />
              {{ currentDate }}
            </div>
          </div>
        </div>

        <!-- Content status panel -->
        <div class="flex flex-col gap-4">
          <div class="flex-1 rounded-2xl bg-violet-dark border border-white/[0.07] p-5">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-bold text-white">Content Status</p>
              <span class="text-[10px] text-white/35 bg-white/[0.05] border border-white/[0.07] px-2.5 py-0.5 rounded-full">Overview</span>
            </div>
            <div class="space-y-3.5">
              <div v-for="s in contentStatus" :key="s.label">
                <div class="flex justify-between text-xs mb-1.5">
                  <span class="text-white/55">{{ s.label }}</span>
                  <span class="font-bold" :class="s.color">{{ s.count }}</span>
                </div>
                <div class="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-700 ease-out" :class="s.barColor" :style="{ width: s.pct + '%' }" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- Recent content table ────────────────────────────────── -->
      <section ref="contentTableRef" class="rounded-2xl bg-violet-dark border border-white/[0.07] overflow-hidden">
        <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.06] gap-3">
          <div class="min-w-0">
            <h2 class="text-xs sm:text-sm font-bold text-white">Recent Content</h2>
            <p class="text-[11px] text-white/35 mt-0.5 hidden sm:block">Latest posts from the CMS</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-1 rounded-full font-semibold hidden sm:block">
              {{ allItems.length }} items
            </span>
            <button
              @click="handleNewContent"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-accent-purple text-violet hover:bg-accent-purple/90 transition-colors whitespace-nowrap"
            >
              <i class="fas fa-plus text-[10px]" /> Add New
            </button>
          </div>
        </div>

        <!-- Search -->
        <div class="px-4 sm:px-6 py-3 border-b border-white/[0.05]">
          <div class="relative w-full sm:max-w-sm">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-white/25 text-xs" />
            <input
              v-model="contentSearch"
              type="text"
              placeholder="Search by title or category..."
              class="w-full pl-9 pr-8 py-2 rounded-lg text-xs sm:text-sm bg-violet/50 border border-white/[0.08] text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-accent-purple/40 focus:border-accent-purple/30"
            />
            <button v-if="contentSearch" @click="contentSearch = ''"
              class="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-accent-purple">
              <i class="fas fa-times text-xs" />
            </button>
          </div>
        </div>

        <!-- Table (scrollable on mobile) -->
        <div class="overflow-x-auto">
          <table class="w-full min-w-[520px]">
            <thead>
              <tr class="border-b border-white/[0.05] bg-white/[0.02]">
                <th class="text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 sm:px-6 py-3">Title</th>
                <th class="text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 py-3">Category</th>
                <th class="text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 py-3">Status</th>
                <th class="text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 py-3 hidden md:table-cell">Date</th>
                <th class="text-left text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loadingItems">
                <td colspan="5" class="px-6 py-10 text-center text-white/25 text-sm">Loading…</td>
              </tr>
              <tr v-else-if="filteredContentItems.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-white/25 text-sm">
                  {{ contentSearch ? 'No results found' : 'No content yet' }}
                </td>
              </tr>
              <tr
                v-for="item in filteredContentItems" :key="item.id"
                class="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors"
              >
                <td class="px-4 sm:px-6 py-3.5 max-w-[140px] sm:max-w-[240px]">
                  <p class="text-xs sm:text-sm font-medium text-white/90 truncate">{{ item.title }}</p>
                </td>
                <td class="px-4 py-3.5">
                  <span class="text-[11px] px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 font-medium whitespace-nowrap">
                    {{ (item.filters || 'News').split(',')[0].trim() }}
                  </span>
                </td>
                <td class="px-4 py-3.5">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold" :class="getStatusClass(item.approval_status)">
                    <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDot(item.approval_status)" />
                    {{ item.approval_status }}
                  </span>
                </td>
                <td class="px-4 py-3.5 text-[11px] text-white/35 hidden md:table-cell whitespace-nowrap">{{ formatItemDate(item.created_at) }}</td>
                <td class="px-4 py-3.5 whitespace-nowrap">
                  <button @click="handleEdit(item)" class="mr-3 text-accent-purple hover:text-accent-light transition-colors" title="Edit">
                    <i class="fas fa-pen text-xs" />
                  </button>
                  <button @click="handleDelete(item.id)" class="text-red-400 hover:text-red-300 transition-colors" title="Delete">
                    <i class="fas fa-trash text-xs" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Members (admin only) ────────────────────────────────── -->
      <section v-if="user?.email === 'jorenleeluna24@gmail.com'">
        <Members />
      </section>

      <!-- Content Form (hidden by default, shown on Add New / Edit) -->
      <Transition name="form-slide">
        <section v-if="showContentForm" ref="formSectionRef">
          <div class="rounded-2xl bg-violet-dark border border-white/[0.07] overflow-hidden">
            <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/[0.06]">
              <div>
                <h2 class="text-xs sm:text-sm font-bold text-white">Content Form</h2>
                <p class="text-[11px] text-white/35 mt-0.5 hidden sm:block">Manage content for Tech Savvy</p>
              </div>
              <button
                @click="showContentForm = false"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-white/[0.06] border border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all"
              >
                <i class="fas fa-times text-[10px]" /> Close Form
              </button>
            </div>
            <ContentFormAndList ref="contentFormRef" @saved="fetchItems" />
          </div>
        </section>
      </Transition>
    </main>

    <!-- Delete confirm modal ──────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showDeleteModal = false" />
          <div class="relative bg-violet-dark border border-red-500/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
            <div class="text-center">
              <div class="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-5">
                <i class="fas fa-trash text-red-400 text-xl" />
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Delete Content</h3>
              <p class="text-sm text-white/40 mb-6">Are you sure? This cannot be undone.</p>
              <div class="flex gap-3">
                <button @click="showDeleteModal = false"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-white font-semibold text-sm hover:bg-white/[0.12] transition-colors">
                  Cancel
                </button>
                <button @click="confirmDeleteItem"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Logout modal ─────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showLogoutModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showLogoutModal = false" />
          <div class="relative bg-violet-dark border border-accent-purple/20 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-sm w-full">
            <div class="text-center">
              <div class="mx-auto w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mb-5">
                <i class="fas fa-sign-out-alt text-red-400 text-xl" />
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Confirm Logout</h3>
              <p class="text-sm text-white/40 mb-6">Are you sure you want to sign out?</p>
              <div class="flex gap-3">
                <button @click="showLogoutModal = false"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-white font-semibold text-sm hover:bg-white/[0.12] transition-colors">
                  Cancel
                </button>
                <button @click="confirmLogout"
                  class="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import moment from 'moment'
import ContentFormAndList from '~/components/ContentFormAndList.vue'

definePageMeta({ middleware: 'auth' })

// ── Refs ─────────────────────────────────────────────────────────
const contentFormRef = ref<InstanceType<typeof ContentFormAndList> | null>(null)
const formSectionRef = ref<HTMLElement | null>(null)
const contentTableRef = ref<HTMLElement | null>(null)

const { user, setAuth, logout } = useAuth()
const { logoUrl } = useAppLogo()
const config = useRuntimeConfig()
const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')

// ── Mobile drawer ────────────────────────────────────────────────
const drawerOpen = ref(false)

// ── Time ────────────────────────────────────────────────────────
const currentTime = ref('')
const currentDate = ref('')
const greeting = ref('')
const showLogoutModal = ref(false)
const profileImage = ref<string | null>(null)

const userInitials = computed(() => {
  const name = user.value?.name || 'USER'
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0]![0]! + parts[1]![0]!).toUpperCase()
    : name.substring(0, 2).toUpperCase()
})

function updateTime () {
  const now = moment()
  currentTime.value = now.format('hh:mm:ss A')
  currentDate.value = now.format('dddd, MMM DD, YYYY')
  const h = now.hour()
  greeting.value = h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Evening'
}

// ── CMS data ────────────────────────────────────────────────────
interface CmsRaw {
  id: number
  title: string
  filters?: string
  approval_status?: string
  created_at?: string
}

const allItems = ref<CmsRaw[]>([])
const loadingItems = ref(true)

async function fetchItems () {
  if (!apiBase) { loadingItems.value = false; return }
  try {
    const data = await $fetch<unknown>(`${apiBase}/techsavvy_app/cms/list/`)
    const list = Array.isArray(data) ? data
      : (data as Record<string, unknown>)?.data
        ? (data as Record<string, unknown>).data as CmsRaw[]
        : []
    allItems.value = list as CmsRaw[]
  } catch { /* silent */ } finally {
    loadingItems.value = false
  }
}

// ── Stat cards ──────────────────────────────────────────────────
const newsCount = computed(() =>
  allItems.value.filter(i => {
    const f = i.filters || ''
    if (!f.trim()) return true
    return ['News', 'News Highlights', 'Events', 'Announcements'].some(c =>
      f.split(',').map(s => s.trim()).includes(c))
  }).length
)
const coursesCount = computed(() => allItems.value.filter(i => (i.filters || '').toLowerCase().includes('course')).length)
const projectsCount = computed(() => allItems.value.filter(i => (i.filters || '').toLowerCase().includes('project')).length)
const pendingCount = computed(() => allItems.value.filter(i => i.approval_status === 'pending').length)

const statCards = computed(() => [
  { label: 'Total News', value: newsCount.value, change: `+${newsCount.value} published`, positive: true, icon: 'fas fa-newspaper', iconBg: 'bg-accent-purple/15', iconColor: 'text-accent-purple', glow: 'rgba(181,163,255,0.12)' },
  { label: 'Courses', value: coursesCount.value, change: `${coursesCount.value} available`, positive: true, icon: 'fas fa-graduation-cap', iconBg: 'bg-accent-gold/15', iconColor: 'text-accent-gold', glow: 'rgba(255,215,74,0.12)' },
  { label: 'Projects', value: projectsCount.value, change: `${projectsCount.value} featured`, positive: true, icon: 'fas fa-folder-open', iconBg: 'bg-blue-400/15', iconColor: 'text-blue-400', glow: 'rgba(96,165,250,0.12)' },
  { label: 'Pending Review', value: pendingCount.value, change: pendingCount.value > 0 ? 'Needs attention' : 'All clear', positive: pendingCount.value === 0, icon: 'fas fa-clock', iconBg: 'bg-orange-400/15', iconColor: 'text-orange-400', glow: 'rgba(251,146,60,0.12)' }
])

// ── Content status bars ─────────────────────────────────────────
const contentStatus = computed(() => {
  const total = allItems.value.length || 1
  const approved = allItems.value.filter(i => i.approval_status === 'approved' || i.approval_status === 'verified').length
  const pending = allItems.value.filter(i => i.approval_status === 'pending').length
  const rejected = allItems.value.filter(i => i.approval_status === 'rejected').length
  return [
    { label: 'Approved / Verified', count: approved, pct: Math.round(approved / total * 100), color: 'text-green-400', barColor: 'bg-green-400' },
    { label: 'Pending', count: pending, pct: Math.round(pending / total * 100), color: 'text-accent-gold', barColor: 'bg-accent-gold' },
    { label: 'Rejected', count: rejected, pct: Math.round(rejected / total * 100), color: 'text-red-400', barColor: 'bg-red-400' }
  ]
})

// ── Helpers ─────────────────────────────────────────────────────
function getStatusClass (status?: string) {
  if (status === 'approved' || status === 'verified') return 'text-green-400'
  if (status === 'pending') return 'text-amber-400'
  if (status === 'rejected') return 'text-red-400'
  return 'text-white/40'
}
function getStatusDot (status?: string) {
  if (status === 'approved' || status === 'verified') return 'bg-green-400'
  if (status === 'pending') return 'bg-amber-400'
  if (status === 'rejected') return 'bg-red-400'
  return 'bg-white/25'
}
function formatItemDate (iso?: string) {
  return iso ? moment(iso).format('MMM DD, YYYY') : '—'
}

// ── Content table actions ────────────────────────────────────────
const showContentForm = ref(false)
const contentSearch = ref('')
const showDeleteModal = ref(false)
const pendingDeleteId = ref<number | null>(null)

const filteredContentItems = computed(() => {
  const q = contentSearch.value.trim().toLowerCase()
  if (!q) return allItems.value
  return allItems.value.filter(i =>
    i.title?.toLowerCase().includes(q) ||
    (i.filters || '').toLowerCase().includes(q)
  )
})

function scrollToForm () {
  nextTick(() => formSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function handleEdit (item: CmsRaw) {
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => { contentFormRef.value?.editPost(item); scrollToForm() })
}

function handleNewContent () {
  drawerOpen.value = false
  showContentForm.value = true
  nextTick(() => { contentFormRef.value?.openNewContentForm(); scrollToForm() })
}

function handleDelete (id: number) {
  pendingDeleteId.value = id
  showDeleteModal.value = true
}

async function confirmDeleteItem () {
  if (!pendingDeleteId.value || !apiBase) return
  try {
    await $fetch(`${apiBase}/techsavvy_app/cms/delete/${pendingDeleteId.value}/`, { method: 'DELETE' })
    showDeleteModal.value = false
    pendingDeleteId.value = null
    await fetchItems()
    contentFormRef.value?.loadPosts()
  } catch { /* silent */ }
}

// ── Auth ─────────────────────────────────────────────────────────
function handleLogout () { showLogoutModal.value = true }
function confirmLogout () { showLogoutModal.value = false; logout() }
function handleImageError () { profileImage.value = null }

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const urlToken = urlParams.get('token')
  if (urlToken) {
    setAuth(urlToken)
    window.history.replaceState({}, '', '/dashboard')
  } else {
    const { init } = useAuth()
    init()
  }
  updateTime()
  setInterval(updateTime, 1000)
  if (user.value?.image) profileImage.value = user.value.image
  fetchItems()
})

watch(() => user.value?.image, (img) => { if (img) profileImage.value = img })
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.25s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.drawer-enter-active { transition: transform 0.28s ease; }
.drawer-leave-active { transition: transform 0.22s ease; }
.drawer-enter-from, .drawer-leave-to { transform: translateX(-100%); }

.form-slide-enter-active { transition: all 0.3s ease; }
.form-slide-leave-active { transition: all 0.2s ease; }
.form-slide-enter-from, .form-slide-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
