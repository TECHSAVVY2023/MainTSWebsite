<template>
  <div>
    <div class="relative mb-6 aspect-video overflow-hidden rounded-xl bg-neutral-gray ring-1 ring-neutral-border">
      <img
        :src="course.image || defaultImage"
        :alt="course.title"
        class="h-full w-full object-cover"
        @error="onImageError($event)"
      />
      <span v-if="course.badge" class="absolute left-4 top-4 rounded-md bg-[#ffd74a] px-2.5 py-1.5 text-xs font-bold uppercase text-[#14082e]">{{ course.badge }}</span>
    </div>
    <h1 class="mb-2 text-2xl font-extrabold leading-tight text-dark">
      {{ course.title }}
    </h1>
    <p class="mb-4 text-base leading-relaxed text-dark/80">
      {{ course.description }}
    </p>
    <div class="mb-8 flex flex-wrap gap-4 text-sm text-dark/70">
      <span class="inline-flex items-center gap-1.5"><i class="fas fa-user text-accent-purple/80" aria-hidden="true" /> {{ course.instructor }}</span>
      <span class="inline-flex items-center gap-1.5"><i class="fas fa-star text-amber-500" aria-hidden="true" /> {{ course.rating }} ({{ course.reviewCount }} reviews)</span>
      <span v-if="course.duration" class="inline-flex items-center gap-1.5"><i class="fas fa-clock" aria-hidden="true" /> {{ course.duration }}</span>
      <span v-if="course.level" class="rounded-full bg-accent-purple/10 px-2.5 py-0.5 text-xs font-semibold text-accent-purple">{{ course.level }}</span>
    </div>
    <div v-if="learnList.length" class="mb-0">
      <h2 class="mb-4 text-xl font-bold text-dark">
        What you'll learn
      </h2>
      <ul class="m-0 list-none p-0">
        <li v-for="(item, i) in learnList" :key="i" class="mb-2 flex items-start gap-2 text-[0.9375rem] text-dark/85">
          <i class="fas fa-check mt-0.5 shrink-0 text-accent-purple" aria-hidden="true" /> {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  course: { title: string; description: string; instructor: string; rating: string; reviewCount: number; duration?: string; level?: string; badge?: string; image?: string; learnItems?: string[] }
  defaultImage: string
}>()

const onImageError = useImageFallback(props.defaultImage)

/** Always show bullets: explicit list or lines from description */
const learnList = computed(() => {
  const raw = props.course.learnItems
  if (Array.isArray(raw) && raw.length) return raw
  const d = (props.course.description || '').trim()
  if (!d) return ['Overview and learning goals are described above.']
  const lines = d
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8)
  if (lines.length) return lines
  return [d.length > 160 ? `${d.slice(0, 157)}…` : d]
})
</script>
