<template>
  <section class="rounded-2xl bg-white border border-neutral-border p-5 sm:p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="text-dark font-bold text-base sm:text-lg">Community Role Chart</h3>
        <p class="text-xs text-dark/60 mt-1">Distribution by role</p>
      </div>
      <span class="text-[10px] sm:text-xs text-dark/60">{{ totalMembers }} total</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="rounded-xl border border-neutral-border bg-neutral-gray p-4">
        <div class="space-y-3">
          <div v-for="(role, idx) in roleStats" :key="`${role.role}-${idx}`">
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-dark/75">{{ role.role }}</span>
              <span class="text-dark font-semibold">{{ role.count }}</span>
            </div>
            <div class="h-2 rounded-full bg-white overflow-hidden border border-neutral-border">
              <div
                class="h-full rounded-full transition-all duration-700 ease-out"
                :class="roleBarColor(idx)"
                :style="{ width: `${Math.max(5, Math.min(100, role.percent))}%` }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-neutral-border bg-neutral-gray p-4 flex items-center justify-center">
        <div class="w-full max-w-[260px]">
          <div class="h-3 rounded-full bg-white overflow-hidden border border-neutral-border flex">
            <div
              v-for="(role, idx) in roleStats"
              :key="`${role.role}-strip-${idx}`"
              :class="roleBarColor(idx)"
              :style="{ width: `${Math.max(4, role.percent)}%` }"
            />
          </div>
          <div class="mt-4 grid grid-cols-2 gap-2">
            <div
              v-for="(role, idx) in roleStats"
              :key="`${role.role}-legend-${idx}`"
              class="flex items-center gap-2 text-[11px] text-dark/70"
            >
              <span class="w-2.5 h-2.5 rounded-full" :class="roleBarColor(idx)" />
              <span class="truncate">{{ role.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type CommunityRoleStat = {
  role: string
  count: number
  percent: number
}

const props = defineProps<{
  roleStats: CommunityRoleStat[]
}>()

const totalMembers = computed(() =>
  props.roleStats.reduce((sum, item) => sum + (Number(item.count) || 0), 0)
)

function roleBarColor (index: number): string {
  const palette = ['bg-accent-purple', 'bg-secondary', 'bg-blue-400', 'bg-green-400', 'bg-pink-400']
  return palette[index % palette.length] || 'bg-accent-purple'
}
</script>
