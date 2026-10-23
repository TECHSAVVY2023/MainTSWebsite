<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <div class="flex h-[92vh] w-full max-w-6xl flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        <!-- Editor Header -->
        <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900/90 px-6 py-3.5">
          <div class="flex items-center gap-3">
            <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
              <i class="fas fa-code text-xs" />
            </div>
            <div>
              <h3 class="text-xs font-black uppercase text-white">Lesson Studio & Markdown Editor</h3>
              <span class="text-[9px] font-mono text-violet-400">Author markdown lessons & interactive mini quizzes</span>
            </div>
          </div>

          <!-- Subtab Switcher -->
          <div class="flex items-center gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              type="button"
              @click="lessonEditorTab = 'markdown'"
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
              :class="lessonEditorTab === 'markdown' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'"
            >
              <i class="fas fa-file-alt text-[10px]" />
              <span>Markdown Content</span>
            </button>

            <button
              type="button"
              @click="lessonEditorTab = 'mini_quiz'"
              class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all"
              :class="lessonEditorTab === 'mini_quiz' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'"
            >
              <i class="fas fa-bolt text-[10px]" />
              <span>Mini Quiz</span>
              <span
                class="rounded px-1.5 py-0.2 text-[8px] font-black uppercase"
                :class="lessonForm.mini_quiz_enabled ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40' : 'bg-slate-800 text-slate-500'"
              >
                {{ lessonForm.mini_quiz_enabled ? `+${lessonForm.mini_quiz_data.points || 10} pts` : 'Off' }}
              </span>
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span
              v-if="lastAutosavedAt"
              class="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[10px] font-mono text-slate-400"
            >
              <i class="fas fa-check-circle text-emerald-400 text-[9px]" />
              <span>Draft saved {{ lastAutosavedAt }}</span>
            </span>
            <button
              type="button"
              @click="handleClose"
              class="rounded-xl px-4 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="handleSave"
              :disabled="savingLesson"
              class="rounded-xl bg-violet-600 px-5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500 transition-all disabled:opacity-50 cursor-pointer"
            >
              {{ savingLesson ? 'Saving…' : 'Save Lesson' }}
            </button>
          </div>
        </div>

        <!-- Unsaved Draft Recovery Banner -->
        <div
          v-if="hasSavedDraft"
          class="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30 bg-amber-950/30 px-6 py-2.5 text-xs text-amber-200"
        >
          <div class="flex items-center gap-2">
            <i class="fas fa-history text-amber-400" />
            <span>Unsaved local draft found from <strong>{{ formatDraftTime(savedDraftTimestamp) }}</strong>. Would you like to restore it?</span>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="restoreDraft"
              class="rounded-lg bg-amber-500 px-3 py-1 text-xs font-black uppercase text-slate-950 hover:bg-amber-400 transition-colors shadow cursor-pointer"
            >
              Restore Draft
            </button>
            <button
              type="button"
              @click="discardDraft"
              class="rounded-lg bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
            >
              Discard
            </button>
          </div>
        </div>

        <!-- Title & Time Row -->
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 border-b border-slate-800/80 bg-slate-900/40 p-3 text-xs">
          <div class="sm:col-span-3">
            <input
              v-model="lessonForm.title"
              placeholder="Lesson Title…"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none focus:border-violet-500"
            />
          </div>
          <div>
            <input
              v-model.number="lessonForm.estimated_minutes"
              type="number"
              placeholder="Minutes (e.g. 15)"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 font-bold text-white outline-none"
            />
          </div>
        </div>

        <!-- Markdown Toolbar (when on markdown tab) -->
        <div v-if="lessonEditorTab === 'markdown'" class="flex flex-wrap items-center gap-1 border-b border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs">
          <button type="button" @click="insertMd('# ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H1</button>
          <button type="button" @click="insertMd('## ')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800">H2</button>
          <button type="button" @click="insertMd('**', '**')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-bold" /></button>
          <button type="button" @click="insertMd('*', '*')" class="rounded px-2 py-1 font-bold text-slate-300 hover:bg-slate-800"><i class="fas fa-italic" /></button>
          <button type="button" @click="insertMd('```typescript\n', '\n```')" class="rounded px-2 py-1 font-bold text-violet-400 hover:bg-slate-800"><i class="fas fa-code mr-1" />Code</button>
          <span class="text-slate-700">|</span>
          <!-- Mermaid Graph Buttons -->
          <button
            type="button"
            @click="insertMermaidTemplate('flowchart')"
            class="rounded px-2 py-1 font-bold text-emerald-400 hover:bg-slate-800 flex items-center gap-1"
            title="Insert Mermaid Flowchart Diagram"
          >
            <i class="fas fa-project-diagram text-xs" />
            <span>Flowchart</span>
          </button>
          <button
            type="button"
            @click="insertMermaidTemplate('sequence')"
            class="rounded px-2 py-1 font-bold text-cyan-400 hover:bg-slate-800 flex items-center gap-1"
            title="Insert Mermaid Sequence Diagram"
          >
            <i class="fas fa-stream text-xs" />
            <span>Sequence</span>
          </button>
          <button
            type="button"
            @click="insertMermaidTemplate('architecture')"
            class="rounded px-2 py-1 font-bold text-violet-400 hover:bg-slate-800 flex items-center gap-1"
            title="Insert Architecture Diagram"
          >
            <i class="fas fa-sitemap text-xs" />
            <span>Architecture</span>
          </button>
          <span class="text-slate-700">|</span>
          <!-- Table Button -->
          <button
            type="button"
            @click="insertTableTemplate"
            class="rounded px-2 py-1 font-bold text-amber-300 hover:bg-slate-800 flex items-center gap-1"
            title="Insert Markdown Table"
          >
            <i class="fas fa-table text-xs" />
            <span>Table</span>
          </button>
          <span class="text-slate-700">|</span>
          <button type="button" @click="insertMd('> [!NOTE]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-blue-400 hover:bg-slate-800">[!NOTE]</button>
          <button type="button" @click="insertMd('> [!TIP]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-emerald-400 hover:bg-slate-800">[!TIP]</button>
          <button type="button" @click="insertMd('> [!WARNING]\n> ')" class="rounded px-2 py-1 text-[10px] font-bold text-amber-400 hover:bg-slate-800">[!WARNING]</button>
        </div>

        <!-- Split-Screen Editor & Live Reader Preview -->
        <div class="grid flex-1 min-h-0 grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <!-- Left Pane: Editor (Markdown or Mini Quiz) -->
          <div class="custom-scrollbar h-full overflow-y-auto bg-slate-950 p-6">
            <!-- Tab 1: Markdown text area -->
            <div v-if="lessonEditorTab === 'markdown'" class="h-full flex flex-col">
              <textarea
                ref="markdownTextareaRef"
                v-model="lessonForm.content_markdown"
                placeholder="Write your Markdown lesson here…"
                class="custom-scrollbar flex-1 w-full resize-none bg-transparent font-mono text-xs text-slate-200 outline-none leading-relaxed"
              />
            </div>

            <!-- Tab 2: Mini Quiz Configuration -->
            <div v-else-if="lessonEditorTab === 'mini_quiz'" class="space-y-5 text-xs">
              <!-- Mini Quiz Toggle Card -->
              <div class="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                <div class="space-y-0.5">
                  <span class="block font-black text-white text-xs">Attach Mini Knowledge Check</span>
                  <span class="text-[11px] text-slate-400">Award bonus points to learners when they correctly answer this mini quiz.</span>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="lessonForm.mini_quiz_enabled"
                    class="sr-only peer"
                  />
                  <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                </label>
              </div>

              <div v-if="lessonForm.mini_quiz_enabled" class="space-y-4">
                <!-- Points and Reward Settings -->
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Bonus Points Awarded</label>
                    <input
                      v-model.number="lessonForm.mini_quiz_data.points"
                      type="number"
                      min="1"
                      placeholder="10"
                      class="w-full rounded-xl border border-slate-800 bg-slate-900 p-2.5 font-mono font-bold text-amber-300 outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label class="block font-bold text-slate-400 mb-1">Badge / Topic Tag</label>
                    <input
                      placeholder="Quick Check"
                      disabled
                      value="Knowledge Check"
                      class="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-slate-500 outline-none"
                    />
                  </div>
                </div>

                <!-- Question Prompt -->
                <div>
                  <label class="block font-bold text-slate-400 mb-1">Question Prompt *</label>
                  <textarea
                    v-model="lessonForm.mini_quiz_data.prompt"
                    rows="3"
                    placeholder="e.g. Which HTTP method is typically used to create a new resource in REST?"
                    class="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 font-medium text-white outline-none focus:border-amber-500"
                  />
                </div>

                <!-- Multiple Choice Options -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="font-bold text-slate-400">Answer Options (Select the correct radio)</label>
                    <button
                      type="button"
                      @click="addMiniQuizOption"
                      class="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <i class="fas fa-plus text-[10px]" />
                      <span>Add Option</span>
                    </button>
                  </div>

                  <div class="space-y-2">
                    <div
                      v-for="(opt, idx) in lessonForm.mini_quiz_data.options"
                      :key="opt.id"
                      class="flex items-center gap-2.5 rounded-xl border p-2 transition-all"
                      :class="opt.is_correct ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800 bg-slate-900'"
                    >
                      <input
                        type="radio"
                        name="correct_option"
                        :checked="opt.is_correct"
                        @change="setCorrectMiniQuizOption(idx)"
                        class="h-4 w-4 accent-emerald-500 cursor-pointer ml-1"
                        title="Set as correct answer"
                      />
                      <input
                        v-model="opt.text"
                        placeholder="Option text…"
                        class="flex-1 bg-transparent text-xs text-white outline-none"
                      />
                      <button
                        type="button"
                        @click="removeMiniQuizOption(idx)"
                        :disabled="lessonForm.mini_quiz_data.options.length <= 2"
                        class="text-slate-600 hover:text-red-400 p-1 disabled:opacity-20 cursor-pointer"
                        title="Remove option"
                      >
                        <i class="fas fa-trash text-xs" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Learning Explanation -->
                <div>
                  <label class="block font-bold text-slate-400 mb-1">Learning Takeaway / Explanation (Shown after answering)</label>
                  <textarea
                    v-model="lessonForm.mini_quiz_data.explanation"
                    rows="2"
                    placeholder="e.g. POST requests submit data to be processed to a specified resource."
                    class="w-full rounded-xl border border-slate-800 bg-slate-900 p-3 font-medium text-slate-300 outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Pane: Live Classroom Reader Preview -->
          <div class="custom-scrollbar h-full overflow-y-auto bg-slate-900/90 p-6 space-y-6">
            <!-- Lesson Markdown Preview -->
            <div
              ref="lessonPreviewContainer"
              class="academy-markdown"
              v-html="renderedLessonPreviewHtml"
            />

            <!-- Live Mini Quiz Preview Card (Attached at bottom of lesson) -->
            <div
              v-if="lessonForm.mini_quiz_enabled"
              class="rounded-2xl border border-amber-500/40 bg-slate-950/80 p-5 shadow-xl transition-all"
            >
              <div class="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
                <div class="flex items-center gap-2">
                  <span class="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-amber-400 text-xs">
                    <i class="fas fa-bolt text-[10px]" />
                  </span>
                  <span class="text-xs font-black uppercase tracking-wider text-white">Lesson Knowledge Check</span>
                </div>
                <span class="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-black uppercase font-mono text-amber-300">
                  +{{ lessonForm.mini_quiz_data.points || 10 }} Points
                </span>
              </div>

              <p class="text-xs font-bold text-slate-200 mb-3 leading-relaxed">
                {{ lessonForm.mini_quiz_data.prompt || 'Question prompt will appear here…' }}
              </p>

              <div class="space-y-2 mb-4">
                <div
                  v-for="opt in lessonForm.mini_quiz_data.options"
                  :key="opt.id"
                  class="flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition-colors"
                  :class="opt.is_correct ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200' : 'border-slate-800 bg-slate-900/80 text-slate-300'"
                >
                  <i class="fas text-[10px]" :class="opt.is_correct ? 'fa-check-circle text-emerald-400' : 'fa-circle text-slate-600'" />
                  <span class="font-medium">{{ opt.text || '(Empty option)' }}</span>
                  <span v-if="opt.is_correct" class="ml-auto text-[9px] font-black uppercase text-emerald-400 font-mono">Correct Answer</span>
                </div>
              </div>

              <div v-if="lessonForm.mini_quiz_data.explanation" class="rounded-xl bg-slate-900/60 border border-slate-800 p-2.5 text-[11px] text-slate-400">
                <strong class="text-amber-400 block mb-0.5">Takeaway:</strong>
                {{ lessonForm.mini_quiz_data.explanation }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAcademy, type MiniQuizData } from '~/composables/useAcademy'
