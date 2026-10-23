<template>
  <div class="space-y-6">
    <!-- Curriculum Header Bar -->
    <div class="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="$emit('back')"
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          title="Back to Course List"
        >
          <i class="fas fa-arrow-left text-xs" />
        </button>
        <div>
          <h2 class="text-sm font-black uppercase text-white">
            Curriculum: {{ course.title }}
          </h2>
          <p class="text-[10px] text-violet-400 font-mono">Organize chapters, markdown lessons, and chapter quizzes</p>
        </div>
      </div>

      <button
        type="button"
        @click="openAddChapterModal"
        class="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500 transition-all cursor-pointer"
      >
        <i class="fas fa-plus text-[10px]" />
        <span>Add Chapter</span>
      </button>
    </div>

    <!-- Modules Tree -->
    <div v-if="course.modules && course.modules.length > 0" class="space-y-4">
      <div
        v-for="(mod, modIdx) in course.modules"
        :key="mod.id"
        class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
      >
        <!-- Module Header -->
        <div class="flex items-center justify-between bg-slate-850/80 px-4 py-3 border-b border-slate-800">
          <div class="flex items-center gap-2.5">
            <span class="flex h-6 w-6 items-center justify-center rounded bg-violet-950 text-xs font-bold text-violet-400 border border-violet-800/40 font-mono">
              {{ modIdx + 1 }}
            </span>
            <div>
              <h3 class="text-xs font-black uppercase text-white">{{ mod.title }}</h3>
              <p v-if="mod.description" class="text-[10px] text-slate-400">{{ mod.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="$emit('add-lesson', mod.id)"
              class="flex items-center gap-1 rounded-lg border border-violet-800/40 bg-violet-950/40 px-2.5 py-1 text-[10px] font-bold text-violet-300 hover:bg-violet-900/60 transition-colors"
            >
              <i class="far fa-file-alt text-[9px]" />
              <span>+ Lesson</span>
            </button>

            <button
              type="button"
              @click="handleAddAssessment(mod.id)"
              class="flex items-center gap-1 rounded-lg border border-emerald-800/40 bg-emerald-950/40 px-2.5 py-1 text-[10px] font-bold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
            >
              <i class="fas fa-tasks text-[9px]" />
              <span>+ Quiz</span>
            </button>

            <button
              type="button"
              @click="handleDeleteChapter(mod.id)"
              class="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
              title="Delete Chapter"
            >
              <i class="fas fa-trash text-xs" />
            </button>
          </div>
        </div>

        <!-- Module Items -->
        <div class="p-2 space-y-1.5 bg-slate-950/40">
          <!-- Lessons -->
          <div
            v-for="(les, lesIdx) in mod.lessons"
            :key="les.id"
            class="flex items-center justify-between rounded-xl border border-slate-800/50 bg-slate-900/80 px-3.5 py-2 text-xs"
          >
            <div class="flex items-center gap-2.5">
              <i class="far fa-file-code text-violet-400 text-xs" />
              <span class="font-bold text-slate-200">{{ modIdx + 1 }}.{{ lesIdx + 1 }} {{ les.title }}</span>
              <span class="font-mono text-[10px] text-slate-500">({{ les.estimated_minutes }}m)</span>
              <span
                v-if="les.mini_quiz_enabled"
                class="rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1 py-0.2 text-[8px] font-mono font-bold"
                title="Includes interactive mini quiz"
              >
                ⚡ Quiz
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="$emit('edit-lesson', les.id)"
                class="rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-violet-300 border border-slate-700 hover:bg-violet-600 hover:text-white transition-colors"
              >
                <i class="fas fa-edit mr-1" /> Edit Markdown
              </button>
              <button
                type="button"
                @click="handleDeleteLesson(les.id)"
                class="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                title="Delete lesson"
              >
                <i class="fas fa-trash text-[10px]" />
              </button>
            </div>
          </div>

          <!-- Assessments / Quizzes -->
          <div
            v-for="ass in mod.assessments"
            :key="ass.id"
            class="flex items-center justify-between rounded-xl border border-emerald-900/40 bg-emerald-950/20 px-3.5 py-2 text-xs"
          >
            <div class="flex items-center gap-2.5">
              <i class="fas fa-tasks text-emerald-400 text-xs" />
              <span class="font-bold text-emerald-200">{{ ass.title }}</span>
              <span class="rounded bg-emerald-950 px-1.5 py-0.5 text-[8px] font-black uppercase text-emerald-300 font-mono">
                {{ ass.kind }} (Pass: {{ ass.passing_percentage }}%)
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="$emit('open-assessment', ass)"
                class="rounded-lg bg-emerald-950/60 px-2.5 py-1 text-[10px] font-bold text-emerald-300 border border-emerald-800/40 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <i class="fas fa-list-ol mr-1" /> Questions ({{ ass.questions_count }})
              </button>
              <button
                type="button"
                @click="handleDeleteAssessment(ass.id)"
                class="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors"
                title="Delete assessment"
              >
                <i class="fas fa-trash text-[10px]" />
              </button>
            </div>
          </div>

          <div
            v-if="(!mod.lessons || mod.lessons.length === 0) && (!mod.assessments || mod.assessments.length === 0)"
            class="rounded-xl border border-dashed border-slate-800/60 py-4 text-center text-[11px] text-slate-500"
          >
            No lessons or quizzes in this chapter yet. Click "+ Lesson" or "+ Quiz" above.
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Chapters State -->
    <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-16 text-center">
      <i class="fas fa-layer-group text-3xl text-slate-600 mb-3" />
      <h4 class="text-sm font-bold uppercase text-white">No Chapters Added Yet</h4>
      <p class="text-xs text-slate-500 mt-1 max-w-sm">
        Start building your curriculum syllabus by adding your first chapter.
      </p>
      <button
        type="button"
        @click="openAddChapterModal"
        class="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-violet-500 transition-colors"
      >
        + Add First Chapter
      </button>
    </div>

    <!-- Add Chapter Modal -->
    <Teleport to="body">
      <div
        v-if="showChapterModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        @click.self="showChapterModal = false"
      >
        <div class="w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <h3 class="text-xs font-black uppercase text-white mb-4">Add Chapter / Module</h3>
          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-400 mb-1">Module Title *</label>
              <input
                v-model="chapterTitle"
                placeholder="e.g. Module 1: Core Fundamentals"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-400 mb-1">Description</label>
              <textarea
                v-model="chapterDesc"
                rows="2"
                placeholder="Module summary…"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-white outline-none focus:border-violet-500"
              />
            </div>
          </div>
          <div class="mt-5 flex justify-end gap-2">
            <button
              type="button"
              @click="showChapterModal = false"
              class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmCreateChapter"
              :disabled="!chapterTitle.trim()"
              class="rounded-xl bg-violet-600 px-5 py-2 text-xs font-black uppercase text-white hover:bg-violet-500 disabled:opacity-40"
            >
              Create Chapter
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse, type AcademyAssessmentOutline } from '~/composables/useAcademy'

const props = defineProps<{
  course: AcademyCourse
}>()

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'refresh'): void
  (e: 'add-lesson', moduleId: number): void
  (e: 'edit-lesson', lessonId: number): void
  (e: 'open-assessment', assessment: AcademyAssessmentOutline): void
}>()

