<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div class="custom-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-850 pb-3.5 mb-4">
          <h3 class="text-sm font-black uppercase text-white">
            {{ course?.id ? 'Edit Course Settings' : 'Create New Course' }}
          </h3>
          <button type="button" @click="handleClose" class="text-slate-400 hover:text-white">
            <i class="fas fa-times" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
          <!-- Course Banner on Top of Title -->
          <div class="rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
            <div class="flex items-center justify-between mb-2">
              <label class="block font-bold text-slate-300">Course Banner</label>
              <span v-if="!form.thumbnail" class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                No image attached (Default SHD will be used)
              </span>
              <span v-else class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <i class="fas fa-check-circle text-[10px]" /> Image Attached
              </span>
            </div>

            <!-- Live Banner Preview (If attached) -->
            <div
              v-if="form.thumbnail"
              class="relative h-36 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 mb-3 group"
            >
              <img
                :src="form.thumbnail"
                alt="Course Banner Preview"
                class="h-full w-full object-cover"
                @error="(e: any) => { e.target.src = '/img/The-division-shd-logo.png' }"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end justify-between p-3">
                <span class="text-[10px] font-mono text-slate-300 truncate max-w-[70%]">
                  {{ form.thumbnail }}
                </span>
                <button
                  type="button"
                  @click="form.thumbnail = ''"
                  class="rounded-lg bg-rose-500/80 hover:bg-rose-500 px-2 py-1 text-[10px] font-bold text-white shadow transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <i class="fas fa-trash-alt text-[9px]" /> Remove
                </button>
              </div>
            </div>

            <!-- Skeleton Placeholder Upload Box (When empty / not attached) -->
            <div
              v-else
              @click="triggerBannerFileInput"
              class="relative h-36 w-full rounded-xl border-2 border-dashed border-slate-800 hover:border-violet-500/50 bg-slate-900/30 hover:bg-slate-900/50 flex flex-col items-center justify-center p-4 mb-3 cursor-pointer transition-all group"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 group-hover:text-violet-400 group-hover:border-violet-500/40 mb-2 transition-all">
                <i class="fas fa-image text-lg" />
              </div>
              <p class="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                Upload or attach course banner
              </p>
              <p class="text-[10px] text-slate-500 text-center mt-0.5">
                PNG, JPG, or WebP. Defaults to SHD banner if left empty.
              </p>
            </div>

            <!-- Upload & Controls Row -->
            <div class="flex flex-wrap items-center gap-2">
              <input
                ref="bannerFileInputRef"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleBannerFileUpload"
              />
              <button
                type="button"
                :disabled="uploadingBanner"
                @click="triggerBannerFileInput"
                class="flex items-center gap-1.5 rounded-xl border border-violet-500/40 bg-violet-600/20 px-3 py-2 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                <i v-if="uploadingBanner" class="fas fa-spinner fa-spin text-xs" />
                <i v-else class="fas fa-upload text-xs" />
                <span>{{ uploadingBanner ? 'Uploading…' : 'Upload from Computer' }}</span>
              </button>

              <button
                v-if="!form.thumbnail"
                type="button"
                @click="form.thumbnail = '/img/The-division-shd-logo.png'"
                class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                <i class="fas fa-undo text-[10px] text-slate-400" />
                <span>Use Default SHD Banner</span>
              </button>

              <button
                v-else
                type="button"
                @click="form.thumbnail = ''"
                class="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-400 hover:border-rose-800 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <i class="fas fa-times text-[10px]" />
                <span>Clear Banner</span>
              </button>

              <button
                type="button"
                @click="showCustomUrlInput = !showCustomUrlInput"
                class="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 ml-auto cursor-pointer"
              >
                {{ showCustomUrlInput ? 'Hide URL input' : 'Paste Image URL' }}
              </button>
            </div>

            <!-- Optional Custom URL input -->
            <div v-if="showCustomUrlInput" class="mt-2.5">
              <input
                v-model="form.thumbnail"
                type="text"
                placeholder="https://… or /img/custom.png"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-white outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-400 mb-1">Course Title *</label>
            <input
              v-model="form.title"
              required
              placeholder="Course title"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-400 mb-1">Track / Category</label>
              <select
                v-model="form.category"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
                <option value="Python & AI">Python & AI</option>
                <option value="Systems & Networking">Systems & Networking</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Level</label>
              <select
                v-model="form.level"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none focus:border-violet-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-400 mb-1">Instructor</label>
              <input
                v-model="form.instructor_name"
                placeholder="TechSavvy Team"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none"
              />
            </div>

            <div>
              <label class="block font-bold text-slate-400 mb-1">Estimated Hours</label>
              <input
                v-model.number="form.estimated_hours"
                type="number"
                min="1"
                placeholder="10"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-bold text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-400 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Course summary and learning outcomes…"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 font-medium text-white outline-none"
            />
          </div>

          <div class="flex items-center gap-2 pt-1">
            <input
              id="pub_check"
              v-model="form.is_published"
              type="checkbox"
              class="h-4 w-4 rounded accent-violet-600"
            />
            <label for="pub_check" class="font-bold text-slate-300">Published to Student Catalog</label>
          </div>

          <div class="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              @click="handleClose"
              class="rounded-xl px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="rounded-xl bg-violet-600 px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500 disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save Course' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useAcademy, type AcademyCourse } from '~/composables/useAcademy'

