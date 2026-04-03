<template>
  <section
    id="projects"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden"
  >
    <SectionWires gradient-id-prefix="swg-projects" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <SectionWireShield>
            <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <div class="mb-0">
              <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
                Featured Projects
              </h2>
              <p class="max-w-[42rem] text-sm leading-relaxed text-dark/60 sm:text-base">
                Ecommerce websites developed by our community
              </p>
            </div>
            <NuxtLink
              to="/projects"
              class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
            >
              View all
              <i class="fas fa-arrow-right text-xs" />
            </NuxtLink>
            </div>
          </SectionWireShield>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start w-full max-w-[72rem] mx-auto justify-items-center">
          <div
            v-for="(project, idx) in safeProjects"
            :key="project.title || project.url || idx"
            class="group relative flex h-[252px] w-[236px] flex-col overflow-hidden rounded-xl border bg-[#f8f7f5] transition-all duration-300 hover:-translate-y-1 card-outline-violet-glow sm:rounded-2xl"
          >
            <div class="relative h-[132px] shrink-0 overflow-hidden bg-gray-200">
              <img
                :src="project?.image || defaultImage"
                :alt="project?.alt || project?.title || 'Project'"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                @error="onImageError($event)"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-4">
                <a
                  :href="project?.url || '#'"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2.5 py-1.5 text-[11px] font-bold text-[#1f2340] shadow-[0_6px_18px_rgba(0,0,0,0.35)] no-underline transition-all duration-200 hover:bg-white sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Visit Site
                  <i class="fas fa-external-link-alt ml-1.5 text-[10px] sm:text-xs" />
                </a>
              </div>
            </div>
            <div class="flex flex-1 flex-col bg-[#f8f7f5] p-2.5 sm:p-3">
              <h3 class="line-clamp-2 text-sm font-bold text-gray-900">{{ project?.title ?? '' }}</h3>
              <p class="mt-1 truncate text-[11px] text-gray-600">{{ project?.domain ?? '' }}</p>
              <p class="mt-auto line-clamp-2 text-[11px] leading-tight text-gray-600">Developed by: {{ project?.developer ?? 'Tech Savvy Community' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LANDING_SECTION_MAX_CARDS } from '~/composables/useLanding'
import { DEFAULT_PROJECT_IMAGE } from '~/constants/defaultMediaAssets'

type ProjectItem = {
  title: string
  domain?: string
  developer?: string
  url: string
  image?: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    projects?: ProjectItem[] | unknown
    defaultImage?: string
  }>(),
  { defaultImage: DEFAULT_PROJECT_IMAGE }
)

const safeProjects = computed(() => {
  const raw = props.projects
  const list = Array.isArray(raw) ? raw.filter((p): p is ProjectItem => p != null && typeof p === 'object') : []
  return list.slice(0, LANDING_SECTION_MAX_CARDS)
})

function onImageError(ev: Event) {
  const el = ev.target as HTMLImageElement | null
  if (el?.src !== undefined) el.src = props.defaultImage
}
</script>
