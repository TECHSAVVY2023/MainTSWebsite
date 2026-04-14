<template>
  <main
    ref="formPanelRef"
    class="relative flex w-full flex-col items-center justify-center rounded-t-[1.75rem] border-t border-violet-300/25 bg-gradient-to-b from-[#f3effb] via-[#ebe4f6] to-[#e0d8f0] shadow-[0_-12px_40px_rgba(46,19,104,0.12)] lg:rounded-none lg:border-t-0 lg:bg-white lg:bg-none lg:shadow-none"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="trailCanvasRef"
      class="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
    <div class="relative z-10 w-full max-w-sm px-0">
      <div class="mb-4 text-center sm:mb-5">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/35 bg-violet-100/50 text-violet-700 shadow-inner shadow-violet-900/5 sm:h-16 sm:w-16 lg:mb-6 lg:border-violet-100 lg:bg-transparent lg:text-violet-600 lg:shadow-sm">
          <i class="fas fa-fingerprint text-xl sm:text-2xl" />
        </div>
        <p class="text-[11px] font-bold uppercase leading-snug tracking-widest text-violet-950 sm:text-xs">
          Access your community dashboard
        </p>
      </div>

      <form class="space-y-5 sm:space-y-6" @submit.prevent="$emit('submit')">
        <button
          type="submit"
          class="group relative flex w-full cursor-pointer flex-row items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-violet-400/35 bg-[#faf8ff]/95 p-3.5 shadow-sm transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_8px_24px_rgba(124,58,237,0.18)] sm:p-4 lg:bg-white lg:border-violet-100"
        >
          <div class="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <i class="fab fa-google text-violet-600 text-xl relative z-10"></i>
          <span class="relative z-10 text-sm font-black text-violet-800 uppercase tracking-widest group-hover:text-violet-800 transition-colors">Continue with Google</span>
        </button>
      </form>

      <div class="relative mt-5 border-t border-violet-400/25 pt-6 text-center lg:mt-12 lg:border-violet-100 lg:pt-8">
        <p class="text-[10px] font-bold uppercase tracking-widest text-violet-900/90">
          New to TechSavvy?
        </p>
        <NuxtLink to="/#news" class="mt-3 inline-block rounded-xl border border-violet-400/30 bg-violet-200/35 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-violet-900 no-underline transition-colors hover:border-violet-600 hover:bg-violet-600 hover:text-white sm:px-6 lg:bg-violet-50 lg:text-violet-700">
          Join the community
        </NuxtLink>
      </div>
    </div>

    <NuxtLink to="https://www.techsavvies.space" class="absolute bottom-3 z-50 inline-flex w-full items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-600/90 transition-colors hover:text-violet-800 lg:bottom-10">
      <i class="fas fa-arrow-left" :aria-hidden="true" /> Back to Home
    </NuxtLink>
  </main>
</template>

<script setup lang="ts">
const formPanelRef = ref<HTMLElement | null>(null)
const trailCanvasRef = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  login: ReturnType<typeof useLogin>
}>()

const email = computed({
  get: () => props.login.email.value,
  set: (v) => { props.login.email.value = v }
})
const password = computed({
  get: () => props.login.password.value,
  set: (v) => { props.login.password.value = v }
})
const remember = computed({
  get: () => props.login.remember.value,
  set: (v) => { props.login.remember.value = v }
})

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