import { useMarkdownRenderer } from '~/composables/useMarkdownRenderer'

const props = defineProps<{
  isOpen: boolean
  moduleId?: number | null
  lessonId?: number | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', val: boolean): void
  (e: 'close'): void
  (e: 'saved'): void
}>()

const { fetchLesson, adminSaveLesson } = useAcademy()
const { renderMarkdown, renderMermaidInElement } = useMarkdownRenderer()

const lessonPreviewContainer = ref<HTMLElement | null>(null)
const markdownTextareaRef = ref<HTMLTextAreaElement | null>(null)
const lessonEditorTab = ref<'markdown' | 'mini_quiz'>('markdown')
const savingLesson = ref(false)

interface MiniQuizOptionForm {
  id: string
  text: string
  is_correct: boolean
}

interface MiniQuizForm {
  prompt: string
  points: number
  explanation: string
  options: MiniQuizOptionForm[]
}

interface LessonFormState {
  id?: number
  module_id?: number
  title: string
  content_markdown: string
  estimated_minutes: number
  mini_quiz_enabled: boolean
  mini_quiz_data: MiniQuizForm
}

const defaultMiniQuiz = (): MiniQuizForm => ({
  prompt: '',
  points: 10,
  explanation: '',
  options: [
    { id: '1', text: '', is_correct: true },
    { id: '2', text: '', is_correct: false },
    { id: '3', text: '', is_correct: false }
  ]
})

