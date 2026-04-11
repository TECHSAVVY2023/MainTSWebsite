<template>
  <div class="mx-auto w-full max-w-[72rem]">
    <div class="grid grid-cols-2 items-stretch gap-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      <article
        v-for="(speaker, idx) in speakers"
        :key="`${speaker.name || 'speaker'}-${idx}`"
        class="speaker-profile-card group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_rgba(46,19,104,0.06)] transform-gpu transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-200 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 hover:z-[1] hover:-translate-y-1 hover:scale-[1.02] hover:border-violet-200/90 hover:shadow-[0_22px_44px_-14px_rgba(46,19,104,0.2)]"
      >
        <div
          class="relative h-[5.25rem] shrink-0 bg-gradient-to-br from-violet-100/90 via-indigo-50/95 to-white sm:h-24"
          aria-hidden="true"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,rgba(124,58,237,0.14),transparent)]"
          />
          <div
            class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200/60 to-transparent"
          />
        </div>

        <div class="relative -mt-12 flex justify-center px-4">
          <div class="relative">
            <div
              class="absolute -inset-0.5 rounded-full bg-gradient-to-br from-accent-purple/35 via-violet-400/25 to-transparent opacity-70 blur-[3px] transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div
              class="relative overflow-hidden rounded-full ring-[5px] ring-white shadow-[0_12px_32px_rgba(46,19,104,0.18)]"
            >
              <img
                :src="getSpeakerImage(speaker)"
                :alt="speaker.name || 'Speaker photo'"
                class="block aspect-square h-28 w-28 object-cover sm:h-[7.25rem] sm:w-[7.25rem] md:h-[7.5rem] md:w-[7.5rem]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <div
          class="flex flex-1 flex-col px-5 pb-5 pt-4 text-left sm:px-6 sm:pb-6 sm:pt-5"
        >
          <h3 class="text-lg font-extrabold leading-snug tracking-tight text-slate-900 sm:text-[1.125rem]">
            {{ speaker.name || 'Guest Speaker' }}
          </h3>
          <p class="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-accent-purple">
            {{ speaker.role || 'Speaker' }}
          </p>
          <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] line-clamp-4 sm:line-clamp-5">
            {{ speaker.topic || 'Technology and innovation.' }}
          </p>
          <a
            v-if="speaker.link"
            :href="speaker.link"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-accent-purple/30 bg-violet-50/80 px-4 py-2 text-xs font-semibold text-accent-purple transition-[background-color,color,box-shadow,border-color] duration-300 ease-out hover:border-accent-purple hover:bg-accent-purple hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple/40 focus-visible:ring-offset-2"
          >
            View profile
            <i class="fas fa-arrow-right text-[0.65rem] opacity-80" aria-hidden="true" />
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
  isSpeaker?: boolean
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

<style scoped>
.speaker-profile-card {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>