const props = defineProps<{
  isOpen: boolean
  course?: Partial<AcademyCourse> | null
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', val: boolean): void
  (e: 'close'): void
  (e: 'saved'): void
}>()

const config = useRuntimeConfig()
const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')
const { adminCreateCourse, adminUpdateCourse } = useAcademy()

const bannerFileInputRef = ref<HTMLInputElement | null>(null)
const uploadingBanner = ref(false)
const showCustomUrlInput = ref(false)
const saving = ref(false)

const form = ref<Partial<AcademyCourse>>({
  title: '',
  category: 'Web Development',
  level: 'beginner',
  instructor_name: 'TechSavvy Instructor',
  estimated_hours: 10,
  thumbnail: '',
  description: '',
  is_published: true
})

watch(() => props.course, (newCourse) => {
  showCustomUrlInput.value = false
  if (newCourse) {
    form.value = {
      ...newCourse,
      thumbnail: newCourse.thumbnail || ''
    }
  } else {
    form.value = {
      title: '',
      category: 'Web Development',
      level: 'beginner',
      instructor_name: 'TechSavvy Instructor',
      estimated_hours: 10,
      thumbnail: '',
      description: '',
      is_published: true
    }
  }
}, { immediate: true })

function handleClose () {
  emit('update:isOpen', false)
  emit('close')
}

function triggerBannerFileInput () {
  bannerFileInputRef.value?.click()
}

async function handleBannerFileUpload (event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploadingBanner.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await $fetch<{ uploaded_files: Array<{ name: string; url: string }> }>(`${apiBase}/cms/upload/`, {
      method: 'POST',
      body: formData
    })

    if (res?.uploaded_files && res.uploaded_files.length > 0) {
      form.value.thumbnail = res.uploaded_files[0].url
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) form.value.thumbnail = e.target.result as string
      }
      reader.readAsDataURL(file)
    }
  } catch (err) {
    console.error('File upload error, fallback to data url:', err)
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) form.value.thumbnail = e.target.result as string
    }
    reader.readAsDataURL(file)
  } finally {
    uploadingBanner.value = false
    if (target) target.value = ''
  }
}

async function handleSubmit () {
  saving.value = true
  try {
    const payload = {
      ...form.value,
      thumbnail: form.value.thumbnail?.trim() || '/img/The-division-shd-logo.png'
    }
    if (props.course?.id) {
      await adminUpdateCourse(props.course.id, payload)
    } else {
      await adminCreateCourse(payload)
    }
    emit('saved')
    handleClose()
  } catch (e) {
    console.error('Failed to save course:', e)
  } finally {
    saving.value = false
  }
}
</script>