const defaultMarkdown = '# Lesson Title\n\nWrite your Markdown content here...\n\n> [!NOTE]\n> Key concept to remember.'

const lessonForm = ref<LessonFormState>({
  title: '',
  content_markdown: defaultMarkdown,
  estimated_minutes: 15,
  mini_quiz_enabled: false,
  mini_quiz_data: defaultMiniQuiz()
})

const debouncedLessonContent = ref(lessonForm.value.content_markdown)

// Draft Autosave & Unsaved Changes Guard State
const isInitialized = ref(false)
const initialSnapshot = ref('')
const hasSavedDraft = ref(false)
const savedDraftTimestamp = ref<number | null>(null)
const pendingDraft = ref<any>(null)
const lastAutosavedAt = ref<string>('')

const draftStorageKey = computed(() => {
  if (props.lessonId) {
    return `academy_draft_lesson_${props.lessonId}`
  }
  return `academy_draft_lesson_mod_${props.moduleId || 'new'}`
})

const isDirty = computed(() => {
  if (!isInitialized.value) return false
  return initialSnapshot.value !== JSON.stringify(lessonForm.value)
})

let previewDebounceTimer: any = null
watch(() => lessonForm.value.content_markdown, (newVal) => {
  clearTimeout(previewDebounceTimer)
  previewDebounceTimer = setTimeout(async () => {
    debouncedLessonContent.value = newVal
    await nextTick()
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
  }, 100)
})