const {
  adminCreateModule,
  adminDeleteModule,
  adminDeleteLesson,
  adminSaveAssessment,
  adminDeleteAssessment
} = useAcademy()

const showChapterModal = ref(false)
const chapterTitle = ref('')
const chapterDesc = ref('')

function openAddChapterModal () {
  chapterTitle.value = ''
  chapterDesc.value = ''
  showChapterModal.value = true
}

async function confirmCreateChapter () {
  if (!props.course.id || !chapterTitle.value.trim()) return
  try {
    await adminCreateModule(props.course.id, chapterTitle.value.trim(), chapterDesc.value.trim())
    showChapterModal.value = false
    emit('refresh')
  } catch (err) {
    console.error('Failed to create chapter module:', err)
  }
}

async function handleDeleteChapter (modId: number) {
  if (confirm('Delete this chapter and all of its lessons and quizzes?')) {
    try {
      await adminDeleteModule(modId)
      emit('refresh')
    } catch (err) {
      console.error('Failed to delete module:', err)
    }
  }
}

async function handleDeleteLesson (lesId: number) {
  if (confirm('Delete this lesson?')) {
    try {
      await adminDeleteLesson(lesId)
      emit('refresh')
    } catch (err) {
      console.error('Failed to delete lesson:', err)
    }
  }
}

async function handleAddAssessment (modId: number) {
  const title = prompt('Enter Quiz / Test Title:', 'Chapter Knowledge Check')
  if (!title?.trim() || !props.course.id) return
  try {
    const newAss = await adminSaveAssessment({
      course_id: props.course.id,
      module_id: modId,
      title: title.trim(),
      kind: 'quiz',
      passing_percentage: 80
    })
    emit('refresh')
    if (newAss?.id) {
      emit('open-assessment', newAss)
    }
  } catch (err) {
    console.error('Failed to create assessment:', err)
  }
}

async function handleDeleteAssessment (assId: number) {
  if (confirm('Delete this quiz?')) {
    try {
      await adminDeleteAssessment(assId)
      emit('refresh')
    } catch (err) {
      console.error('Failed to delete assessment:', err)
    }
  }
}
</script>
