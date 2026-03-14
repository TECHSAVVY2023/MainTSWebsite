<template>
  <div>
    <div class="relative aspect-video rounded-xl overflow-hidden bg-[rgba(35,21,89,0.95)] mb-6">
      <img
        :src="course.image || defaultImage"
        :alt="course.title"
        class="w-full h-full object-cover"
        @error="onImageError($event)"
      />
      <span v-if="course.badge" class="absolute top-4 left-4 py-1.5 px-2.5 rounded-md text-xs font-bold uppercase bg-[#ffd74a] text-[#14082e]">{{ course.badge }}</span>
    </div>
    <h1 class="text-2xl font-extrabold text-white mb-2 leading-tight">{{ course.title }}</h1>
    <p class="text-base text-white/75 leading-relaxed mb-4">{{ course.description }}</p>
    <div class="flex flex-wrap gap-4 text-sm text-white/70 mb-8">
      <span class="inline-flex items-center gap-1.5"><i class="fas fa-user" aria-hidden="true" /> {{ course.instructor }}</span>
      <span class="inline-flex items-center gap-1.5"><i class="fas fa-star text-yellow-400" aria-hidden="true" /> {{ course.rating }} ({{ course.reviewCount }} reviews)</span>
      <span v-if="course.duration" class="inline-flex items-center gap-1.5"><i class="fas fa-clock" aria-hidden="true" /> {{ course.duration }}</span>
      <span v-if="course.level">{{ course.level }}</span>
    </div>
    <div class="mb-0">
      <h2 class="text-xl font-bold text-white mb-4">What you'll learn</h2>
      <ul class="list-none p-0 m-0">
        <li v-for="(item, i) in course.learnItems" :key="i" class="flex items-start gap-2 mb-2 text-[0.9375rem] text-white/85">
          <i class="fas fa-check text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" /> {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  course: { title: string; description: string; instructor: string; rating: string; reviewCount: number; duration?: string; level?: string; badge?: string; image?: string; learnItems?: string[] }
  defaultImage: string
}>()

const onImageError = useImageFallback(props.defaultImage)
</script>
