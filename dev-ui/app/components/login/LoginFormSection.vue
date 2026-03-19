<template>
  <main
    ref="formPanelRef"
    class="bg-white flex-1 lg:w-[45%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 relative lg:border-l lg:border-accent-purple/15"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="trailCanvasRef"
      class="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
    <div class="text-violet max-w-sm mx-auto w-full relative z-10">
      <h2 class="text-base font-bold tracking-[0.12em] uppercase text-[#2d1f4e] mb-4 text-center">
        USER LOGIN
      </h2>
      <p class="text-sm text-[#3D2A6E] text-center mb-6">
        Sign in with your Google account to access the dashboard.
      </p>
      <form class="space-y-5" @submit.prevent="$emit('submit')">
        <button
          type="submit"
          class="w-full py-3.5 px-6 rounded-xl text-base font-bold bg-accent-gold text-violet tracking-[0.08em] uppercase border-none cursor-pointer shadow-[0_4px_16px_rgba(255,215,74,0.35)] transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(255,215,74,0.45)] hover:opacity-95 flex items-center justify-center gap-3"
        >
          <span class="w-9 h-9 rounded-lg bg-violet/10 flex items-center justify-center font-extrabold text-violet">G</span>
          LOGIN WITH GOOGLE
        </button>
      </form>
      <p class="text-center text-sm text-[#3D2A6E] mt-6">
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
