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
const codeCampBanner2024B = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png"
);

const workflowHighlight = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/WorkflowHighlight-1.jpg"
);
const googleZamPenMorning = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleZamPenMorning.jpg"
);
const googleCDO = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleCDO.jpg"
);
const techSavvyPioneers = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/TechSavvyPioneers.jpg"
);
const gDGCebu = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebu.jpg"
);
const gDGCebuMerch = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebuMerch.jpg"
);
const graphixMind = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/graphixMind.jpg"
);
const iLuvTV = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/iLuvTV.jpg"
);
const lunatronix = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/lunatronix.png"
);
const dotsWhite = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png"
);


</script>

<template>
  <div class="">
    <div class="">
      <div
        class="relative mt-0 bg-gradient-to-bl from-[#14082e] via-[#14082e] lg:to-[#14082e] to-[#14082e] lg:pb-[50px] z-20 cursor-default"
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
                    <div> 
                        <p
                        class="lg:text-2xl text-lg hover:animate-pulse lg:mt-0 mt-2 uppercase"
                      >
                        Code Camp and Webinar Series
                      </p>

                       <p
                        class="lg:text-2xl text-lg hover:animate-pulse"
                      >
                        For Students
                      </p>

                    </div>
                      <div class="lg:mt-20 my-16">
                        <a
                          href="http://meet.google.com/qfb-unuy-wwv"
                          class="gap-x-5 flex items-center w-11/12 mx-auto justify-center text-center lg:w-7/12 lg:text-2xl text-xl uppercase shadow-2xl  bg-[#FFEA00] font-bold lg:px-10 lg:py-3 py-2 lg:mt-10 rounded-full lg:border-4 lg:border-[#FFD74A] border-4 border-[#fff8a8]  px-3 text-[#1B1137] lg:animate-bounce  leading-tighter tracking-tighter whitespace-nowrap"
                        >
                         <i class="fa fa-video-camera" aria-hidden="true"></i> Google Meet Link
                        </a>
                      </div>

                       <div> 
                          <p
                        class="text-xs hover:animate-pulse font-light uppercase"
                      >
                        Sponsored By : Season 3 CORE TEAM  Members
                      </p>

                         <p
                        class="text-xs hover:animate-pulse font-light uppercase"
                      >
                         Use School Email in Joining
                      </p>

                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




  
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
                    Code Camp 2025
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
              TECH SAVVY © 2025
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
    </div>
  </div>
</template>
