<template>
  <section class="min-h-screen bg-gradient-to-br from-violet-100 via-white to-purple-100 py-20 px-6">
    
    <!-- Title -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-violet-700">
        Code Camp Seasons
      </h1>
      <p class="text-gray-600 mt-2">
        Explore the Tech Savvies Journey
      </p>
    </div>

    <!-- Grid -->
    <div class="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

      <div
        v-for="season in seasons"
        :key="season"
        class="group [perspective:1000px] cursor-pointer"
      >
        <!-- Card -->
        <div
          class="relative h-52 w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
        >

          <!-- Front -->
          <div
            class="absolute inset-0 flex items-center justify-center rounded-xl border border-violet-200 bg-white shadow-md [backface-visibility:hidden]"
          >
            <h2 class="text-xl font-semibold text-violet-700">
              {{ season }}
            </h2>
          </div>

          <!-- Back -->
          <div
            class="absolute inset-0 flex items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]"
          >
            <p class="text-lg font-medium">
              View {{ season }}
            </p>
          </div>

        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
const seasons = [
  "Season 1",
  "Season 2",
  "Season 3",
  "Season 4"
]
</script>