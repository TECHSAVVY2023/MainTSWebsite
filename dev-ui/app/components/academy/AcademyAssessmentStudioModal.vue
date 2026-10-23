<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
    >
      <div class="flex h-[92vh] w-full max-w-5xl flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <i class="fas fa-tasks text-xs" />
            </div>
            <div>
              <h3 class="text-xs font-black uppercase text-white">Quiz & Assessment Studio</h3>
              <span class="text-[9px] font-mono text-emerald-400">Configure questions, options, correct answers, and passing grades</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="handleClose"
              class="rounded-xl px-4 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              Close Studio
            </button>
          </div>
        </div>

        <!-- Top Section: Quiz Metadata Settings -->
        <div class="border-b border-slate-800/80 bg-slate-900/50 p-4">
          <form @submit.prevent="saveAssessmentSettings" class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div class="sm:col-span-2">
              <label class="block font-bold text-slate-400 mb-1">Assessment Title *</label>
              <input
                v-model="assessmentForm.title"
                required
                placeholder="e.g. Chapter 1 Knowledge Check Quiz"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Kind</label>
              <select
                v-model="assessmentForm.kind"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
              >
                <option value="quiz">Chapter Quiz</option>
                <option value="test">Module / Final Test</option>
              </select>
            </div>

            <div class="flex items-end gap-2">
              <div class="flex-1">
                <label class="block font-bold text-slate-400 mb-1">Passing %</label>
                <input
                  v-model.number="assessmentForm.passing_percentage"
                  type="number"
                  min="1"
                  max="100"
                  placeholder="80"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono font-bold text-white outline-none"
                />
              </div>
              <button
                type="submit"
                :disabled="savingAssessmentSettings"
                class="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-500 disabled:opacity-50 transition-all cursor-pointer"
              >
                {{ savingAssessmentSettings ? 'Saving…' : 'Update' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Main Area: Questions List & Question Editor -->
        <div class="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <!-- Left 5 Cols: Questions List -->
          <div class="custom-scrollbar h-full overflow-y-auto bg-slate-950/60 p-4 md:col-span-5 flex flex-col">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black uppercase tracking-wider text-white">Questions</span>
                <span class="rounded bg-emerald-950 px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-300 border border-emerald-800/40">
                  {{ assessmentQuestions.length }} total
                </span>
              </div>

              <button
                type="button"
                @click="openCreateQuestion"
                class="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-black uppercase text-white hover:bg-emerald-500 shadow transition-all cursor-pointer"
              >
                <i class="fas fa-plus text-[10px]" />
                <span>Add Question</span>
              </button>
            </div>

            <!-- Question Items List -->
            <div v-if="assessmentQuestions.length > 0" class="space-y-2.5 flex-1">
              <div
                v-for="(q, idx) in assessmentQuestions"
                :key="q.id"
                @click="openEditQuestion(q)"
                class="group cursor-pointer rounded-2xl border p-3.5 transition-all text-xs"
                :class="editingQuestionId === q.id ? 'border-emerald-500/70 bg-emerald-950/30' : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <span class="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-950 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-800/40">
                      {{ idx + 1 }}
                    </span>
                    <span class="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      {{ q.question_type === 'single_choice' ? 'Single Choice' : (q.question_type === 'multiple_choice' ? 'Multiple Choice' : 'True/False') }}
                    </span>
                  </div>

                  <div class="flex items-center gap-2">
                    <span class="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-300">
                      {{ q.points }} pts
                    </span>
                    <button
                      type="button"
                      @click.stop="handleDeleteQuestion(q.id)"
                      class="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      title="Delete question"
                    >
                      <i class="fas fa-trash text-xs" />
                    </button>
                  </div>
                </div>

                <p class="font-bold text-slate-200 line-clamp-2 leading-relaxed">
                  {{ q.prompt_markdown }}
                </p>

                <div class="mt-2 text-[10px] text-slate-500 font-mono">
                  {{ q.options_json?.length || 0 }} Options &bull; {{ (q.options_json || []).filter((o: any) => o.is_correct).length }} Correct
                </div>
              </div>
            </div>

            <div v-else class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 p-8 text-center my-auto">
              <i class="fas fa-question-circle text-2xl text-slate-600 mb-2" />
              <p class="text-xs font-bold text-slate-400">No questions yet</p>
              <p class="text-[11px] text-slate-500 mt-1">Click "Add Question" above to start authoring questions.</p>
            </div>
          </div>

          <!-- Right 7 Cols: Question Editor & Live Preview -->
          <div class="custom-scrollbar h-full overflow-y-auto bg-slate-900/90 p-6 md:col-span-7">
            <div v-if="isEditingQuestion" class="space-y-4 text-xs">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-2">
                <h4 class="text-xs font-black uppercase text-white">
                  {{ questionForm.id ? `Edit Question #${questionForm.order || 1}` : 'Create New Question' }}
                </h4>
                <button
                  type="button"
                  @click="isEditingQuestion = false"
                  class="text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <!-- Prompt Markdown -->
              <div>
                <label class="block font-bold text-slate-300 mb-1">Question Prompt (Markdown supported) *</label>
                <textarea
                  v-model="questionForm.prompt_markdown"
                  required
                  rows="3"
                  placeholder="e.g. Which layer of the OSI model does IP address resolution occur?"
                  class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-medium text-white outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <!-- Type & Points Row -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block font-bold text-slate-400 mb-1">Question Type</label>
                  <select
                    v-model="questionForm.question_type"
                    @change="handleQuestionTypeChange"
                    class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-emerald-500"
                  >
                    <option value="single_choice">Single Choice (Radio)</option>
                    <option value="multiple_choice">Multiple Choice (Checkboxes)</option>
                    <option value="true_false">True / False</option>
                  </select>
                </div>

                <div>
                  <label class="block font-bold text-slate-400 mb-1">Points</label>
                  <input
                    v-model.number="questionForm.points"
                    type="number"
                    min="1"
                    placeholder="10"
                    class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-mono font-bold text-amber-300 outline-none"
                  />
                </div>
              </div>

              <!-- Options Builder -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="font-bold text-slate-300">
                    Answer Choices (Select the correct {{ questionForm.question_type === 'multiple_choice' ? 'checkboxes' : 'answer' }})
                  </label>
                  <button
                    v-if="questionForm.question_type !== 'true_false'"
                    type="button"
                    @click="addQuestionOption"
                    class="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <i class="fas fa-plus text-[10px]" />
                    <span>Add Option</span>
                  </button>
                </div>

                <div class="space-y-2.5">
                  <div
                    v-for="(opt, idx) in questionForm.options_json"
                    :key="opt.id"
                    class="space-y-1.5 rounded-xl border p-2.5 transition-all"
                    :class="opt.is_correct ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800 bg-slate-950'"
                  >
                    <div class="flex items-center gap-2.5">
                      <input
                        v-if="questionForm.question_type === 'multiple_choice'"
                        type="checkbox"
                        v-model="opt.is_correct"
                        class="h-4 w-4 rounded accent-emerald-500 cursor-pointer ml-1"
                      />
                      <input
                        v-else
                        type="radio"
                        name="q_correct_option"
                        :checked="opt.is_correct"
                        @change="setCorrectQuestionOption(idx)"
                        class="h-4 w-4 accent-emerald-500 cursor-pointer ml-1"
                      />

                      <input
                        v-model="opt.text"
                        placeholder="Option text…"
                        class="flex-1 bg-transparent text-xs font-medium text-white outline-none"
                      />

                      <button
                        v-if="questionForm.question_type !== 'true_false'"
                        type="button"
                        @click="removeQuestionOption(idx)"
                        :disabled="questionForm.options_json.length <= 2"
                        class="text-slate-600 hover:text-rose-400 p-1 disabled:opacity-20 cursor-pointer"
                      >
                        <i class="fas fa-trash text-xs" />
                      </button>
                    </div>

                    <input
                      v-model="opt.explanation"
                      placeholder="Optional feedback / explanation for this choice…"
                      class="w-full rounded-lg bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-400 outline-none focus:text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <!-- Save & Cancel Buttons -->
              <div class="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  @click="isEditingQuestion = false"
                  class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  :disabled="savingQuestion"
                  @click="saveQuestionConfirm"
                  class="rounded-xl bg-emerald-600 px-6 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-500 disabled:opacity-50 cursor-pointer"
                >
                  <i v-if="savingQuestion" class="fas fa-spinner fa-spin mr-1" />
                  <span>{{ savingQuestion ? 'Saving…' : 'Save Question' }}</span>
                </button>
              </div>
            </div>

            <!-- Empty selection state -->
            <div v-else class="flex flex-col items-center justify-center h-full text-center py-16">
              <i class="fas fa-tasks text-4xl text-slate-700 mb-3" />
              <h4 class="text-sm font-black uppercase text-slate-300">Select a question or create new</h4>
              <p class="text-xs text-slate-500 max-w-sm mt-1 mb-4">
                Select any question on the left to edit its prompt, choices, and explanations, or click below to add a new question.
              </p>
              <button
                type="button"
                @click="openCreateQuestion"
                class="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:bg-emerald-500 shadow-lg cursor-pointer"
              >
                <i class="fas fa-plus text-[10px]" />
                <span>Add New Question</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyAssessmentOutline, type AcademyQuestion } from '~/composables/useAcademy'

const props = defineProps<{
  isOpen: boolean
  assessment?: AcademyAssessmentOutline | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', val: boolean): void
  (e: 'close'): void
  (e: 'saved'): void
}>()

const {
  adminFetchAssessment,
  adminSaveAssessment,
  adminSaveQuestion,
  adminDeleteQuestion
} = useAcademy()

const savingAssessmentSettings = ref(false)
const savingQuestion = ref(false)
const isEditingQuestion = ref(false)
const editingQuestionId = ref<number | null>(null)

const editingAssessment = ref<AcademyAssessmentOutline | null>(null)
const assessmentForm = ref<{
  id?: number
  title: string
  kind: 'quiz' | 'test'
  passing_percentage: number
  time_limit_minutes: number
  description: string
}>({
  title: '',
  kind: 'quiz',
  passing_percentage: 80,
  time_limit_minutes: 0,
  description: ''
})

const assessmentQuestions = ref<AcademyQuestion[]>([])

interface QuestionOptionForm {
  id: string
  text: string
  is_correct: boolean
  explanation?: string
}

interface QuestionFormState {
  id?: number
  prompt_markdown: string
  question_type: 'single_choice' | 'multiple_choice' | 'true_false'
  points: number
  order: number
  options_json: QuestionOptionForm[]
}

const defaultQuestionOptions = (type: 'single_choice' | 'multiple_choice' | 'true_false'): QuestionOptionForm[] => {
  if (type === 'true_false') {
    return [
      { id: '1', text: 'True', is_correct: true, explanation: '' },
      { id: '2', text: 'False', is_correct: false, explanation: '' }
    ]
  }
  return [
    { id: '1', text: '', is_correct: true, explanation: '' },
    { id: '2', text: '', is_correct: false, explanation: '' },
    { id: '3', text: '', is_correct: false, explanation: '' },
    { id: '4', text: '', is_correct: false, explanation: '' }
  ]
}

const questionForm = ref<QuestionFormState>({
  prompt_markdown: '',
  question_type: 'single_choice',
  points: 10,
  order: 1,
  options_json: defaultQuestionOptions('single_choice')
})

watch(() => [props.isOpen, props.assessment], async ([isOpen, ass]) => {
  if (isOpen && ass) {
    try {
      const full = await adminFetchAssessment((ass as AcademyAssessmentOutline).id)
      if (full) {
        editingAssessment.value = full
        assessmentForm.value = {
          id: full.id,
          title: full.title,
          kind: full.kind || 'quiz',
          passing_percentage: full.passing_percentage || 80,
          time_limit_minutes: full.time_limit_minutes || 0,
          description: full.description || ''
        }
        assessmentQuestions.value = (full.questions || []).map((q: any) => ({
          ...q,
          options_json: q.options_json || []
        }))
        isEditingQuestion.value = false
        editingQuestionId.value = null
      }
    } catch (err) {
      console.error('Failed to load assessment in studio:', err)
    }
  }
})

function handleClose () {
  emit('update:isOpen', false)
  emit('close')
}

async function saveAssessmentSettings () {
  if (!editingAssessment.value) return
  savingAssessmentSettings.value = true
  try {
    await adminSaveAssessment({
      id: editingAssessment.value.id,
      title: assessmentForm.value.title,
      kind: assessmentForm.value.kind,
      passing_percentage: assessmentForm.value.passing_percentage,
      time_limit_minutes: assessmentForm.value.time_limit_minutes,
      description: assessmentForm.value.description
    })
    emit('saved')
  } catch (err) {
    console.error('Failed to save assessment settings:', err)
  } finally {
    savingAssessmentSettings.value = false
  }
}

function openCreateQuestion () {
  editingQuestionId.value = null
  questionForm.value = {
    prompt_markdown: '',
    question_type: 'single_choice',
    points: 10,
    order: assessmentQuestions.value.length + 1,
    options_json: defaultQuestionOptions('single_choice')
  }
  isEditingQuestion.value = true
}

function openEditQuestion (q: AcademyQuestion) {
  editingQuestionId.value = q.id
  const opts = (q.options_json || []).map((o: any, idx: number) => ({
    id: String(o.id || idx + 1),
    text: o.text || '',
    is_correct: Boolean(o.is_correct),
    explanation: o.explanation || ''
  }))

  questionForm.value = {
    id: q.id,
    prompt_markdown: q.prompt_markdown,
    question_type: q.question_type as any,
    points: q.points || 10,
    order: q.order || 1,
    options_json: opts.length ? opts : defaultQuestionOptions(q.question_type as any)
  }
  isEditingQuestion.value = true
}

function handleQuestionTypeChange () {
  if (questionForm.value.question_type === 'true_false') {
    questionForm.value.options_json = defaultQuestionOptions('true_false')
  } else if (questionForm.value.options_json.length < 2) {
    questionForm.value.options_json = defaultQuestionOptions('single_choice')
  }
}

function addQuestionOption () {
  const newId = String(questionForm.value.options_json.length + 1)
  questionForm.value.options_json.push({
    id: newId,
    text: '',
    is_correct: false,
    explanation: ''
  })
}

function removeQuestionOption (index: number) {
  if (questionForm.value.options_json.length <= 2) return
  const wasCorrect = questionForm.value.options_json[index].is_correct
  questionForm.value.options_json.splice(index, 1)
  if (wasCorrect && questionForm.value.options_json.length > 0) {
    questionForm.value.options_json[0].is_correct = true
  }
}

function setCorrectQuestionOption (index: number) {
  questionForm.value.options_json.forEach((opt, idx) => {
    opt.is_correct = idx === index
  })
}

async function saveQuestionConfirm () {
  if (!editingAssessment.value || !questionForm.value.prompt_markdown.trim()) return
  savingQuestion.value = true
  try {
    await adminSaveQuestion({
      id: questionForm.value.id,
      assessment_id: editingAssessment.value.id,
      prompt_markdown: questionForm.value.prompt_markdown.trim(),
      question_type: questionForm.value.question_type,
      points: Number(questionForm.value.points) || 10,
      order: questionForm.value.order || (assessmentQuestions.value.length + 1),
      options_json: questionForm.value.options_json
    })

    const full = await adminFetchAssessment(editingAssessment.value.id)
    if (full) {
      assessmentQuestions.value = full.questions || []
    }
    isEditingQuestion.value = false
    editingQuestionId.value = null
    emit('saved')
  } catch (err) {
    console.error('Failed to save question:', err)
  } finally {
    savingQuestion.value = false
  }
}

async function handleDeleteQuestion (qId: number) {
  if (confirm('Delete this question from the assessment?')) {
    try {
      await adminDeleteQuestion(qId)
      if (editingAssessment.value) {
        const full = await adminFetchAssessment(editingAssessment.value.id)
        if (full) {
          assessmentQuestions.value = full.questions || []
        }
      }
      if (editingQuestionId.value === qId) {
        isEditingQuestion.value = false
        editingQuestionId.value = null
      }
      emit('saved')
    } catch (err) {
      console.error('Failed to delete question:', err)
    }
  }
}
</script>
