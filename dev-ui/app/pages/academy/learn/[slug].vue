<template>
  <div class="font-inter flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100">
    <!-- ── Top Classroom Bar ───────────────────────────────────────── -->
    <header class="z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 sm:px-6">
      <div class="flex items-center gap-3">
        <NuxtLink
          :to="`/academy/${courseSlug}`"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          title="Exit Classroom"
        >
          <i class="fas fa-arrow-left text-xs" />
        </NuxtLink>

        <button
          type="button"
          @click="sidebarOpen = !sidebarOpen"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors lg:hidden"
          aria-label="Toggle Syllabus"
        >
          <i class="fas fa-bars text-xs" />
        </button>

        <div class="min-w-0">
          <h1 class="truncate text-xs sm:text-sm font-black uppercase tracking-tight text-white">
            {{ course?.title || 'Loading Course…' }}
          </h1>
          <p class="truncate text-[10px] font-bold text-violet-400">
            {{ activeMode === 'lesson' ? (activeLesson?.title || 'Lesson') : (activeAssessment?.title || 'Quiz / Test') }}
          </p>
        </div>
      </div>

      <!-- Course Progress & Actions -->
      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-3">
          <div class="text-right">
            <span class="block text-[9px] font-black uppercase tracking-wider text-slate-400">Progress</span>
            <span class="font-mono text-xs font-bold text-emerald-400">{{ courseProgress }}%</span>
          </div>
          <div class="h-2 w-24 overflow-hidden rounded-full bg-slate-800">
            <div
              class="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-500"
              :style="{ width: `${courseProgress}%` }"
            />
          </div>
        </div>

        <NuxtLink
          to="/academy"
          class="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-300 hover:border-slate-600 hover:text-white transition-colors"
        >
          Catalog
        </NuxtLink>
      </div>
    </header>

    <!-- ── Main Classroom Split-Pane ──────────────────────────────── -->
    <div class="relative flex flex-1 min-h-0 overflow-hidden">
      <!-- ── Left Curriculum Sidebar (Cisco NetAcad Style) ────────── -->
      <aside
        class="custom-scrollbar z-20 flex flex-col shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-950 transition-all duration-300"
        :class="[
          sidebarOpen ? 'w-80 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-80',
          'fixed inset-y-14 left-0 lg:static'
        ]"
      >
        <div class="p-4 border-b border-slate-800/80">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Course Syllabus</span>
            <span class="text-[10px] font-bold text-violet-400 font-mono">{{ completedLessonsCount }}/{{ totalLessonsCount }} Done</span>
          </div>
        </div>

        <!-- Modules Accordion Tree -->
        <div class="flex-1 divide-y divide-slate-900 p-2 space-y-2">
          <div
            v-for="(mod, modIdx) in course?.modules"
            :key="mod.id"
            class="rounded-2xl border border-slate-800/60 bg-slate-900/60 overflow-hidden"
          >
            <!-- Module Header -->
            <div
              @click="toggleModule(mod.id)"
              class="flex cursor-pointer items-center justify-between p-3 transition-colors hover:bg-slate-800/60"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-violet-950 text-[10px] font-bold text-violet-400 border border-violet-800/40 font-mono">
                  {{ modIdx + 1 }}
                </span>
                <span class="truncate text-xs font-bold text-slate-200">{{ mod.title }}</span>
              </div>
              <i
                class="fas fa-chevron-down text-[10px] text-slate-500 transition-transform duration-200 shrink-0 ml-2"
                :class="{ 'rotate-180': openModules.includes(mod.id) }"
              />
            </div>

            <!-- Lessons & Quizzes List -->
            <div v-show="openModules.includes(mod.id)" class="p-1 space-y-1 bg-slate-950/40">
              <!-- Lessons -->
              <button
                type="button"
                v-for="(les, lesIdx) in mod.lessons"
                :key="les.id"
                @click="selectLesson(les.id)"
                class="w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all"
                :class="activeMode === 'lesson' && activeLessonId === les.id ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <i
                    v-if="completedLessonIds.includes(les.id)"
                    class="fas fa-check-circle text-xs text-emerald-400 shrink-0"
                  />
                  <i
                    v-else
                    class="far fa-circle text-xs shrink-0 opacity-60"
                    :class="activeMode === 'lesson' && activeLessonId === les.id ? 'text-white' : 'text-slate-500'"
                  />
                  <span class="truncate text-[11px]">
                    {{ modIdx + 1 }}.{{ lesIdx + 1 }} {{ les.title }}
                  </span>
                </div>
                <span class="text-[9px] opacity-75 shrink-0 font-mono ml-2">{{ les.estimated_minutes }}m</span>
              </button>

              <!-- Module Quizzes & Tests -->
              <button
                type="button"
                v-for="ass in mod.assessments"
                :key="ass.id"
                @click="selectAssessment(ass)"
                class="w-full flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition-all"
                :class="activeMode === 'quiz' && activeAssessment?.id === ass.id ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30' : 'bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30'"
              >
                <div class="flex items-center gap-2.5 min-w-0">
                  <i class="fas fa-tasks text-xs shrink-0 text-emerald-400" />
                  <span class="truncate text-[11px] font-bold">{{ ass.title }}</span>
                </div>
                <span class="rounded bg-emerald-950 px-1.5 py-0.5 text-[8px] font-black uppercase text-emerald-300">
                  {{ ass.kind }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- ── Main Classroom View Area ─────────────────────────────── -->
      <main class="custom-scrollbar flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-8 lg:p-12">
        <!-- ── Mode 1: Markdown Lesson Reader ──────────────────────── -->
        <div v-if="activeMode === 'lesson'" class="mx-auto max-w-3xl">
          <!-- Lesson Breadcrumb & Title Header -->
          <div class="border-b border-slate-800 pb-6 mb-8">
            <div class="flex items-center gap-2 text-xs font-bold text-violet-400 mb-2 uppercase tracking-wider">
              <span>{{ activeLesson?.module_title || 'Module' }}</span>
              <i class="fas fa-chevron-right text-[9px] opacity-60" />
              <span>Lesson {{ activeLesson?.order || 1 }}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {{ activeLesson?.title || 'Loading Lesson…' }}
            </h2>

            <div class="mt-3 flex items-center gap-4 text-xs text-slate-400">
              <span class="flex items-center gap-1.5">
                <i class="far fa-clock text-xs text-violet-400" />
                <span>{{ activeLesson?.estimated_minutes || 15 }} mins read</span>
              </span>
              <span v-if="isCurrentLessonCompleted" class="flex items-center gap-1.5 text-emerald-400 font-bold">
                <i class="fas fa-check-circle text-xs" /> Completed
              </span>
            </div>
          </div>

          <!-- Video Embed (If available) -->
          <div v-if="activeLesson?.video_url" class="mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
            <iframe
              :src="activeLesson.video_url"
              class="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>

          <!-- Rendered Markdown Body -->
          <div
            class="academy-markdown bg-slate-950/60 p-6 sm:p-10 rounded-3xl border border-slate-800/80 shadow-xl"
            v-html="renderedMarkdownContent"
          />

          <!-- Lesson Navigation Footer -->
          <div class="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <button
              type="button"
              :disabled="!activeLesson?.prev_lesson"
              @click="activeLesson?.prev_lesson && selectLesson(activeLesson.prev_lesson.id)"
              class="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-bold uppercase text-slate-300 transition-all hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none"
            >
              <i class="fas fa-arrow-left text-xs" />
              <span>Previous Lesson</span>
            </button>

            <button
              type="button"
              @click="toggleCompleteCurrentLesson"
              class="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all"
              :class="isCurrentLessonCompleted ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' : 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/30'"
            >
              <i class="fas" :class="isCurrentLessonCompleted ? 'fa-check-double' : 'fa-check'" />
              <span>{{ isCurrentLessonCompleted ? 'Completed ✓' : 'Mark as Completed' }}</span>
            </button>

            <button
              type="button"
              :disabled="!activeLesson?.next_lesson"
              @click="activeLesson?.next_lesson && selectLesson(activeLesson.next_lesson.id)"
              class="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-xs font-bold uppercase text-slate-300 transition-all hover:bg-slate-750 disabled:opacity-30 disabled:pointer-events-none"
            >
              <span>Next Lesson</span>
              <i class="fas fa-arrow-right text-xs" />
            </button>
          </div>
        </div>

        <!-- ── Mode 2: Interactive Quiz & Test Runner ──────────────── -->
        <div v-else-if="activeMode === 'quiz' && activeAssessment" class="mx-auto max-w-3xl">
          <!-- Quiz Header -->
          <div class="border-b border-slate-800 pb-6 mb-8">
            <div class="flex items-center gap-2 mb-2">
              <span class="rounded-full bg-emerald-950 border border-emerald-800/60 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                {{ activeAssessment.kind }}
              </span>
              <span class="text-xs font-bold text-slate-400">
                Passing Grade: <strong class="text-white">{{ activeAssessment.passing_percentage }}%</strong>
              </span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {{ activeAssessment.title }}
            </h2>
            <p v-if="activeAssessment.description" class="mt-2 text-xs text-slate-400">
              {{ activeAssessment.description }}
            </p>
          </div>

          <!-- Quiz Questions Form -->
          <div v-if="!quizResult" class="space-y-6">
            <div
              v-for="(q, qIdx) in quizQuestions"
              :key="q.id"
              class="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 shadow-xl"
            >
              <!-- Question Header -->
              <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                <span class="text-xs font-black uppercase text-violet-400">Question {{ qIdx + 1 }} of {{ quizQuestions.length }}</span>
                <span class="font-mono text-[10px] font-bold text-slate-500">{{ q.points }} Point(s)</span>
              </div>

              <!-- Question Prompt (Markdown) -->
              <div class="academy-markdown mb-6 font-semibold text-white" v-html="renderMarkdown(q.prompt_markdown)" />

              <!-- Options -->
              <div class="space-y-3">
                <label
                  v-for="opt in q.options"
                  :key="opt.id"
                  class="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-xs font-medium transition-all"
                  :class="isOptionSelected(q.id, opt.id) ? 'border-violet-500 bg-violet-950/40 text-white shadow-md' : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-850'"
                >
                  <input
                    :type="q.question_type === 'multiple_choice' ? 'checkbox' : 'radio'"
                    :name="`q_${q.id}`"
                    :value="opt.id"
                    :checked="isOptionSelected(q.id, opt.id)"
                    @change="handleOptionToggle(q.id, opt.id, q.question_type)"
                    class="h-4 w-4 accent-violet-600 rounded"
                  />
                  <span>{{ opt.text }}</span>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-6 text-center">
              <button
                type="button"
                :disabled="submittingQuiz || quizQuestions.length === 0"
                @click="handleQuizSubmit"
                class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl shadow-emerald-600/30 transition-all hover:from-emerald-500 hover:to-teal-500 hover:scale-105 disabled:opacity-50"
              >
                <i class="fas fa-paper-plane text-xs" />
                <span>{{ submittingQuiz ? 'Grading Answers…' : 'Submit for Grading' }}</span>
              </button>
            </div>
          </div>

          <!-- Quiz Results & Explanations Breakdown -->
          <div v-else class="space-y-6">
            <!-- Results Banner -->
            <div
              class="rounded-3xl border p-8 text-center shadow-2xl"
              :class="quizResult.passed ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-100' : 'border-rose-500/50 bg-rose-950/40 text-rose-100'"
            >
              <div
                class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
                :class="quizResult.passed ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'"
              >
                <i :class="quizResult.passed ? 'fas fa-trophy' : 'fas fa-redo-alt'" />
              </div>
              <h3 class="text-2xl font-black uppercase tracking-tight">
                {{ quizResult.passed ? 'Assessment Passed! 🎉' : 'Needs Practice' }}
              </h3>
              <div class="mt-3 text-3xl font-black font-mono">
                {{ quizResult.score_percentage }}%
              </div>
              <p class="mt-1 text-xs font-bold opacity-80">
                You earned {{ quizResult.earned_points }} / {{ quizResult.total_points }} points (Required: {{ quizResult.passing_percentage }}%)
              </p>

              <div class="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  @click="retakeQuiz"
                  class="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-slate-750"
                >
                  Retake Quiz
                </button>
              </div>
            </div>

            <!-- Detailed Answers & Explanations -->
            <div class="space-y-4">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-400">Review Questions & Explanations</h4>
              <div
                v-for="(item, idx) in quizResult.breakdown"
                :key="idx"
                class="rounded-2xl border p-5 bg-slate-950/80"
                :class="item.is_correct ? 'border-emerald-800/40' : 'border-rose-800/40'"
              >
                <div class="flex items-start justify-between gap-3 mb-2">
                  <span class="text-xs font-bold text-white font-mono">Q{{ idx + 1 }}</span>
                  <span
                    class="rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                    :class="item.is_correct ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'"
                  >
                    {{ item.is_correct ? 'Correct' : 'Incorrect' }}
                  </span>
                </div>

                <div class="academy-markdown text-xs font-medium text-slate-200" v-html="renderMarkdown(item.prompt)" />

                <!-- Options Review -->
                <div class="mt-3 space-y-1.5 text-xs">
                  <div
                    v-for="opt in item.options"
                    :key="opt.id"
                    class="flex items-center gap-2 rounded-lg px-3 py-2"
                    :class="[
                      item.correct_options.includes(opt.id) ? 'bg-emerald-950/60 text-emerald-200 border border-emerald-800/40' : '',
                      item.user_selected.includes(opt.id) && !item.correct_options.includes(opt.id) ? 'bg-rose-950/60 text-rose-200 border border-rose-800/40' : 'text-slate-400'
                    ]"
                  >
                    <i
                      v-if="item.correct_options.includes(opt.id)"
                      class="fas fa-check text-emerald-400 text-xs"
                    />
                    <i
                      v-else-if="item.user_selected.includes(opt.id)"
                      class="fas fa-times text-rose-400 text-xs"
                    />
                    <span class="flex-1">{{ opt.text }}</span>
                  </div>
                </div>

                <!-- Explanation -->
                <div v-if="getOptionExplanation(item)" class="mt-3 rounded-xl border border-violet-900/40 bg-violet-950/20 p-3 text-[11px] text-violet-300">
                  <strong>Explanation:</strong> {{ getOptionExplanation(item) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse, type AcademyAssessmentOutline, type AcademyQuestion, type QuizSubmissionResult } from '~/composables/useAcademy'
import { useMarkdownRenderer } from '~/composables/useMarkdownRenderer'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const courseSlug = computed(() => route.params.slug as string)

const {
  currentCourse: course,
  currentLesson: activeLesson,
  myEnrollments,
  fetchCourseBySlug,
  fetchLesson,
  fetchAssessmentQuestions,
  submitQuiz,
  enrollCourse,
  markLessonProgress,
  fetchMyEnrollments
} = useAcademy()

const { renderMarkdown } = useMarkdownRenderer()
const { user } = useAuth()

const sidebarOpen = ref(false)
const openModules = ref<number[]>([])
const activeMode = ref<'lesson' | 'quiz'>('lesson')
const activeLessonId = ref<number | null>(null)
const activeAssessment = ref<AcademyAssessmentOutline | null>(null)

// Quiz state
const quizQuestions = ref<AcademyQuestion[]>([])
const userAnswers = ref<Record<string, string[]>>({})
const submittingQuiz = ref(false)
const quizResult = ref<QuizSubmissionResult | null>(null)

const renderedMarkdownContent = computed(() => {
  return renderMarkdown(activeLesson.value?.content_markdown || '')
})

const enrollment = computed(() => myEnrollments.value.find(e => e.course_slug === courseSlug.value))
const completedLessonIds = computed(() => enrollment.value?.completed_lessons || [])
const courseProgress = computed(() => enrollment.value?.progress_percentage || 0)

const isCurrentLessonCompleted = computed(() => {
  if (!activeLessonId.value) return false
  return completedLessonIds.value.includes(activeLessonId.value)
})

const totalLessonsCount = computed(() => {
  if (!course.value?.modules) return 0
  return course.value.modules.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)
})

