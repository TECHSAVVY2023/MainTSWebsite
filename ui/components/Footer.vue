<script setup>
  import moment from 'moment';
  const techSavvyLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png")
  const workflowLogo = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png")
  const codeCampBanner2024B = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png")
  const dotsWhite = ref("https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png")


  const currentYear = moment().year();
</script>


<template>
      <div class="bg-black cursor-default overflow-hidden relative">
        <div
          class="absolute lg:mt-0 mt-14 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/6 lg:h-2/6 w-5/6 h-auto mx-auto lg:-mr-16 -mr-24 lg:my-10 my-0 opacity-5"
          />
        </div>
        <div
          class="absolute lg:mt-0 mt-80 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/5 lg:h-auto w-1/2 h-auto mx-auto lg:-ml-16 -ml-14 lg:my-20 my-0 opacity-[.07]"
          />
        </div>
        <div
          class="absolute lg:mt-0 mt-44 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/5 lg:h-auto w-full h-3/6 mx-auto lg:mr-80 mr-0 lg:my-40 opacity-10"
          />
        </div>
        <div class="relative z-50 w-11/12 mx-auto lg:flex lg:pt-7 pt-16">
          <div class="lg:w-full w-10/12 mx-auto lg:flex items-center">
            <div class="lg:mr-32 md:mb-10 mb-20 lg:ml-auto">
              <div class="text-[#EEEAFF] text-sm text-center">
                <img
                  :src="codeCampBanner2024B"
                  class="lg:w-[300px] w-[240px] lg:mt-7 -mb-20 -mt-10 font-bold rounded-md lg:mx-0 mx-auto"
                />
                <span class="block">
                  For more inquiries email us at
                  <span class="block font-bold text-[#B5A3FF] hover:text-white">
                    info@techsavvies.space
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div
            class="w-full justify-center flex items-center lg:mr-32 lg:pb-1 pb-10"
          >
            <div class="">
              <div class="lg:mb-10 mb-7">
                <div
                  class="text-[#EEEAFF] font-bold lg:text-4xl text-2xl lg:text-left text-center"
                >
                  Contact Us
                </div>
                <div class="text-[#EEEAFF]">
                  <span
                    class="block lg:text-sm text-xs lg:text-left text-center"
                  >
                  </span>
                </div>
                <div
                  class="text-[#EEEAFF] lg:text-sm text-xs lg:text-left text-center lg:w-full w-7/12 lg:mx-0 mx-auto"
                >
                  <span>Through Social Media Page </span>
                  <a
                    href="https://www.facebook.com/TechSavvyCodeCamp"
                    target="_blank"
                    class="font-bold mr-1 hover:cursor-pointer text-[#B5A3FF] hover:text-white whitespace-nowrap"
                    >fb.com/TechSavvyCodeCamp</a
                  >
                </div>
              </div>
              <div class="lg:pt-0 pt-10">
                <div
                  class="text-[#fff] font-semibold tracking-tighter lg:text-2xl text-lg lg:text-left text-center"
                >
                  Join the<span
                    class="font-bold lg:text-4xl text-xl text-[#B5A3FF]"
                  >
                    Code Camp 2026
                  </span>
                </div>
                <div class="text-[#fff] lg:text-sm text-xs lg:flex">
                  <div
                    class="lg:inline-block block lg:text-left text-center lg:w-full w-10/12 mx-auto"
                  >
                    Join the Community and Connect with other Aspiring IT
                    Developers <span class="block">in Misamis Occidental</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black w-full pt-14 cursor-default">
          <div class="lg:flex lg:w-9/12 mx-auto">
            <div
              class="text-[#fff] font-semibold text-sm text-center mx-auto pt-10 lg:pb-10 pb-4 block"
            >
              TECH SAVVY © 2026
            </div>
            <div
              class="flex w-fit lg:gap-5 gap-2 mx-auto lg:pt-5 md:pt-6 pb-10"
            >
              <div
                class="bg-black w-[58px] h-[58px] rounded-full mx-auto lg:border-none border-2 border-white"
              >
                <img
                  :src="techSavvyLogo"
                  class="w-[58px] mx-auto bg-[#320d39] rounded-full px-1.5"
                />
              </div>
              <div
                class="bg-[#084725] w-[55px] h-[55px] rounded-full mx-auto lg:border-none border-2 border-white"
              >
                <img :src="workflowLogo" class="w-[33px] mt-3 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>