<template>
  <div class="space-y-6">
    <!-- Gradebook Header & Controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-6">
      <div>
        <h1 class="text-xl font-black uppercase tracking-tight text-white">Class Gradebook & Analytics</h1>
        <p class="text-xs text-slate-400 mt-0.5">Track student progress, mini quiz results, and chapter assessments.</p>
      </div>

      <!-- Course Selector & Search -->
      <div class="flex flex-wrap items-center gap-2.5">
        <div class="relative">
          <select
            v-model="selectedCourseId"
            @change="handleCourseChange"
            class="rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-3 pr-8 text-xs font-bold text-white outline-none focus:border-violet-500 cursor-pointer"
          >
            <option v-if="courses.length === 0" :value="null">No Courses Available</option>
            <option v-for="c in courses" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
        </div>

        <div class="relative w-full sm:w-56">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
          <input
            v-model="gradebookSearch"
            type="text"
            placeholder="Search student…"
            class="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-8 pr-3 text-xs font-medium text-white outline-none focus:border-violet-500"
          />
        </div>

        <button
          type="button"
          @click="loadGradebook(selectedCourseId)"
          class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          title="Refresh Gradebook"
        >
          <i class="fas fa-sync-alt text-xs" :class="{ 'fa-spin': gradebookLoading }" />
        </button>
      </div>
    </div>

    <!-- Gradebook Quick Stats Metrics -->
    <div v-if="gradebookData" class="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
      <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Enrolled</span>
        <div class="mt-1 flex items-baseline gap-2">
          <span class="text-2xl font-black text-white font-mono">{{ gradebookData.total_enrolled }}</span>
          <span class="text-[10px] text-slate-500 font-bold">Learners</span>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Class Avg Progress</span>
        <div class="mt-1 flex items-baseline gap-2">
          <span class="text-2xl font-black text-violet-400 font-mono">{{ classAverageProgress }}%</span>
          <span class="text-[10px] text-slate-500 font-bold">Overall</span>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Points Awarded</span>
        <div class="mt-1 flex items-baseline gap-2">
          <span class="text-2xl font-black text-amber-400 font-mono">{{ classTotalPoints }}</span>
          <span class="text-[10px] text-amber-500/80 font-bold">pts</span>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Course Instructor</span>
        <div class="mt-1 truncate">
          <span class="text-xs font-bold text-slate-200 truncate block">{{ gradebookData.instructor_name || 'TechSavvy Instructor' }}</span>
          <span class="text-[10px] font-mono text-slate-500 truncate block">{{ gradebookData.instructor_email || 'instructor@techsavvy' }}</span>
        </div>
      </div>
    </div>

    <!-- Gradebook Student Roster Table -->
    <div class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <!-- Loading State -->
      <div v-if="gradebookLoading" class="py-16 text-center">
        <i class="fas fa-circle-notch fa-spin text-2xl text-violet-400 mb-2" />
        <p class="text-xs text-slate-400">Loading student submissions & progress…</p>
      </div>

      <!-- Empty Course State -->
      <div v-else-if="!selectedCourseId" class="py-16 text-center">
        <i class="fas fa-book-reader text-3xl text-slate-600 mb-3" />
        <h4 class="text-sm font-bold uppercase text-white">No Course Selected</h4>
        <p class="text-xs text-slate-500 mt-1">Select a course above to inspect its student roster.</p>
      </div>

      <!-- Empty Students State -->
      <div v-else-if="filteredStudents.length === 0" class="py-16 text-center">
        <i class="fas fa-user-graduate text-3xl text-slate-600 mb-3" />
        <h4 class="text-sm font-bold uppercase text-white">No Students Enrolled Yet</h4>
        <p class="text-xs text-slate-500 mt-1">When students enroll from the public catalog, their progress will appear here in real-time.</p>
      </div>

      <!-- Roster Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-800 bg-slate-950/60 text-[10px] font-black uppercase tracking-wider text-slate-400">
              <th class="py-3.5 px-4 sm:px-6">Student</th>
              <th class="py-3.5 px-4 text-center">Progress</th>
              <th class="py-3.5 px-4 text-center">Lessons</th>
              <th class="py-3.5 px-4 text-center">Mini Quizzes</th>
              <th class="py-3.5 px-4 text-left">Chapter Assessments</th>
              <th class="py-3.5 px-4 text-right">Points</th>
              <th class="py-3.5 px-4 text-right">Last Active</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/60 text-xs">
            <tr
              v-for="st in filteredStudents"
              :key="st.id"
              class="hover:bg-slate-850/50 transition-colors group"
            >
              <!-- Student Info -->
              <td class="py-3.5 px-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-950 border border-violet-800/60 text-violet-300 font-black text-xs uppercase shadow-sm">
                    {{ (st.student_name || st.student_email || 'S')[0] }}
                  </div>
                  <div class="min-w-0">
                    <div class="font-bold text-white truncate">{{ st.student_name || 'Anonymous Student' }}</div>
                    <div class="text-[11px] font-mono text-slate-400 truncate">{{ st.student_email }}</div>
                  </div>
                </div>
              </td>

              <!-- Progress Bar -->
              <td class="py-3.5 px-4 text-center">
                <div class="flex flex-col items-center gap-1">
                  <div class="flex items-center justify-between w-24 text-[10px] font-mono font-bold">
                    <span :class="st.progress_percentage >= 100 ? 'text-emerald-400' : 'text-violet-300'">
                      {{ st.progress_percentage }}%
                    </span>
                    <span v-if="st.progress_percentage >= 100" class="text-[9px] text-emerald-400 font-bold uppercase">Done</span>
                  </div>
                  <div class="h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :class="st.progress_percentage >= 100 ? 'bg-emerald-500' : 'bg-violet-500'"
                      :style="{ width: `${st.progress_percentage}%` }"
                    />
                  </div>
                </div>
              </td>

              <!-- Lessons Count -->
              <td class="py-3.5 px-4 text-center font-mono text-slate-300 font-bold">
                {{ st.completed_lessons_count }}
              </td>

              <!-- Mini Quizzes Count -->
              <td class="py-3.5 px-4 text-center">
                <span
                  class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold"
                  :class="st.mini_quiz_solved_count > 0 ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/60' : 'text-slate-500'"
                >
                  <i v-if="st.mini_quiz_solved_count > 0" class="fas fa-check text-[8px]" />
                  {{ st.mini_quiz_solved_count }} solved
                </span>
              </td>

              <!-- Chapter Assessments / Tests -->
              <td class="py-3.5 px-4">
                <div v-if="st.assessment_scores && st.assessment_scores.length > 0" class="flex flex-wrap gap-1.5 max-w-xs">
                  <span
                    v-for="att in st.assessment_scores"
                    :key="att.assessment_id"
                    class="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-mono font-bold border"
                    :class="att.passed ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' : 'bg-rose-950/80 text-rose-300 border-rose-800/60'"
                    :title="`${att.assessment_title}: ${att.score_percentage}%`"
                  >
                    <i :class="att.passed ? 'fas fa-check text-[7px]' : 'fas fa-times text-[7px]'" />
                    {{ att.assessment_title }}: {{ att.score_percentage }}%
                  </span>
                </div>
                <span v-else class="text-[10px] font-mono text-slate-500 italic">No tests taken</span>
              </td>

              <!-- Total Points -->
              <td class="py-3.5 px-4 text-right">
                <span class="inline-flex items-center gap-1 rounded-full bg-amber-950/70 border border-amber-800/50 px-2 py-0.5 text-[10px] font-mono font-black text-amber-300">
                  <i class="fas fa-bolt text-[8px] text-amber-400" />
                  +{{ st.total_points }}
                </span>
              </td>

              <!-- Last Active -->
              <td class="py-3.5 px-4 text-right text-[10px] font-mono text-slate-400">
                {{ formatDate(st.last_accessed_at || st.enrolled_at) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse, type GradebookData } from '~/composables/useAcademy'

const props = defineProps<{
  courses: AcademyCourse[]
  initialCourseId?: number | null
}>()

const { fetchCourseGradebook } = useAcademy()

const selectedCourseId = ref<number | null>(props.initialCourseId || (props.courses.length > 0 ? props.courses[0].id : null))
const gradebookData = ref<GradebookData | null>(null)
const gradebookLoading = ref(false)
const gradebookSearch = ref('')

watch(() => props.courses, (newCourses) => {
  if (newCourses.length > 0 && !selectedCourseId.value) {
    selectedCourseId.value = newCourses[0].id
    loadGradebook(newCourses[0].id)
  }
}, { immediate: true })

watch(() => props.initialCourseId, (newId) => {
  if (newId && newId !== selectedCourseId.value) {
    selectedCourseId.value = newId
    loadGradebook(newId)
  }
})

onMounted(() => {
  if (selectedCourseId.value) {
    loadGradebook(selectedCourseId.value)
  }
})

const filteredStudents = computed(() => {
  if (!gradebookData.value?.students) return []
  const q = gradebookSearch.value.trim().toLowerCase()
  if (!q) return gradebookData.value.students
  return gradebookData.value.students.filter(s =>
    (s.student_name || '').toLowerCase().includes(q) ||
    (s.student_email || '').toLowerCase().includes(q)
  )
})

const classAverageProgress = computed(() => {
  if (!gradebookData.value?.students || gradebookData.value.students.length === 0) return 0
  const sum = gradebookData.value.students.reduce((acc, s) => acc + (s.progress_percentage || 0), 0)
  return Math.round(sum / gradebookData.value.students.length)
})

const classTotalPoints = computed(() => {
  if (!gradebookData.value?.students) return 0
  return gradebookData.value.students.reduce((acc, s) => acc + (s.total_points || 0), 0)
})

async function loadGradebook (courseId?: number | null) {
  if (!courseId) {
    gradebookData.value = null
    return
  }
  gradebookLoading.value = true
  try {
    const res = await fetchCourseGradebook(courseId)
    gradebookData.value = res
  } catch (err) {
    console.error('Failed to load gradebook:', err)
  } finally {
    gradebookLoading.value = false
  }
}

function handleCourseChange () {
  if (selectedCourseId.value) {
    loadGradebook(selectedCourseId.value)
  }
}

function formatDate (d?: string | null) {
  if (!d) return '—'
  try {
    const date = new Date(d)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return String(d)
  }
}
</script>