const completedLessonsCount = computed(() => completedLessonIds.value.length)

onMounted(async () => {
  if (courseSlug.value) {
    const c = await fetchCourseBySlug(courseSlug.value)
    if (c?.modules && c.modules.length > 0) {
      openModules.value = c.modules.map(m => m.id)
      const firstMod = c.modules[0]
      if (firstMod.lessons && firstMod.lessons.length > 0) {
        await selectLesson(firstMod.lessons[0].id)
      }
    }
  }

  // Auto enroll if not already
  if (user.value?.email) {
    await fetchMyEnrollments(user.value.email)
    await enrollCourse(undefined, courseSlug.value, user.value.email, user.value.name)
  }
})

function toggleModule (id: number) {
  if (openModules.value.includes(id)) {
    openModules.value = openModules.value.filter(mId => mId !== id)
  } else {
    openModules.value.push(id)
  }
}

async function selectLesson (id: number) {
  activeMode.value = 'lesson'
  activeLessonId.value = id
  activeAssessment.value = null
  quizResult.value = null
  sidebarOpen.value = false
  await fetchLesson(id)
}

async function selectAssessment (ass: AcademyAssessmentOutline) {
  activeMode.value = 'quiz'
  activeAssessment.value = ass
  activeLessonId.value = null
  quizResult.value = null
  userAnswers.value = {}
  sidebarOpen.value = false

  const res = await fetchAssessmentQuestions(ass.id)
  if (res?.questions) {
    quizQuestions.value = res.questions
  }
}

