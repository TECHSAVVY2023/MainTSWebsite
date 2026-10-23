<template>
  <div class="font-inter min-h-screen bg-[#090D16] text-slate-100 selection:bg-violet-500 selection:text-white">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      <div class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-6xl">
        <NuxtLink
          to="/academy"
          class="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <i class="fas fa-arrow-left text-xs text-violet-400" />
          <span>All Courses</span>
        </NuxtLink>

        <NuxtLink
          v-if="course"
          :to="`/academy/learn/${course.slug}`"
          class="flex items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-violet-500 transition-all"
        >
          <span>Enter Classroom</span>
          <i class="fas fa-arrow-right text-[10px]" />
        </NuxtLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-10 sm:px-6 lg:px-8 max-w-4xl pb-24">
      <!-- Loading State -->
      <div v-if="loading && !course" class="py-20 text-center">
        <div class="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent mx-auto mb-3" />
        <p class="text-xs text-slate-400 font-mono">Loading syllabus…</p>
      </div>

      <!-- Course Found -->
      <div v-else-if="course" class="space-y-10">
        <!-- Overview Header with Course Banner on Top of Title -->
        <div class="border-b border-slate-850 pb-8">
          <!-- Course Banner on Top of Title -->
          <div class="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 mb-6 shadow-xl">
            <img
              :src="course.thumbnail || getAcademyCourseFallback(course.category)"
              :alt="course.title"
              class="h-full w-full object-cover"
              @error="(e: any) => { e.target.src = getAcademyCourseFallback(course.category) }"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <div class="flex items-center gap-2 mb-3">
            <span class="rounded bg-violet-950/80 border border-violet-800/40 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-violet-300">
              {{ course.category }}
            </span>
            <span class="rounded bg-slate-800 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
              {{ course.level }}
            </span>
          </div>

          <h1 class="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {{ course.title }}
          </h1>

          <p class="mt-4 text-xs sm:text-sm font-medium text-slate-300 leading-relaxed max-w-2xl">
            {{ course.description || 'Hands-on training curriculum featuring interactive Markdown lessons and practice quizzes.' }}
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div>
              <span class="block text-[9px] font-black uppercase tracking-wider text-slate-500">Instructor</span>
              <span class="font-bold text-white">{{ course.instructor_name }}</span>
            </div>
            <div>
              <span class="block text-[9px] font-black uppercase tracking-wider text-slate-500">Duration</span>
              <span class="font-bold text-white font-mono">{{ course.estimated_hours }} Hours</span>
            </div>
            <div>
              <span class="block text-[9px] font-black uppercase tracking-wider text-slate-500">Structure</span>
              <span class="font-bold text-white font-mono">{{ course.modules?.length ?? 0 }} Chapters</span>
            </div>
          </div>
        </div>

        <!-- Syllabus Tree -->
        <div>
          <h2 class="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">Course Syllabus</h2>

          <div class="space-y-3">
            <div
              v-for="(mod, modIdx) in course.modules"
              :key="mod.id"
              class="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
            >
              <!-- Module Header -->
              <div
                @click="toggleModule(mod.id)"
                class="flex cursor-pointer items-center justify-between p-4 hover:bg-slate-850 transition-colors"
              >
                <div class="flex items-center gap-3">
                  <span class="flex h-6 w-6 items-center justify-center rounded bg-violet-950 text-xs font-bold text-violet-400 border border-violet-800/40 font-mono">
                    {{ modIdx + 1 }}
                  </span>
                  <div>
                    <h3 class="text-xs font-black uppercase text-white">{{ mod.title }}</h3>
                    <p v-if="mod.description" class="text-[10px] text-slate-400">{{ mod.description }}</p>
                  </div>
                </div>

                <i
                  class="fas fa-chevron-down text-xs text-slate-500 transition-transform duration-200"
                  :class="{ 'rotate-180': openModules.includes(mod.id) }"
                />
              </div>

              <!-- Module Lessons -->
              <div v-show="openModules.includes(mod.id)" class="divide-y divide-slate-850 bg-slate-950/40 p-2">
                <div
                  v-for="(les, lesIdx) in mod.lessons"
                  :key="les.id"
                  class="flex items-center justify-between px-4 py-2.5 text-xs text-slate-300"
                >
                  <div class="flex items-center gap-2.5">
                    <i class="far fa-file-code text-violet-400 text-xs" />
                    <span>{{ modIdx + 1 }}.{{ lesIdx + 1 }} {{ les.title }}</span>
                  </div>
                  <span class="text-[10px] font-mono text-slate-500">{{ les.estimated_minutes }}m</span>
                </div>

                <div
                  v-for="ass in mod.assessments"
                  :key="ass.id"
                  class="flex items-center justify-between px-4 py-2.5 text-xs text-emerald-300 font-bold"
                >
                  <div class="flex items-center gap-2.5">
                    <i class="fas fa-tasks text-emerald-400 text-xs" />
                    <span>{{ ass.title }}</span>
                  </div>
                  <span class="text-[10px] text-emerald-400 font-mono">Pass: {{ ass.passing_percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Not Found State -->
      <div v-else class="py-20 text-center">
        <i class="fas fa-book-open text-4xl text-slate-600 mb-3" />
        <h2 class="text-lg font-bold text-white uppercase">Course Not Found</h2>
        <p class="text-xs text-slate-400 mt-1 mb-6">The course you are looking for does not exist or may have been unlisted.</p>
        <NuxtLink to="/academy" class="rounded-xl bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-500 transition-colors">
          Browse Available Courses
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAcademy, getAcademyCourseFallback, type AcademyCourse } from '~/composables/useAcademy'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const config = useRuntimeConfig()
const apiBase = (config.public?.apiBase as string || '').replace(/\/$/, '')

const { currentCourse, fetchCourseBySlug } = useAcademy()

// SSR syllabus and metadata fetching
const { data: ssrCourse, status } = await useAsyncData(`academy-course-${slug.value}`, async () => {
  if (!apiBase || !slug.value) return null
  try {
    return await $fetch<AcademyCourse>(`${apiBase}/academy/courses/${slug.value}/`).catch(() => null)
  } catch {
    return null
  }
})

const course = computed(() => ssrCourse.value || currentCourse.value)
const loading = computed(() => status.value === 'pending')

const openModules = ref<number[]>(course.value?.modules ? course.value.modules.map(m => m.id) : [])

watch(() => course.value?.modules, (mods) => {
  if (mods && openModules.value.length === 0) {
    openModules.value = mods.map(m => m.id)
  }
}, { immediate: true })

onMounted(async () => {
  if (!ssrCourse.value && slug.value) {
    const c = await fetchCourseBySlug(slug.value)
    if (c?.modules) {
      openModules.value = c.modules.map(m => m.id)
    }
  }
})

useHead(() => {
  const c = course.value
  const title = c ? `${c.title} | TechSavvy Academy` : 'Course Syllabus | TechSavvy Academy'
  const desc = c?.description || 'Hands-on training curriculum featuring interactive Markdown lessons and practice quizzes.'
  const image = c?.thumbnail || getAcademyCourseFallback(c?.category)

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: image },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: image }
    ]
  }
})

function toggleModule (id: number) {
  if (openModules.value.includes(id)) {
    openModules.value = openModules.value.filter(mId => mId !== id)
  } else {
    openModules.value.push(id)
  }
}
</script>
