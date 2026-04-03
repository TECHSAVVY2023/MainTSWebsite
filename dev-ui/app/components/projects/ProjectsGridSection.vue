<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
    <div
      v-for="(project, idx) in safeProjects"
      :key="project?.title || project?.url || idx"
      class="group relative mx-2 flex h-[252px] w-[236px] flex-col overflow-hidden rounded-lg border border-black/5 bg-[#f8f7f5] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)] sm:mx-3 sm:rounded-xl"
    >
      <div class="relative h-[132px] shrink-0 overflow-hidden bg-gray-200">
        <img
          :src="project?.image || defaultImage"
          :alt="project?.alt || project?.title || 'Project'"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          @error="onProjectImageError($event)"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-3">
          <a
            :href="project?.url || '#'"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/95 px-2.5 py-1.5 text-[0.6875rem] font-bold text-[#1f2340] shadow-[0_6px_18px_rgba(0,0,0,0.35)] no-underline transition-all duration-200 hover:bg-white sm:px-3 sm:py-1.5 sm:text-xs"
          >
            Visit Site
            <i class="fas fa-external-link-alt ml-1.5 text-[0.625rem]" />
          </a>
        </div>
      </div>
      <div class="flex flex-1 flex-col bg-[#f8f7f5] p-2.5 sm:p-3">
        <h2 class="line-clamp-2 text-sm font-bold text-gray-900">{{ project?.title ?? '' }}</h2>
        <p class="mt-1 truncate text-[11px] text-gray-600">{{ project?.domain ?? '' }}</p>
        <p class="mt-auto line-clamp-2 text-[11px] leading-tight text-gray-600">Developed by: {{ project?.developer ?? 'Tech Savvy Community' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  projects?: { title?: string; domain?: string; developer?: string; url?: string; image?: string; alt?: string }[] | unknown
  defaultImage: string
}>()

const { defaultImage } = toRefs(props)
const safeProjects = computed(() => {
  const raw = props.projects
  if (!Array.isArray(raw)) return []
  return raw.filter((p): p is NonNullable<typeof p> & { title?: string; domain?: string; url?: string } =>
    p != null && typeof p === 'object'
  )
})

const onProjectImageError = useImageFallback(props.defaultImage)
</script>
