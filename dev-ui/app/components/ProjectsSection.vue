<template>
  <section
    id="projects"
    class="scroll-mt-20 min-h-screen flex flex-col pt-16 pb-12 md:pt-24 md:pb-24 bg-neutral-gray relative overflow-hidden"
  >
    <SectionWires gradient-id-prefix="swg-projects" />
    <div class="relative z-10 isolate flex-1 flex flex-col">
      <div class="container mx-auto relative flex-1 flex flex-col">
        <div class="mb-8 sm:mb-12">
          <div class="flex flex-col items-start justify-between gap-3 sm:gap-4 md:flex-row md:items-end">
            <SectionWireShield :wide="false">
              <div class="max-w-[42rem]">
                <div class="mb-1 flex flex-wrap items-center gap-2">
                  <h2 class="text-[22px] sm:text-[26px] md:text-[30px] font-bold tracking-tight leading-tight text-dark">
                    Featured Projects
                  </h2>
                  <span
                    v-if="locked"
                    class="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-800 sm:text-[11px]"
                  >
                    <i class="fas fa-lock text-[9px]" aria-hidden="true" />
                    Members
                  </span>
                </div>
                <p class="text-sm leading-relaxed text-dark/60 sm:text-base">
                  Ecommerce websites developed by our community
                </p>
              </div>
            </SectionWireShield>
            <SectionWireShield :wide="false">
              <NuxtLink
                :to="locked ? '/login' : '/projects'"
                class="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-purple/25 bg-violet-border py-2 px-4 text-sm font-medium text-accent-purple no-underline transition-colors hover:border-[#9575CD] hover:bg-[#D9CCFA] hover:text-[#283593] sm:py-2.5 sm:px-5 sm:text-base"
              >
                <template v-if="locked">
                  <i class="fas fa-lock text-xs" aria-hidden="true" />
                  Sign in to view
                </template>
                <template v-else>
                  View all
                  <i class="fas fa-arrow-right text-xs" />
                </template>
              </NuxtLink>
            </SectionWireShield>
          </div>
        </div>

        <div class="relative w-full max-w-[72rem] mx-auto">
          <div
            class="grid w-full gap-3 sm:gap-4 grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch"
            :class="locked ? 'min-h-[200px] sm:min-h-[320px]' : ''"
          >
            <template v-if="locked">
              <div
                v-for="n in 4"
                :key="'sk-' + n"
                :class="[
                  'min-h-0 overflow-hidden rounded-xl border border-gray-200/80 bg-[#f0eef5]/90 animate-pulse sm:rounded-2xl',
                  n === 1 ? 'flex flex-col' : 'hidden',
                  n === 2 ? 'min-[480px]:flex min-[480px]:flex-col' : '',
                  n >= 3 ? 'lg:flex lg:flex-col' : ''
                ]"
                aria-hidden="true"
              >
                <div class="aspect-video w-full shrink-0 bg-gray-300/60" />
                <div class="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <div class="h-3.5 rounded bg-gray-300/50 sm:h-4 w-[88%]" />
                  <div class="h-3 rounded bg-gray-200/80 w-[55%]" />
                  <div class="mt-auto h-3 rounded bg-gray-200/70 w-[72%]" />
                </div>
              </div>
            </template>
            <template v-else-if="safeProjects.length === 0">
              <div class="col-span-full py-10 px-6 rounded-2xl border border-dashed border-violet-200 bg-white/90 text-center shadow-sm">
                <pre class="font-mono text-[11px] sm:text-xs text-violet-600 whitespace-pre leading-relaxed inline-block text-left mx-auto mb-3 select-none">{{ asciiMsg }}</pre>
                <p class="text-xs font-bold text-dark uppercase tracking-wider">No Featured Projects Published Yet</p>
                <p class="text-[11px] text-dark/60 mt-0.5">Publish new projects from the Community Dashboard.</p>
              </div>
            </template>
            <template v-else>
              <article
                v-for="(project, idx) in safeProjects"
                :key="project.title || project.url || idx"
                class="group relative flex flex-col h-full min-h-0 overflow-hidden rounded-xl sm:rounded-2xl bg-[#f8f7f5] border transition-all duration-300 hover:-translate-y-1 card-outline-violet-glow"
              >
              <div class="aspect-video w-full shrink-0 relative bg-gray-200 overflow-hidden">
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
              <div
                class="flex flex-col flex-1 min-h-0 gap-1 sm:gap-1.5 p-2.5 sm:p-4 bg-[#f8f7f5]"
              >
                <h3
                  class="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[3.25rem]"
                >
                  {{ project?.title ?? '' }}
                </h3>
                <p
                  class="text-gray-600 text-[11px] sm:text-xs line-clamp-1 shrink-0 min-h-[1.125rem]"
                >
                  {{ project?.domain ?? '' }}
                </p>
                <p
                  class="text-gray-600 text-[11px] sm:text-xs line-clamp-2 mt-auto leading-snug min-h-[2.25rem] sm:min-h-[2.5rem]"
                >
                  Develop By: {{ project?.developer ?? 'Tech Savvy Community' }}
                </p>
              </div>
              </article>
            </template>
          </div>

          <div
            v-if="locked"
            class="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-neutral-gray/40 px-3 py-4 backdrop-blur-[2px] sm:items-center sm:bg-neutral-gray/70 sm:px-6 sm:py-10 sm:backdrop-blur-[5px]"
          >
            <div
              class="w-full max-w-[18rem] rounded-2xl border border-violet-200/80 bg-white/95 px-4 py-5 text-center shadow-[0_14px_32px_rgba(46,19,104,0.10)] sm:max-w-sm sm:px-6 sm:py-8 sm:shadow-[0_20px_50px_rgba(46,19,104,0.12)]"
            >
              <div
                class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 sm:mb-4 sm:h-14 sm:w-14"
              >
                <i class="fas fa-lock text-xl sm:text-2xl" aria-hidden="true" />
              </div>
              <p class="text-[15px] font-bold text-dark sm:text-lg">
                Member access
              </p>
              <p class="mt-1.5 text-xs leading-relaxed text-dark/65 sm:mt-2 sm:text-sm">
                Sign in with your community account to browse featured projects and the full directory.
              </p>
              <NuxtLink
                to="/login"
                class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-violet-800 sm:mt-5 sm:py-3"
              >
                <i class="fas fa-sign-in-alt text-xs" aria-hidden="true" />
                Sign in
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LANDING_SECTION_MAX_CARDS } from '~/composables/useLanding'
import { DEFAULT_PROJECT_IMAGE } from '~/constants/sampleMedia'
import { getRandomAsciiMessage } from '~/constants/asciiMessages'

const asciiMsg = computed(() => getRandomAsciiMessage())

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
    /** When true, show members-only overlay; project list is hidden until the user signs in. */
    locked?: boolean
    projects?: ProjectItem[] | unknown
    defaultImage?: string
  }>(),
  {
    locked: false,
    defaultImage: DEFAULT_PROJECT_IMAGE
  }
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
