<template>
  <div class="rounded-2xl border border-white/20 p-5 sm:p-6 bg-[rgba(35,21,89,0.95)] shadow-xl flex flex-col text-left">
    <span class="inline-flex items-center w-fit self-start py-1 px-2.5 rounded-full text-[0.6875rem] font-semibold tracking-wider uppercase bg-yellow-400/20 text-yellow-400 mb-3">Featured update</span>
    <p class="text-[0.8125rem] font-semibold tracking-widest uppercase text-white/85 mb-1">{{ formatDateUppercase(article.date) }}</p>
    <p class="text-xs text-white/60 mb-3">Community update · TECH SAVVY Code Camp</p>
    <p class="text-sm leading-relaxed text-white/75 mb-0">
      Stay in the loop with what&#160;is happening inside the community &mdash; from
      camps and workshops to new projects and partnerships.
    </p>
    <h2 class="text-[0.9375rem] font-bold mt-6 mb-3 text-white">Full article</h2>
    <div class="pr-2">
      <p class="text-sm leading-relaxed text-white/80 whitespace-pre-line">
        {{ fullArticleText }}
      </p>
    </div>
    <h2 class="text-[0.9375rem] font-bold mt-6 mb-3 text-white">Details</h2>
    <ul class="list-none p-0 m-0 mb-4 flex flex-col gap-1">
      <li>
        <span class="block text-xs text-white/55">Type</span>
        <span class="block text-sm font-medium text-white/90">Community news / update</span>
      </li>
      <li>
        <span class="block text-xs text-white/55">Location</span>
        <span class="block text-sm font-medium text-white/90">Misamis Occidental, Philippines</span>
      </li>
      <li>
        <span class="block text-xs text-white/55">Published</span>
        <span class="block text-sm font-medium text-white/90">{{ formatDate(article.date) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { formatDate, formatDateUppercase } = useFormatters()

defineProps<{
  article: { date?: string }
  fullArticleText: string
}>()
</script>
