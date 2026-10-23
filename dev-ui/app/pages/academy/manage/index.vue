<template>
  <div class="font-inter min-h-screen bg-[#090D16] text-slate-100 selection:bg-violet-500 selection:text-white">
    <!-- ── Minimalist Studio Header ──────────────────────────────── -->
    <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-3">
          <NuxtLink to="/academy" class="flex items-center gap-2.5 text-white transition-opacity hover:opacity-80">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md shadow-violet-600/30">
              <i class="fas fa-graduation-cap text-xs" />
            </div>
            <span class="text-xs font-black uppercase tracking-wider text-white">
              TechSavvy <span class="text-violet-400">Academy</span>
            </span>
          </NuxtLink>
          <span class="rounded bg-violet-950/80 border border-violet-800/50 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-violet-300">
            LMS Studio
          </span>
          <div v-if="userRole" class="hidden sm:flex items-center gap-1.5 ml-1">
            <span
              v-if="userRole.is_admin"
              class="flex items-center gap-1 rounded-full bg-amber-950/80 border border-amber-600/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-300 shadow-sm"
            >
              <i class="fas fa-crown text-[8px] text-amber-400" /> Admin
            </span>
            <span
              v-else-if="userRole.is_teacher"
              class="flex items-center gap-1 rounded-full bg-cyan-950/80 border border-cyan-600/40 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-cyan-300 shadow-sm"
            >
              <i class="fas fa-chalkboard-teacher text-[8px] text-cyan-400" /> Instructor
            </span>
            <span
              v-else
              class="flex items-center gap-1 rounded-full bg-slate-800/80 border border-slate-700 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400"
            >
              <i class="fas fa-user-graduate text-[8px] text-slate-400" /> Student
            </span>
          </div>
        </div>

        <!-- Navigation Tabs & Actions -->
        <div class="flex items-center gap-2 sm:gap-3">
          <nav class="hidden md:flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1">
            <button
              type="button"
              @click="activeTab = 'courses'"
              class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
              :class="activeTab === 'courses' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              <i class="fas fa-book-open mr-1.5 text-[10px]" />
              Courses & Curriculum
            </button>
            <button
              type="button"
              @click="activeTab = 'gradebook'"
              class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer"
              :class="activeTab === 'gradebook' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            >
              <i class="fas fa-user-graduate mr-1.5 text-[10px]" />
              Gradebook
            </button>
          </nav>

          <NuxtLink
            to="/academy"
            class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
          >
            <i class="fas fa-external-link-alt text-[10px] text-violet-400" />
            <span class="hidden sm:inline">Student View</span>
          </NuxtLink>

          <button
            type="button"
            @click="openCourseModal()"
            class="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-violet-600/20 hover:bg-violet-500 transition-all cursor-pointer"
          >
            <i class="fas fa-plus text-[10px]" />
            <span>New Course</span>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Student Role Notice (Non-intrusive) -->
      <div
        v-if="userRole && !userRole.is_teacher && !userRole.is_admin"
        class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-4 text-amber-200"
      >
        <div class="flex items-center gap-3">
          <i class="fas fa-info-circle text-amber-400 text-lg" />
          <div>
            <p class="text-xs font-bold text-amber-300">You are currently viewing LMS Studio as a Student</p>
            <p class="text-[11px] text-amber-400/80">Teacher or Admin permissions are required to publish courses and organize chapters.</p>
          </div>
        </div>
        <NuxtLink
          to="/academy"
          class="rounded-xl bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors whitespace-nowrap"
        >
          🎓 Go to Student Catalog
        </NuxtLink>
      </div>

      <!-- Tab 1: Courses & Curriculum -->
      <div v-if="activeTab === 'courses'">
        <!-- View 1A: Course Catalog List -->
        <div v-if="!selectedCurriculumCourse" class="space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-6">
            <div>
              <h1 class="text-xl font-black uppercase tracking-tight text-white">Course Management</h1>
              <p class="text-xs text-slate-400 mt-0.5">Author courses, organize chapter modules, and configure quizzes.</p>
            </div>

            <div class="flex items-center gap-3">
              <div class="relative w-full sm:w-64">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Filter courses…"
                  class="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-3 text-xs font-medium text-white outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          <!-- Course Cards Grid -->
          <div v-if="filteredCourses.length > 0" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="c in filteredCourses"
              :key="c.id"
              class="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg transition-all hover:border-violet-500/40 hover:bg-slate-900"
            >
              <div class="relative h-36 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                <img
                  :src="c.thumbnail || '/img/The-division-shd-logo.png'"
                  :alt="c.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  @error="(e: any) => { e.target.src = '/img/The-division-shd-logo.png' }"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div class="absolute top-2.5 left-2.5">
                  <span class="rounded bg-violet-950/90 backdrop-blur-md border border-violet-800/60 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-300">
                    {{ c.category }}
                  </span>
                </div>
                <div class="absolute top-2.5 right-2.5">
                  <span
                    class="rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider backdrop-blur-md"
                    :class="c.is_published ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-800/60' : 'bg-slate-800/90 text-slate-400 border border-slate-700'"
                  >
                    {{ c.is_published ? 'Published' : 'Draft' }}
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="flex flex-1 flex-col p-5">
                <h3 class="text-sm font-black uppercase text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                  {{ c.title }}
                </h3>

                <p class="mt-1.5 line-clamp-2 text-xs text-slate-400 leading-relaxed flex-1">
                  {{ c.description || 'No summary provided.' }}
                </p>

                <!-- Stats Pill Row -->
                <div class="mt-4 flex items-center gap-3 text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-3">
                  <span><strong>{{ c.modules_count ?? 0 }}</strong> Modules</span>
                  <span>•</span>
                  <span><strong>{{ c.lessons_count ?? 0 }}</strong> Lessons</span>
                  <span>•</span>
                  <span><strong>{{ c.estimated_hours }}</strong>h</span>
                </div>

                <!-- Actions -->
                <div class="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    @click="openCurriculumBuilder(c)"
                    class="flex items-center gap-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition-all cursor-pointer"
                  >
                    <i class="fas fa-sitemap text-[10px]" />
                    <span>Curriculum</span>
                  </button>

                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      @click="openCoTeacherModal(c)"
                      class="flex h-7 px-2 items-center gap-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-cyan-300 text-[10px] font-bold border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
                      title="People & Co-Teachers"
                    >
                      <i class="fas fa-user-friends text-xs" />
                      <span v-if="c.co_teachers && c.co_teachers.length > 0" class="rounded bg-cyan-950 px-1 py-0.5 text-[8px] font-mono text-cyan-400 border border-cyan-800/60">
                        {{ c.co_teachers.length }}
                      </span>
                    </button>
                    <button
                      type="button"
                      @click="openCourseModal(c)"
                      class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white cursor-pointer"
                      title="Edit Details"
                    >
                      <i class="fas fa-edit text-xs" />
                    </button>
                    <button
                      type="button"
                      @click="handleDeleteCourse(c)"
                      class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-950/40 hover:text-rose-400 cursor-pointer"
                      title="Delete Course"
                    >
                      <i class="fas fa-trash text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 text-center">
            <i class="fas fa-book-open text-3xl text-slate-600 mb-3" />
            <h4 class="text-sm font-bold uppercase text-white">No Courses Created</h4>
            <p class="text-xs text-slate-500 mt-1">Click "New Course" above to create your first curriculum.</p>
          </div>
        </div>

        <!-- View 1B: Curriculum & Module Builder -->
        <AcademyCurriculumBuilder
          v-else
          :course="selectedCurriculumCourse"
          @back="selectedCurriculumCourse = null"
          @refresh="refreshCurriculum"
          @add-lesson="handleAddLesson"
          @edit-lesson="handleEditLesson"
          @open-assessment="handleOpenAssessment"
        />
      </div>

      <!-- Tab 2: Gradebook -->
      <AcademyGradebook
        v-else-if="activeTab === 'gradebook'"
        :courses="courses"
        :initial-course-id="courses.length > 0 ? courses[0].id : null"
      />
    </main>

    <!-- ── Extracted Modals ── -->
    <AcademyCourseModal
      v-model:is-open="showCourseModal"
      :course="editingCourse"
      @saved="refreshCourses"
    />

    <AcademyLessonEditorModal
      v-model:is-open="showLessonEditor"
      :module-id="targetModuleId"
      :lesson-id="editingLessonId"
      @saved="refreshCurriculum"
    />

    <AcademyAssessmentStudioModal
      v-model:is-open="showAssessmentStudio"
      :assessment="editingAssessment"
      @saved="refreshCurriculum"
    />

    <AcademyCoTeacherModal
      v-model:is-open="showCoTeacherModal"
      :course="targetCoTeacherCourse"
      @updated="refreshCourses"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['academy-teacher']
})