// Debounced Autosave to localStorage
let autosaveTimer: any = null
watch(
  () => [
    lessonForm.value.title,
    lessonForm.value.content_markdown,
    lessonForm.value.estimated_minutes,
    lessonForm.value.mini_quiz_enabled,
    JSON.stringify(lessonForm.value.mini_quiz_data)
  ],
  () => {
    if (!props.isOpen || !isInitialized.value || !isDirty.value) return
    clearTimeout(autosaveTimer)
    autosaveTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const draft = {
          timestamp: Date.now(),
          title: lessonForm.value.title,
          content_markdown: lessonForm.value.content_markdown,
          estimated_minutes: lessonForm.value.estimated_minutes,
          mini_quiz_enabled: lessonForm.value.mini_quiz_enabled,
          mini_quiz_data: lessonForm.value.mini_quiz_data
        }
        try {
          localStorage.setItem(draftStorageKey.value, JSON.stringify(draft))
          lastAutosavedAt.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } catch (e) {
          console.warn('LocalStorage draft autosave failed:', e)
        }
      }
    }, 800)
  }
)

function formatDraftTime (ts: number | null) {
  if (!ts) return 'earlier'
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function restoreDraft () {
  if (!pendingDraft.value) return
  lessonForm.value.title = pendingDraft.value.title ?? lessonForm.value.title
  lessonForm.value.content_markdown = pendingDraft.value.content_markdown ?? lessonForm.value.content_markdown
  if (typeof pendingDraft.value.estimated_minutes === 'number') {
    lessonForm.value.estimated_minutes = pendingDraft.value.estimated_minutes
  }
  if (typeof pendingDraft.value.mini_quiz_enabled === 'boolean') {
    lessonForm.value.mini_quiz_enabled = pendingDraft.value.mini_quiz_enabled
  }
  if (pendingDraft.value.mini_quiz_data) {
    lessonForm.value.mini_quiz_data = pendingDraft.value.mini_quiz_data
  }
  debouncedLessonContent.value = lessonForm.value.content_markdown
  hasSavedDraft.value = false
  nextTick(async () => {
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
  })
}

function discardDraft () {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(draftStorageKey.value)
  }
  hasSavedDraft.value = false
  pendingDraft.value = null
}

