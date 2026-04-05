<script setup>
const glossy = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png"
);
const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png"
);
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png"
);
const codeCampBanner2024 = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo1W.png"
);
</script>

<template>
  <div
    class="h-screen relative mt-0 bg-gradient-to-bl from-[#14082e] via-[#14082e] lg:to-[#14082e] to-[#14082e] lg:pb-[50px] z-20 cursor-default"
  >
    <div class="absolute mt-0 mr-0 w-full z-10 flex">
      <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
    </div>
    <div class="relative z-50">
      <div id="lights"></div>
      <div class="w-full">
        <img
          src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/season3.jpg"
          class="opacity-[0.05] absolute -z-10 w-full lg:-mt-[300px] lg:block hidden transform scale-x-[-1]"
        />
        <div class="flex items-center w-full lg:h-screen">
          <div class="w-full">
            <div class="md:w-fit w-10/12 mx-auto h-full">
              <div class="lg:mb-0 mb-10">
                <div
                  class="flex items-center w-fit mx-auto gap-5 lg:pt-[6%] pt-[40px] lg:pb-1 pb-[20px]"
                >
                  <div class="">
                    <img
                      :src="techSavvyLogo"
                      class="lg:w-[120px] w-[70px] mx-auto"
                    />
                  </div>
                  <div class="">
                    <img
                      :src="workflowLogo"
                      class="lg:w-[85px] w-[50px] mx-auto"
                    />
                  </div>
                </div>
                <div class="text-[#EEEAFF] text-center font-bold mt-[1%]">
                  <div
                    class="uppercase text-5xl lg:tracking-[37px] tracking-[6px] lg:text-[40px] text-center text-[30px] lg:pl-9 lg:whitespace-nowrap mx-auto lg:font-black hover:from-[#d4a9ff] hover:to-[#E0DDFF] hover:text-transparent hover:bg-clip-text text-[#FEFFFC] hover:bg-gradient-to-b"
                  >
                    Tech Savvy
                  </div>
                  <div
                    class="uppercase tracking-normal w-fit mx-auto text-[#FEFFFC] lg:text-[100px] text-[41px] font-black hover:bg-gradient-to-b hover:from-[#3C14AC] hover:to-[#E0DDFF] lg:inline-block hover:text-transparent hover:bg-clip-text leading-tight"
                  >
                    Code Camp
                  </div>
                  <p
                    class="lg:text-2xl text-base hover:animate-pulse lg:mt-0 mt-2"
                  >
                    Code . Create . Connect
                  </p>

                  <div class="lg:mt-20 my-16">
                    <a
                      href="https://forms.gle/X8i8fbTL382wym52A"
                      class="lg:flex items-center w-11/12 mx-auto justify-center text-center lg:w-7/12 lg:text-2xl text-xl uppercase shadow-2xl lg:text-[#ffffff] text-[#1d0922] bg-gradient-to-l from-[#ffeba05f] lg:hover:via-[#FFD74A] to-[#FFD74A] font-bold lg:px-10 lg:py-3 py-2 lg:mt-10 rounded-full lg:border-4 lg:border-[#FFD74A] border-4 border-[#fff8a8] lg:bg-transparent bg-[#FFEA00] px-3 hover:text-[#1B1137] lg:animate-bounce block leading-tighter tracking-tighter whitespace-nowrap"
                    >
                      CALL FOR SPONSORS
                    </a>
                  </div>
                  <div>
                    <p class="uppercase mt-10 lg:text-3xl text-xl">season 4</p>
                  </div>

                  <img :src="codeCampBanner2024" class="w-[80px] mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#0b021a] h-36 flex items-center justify-center">
      <p class="text-center font-bold justify-center text-white">
        TECHSAVVY © 2026
      </p>
    </div>
  </div>
</template>