import {
  useAcademy,
  type AcademyCourse,
  type AcademyAssessmentOutline
} from '~/composables/useAcademy'
import { useAuth } from '~/composables/useAuth'

import AcademyCourseModal from '~/components/academy/AcademyCourseModal.vue'
import AcademyCurriculumBuilder from '~/components/academy/AcademyCurriculumBuilder.vue'
import AcademyLessonEditorModal from '~/components/academy/AcademyLessonEditorModal.vue'
import AcademyAssessmentStudioModal from '~/components/academy/AcademyAssessmentStudioModal.vue'
import AcademyCoTeacherModal from '~/components/academy/AcademyCoTeacherModal.vue'
import AcademyGradebook from '~/components/academy/AcademyGradebook.vue'

useHead({
  title: 'LMS Studio | TechSavvy Academy',
  meta: [{ name: 'description', content: 'Minimalist Academy LMS Studio for courses, markdown lessons, and quiz management.' }]
})

const { user } = useAuth()
const {
  courses,
  userRole,
  fetchMyAcademyRole,
  adminFetchCourses,
  adminFetchCourseById,
  adminDeleteCourse
} = useAcademy()

const activeTab = ref<'courses' | 'gradebook'>('courses')
const searchQuery = ref('')
const selectedCurriculumCourse = ref<AcademyCourse | null>(null)

