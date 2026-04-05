<script setup>
import moment from "moment";

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png",
);

const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png",
);

const codeCampBanner = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png",
);

const currentYear = moment().year();
</script>

<template>
  <footer
    class="lg:bg-linear-to-r bg-linear-to-br lg:pt-0 pt-10  lg:from-purple-950 lg:via-purple-300 to-red-100 text-indigo-900 hover:text-purple-900"
  >
    <!-- Bottom -->
    <div class="w-full lg:px-10 px-3 lg:flex lg:justify-between justify-center">
      <div class="lg:flex items-center lg:text-white">
        <div>
          <img :src="codeCampBanner" class="lg:h-32 lg:flex hidden" />
        </div>
        <div class="lg:w-auto w-fit mx-auto lg:mb-0 mb-3">
          <span class="lg:block -mt-3 flex justify-center"> info@techsavvies.space </span>
          <span class="text-sm font-bold flex">
            ALRIGHT RESERVED © {{ currentYear }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4 lg:justify-end justify-center lg:pb-0 pb-5">
        <!-- Facebook -->
        <a
          href="https://www.facebook.com/TechSavvyCodeCamp"
          target="_blank"
          class="flex items-center justify-center rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            class="w-14 h-14"
          >
            <path
              d="M22 12a10 10 0 1 0-11.56 9.87v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0 0 22 12z"
            />
          </svg>
        </a>
        <a
          href="https://www.techsavvies.space"
          target="_blank"
          class="w-12 h-12 rounded-full shadow flex items-center justify-center bg-indigo-900"
        >
          <img :src="techSavvyLogo" class="w-10" />
        </a>

        <a
          href="https://www.facebook.com/workflowcoworkingspace"
          target="_blank"
          class="w-12 h-12 rounded-full bg-[#084725] flex items-center justify-center"
        >
          <img :src="workflowLogo" class="w-6" />
        </a>
      </div>
    </div>
  </footer>
</template>
