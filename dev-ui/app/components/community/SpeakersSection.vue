<template>
  <div class="w-full max-w-[72rem] mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-start">
      <article
        v-for="(speaker, idx) in speakers"
        :key="`${speaker.name || 'speaker'}-${idx}`"
        class="min-w-0 rounded-2xl border bg-white p-4 card-outline-violet-glow transition-all duration-300"
      >
        <img
          :src="getSpeakerImage(speaker)"
          :alt="speaker.name || 'Speaker photo'"
          class="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#ECEFF1] ring-2 ring-accent-purple/20 shadow-[0_10px_24px_rgba(46,19,104,0.12)] mx-auto"
          loading="lazy"
        />
        <div class="mt-4 text-center sm:text-left">
          <p class="text-dark text-base sm:text-lg font-bold leading-tight">
            {{ speaker.name || 'Guest Speaker' }}
          </p>
          <p class="text-accent-purple text-xs mt-1 font-semibold">
            {{ speaker.role || 'Speaker' }}
          </p>
          <p class="text-dark/70 text-xs sm:text-sm mt-2.5 line-clamp-5 leading-relaxed">
            {{ speaker.topic || 'Technology and innovation.' }}
          </p>
          <a
            v-if="speaker.link"
            :href="speaker.link"
            target="_blank"
            rel="noopener"
            class="inline-flex mt-3 text-xs text-accent-purple hover:text-secondary transition-colors"
          >
            View profile
          </a>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
type SpeakerItem = {
  name: string
  role?: string
  topic?: string
  link?: string
  image?: string
}

defineProps<{
  speakers: SpeakerItem[]
}>()

function getSpeakerImage (speaker: SpeakerItem): string {
  if (speaker.image && speaker.image.trim()) return speaker.image
  const name = (speaker.name || 'Speaker').trim()
  const encoded = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encoded}&size=256&background=2E1368&color=FFFFFF&bold=true&format=png`
}
</script>
