<template>
  <section
    id="projects"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden"
  >
    <SectionWires gradient-id-prefix="swg-projects" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto px-8 sm:px-12 lg:px-20 relative flex-1 flex flex-col">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div class="mb-0">
            <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark mb-1">
              Featured Projects
            </h2>
            <p class="text-sm sm:text-base text-dark/60 max-w-[42rem] leading-relaxed">
              Ecommerce websites developed by our community
            </p>
          </div>
          <NuxtLink
            to="/projects"
            class="inline-flex items-center gap-2 py-2 px-4 sm:py-2.5 sm:px-5 rounded-full bg-violet-border border border-accent-purple/25 text-accent-purple font-medium text-sm sm:text-base transition-colors hover:bg-[#D9CCFA] hover:border-[#9575CD] hover:text-[#283593] no-underline shrink-0"
          >
            View all
            <i class="fas fa-arrow-right text-xs" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start w-full max-w-[72rem] mx-auto">
          <div
            v-for="(project, idx) in safeProjects"
            :key="project.title || project.url || idx"
            class="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#f8f7f5] border transition-all duration-300 hover:-translate-y-1 card-outline-violet-glow"
          >
            <div class="aspect-video relative bg-gray-200 overflow-hidden">
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
                  class="inline-flex items-center text-accent-purple font-semibold text-[11px] sm:text-xs"
                >
                  Visit Site
                  <i class="fas fa-external-link-alt ml-1.5 text-[10px] sm:text-xs" />
                </a>
              </div>
            </div>
            <div class="p-2.5 sm:p-4 bg-[#f8f7f5]">
              <h3 class="text-sm sm:text-base font-bold mb-0.5 text-gray-900">{{ project?.title ?? '' }}</h3>
              <p class="text-gray-600 text-[11px] sm:text-xs">{{ project?.domain ?? '' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LANDING_SECTION_MAX_CARDS } from '~/composables/useLanding'

type ProjectItem = {
  title: string
  domain?: string
  url: string
  image?: string
  alt?: string
}

const props = withDefaults(
  defineProps<{
    projects?: ProjectItem[] | unknown
    defaultImage?: string
  }>(),
  { defaultImage: '/assets/no-image.png' }
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