function handleBeforeUnload (e: BeforeUnloadEvent) {
  if (props.isOpen && isDirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', handleBeforeUnload)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
  clearTimeout(autosaveTimer)
  clearTimeout(previewDebounceTimer)
})

watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    isInitialized.value = false
    hasSavedDraft.value = false
    pendingDraft.value = null
    lastAutosavedAt.value = ''
    lessonEditorTab.value = 'markdown'

    if (props.lessonId) {
      const les = await fetchLesson(props.lessonId)
      if (les) {
        const quiz = les.mini_quiz_data || {}
        lessonForm.value = {
          id: les.id,
          module_id: les.module,
          title: les.title,
          content_markdown: les.content_markdown,
          estimated_minutes: les.estimated_minutes,
          mini_quiz_enabled: Boolean(les.mini_quiz_enabled),
          mini_quiz_data: {
            prompt: quiz.prompt || '',
            points: quiz.points || 10,
            explanation: quiz.explanation || '',
            options: quiz.options?.length ? quiz.options.map((o: any, idx: number) => ({
              id: String(o.id || idx + 1),
              text: o.text || '',
              is_correct: Boolean(o.is_correct)
            })) : [
              { id: '1', text: '', is_correct: true },
              { id: '2', text: '', is_correct: false },
              { id: '3', text: '', is_correct: false }
            ]
          }
        }
        debouncedLessonContent.value = les.content_markdown
      }
    } else {
      lessonForm.value = {
        module_id: props.moduleId || undefined,
        title: '',
        content_markdown: defaultMarkdown,
        estimated_minutes: 15,
        mini_quiz_enabled: false,
        mini_quiz_data: defaultMiniQuiz()
      }
      debouncedLessonContent.value = defaultMarkdown
    }

    initialSnapshot.value = JSON.stringify(lessonForm.value)

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const cached = localStorage.getItem(draftStorageKey.value)
        if (cached) {
          const parsed = JSON.parse(cached)
          const isDifferent = parsed.content_markdown !== lessonForm.value.content_markdown ||
                              parsed.title !== lessonForm.value.title ||
                              Boolean(parsed.mini_quiz_enabled) !== Boolean(lessonForm.value.mini_quiz_enabled)
          if (isDifferent) {
            pendingDraft.value = parsed
            hasSavedDraft.value = true
            savedDraftTimestamp.value = parsed.timestamp || Date.now()
          }
        }
      } catch (e) {
        console.warn('Error reading lesson draft:', e)
      }
    }

    await nextTick()
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
    isInitialized.value = true
  } else {
    isInitialized.value = false
  }
})

watch(lessonEditorTab, (tab) => {
  if (tab === 'markdown') {
    debouncedLessonContent.value = lessonForm.value.content_markdown
    nextTick(async () => {
      if (lessonPreviewContainer.value) {
        await renderMermaidInElement(lessonPreviewContainer.value)
      }
    })
  }
})

const renderedLessonPreviewHtml = computed(() => {
  return renderMarkdown(debouncedLessonContent.value)
})