const filteredCourses = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return courses.value
  return courses.value.filter(c => (c.title || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q))
})

// Modals State
const showCourseModal = ref(false)
const editingCourse = ref<Partial<AcademyCourse> | null>(null)

const showLessonEditor = ref(false)
const targetModuleId = ref<number | null>(null)
const editingLessonId = ref<number | null>(null)

const showAssessmentStudio = ref(false)
const editingAssessment = ref<AcademyAssessmentOutline | null>(null)

const showCoTeacherModal = ref(false)
const targetCoTeacherCourse = ref<AcademyCourse | null>(null)

onMounted(async () => {
  await fetchMyAcademyRole(user.value?.email)
  await adminFetchCourses(user.value?.email)
})

watch(() => user.value?.email, async (email) => {
  if (email) {
    await fetchMyAcademyRole(email)
    await adminFetchCourses(email)
  }
})

function openCourseModal (c?: AcademyCourse) {
  editingCourse.value = c || null
  showCourseModal.value = true
}

async function handleDeleteCourse (c: AcademyCourse) {
  if (confirm(`Delete course "${c.title}"?`)) {
    try {
      await adminDeleteCourse(c.id)
      await adminFetchCourses()
    } catch (err) {
      console.error('Failed to delete course:', err)
    }
  }
}

async function openCurriculumBuilder (c: AcademyCourse) {
  const full = await adminFetchCourseById(c.id)
  if (full) {
    selectedCurriculumCourse.value = full
  }
}

function openCoTeacherModal (course: AcademyCourse) {
  targetCoTeacherCourse.value = course
  showCoTeacherModal.value = true
}

function handleAddLesson (modId: number) {
  targetModuleId.value = modId
  editingLessonId.value = null
  showLessonEditor.value = true
}

function handleEditLesson (lesId: number) {
  targetModuleId.value = null
  editingLessonId.value = lesId
  showLessonEditor.value = true
}

function handleOpenAssessment (ass: AcademyAssessmentOutline) {
  editingAssessment.value = ass
  showAssessmentStudio.value = true
}

async function refreshCurriculum () {
  if (selectedCurriculumCourse.value) {
    const full = await adminFetchCourseById(selectedCurriculumCourse.value.id)
    if (full) {
      selectedCurriculumCourse.value = full
    }
  }
  await adminFetchCourses()
}

async function refreshCourses () {
  await adminFetchCourses()
}
</script>
