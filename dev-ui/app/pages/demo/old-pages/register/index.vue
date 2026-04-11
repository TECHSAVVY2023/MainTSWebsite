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
const codeCampBanner2024C = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3W.png"
);
const jorenleeLuna = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/jorenleeluna/profile.jpg"
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
const dotsBlack = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots1.png"
);
const lines = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Group8.png"
);
const bgPattern = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Group7.png"
);
const sponsorBG = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/SponsorBG.png"
);

import { VueDatePicker } from "@vuepic/vue-datepicker";
import "./css/main.css";

const info = ref({
  teamMemberId: "",
  fullName: "",
  birthDate: "",
  contactEmail: "",
  contactNumber: "",
  category: "",
  techLevel: "",
  schoolNameOrCompany: "",
  dataPrivacyConsent: "",
});

const dataPrivacy = ref(false);
</script>

<template>
  <div>
    <a
      href="/"
      class="fixed z-[100] lg:top-10 bottom-5 h-fit lg:left-8 left-3 bg-violet-400 text-white hover:text-black font-bold px-3 py-2 rounded-xl border-4 border-white hover:animate-bounce hover:cursor-pointer shadow-2xl text-xs"
    >
      <i class="fa fa-home mr-5"></i> Back to Home
    </a>
    <div class="bg-[#17132B]">
      <div
        class="relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 z-20 cursor-default"
      >
        <div class="absolute mt-0 mr-0 w-full z-10 flex">
          <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
        </div>
      </div>
      <div class="flex items-center w-fit mx-auto gap-5 lg:pt-0 pt-5">
        <div class="">
          <img :src="techSavvyLogo" class="lg:w-[100px] w-[70px] mx-auto" />
        </div>
        <div class="">
          <img :src="workflowLogo" class="lg:w-[65px] w-[50px] mx-auto" />
        </div>
      </div>

     <div class="lg:block hidden"> 
      <div
            class="absolute mt-10 mr-0 w-full h-full z-10 flex overflow-hidden"
          >
            <img
              :src="dotsWhite"
              class="w-auto h-1/6 mx-auto -mr-14 my-10 opacity-20 lg:hidden"
            />
          </div>
          <div
            class="absolute lg:mt-0 mt-40 mr-0 w-full h-full z-10 flex overflow-hidden"
          >
            <img
              :src="dotsWhite"
              class="lg:h-fit w-auto h-1/3 mx-auto lg:-ml-96 -ml-24 lg:my-0 my-36 opacity-20"
            />
          </div>
          <div
            class="absolute lg:mt-0 mt-44 mr-0 w-full h-full z-10 flex overflow-hidden"
          >
            <img
              :src="dotsWhite"
              class="lg:h-2/6 w-auto h-2/6 mx-auto lg:-mr-16 -mr-44 lg:my-0 my-96 opacity-20"
            />
          </div>

     </div>

      <div class="w-full flex cursor-default z-10 lg:-mt-5">
        <div class="w-full mx-auto overflow-hidden">
          
          <div class="relative z-50">
            <div
              class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3"
            >
              <!-- <span class="lg:text-4xl text-3xl uppercase font-black"> Register T </span> -->
            </div>
            <div
              class="text-white font-semibold mb-3 w-11/12 text-center mx-auto"
            >
              <span class="text-xl block mb-2">
                Be Part of Our Growing Team!
              </span>
              <sup class=" lg:text-2xl text-base capitalize font-bold">
                Tech Savvy Code Camp : Season 3
              </sup>
            </div>
            <div
              class="lg:w-5/12 w-11/12 mx-auto py-5 mb-5 shadow-2xl lg:bg-[#8f62ff08] bg-[#00000036] lg:px-7 px-3 pt-5 rounded-xl"
            >
              <form>
                <div class="">
                  <div class="flex gap-x-3 w-full">
                    <div class="w-full lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1"
                        >Full Name<span class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-1 lg:text-sm text-xs"
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                    

                    <div class="lg:w-6/12 w-9/12 lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1 whitespace-nowrap"
                        >Date of Birth<span class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        type="date"
                        min="1970-01-01"
                        max="2015-12-31"
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] lg:py-0.5 pt-[3px] pb-0.5 px-1 lg:text-sm text-xs"
                      />
                    </div>
                  </div>

                  <div class="flex gap-x-3 w-full">
                    <div class="w-full lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1"
                        >Contact Email<span class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-1 lg:text-sm text-xs"
                        type="email"
                        placeholder="Contact Email"
                      />
                    </div>

                    <div class="lg:w-6/12 w-9/12 lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1 whitespace-nowrap"
                        >Contact Number<span class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-1 lg:text-sm text-xs"
                        type="tel"
                        placeholder="Contact Number"
                      />
                    </div>
                  </div>

                  <div class="lg:flex gap-x-3 w-full mb-5">
                    <div class="w-full lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1"
                        >School Name or Company<span
                          class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-1 lg:text-sm text-xs"
                        type="text"
                        placeholder="School Name of Company"
                      />
                    </div>
                    <div class="lg:w-6/12 lg:border-b-[2px] border-b shadow-lg border-[#fff] mb-3">
                      <label class="text-white text-xs block lg:font-bold lg:mb-1"
                        >Social Media (url)<span
                          class="text-md text-red-700 ml-1"
                          >*</span
                        ></label
                      >
                      <input
                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1.5 px-1 text-xs"
                        type="url"
                        placeholder="e.g fb.com/TechSavvyCodeCamp"
                      />
                    </div>
                  </div>

                  <div class="lg:flex gap-x-3 w-full shadow border-[#fff]">
                    <div class="w-full">
                      <div>
                        <label class="text-white text-xs block lg:font-bold lg:mb-1"
                          >Experience Level in Tech Development<span
                            class="text-md text-red-700 ml-1"
                            >*</span
                          ></label
                        >
                      </div>
                      <div class=" lg:bg-[#8f62ff08] bg-[#8f62ff08] px-2 py-2">
                        <div class="gap-3 w-full">
                          <div
                            class="w-full flex items-center gap-3 cursor-pointer hover:font-bold"
                          >
                           <div class="flex items-center"> 
                            <input
                              id="Beginner"
                              class="border-b-[3px] shadow-lg  border-violet-800 bg-[#ffffff] py-1 px-2 text-sm cursor-pointer"
                              type="radio"
                            />

                          </div>


                            <label
                              for="Beginner"
                              class="flex items-center"
                              >
                          
                          
                          <div class=" text-white text-xs font-bold w-fit mr-7 whitespace-nowrap cursor-pointer"> 
                            Beginner
                          </div>
                            <div class="text-white text-xs w-full lg:ml-0 ml-1">
                              [ New to the community, with no experience, and eager to learn ]</div
                            >

                          </label>
                          </div>


                          <div
                            class="w-full flex items-center gap-3 cursor-pointer hover:font-bold"
                          >
                           <div class="flex items-center"> 
                            <input
                              id="Mid Level"
                              class="border-b-[3px] shadow-lg  border-violet-800 bg-[#ffffff] py-1 px-2 text-sm cursor-pointer"
                              type="radio"
                            />

                          </div>


                            <label
                              for="Mid Level"
                              class="flex items-center"
                              >
                          
                          
                          <div class=" text-white text-xs font-bold w-fit mr-7 whitespace-nowrap cursor-pointer"> 
                            Mid Level
                          </div>
                            <div class="text-white text-xs w-full lg:ml-0 ml-1">
                              [ Some experience, needs exploration of new IT tools. ]</div
                            >

                          </label>
                          </div>


                          <div
                            class="w-full flex items-center gap-3 cursor-pointer hover:font-bold"
                          >
                           <div class="flex items-center"> 
                            <input
                              id="Advanced"
                              class="border-b-[3px] shadow-lg  border-violet-800 bg-[#ffffff] py-1 px-2 text-sm cursor-pointer"
                              type="radio"
                            />

                          </div>


                            <label
                              for="Advanced"
                              class="flex items-center"
                              >
                          
                          
                          <div class=" text-white text-xs font-bold w-fit mr-7 whitespace-nowrap cursor-pointer"> 
                            Advanced
                          </div>
                            <div class="text-white text-xs w-full lg:ml-0 ml-1">
                              [ Extensive experience, seeking to expand skills and portfolio ]</div
                            >

                          </label>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 mb-10 w-full">
                    <p class="font-bold text-white text-sm mb-2">
                      Data Privacy Policy
                    </p>
                    <div id="privacyParagraph">
                      <div
                        class="flex w-fit whitespace-nowrap text-white mb-3 text-sm"
                      >
                        <input
                          id="privacyCheckbox"
                          class="border-b-[4px] mr-2 shadow-lg border-violet-800 w-full bg-[#ffffffdf] py-1 px-2"
                          type="checkbox"
                          @change="dataPrivacy = !dataPrivacy"
                        />

                          <label for="privacyCheckbox" class="hover:font-bold">
                            Yes, I consent.
                          </label>
                   
                      </div>
                      <div
                        v-if="dataPrivacy"
                        class="text-white text-xs text-left mb-5 px-5"
                      >
                        <p class="mb-3">
                          REPUBLIC ACT NO. 10173 also known as the "Data Privacy
                          Act of 2012," is a Philippine law that aims to protect
                          the fundamental human right to privacy and ensure the
                          security of personal data in the Philippines. It
                          provides guidelines and standards for the collection,
                          processing, and storage of personal data by both
                          government and private sectors, as well as the rights
                          and responsibilities of data subjects and data
                          controllers. The law sets forth the principles of
                          transparency, legitimate purpose, and proportionality
                          in data processing, and establishes the National
                          Privacy Commission (NPC) as the primary regulatory
                          authority tasked with enforcing the provisions of the
                          Act. The Data Privacy Act of 2012 is designed to
                          foster a culture of privacy and data protection in the
                          Philippines and promote trust in the use of personal
                          information in various sectors such as business,
                          government, and other organizations.
                        </p>

                        <p class="mb-3">
                          Tech Savvy Code Camp is committed to protecting your
                          personal information and respecting your privacy
                          rights. By filling out and submitting this form, you
                          are providing your explicit consent for the
                          collection, use, and processing of your personal data
                          for the purpose of contacting and documenting:
                        </p>

                        <ul class="mb-3 list-disc ml-10">
                          <li>Basic Contact Informations</li>
                          <li>FB or LinkedIn</li>
                          <li>School Name (for students)</li>
                          <li>Pictures or Videos during Events</li>
                        </ul>

                        <p class="mb-3">
                          I, hereby confirm that I have read and understood the
                          above information, and I voluntarily consent to the
                          collection, use, and processing of my personal data. I
                          understand that I have the right to withdraw my
                          consent at any time.
                        </p>
                      </div>

                      <!-- <div class="flex w-fit whitespace-nowrap  text-white mb-3 text-sm"> 
  

                          <input id="privacyCheckbox" class="border-b-[4px] mr-2 shadow-lg  border-violet-800 w-full bg-[#ffffffdf] py-1 px-2" type="radio" /> 
                          
                          
                          No

                          
                        
                        </div> -->
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="font-bold lg:py-1.5 py-1 px-10 rounded-lg mx-auto block w-fit shadow-2xl border-2 border-[#562482] uppercase bg-[#562482] text-white my-3 hover:bg-white hover:text-[#562482]"
                >
                  <i class="fa fa-paper-plane mr-2"></i> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>
