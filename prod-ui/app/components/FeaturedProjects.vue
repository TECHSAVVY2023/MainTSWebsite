<script setup>
const projects = ref([
  {
    name: "Fabrics Plus Curtains",
    website: "www.fabricspluscurtains.com",
    website_link: "https://www.fabricspluscurtains.com",
    img: "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/HDLogoFabricsPlusV2.png",
    founded: "",
  },
  {
    name: "Delgar Frozen Products",
    website: "www.delgar.store",
    website_link: "https://www.delgar.store",
    img: "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/delgar-logo.png",
    founded: "October 8, 2024",
  },
  {
    name: "Kathie's Kitchen",
    website: "www.kathieskitchen.com",
    website_link: "https://www.kathieskitchen.com",
    img: "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/kathies-logo.png",
    founded: "",
    slogan: "Filipino Sari-Sari Store in South Africa",
  },
]);
</script>

<template>
    <div>
              <div
        class="py-20 bg-white"
        id="projects"
      >
        <div class="w-11/12 mx-auto max-w-6xl">
          <!-- Section Title -->
          <h2
            class="text-center font-bold uppercase text-3xl sm:text-4xl mb-4 tracking-wide text-gray-800"
          >
            Featured Projects
          </h2>

          <div class="text-center mb-12">
            <p class="text-gray-600 text-lg font-medium">Ecommerce Websites</p>
            <div
              class="mx-auto mt-3 w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full"
            ></div>
          </div>

          <!-- Projects Grid -->
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <li
              v-for="(project, index) in projects"
              :key="index"
              class="group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <a
                :href="project.website_link"
                target="_blank"
                class="h-full flex flex-col"
              >
                <!-- Logo wrapper -->
                <div
                  class="flex items-center justify-center h-56 bg-white overflow-hidden p-6 border-b border-gray-100"
                >
                  <div class="w-full h-full flex items-center justify-center">
                    <img
                      :src="project.img"
                      :alt="project.name"
                      class="object-contain w-full h-full max-h-44 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                <!-- Project details -->
                <div
                  class="flex-1 p-6 flex flex-col justify-center text-center"
                >
                  <h3
                    class="font-semibold text-xl uppercase text-gray-800 group-hover:text-green-700 transition-colors duration-300"
                  >
                    {{ project.name }}
                  </h3>
                  <p class="text-gray-500 mt-2 text-sm truncate">
                    {{ project.website }}
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
</template>
