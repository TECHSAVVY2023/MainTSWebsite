<template>
  <main
    ref="formPanelRef"
    class="relative flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-10 lg:w-[44%] lg:px-14 lg:py-16"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(102,51,153,0.09),transparent_38%),radial-gradient(circle_at_90%_85%,rgba(239,68,68,0.08),transparent_30%)]" aria-hidden="true" />
    <canvas
      ref="trailCanvasRef"
      class="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
    <div class="relative z-10 mx-auto w-full max-w-sm text-violet">
      <h2 class="mb-4 text-center text-[1.03rem] font-bold uppercase tracking-[0.14em] text-[#1f2333]">
        USER LOGIN
      </h2>
      <p class="mb-8 text-center text-[0.95rem] leading-relaxed text-[#4a4f63]">
        Sign in with your Google account to access the dashboard.
      </p>
      <form class="space-y-5" @submit.prevent="$emit('submit')">
        <button
          type="submit"
          class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#dde0ea] bg-white px-6 py-3.5 text-base font-semibold uppercase tracking-[0.06em] text-[#1f2333] shadow-[0_10px_28px_rgba(17,24,39,0.1)] transition-all hover:-translate-y-px hover:border-[#b9bbca] hover:bg-[#fafaff]"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f4fb] text-[1.05rem] font-extrabold text-[#2d1f4e]">G</span>
          LOGIN WITH GOOGLE
        </button>
      </form>
      <p class="mt-7 text-center text-sm text-[#3D2A6E]">
        New to TECH SAVVY?
        <NuxtLink to="/" class="text-[#6B5B95] font-semibold no-underline transition-colors hover:text-accent-purple">Join Community</NuxtLink>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
const formPanelRef = ref<HTMLElement | null>(null)
const trailCanvasRef = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  login: ReturnType<typeof useLogin>
}>()

function handleMouseMove (e: MouseEvent) {
  props.login.onFormMouseMove(e, formPanelRef.value)
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}

function handleMouseLeave () {
  props.login.onFormMouseLeave()
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}

watch(() => props.login.trailPoints, () => {
  nextTick(() => props.login.drawTrail(trailCanvasRef.value, formPanelRef.value))
}, { deep: true })

defineEmits<{
  submit: []
}>()
</script>
