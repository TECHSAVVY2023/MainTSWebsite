<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 justify-items-center">
    <div
      v-for="(project, idx) in safeProjects"
      :key="project?.title || project?.url || idx"
      class="w-full max-w-[280px] mx-2 sm:mx-3 bg-[#f8f7f5] border border-black/5 group relative overflow-hidden rounded-lg sm:rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]"
    >
      <div class="aspect-[4/3] relative bg-gray-200 overflow-hidden">
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
            class="inline-flex items-center text-accent-purple font-semibold text-[0.6875rem] sm:text-xs"
          >
            Visit Site
            <i class="fas fa-external-link-alt ml-1.5 text-[0.625rem]" />
          </a>
        </div>
      </div>
      <div class="bg-[#f8f7f5] p-2 sm:p-3">
        <h2 class="text-sm sm:text-base font-bold mb-1 text-gray-900 line-clamp-2">{{ project?.title ?? '' }}</h2>
        <p class="text-gray-600 text-xs sm:text-sm truncate">{{ project?.domain ?? '' }}</p>
        <p class="text-gray-600 text-xs sm:text-sm truncate">Develop By: {{ project?.developer ?? 'Tech Savvy Community' }}</p>
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
