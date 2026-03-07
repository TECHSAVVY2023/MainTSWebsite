<script setup>
import { onMounted, ref } from 'vue'

// Static list of top participants
const topParticipants = ref([
  { name: "Keith" },
  { name: "Dan" },
  { name: "Renz" },
  { name: "Joshua" },
])

// Fetched posts from API
const posts = ref([])

onMounted(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos')
    const json = await res.json()
    posts.value = json
    console.log("Fetched Posts:", json)
  } catch (err) {
    console.error("Error fetching posts", err)
  }
})
</script>

<template>
  <div>
    <!-- Top Participants Section -->
    <h1 class="text-3xl font-bold bg-black text-white px-10 text-center py-10">
      Top 10 Participants
    </h1>
    <ul class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 px-4 mt-4">
      <li
        v-for="(j, index) in topParticipants"
        :key="index"
        class="w-full bg-green-900 py-10 text-white text-center rounded shadow"
      >
        <img
          src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
          class="rounded-full w-[200px] h-[200px] mx-auto border-4 border-white hover:opacity-50"
        />
        <p class="mt-4 text-lg font-semibold">{{ j.name }}</p>
      </li>
    </ul>

    <!-- Posts Fetched from JSONPlaceholder -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-center mb-4">Sample Fetched Posts</h2>
      <div class="space-y-4 px-4">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white shadow p-4 rounded border border-gray-200"
        >
          <h3 class="font-semibold text-lg text-gray-800">
            #{{ post.id }} - {{ post.title }}
          </h3>
          <img :src="post.thumbnailUrl" />
          <p class="text-gray-600 text-sm mt-2">{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