function isOptionSelected (qId: number, optId: string) {
  const selected = userAnswers.value[String(qId)] || []
  return selected.includes(optId)
}

function handleOptionToggle (qId: number, optId: string, qType: string) {
  const key = String(qId)
  if (qType === 'multiple_choice') {
    const current = userAnswers.value[key] || []
    if (current.includes(optId)) {
      userAnswers.value[key] = current.filter(id => id !== optId)
    } else {
      userAnswers.value[key] = [...current, optId]
    }
  } else {
    // Single choice / True False
    userAnswers.value[key] = [optId]
  }
}

async function handleQuizSubmit () {
  if (!activeAssessment.value) return
  submittingQuiz.value = true
  try {
    const res = await submitQuiz(activeAssessment.value.id, userAnswers.value, user.value?.email)
    quizResult.value = res
  } catch (e) {
    console.error('Quiz grading error:', e)
  } finally {
    submittingQuiz.value = false
  }
}

function retakeQuiz () {
  userAnswers.value = {}
  quizResult.value = null
}

function getOptionExplanation (item: any) {
  const opt = item.options?.find((o: any) => o.explanation)
  return opt?.explanation || ''
}

async function toggleCompleteCurrentLesson () {
  if (!activeLessonId.value) return
  const willBeCompleted = !isCurrentLessonCompleted.value
  await markLessonProgress(activeLessonId.value, willBeCompleted, user.value?.email)
}
</script>