function handleClose () {
  if (isDirty.value) {
    const proceed = window.confirm('You have unsaved changes in this lesson. Are you sure you want to close and discard your edits?')
    if (!proceed) return
  }
  emit('update:isOpen', false)
  emit('close')
}

function addMiniQuizOption () {
  const newId = String(lessonForm.value.mini_quiz_data.options.length + 1)
  lessonForm.value.mini_quiz_data.options.push({
    id: newId,
    text: '',
    is_correct: false
  })
}

function removeMiniQuizOption (index: number) {
  if (lessonForm.value.mini_quiz_data.options.length <= 2) return
  const wasCorrect = lessonForm.value.mini_quiz_data.options[index].is_correct
  lessonForm.value.mini_quiz_data.options.splice(index, 1)
  if (wasCorrect && lessonForm.value.mini_quiz_data.options.length > 0) {
    lessonForm.value.mini_quiz_data.options[0].is_correct = true
  }
}

function setCorrectMiniQuizOption (index: number) {
  lessonForm.value.mini_quiz_data.options.forEach((opt, idx) => {
    opt.is_correct = idx === index
  })
}

function insertMd (before: string, after: string = '') {
  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += `${before}Content${after}`
    return
  }

  const start = textarea.selectionStart ?? current.length
  const end = textarea.selectionEnd ?? current.length
  const selectedText = current.substring(start, end)
  const innerText = selectedText || (after ? 'Content' : '')
  const replacement = `${before}${innerText}${after}`

  lessonForm.value.content_markdown = current.substring(0, start) + replacement + current.substring(end)

  nextTick(() => {
    textarea.focus()
    const newPos = start + replacement.length
    textarea.setSelectionRange(newPos, newPos)
  })
}

function insertMermaidTemplate (kind: 'flowchart' | 'sequence' | 'architecture' = 'flowchart') {
  let template = ''
  if (kind === 'flowchart') {
    template = `\n\`\`\`mermaid
graph TD
    A[Node A] --> B[Node B]
    B --> C[Node C]
\`\`\`\n`
  } else if (kind === 'sequence') {
    template = `\n\`\`\`mermaid
sequenceDiagram
    autonumber
    A->>B: Message
    B-->>A: Response
\`\`\`\n`
  } else {
    template = `\n\`\`\`mermaid
graph LR
    subgraph Group A
        A[Component 1]
    end
    subgraph Group B
        B[Component 2]
    end
    A --> B
\`\`\`\n`
  }

  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += template
  } else {
    const start = textarea.selectionStart ?? current.length
    const end = textarea.selectionEnd ?? current.length
    lessonForm.value.content_markdown = current.substring(0, start) + template + current.substring(end)

    nextTick(() => {
      textarea.focus()
      const newPos = start + template.length
      textarea.setSelectionRange(newPos, newPos)
    })
  }

  nextTick(async () => {
    if (lessonPreviewContainer.value) {
      await renderMermaidInElement(lessonPreviewContainer.value)
    }
  })
}

function insertTableTemplate () {
  const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Item 1   | Item 2   | Item 3   |\n| Item 4   | Item 5   | Item 6   |\n\n`
  const textarea = markdownTextareaRef.value
  const current = lessonForm.value.content_markdown || ''

  if (!textarea) {
    lessonForm.value.content_markdown += tableTemplate
  } else {
    const start = textarea.selectionStart ?? current.length
    const end = textarea.selectionEnd ?? current.length
    lessonForm.value.content_markdown = current.substring(0, start) + tableTemplate + current.substring(end)

    nextTick(() => {
      textarea.focus()
      const newPos = start + tableTemplate.length
      textarea.setSelectionRange(newPos, newPos)
    })
  }
}

async function handleSave () {
  savingLesson.value = true
  try {
    await adminSaveLesson(lessonForm.value)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(draftStorageKey.value)
      } catch (e) {
        console.warn('Failed to remove draft from localStorage:', e)
      }
    }
    initialSnapshot.value = JSON.stringify(lessonForm.value)
    hasSavedDraft.value = false
    emit('saved')
    emit('update:isOpen', false)
    emit('close')
  } catch (err) {
    console.error('Failed to save lesson:', err)
  } finally {
    savingLesson.value = false
  }
}
</script>
