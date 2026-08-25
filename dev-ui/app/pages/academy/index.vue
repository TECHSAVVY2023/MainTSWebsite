<template>
  <div class="font-inter min-h-screen bg-[#090D16] text-slate-100 selection:bg-violet-500 selection:text-white">
    <!-- ── Minimalist Academy Header ─────────────────────────────── -->
    <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md shadow-violet-600/30">
              <i class="fas fa-graduation-cap text-xs" />
            </div>
            <span class="text-xs font-black uppercase tracking-wider text-white">
              TechSavvy <span class="text-violet-400">Academy</span>
            </span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/academy/manage"
            class="flex items-center gap-1.5 rounded-xl border border-violet-800/40 bg-violet-950/40 px-3 py-1.5 text-xs font-bold text-violet-300 hover:border-violet-600 hover:bg-violet-900/60 transition-all"
          >
            <i class="fas fa-layer-group text-[10px] text-violet-400" />
            <span>LMS Studio</span>
          </NuxtLink>

          <NuxtLink
            to="/dashboard"
            class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <i class="fas fa-user-circle text-xs text-slate-400" />
            <span class="hidden sm:inline">{{ user ? 'Dashboard' : 'Sign In' }}</span>
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl pb-24">
      <!-- ── Minimalist Hero ───────────────────────────────────────── -->
      <section class="py-10 sm:py-14 text-center">
        <div class="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-950/30 px-3 py-1 text-xs font-bold text-violet-300 mb-4">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Interactive Developer Curriculum</span>
        </div>

        <h1 class="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
          TechSavvy <span class="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">Academy</span>
        </h1>

        <p class="mt-3 text-xs sm:text-sm font-medium text-slate-400 max-w-xl mx-auto leading-relaxed">
          Hands-on developer education inspired by Cisco NetAcad. Master modern frameworks with structured chapters, rich Markdown tutorials, and module quizzes.
        </p>

        <!-- Minimal Search & Track Filter -->
        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-lg mx-auto">
          <div class="relative w-full">
            <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search courses or topics…"
              class="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2 pl-9 pr-3 text-xs font-medium text-white outline-none focus:border-violet-500"
            />
          </div>

          <select
            v-model="selectedLevel"
            @change="handleFilterChange"
            class="w-full sm:w-auto rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs font-medium text-slate-300 outline-none focus:border-violet-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </section>

      <!-- ── Category Filter Pills ─────────────────────────────────── -->
      <section class="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 [scrollbar-width:none]">
        <button
          type="button"
          v-for="cat in categories"
          :key="cat.value"
          @click="setCategory(cat.value)"
          class="shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all"
          :class="selectedCategory === cat.value ? 'bg-violet-600 text-white shadow-sm' : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white'"
        >
          <i :class="cat.icon" class="mr-1.5 text-[10px]" />
          {{ cat.label }}
        </button>
      </section>

      <!-- ── My In-Progress Courses ────────────────────────────────── -->
      <section v-if="myEnrollments.length > 0" class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-black uppercase tracking-wider text-slate-400">Continue Learning</h2>
          <span class="text-[10px] font-mono text-violet-400">{{ myEnrollments.length }} Enrolled</span>
        </div>

        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="enrollment in myEnrollments"
            :key="enrollment.id"
            class="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-violet-500/40 hover:bg-slate-900"
          >
            <h3 class="truncate text-xs font-black uppercase text-white group-hover:text-violet-300 transition-colors">
              {{ enrollment.course_title }}
            </h3>

            <div class="mt-3">
              <div class="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>Progress</span>
                <span class="text-emerald-400 font-bold">{{ enrollment.progress_percentage }}%</span>
              </div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  class="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
                  :style="{ width: `${enrollment.progress_percentage}%` }"
                />
              </div>
            </div>

            <div class="mt-4 flex items-center justify-end pt-2 border-t border-slate-800/60">
              <NuxtLink
                :to="`/academy/learn/${enrollment.course_slug}`"
                class="inline-flex items-center gap-1 text-[11px] font-bold text-violet-400 hover:text-violet-300"
              >
                <span>Resume</span>
                <i class="fas fa-arrow-right text-[9px]" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Course Catalog Grid ───────────────────────────────────── -->
      <section>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xs font-black uppercase tracking-wider text-slate-400">Available Courses</h2>
          <span class="text-[10px] font-mono text-slate-500">{{ courses.length }} total</span>
        </div>

        <div v-if="courses.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="course in courses"
            :key="course.id"
            class="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-violet-500/40 hover:bg-slate-900"
          >
            <div class="flex items-start justify-between gap-2 mb-3">
              <span class="rounded bg-violet-950/80 border border-violet-800/40 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-300">
                {{ course.category }}
              </span>
              <span class="text-[10px] font-mono text-slate-500">{{ course.estimated_hours }}h</span>
            </div>

            <h3 class="text-sm font-black uppercase text-white group-hover:text-violet-300 transition-colors line-clamp-1">
              {{ course.title }}
            </h3>

            <p class="mt-2 line-clamp-2 text-xs text-slate-400 leading-relaxed flex-1">
              {{ course.description || 'Hands-on curriculum covering core concepts and interactive quizzes.' }}
            </p>

            <div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span class="text-[10px] font-bold text-slate-500 font-mono">{{ course.modules_count ?? 0 }} Modules</span>

              <NuxtLink
                :to="`/academy/${course.slug}`"
                class="flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-violet-500 transition-colors"
              >
                <span>View Course</span>
                <i class="fas fa-chevron-right text-[9px]" />
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 text-center">
          <i class="fas fa-book-open text-3xl text-slate-600 mb-3" />
          <h4 class="text-sm font-bold uppercase text-white">No Courses Found</h4>
          <p class="text-xs text-slate-500 mt-1">Try adjusting your search or track filters.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAcademy } from '~/composables/useAcademy'
import { useAuth } from '~/composables/useAuth'

useHead({
  title: 'Academy | TechSavvy Developer LMS',
  meta: [{ name: 'description', content: 'Minimalist developer courses and interactive NetAcad learning platform.' }]
})

const { courses, myEnrollments, fetchCourses, fetchMyEnrollments } = useAcademy()
const { user } = useAuth()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedLevel = ref('all')

const categories = [
  { label: 'All', value: 'all', icon: 'fas fa-th-large' },
  { label: 'Web Dev', value: 'Web Development', icon: 'fas fa-code' },
  { label: 'Cybersecurity', value: 'Cybersecurity', icon: 'fas fa-shield-alt' },
  { label: 'Cloud & DevOps', value: 'Cloud & DevOps', icon: 'fas fa-cloud' },
  { label: 'Python & AI', value: 'Python & AI', icon: 'fas fa-brain' },
  { label: 'Systems', value: 'Systems & Networking', icon: 'fas fa-network-wired' }
]

onMounted(async () => {
  await fetchCourses()
  if (user.value?.email) {
    await fetchMyEnrollments(user.value.email)
  }
})

let searchTimer: ReturnType<typeof setTimeout> | null = null
function handleSearch () {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    fetchCourses(selectedCategory.value, selectedLevel.value, searchQuery.value)
  }, 300)
}

function setCategory (cat: string) {
  selectedCategory.value = cat
  fetchCourses(selectedCategory.value, selectedLevel.value, searchQuery.value)
}

function handleFilterChange () {
  fetchCourses(selectedCategory.value, selectedLevel.value, searchQuery.value)
}
</script>
