<template>
  <Teleport to="body">
    <div
      v-if="isOpen && course"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div class="custom-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-850 pb-3.5">
          <div class="flex items-center gap-2.5">
            <div class="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              <i class="fas fa-users-cog text-xs" />
            </div>
            <div>
              <h3 class="text-sm font-black uppercase text-white">Course People & Collaborators</h3>
              <p class="text-[11px] text-slate-400 truncate max-w-xs">{{ course.title }}</p>
            </div>
          </div>
          <button
            type="button"
            @click="handleClose"
            class="text-slate-500 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <i class="fas fa-times text-sm" />
          </button>
        </div>

        <!-- Primary Instructor (Owner) -->
        <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
          <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">Primary Instructor (Owner)</span>
          <div class="flex items-center gap-3 pt-1">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white font-black text-xs uppercase shadow-md shadow-violet-600/20">
              {{ (course.instructor_name || 'T')[0] }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="text-xs font-bold text-white truncate">{{ course.instructor_name || 'TechSavvy Instructor' }}</div>
              <div class="text-[11px] font-mono text-violet-400 truncate">{{ course.instructor_email || 'instructor@techsavvy' }}</div>
            </div>
            <span class="rounded-full bg-violet-950 border border-violet-800/50 px-2 py-0.5 text-[9px] font-black uppercase text-violet-300">
              Owner
            </span>
          </div>
        </div>

        <!-- Co-Teachers List -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Co-Teachers & Teaching Assistants ({{ (course.co_teachers || []).length }})
            </span>
          </div>

          <div v-if="(course.co_teachers || []).length > 0" class="space-y-2 max-h-48 overflow-y-auto">
            <div
              v-for="coEmail in course.co_teachers"
              :key="coEmail"
              class="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-800/50 text-cyan-300 font-bold text-[10px]">
                  <i class="fas fa-user-check text-[9px]" />
                </div>
                <span class="text-xs font-mono text-slate-200 truncate">{{ coEmail }}</span>
              </div>
              <button
                type="button"
                @click="handleRemoveCoTeacher(coEmail)"
                :disabled="actionLoading"
                class="rounded-lg p-1.5 text-slate-500 hover:bg-rose-950/40 hover:text-rose-400 disabled:opacity-40 cursor-pointer"
                title="Remove Co-Teacher"
              >
                <i class="fas fa-trash text-[10px]" />
              </button>
            </div>
          </div>

          <div v-else class="rounded-xl border border-dashed border-slate-800 bg-slate-950/20 py-4 text-center">
            <p class="text-xs text-slate-500">No co-teachers added yet.</p>
          </div>
        </div>

        <!-- Add Co-Teacher Form -->
        <div class="space-y-2 pt-2 border-t border-slate-850">
          <label class="text-[10px] font-black uppercase tracking-wider text-slate-300">Invite Co-Teacher Collaborator</label>
          <div class="flex items-center gap-2">
            <input
              v-model="newCoTeacherEmail"
              type="email"
              placeholder="colleague@example.com"
              @keyup.enter="handleAddCoTeacher"
              class="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-medium text-white placeholder-slate-600 outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              @click="handleAddCoTeacher"
              :disabled="actionLoading || !newCoTeacherEmail.trim()"
              class="flex items-center gap-1.5 rounded-xl bg-cyan-600 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-500 disabled:opacity-40 transition-all cursor-pointer"
            >
              <i v-if="actionLoading" class="fas fa-circle-notch fa-spin text-[10px]" />
              <i v-else class="fas fa-plus text-[10px]" />
              <span>Add</span>
            </button>
          </div>

          <!-- Feedback message -->
          <p v-if="message" class="text-[11px] font-medium" :class="message.type === 'success' ? 'text-emerald-400' : 'text-rose-400'">
            {{ message.text }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse } from '~/composables/useAcademy'

const props = defineProps<{
  isOpen: boolean
  course?: AcademyCourse | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', val: boolean): void
  (e: 'close'): void
  (e: 'updated'): void
}>()

const { manageCoTeacher } = useAcademy()

const newCoTeacherEmail = ref('')
const actionLoading = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

watch(() => props.isOpen, (open) => {
  if (open) {
    newCoTeacherEmail.value = ''
    message.value = null
  }
})

function handleClose () {
  emit('update:isOpen', false)
  emit('close')
}

async function handleAddCoTeacher () {
  if (!props.course || !newCoTeacherEmail.value.trim()) return
  actionLoading.value = true
  message.value = null
  try {
    const res = await manageCoTeacher(props.course.id, newCoTeacherEmail.value.trim(), 'add')
    if (res?.co_teachers) {
      props.course.co_teachers = res.co_teachers
      newCoTeacherEmail.value = ''
      message.value = { type: 'success', text: 'Co-teacher collaborator added successfully.' }
      emit('updated')
    }
  } catch (e: any) {
    message.value = { type: 'error', text: e?.data?.error || 'Failed to add co-teacher.' }
  } finally {
    actionLoading.value = false
  }
}

async function handleRemoveCoTeacher (email: string) {
  if (!props.course || !email) return
  if (!confirm(`Remove "${email}" from co-teachers on this course?`)) return
  actionLoading.value = true
  message.value = null
  try {
    const res = await manageCoTeacher(props.course.id, email, 'remove')
    if (res?.co_teachers) {
      props.course.co_teachers = res.co_teachers
      message.value = { type: 'success', text: 'Co-teacher removed.' }
      emit('updated')
    }
  } catch (e: any) {
    message.value = { type: 'error', text: 'Failed to remove co-teacher.' }
  } finally {
    actionLoading.value = false
  }
}
</script>
