<script setup>
const graphixMind = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/graphixMind.jpg",
);
const iLuvTV = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/iLuvTV.jpg",
);
const lunatronix = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/lunatronix.png",
);
</script>

<template>
        <div>
              <div
        class="lg:flex items-center bg-gradient-to-bl from-[#12051b] via-[#0c0610] to-[#12051b] w-full bg-cover bg-center bg-no-repeat lg:py-20 cursor-default"
      >
        <div
          class="text-center lg:text-left lg:mx-20 mx-10 text-[#E0DDFF] font-black lg:text-6xl text-3xl lg:py-0 py-10"
        >
          SPONSORS
        </div>
        <div>
          <div
            class="lg:w-10/12 justify-center mx-auto items-center z-50 relative"
          >
            <ul class="lg:flex gap-10 px-10 lg:pb-0 pb-10 mx-auto lg:w-fit">
              <li class="lg:mb-0 mb-10 lg:mx-0 mx-auto w-fit">
                <a href="https://www.facebook.com/ron.dadula" target="_blank">
                  <img
                    :src="graphixMind"
                    class="lg:w-[120px] w-[120px] rounded-full border-4 border-[#E0DDFF] drop-shadow-lg hover:border-8 hover:drop-shadow-[2px_5px_5px_rgba(0,0,0,0.65)]"
                  />
                </a>
              </li>
              <li class="lg:mb-0 mb-10 lg:mx-0 mx-auto w-fit">
                <a
                  href="https://www.facebook.com/iluvtviloveit"
                  target="_blank"
                >
                  <img
                    :src="iLuvTV"
                    class="lg:w-[120px] w-[120px] rounded-full border-4 border-[#E0DDFF] drop-shadow-lg hover:border-8 hover:drop-shadow-[2px_5px_5px_rgba(0,0,0,0.65)]"
                  />
                </a>
              </li>
              <li class="lg:mb-0 mb-10 lg:mx-0 mx-auto w-fit">
                <a href="https://www.facebook.com/LunatronixTS" target="_blank">
                  <img
                    :src="lunatronix"
                    class="lg:w-[120px] w-[120px] rounded-full border-4 border-[#E0DDFF] drop-shadow-lg hover:border-8 hover:drop-shadow-[2px_5px_5px_rgba(0,0,0,0.65)]"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> 
        </div>
</template>