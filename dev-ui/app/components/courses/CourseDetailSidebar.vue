<template>
  <div class="bg-[rgba(35,21,89,0.95)] border border-white/20 rounded-2xl p-6">
    <div class="text-2xl font-extrabold text-[#ffd74a] mb-4">{{ course.price }}</div>
    <button
      type="button"
      class="w-full py-3.5 px-6 rounded-xl text-base font-bold bg-[#ffd74a] text-[#14082e] border-0 cursor-pointer transition-all hover:bg-[#ffe066] hover:-translate-y-px"
    >
      Enroll Now
    </button>
    <p class="text-xs text-white/50 mt-3 text-center">Free for TECH SAVVY community members</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  course: { price: string }
}>()
</script>
