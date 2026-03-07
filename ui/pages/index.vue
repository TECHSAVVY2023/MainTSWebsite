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

const glossy = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png",
);
const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png",
);
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png",
);
const codeCampBanner2024 = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo1W.png",
);
const codeCampBanner2024B = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png",
);
const workflowHighlight = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/WorkflowHighlight-1.jpg",
);
const googleZamPenMorning = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleZamPenMorning.jpg",
);
const googleCDO = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/googleCDO.jpg",
);
const techSavvyPioneers = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/TechSavvyPioneers.jpg",
);
const gDGCebu = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebu.jpg",
);
const gDGCebuMerch = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/group-pic/GDGCebuMerch.jpg",
);
const graphixMind = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/graphixMind.jpg",
);
const iLuvTV = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/iLuvTV.jpg",
);
const lunatronix = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/sponsors/lunatronix.png",
);
const dotsWhite = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png",
);

let teamMembers = ref([
  {
    firstname: "Jo Renlee",
    lastname: "Luna",
    designation: "Community Tech Lead | Founder",
    career: "Full Stack Developer",
    batch_id: "CTM2020",
    category: "Core Lead and Sponsors",
  },
  {
    firstname: "John Henry",
    lastname: "Joromat",
    designation: "IT Specialists | Co-Founder",
    career: "Service Desk Engineer Level 1",
    batch_id: "CTM2020",
    category: "Core Lead and Sponsors",
  },
  {
    firstname: "Joshua",
    lastname: "Vicente",
    designation: "UI/UX Designer",
    career: "Web Developer",
    batch_id: "CTM2023",
    category: "Core Lead and Sponsors",
  },
  {
    firstname: "Kaita",
    lastname: "Ostia",
    designation: "Unit Team Manager",
    career: "Front End Developer",
    batch_id: "CTM2023",
    category: "Core Lead and Sponsors",
  },
  {
    firstname: "Michael Earvin",
    lastname: "Tia",
    designation: "Web Developer",
    career: "IT Specialists",
    batch_id: "CTM2023",
    category: "Core Lead and Sponsors",
  },
  {
    firstname: "Princess",
    lastname: "Empleo",
    designation: "Project Manager | Co-Founder",
    career: "IT Consultant",
    batch_id: "CTM2020",
    category: "Core Members",
  },
  {
    firstname: "Keith",
    lastname: "Ostia",
    designation: "Community Prime Mover",
    career: "Web Developer / UI/UX Designer",
    batch_id: "CTM2022",
    category: "Core Members",
  },
  {
    firstname: "Kharen",
    lastname: "Villalva",
    designation: "Web Designer / Developer",
    career: "IT Intern 2024",
    batch_id: "CTM2023",
    category: "Core Members",
  },
  {
    firstname: "Jomari Carl",
    lastname: "Naguit",
    designation: "MIT BSCS Student ",
    career: "Junior Web & UI/UX Developer",
    batch_id: "CTM2023",
    category: "Core Members",
  },
  {
    firstname: "Kylah",
    lastname: "Ostia",
    designation: "Web Developer / UI/UX Designer",
    career: "IT Intern 2025",
    batch_id: "CTM2024",
    category: "Core Members",
  },
  {
    firstname: "Reynaldo",
    lastname: "Aquit",
    designation: "PHP Web Developer",
    career: "Lead Coordinator",
    batch_id: "CTM2024",
    category: "Core Members",
  },
  {
    firstname: "Jefferson",
    lastname: "Cañamo",
    designation: "Web Developer / Multimedia",
    career: "IT Intern 2025",
    batch_id: "CTM2025",
    category: "Core Members",
  },
  {
    firstname: "Robert Evans",
    lastname: "Cuering",
    designation: "Web & Mobile Developer",
    career: "IT Intern 2025",
    batch_id: "CTM2025",
    category: "Core Members",
  },
  {
    firstname: "Kenneth",
    lastname: "Alvarado",
    designation: "Fullstack Web Developer",
    career: "IT Intern 2025",
    batch_id: "CTM2025",
    category: "Core Members",
  },
  {
    firstname: "Diomari Jose",
    lastname: "Vale",
    designation: "Fullstack Web Developer",
    career: "IT Intern 2025",
    batch_id: "CTM2025",
    category: "Core Members",
  },
]);
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
                      <p
                        class="lg:text-2xl text-base hover:animate-pulse lg:mt-0 mt-2"
                      >
                        Code . Create . Connect
                      </p>

                      <div class="lg:mt-20 my-16">
                        <a
                          href="/#"
                          class="lg:flex items-center w-11/12 mx-auto justify-center text-center lg:w-7/12 lg:text-2xl text-xl uppercase shadow-2xl lg:text-[#ffffff] text-[#1d0922] bg-gradient-to-l from-[#ffeba05f] lg:hover:via-[#FFD74A] to-[#FFD74A] font-bold lg:px-10 lg:py-3 py-2 lg:mt-10 rounded-full lg:border-4 lg:border-[#FFD74A] border-4 border-[#fff8a8] lg:bg-transparent bg-[#FFEA00] px-3 hover:text-[#1B1137] lg:animate-bounce block leading-tighter tracking-tighter whitespace-nowrap"
                        >
                          Coming Soon!
                        </a>
                      </div>
                      <div>
                        <p class="uppercase mt-10 lg:text-3xl text-xl">
                          season 4
                        </p>
                      </div>

                      <img :src="codeCampBanner2024" class="w-[80px] mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative z-50 w-full lg:flex bg-gradient-to-bl from-[#14082e] via-[#14082e] lg:to-[#14082e] to-[#14082e] text-[#ffffff] py-10"
        id="whatis"
      >
        <div
          class="lg:w-7/12 w-11/12 lg:mx-0 mx-auto lg:py-[10px] flex items-center"
        >
          <div class="lg:w-8/12 lg:mr-20 lg:ml-auto mx-auto">
            <h2 class="font-bold lg:text-5xl text-xl lg:mb-10 mb-3">
              What is TECH SAVVY?
            </h2>
            <p
              class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
            >
              A start-up growing IT community in Misamis Occidental started on
              April 30, 2023 at
              <span class="font-bold"> Workflow Co-Working Space Ozamiz </span>
              , conducting code camp activities focusing on full-stack web
              development.
            </p>
            <p
              class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
            >
              Tech Savvy guides aspiring web developers by teaching techniques
              in full-stack web development and encourages individuals or
              professionals by mentoring them with the right techniques that
              help them upskill their knowledge through their journey or during
              the roadmap code camp sessions up to pursuing roles in the IT
              industry.
            </p>
            <p
              class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
            >
              The <span class="font-bold">vision</span> is to empower and
              support developers in their career growth, foster a vibrant and
              collaborative community, and connect talented individuals with
              rewarding opportunities in the IT industry.
            </p>
            <p
              class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
            >
              The <span class="font-bold">mission</span> is to enhance the
              skills and knowledge of developers, facilitate networking and
              knowledge-sharing among community members, and assist job seekers
              in finding fulfilling roles in the IT industry.
            </p>
          </div>
        </div>
        <div class="lg:w-5/12 flex lg:ml-10 mx-auto px-4 w-fit">
          <ul class="lg:mr-5 mr-2 lg:mt-10">
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="googleZamPenMorning" class="w-[300px]" />
            </li>
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="workflowHighlight" class="w-[300px]" />
            </li>
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="googleCDO" class="w-[300px]" />
            </li>
          </ul>
          <ul class="lg:mt-20 mt-10">
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="gDGCebu" class="w-[300px]" />
            </li>
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="techSavvyPioneers" class="w-[300px]" />
            </li>
            <li class="mb-2 shadow-2xl border-4 border-[#231559]">
              <img :src="gDGCebuMerch" class="w-[300px]" />
            </li>
          </ul>
        </div>
      </div>

      <!-- <div class="w-full flex cursor-default z-10">
        <div class="w-full mx-auto overflow-hidden bg-[#12051b]">
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
          <div class="relative z-50 pt-14 pb-20">
            <div
              class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3 mt-3"
            >
              <span class="lg:text-2xl">Meet the </span>
              <span class="lg:text-6xl text-3xl uppercase font-black">
                Core Team
              </span>
            </div>
            <div
              class="text-white font-semibold uppercase mb-10 w-11/12 text-center mx-auto"
            >
              <sup class="font-light lg:text-base text-[10px] ml-3">
                SEASON 3 | 2025 Members
              </sup>
            </div>
            <div class="w-11/12 mx-auto mb-10">
              <h1 class="text-white text-sm text-center uppercase mb-5">
                {{ teamMembers[0].category }}
              </h1>
              <ul class="flex flex-wrap lg:gap-10 gap-5 w-full justify-center">
                <li
                  class="lg:w-[230px] w-[300px]"
                  v-for="(j, i) in teamMembers.slice(0, 5)"
                  :key="i"
                >
                  <div
                    class="pt-6 pb-3 px-4 rounded-3xl border-4 bg-[#17132B]/60"
                  >
                    <p class="font-bold uppercase text-white text-center">
                      {{ j.firstname }}
                      <span class="text-[#18FF82]"> {{ j.lastname }}</span>
                    </p>
                    <p class="text-green-100 text-center text-xs">
                      {{ j.designation }}
                    </p>
                    <p class="text-green-50 text-center text-xs">
                      {{ j.career }}
                    </p>
                    <p class="text-green-50 text-center text-xs">
                      {{ j.batch_id }}
                    </p>
                    <p class="flex w-fit mx-auto gap-3">
                      <GlobeAltIcon class="text-white w-5 mx-auto mt-3" />
                      <LinkIcon class="text-white w-5 mx-auto mt-3" />
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="w-11/12 mx-auto mb-10">
              <h1 class="text-white text-sm text-center uppercase mb-5">
                {{ teamMembers[6].category }}
              </h1>
              <ul class="flex flex-wrap lg:gap-10 gap-5 w-full justify-center">
                <li
                  class="lg:w-[230px] w-[300px]"
                  v-for="(j, i) in teamMembers.slice(5, 15)"
                  :key="i"
                >
                  <div
                    class="pt-6 pb-3 px-3 rounded-3xl border-4 bg-[#17132B]/60"
                  >
                    <p class="font-bold uppercase text-white text-center">
                      {{ j.firstname }}
                      <span class="text-[#18FF82]"> {{ j.lastname }}</span>
                    </p>
                    <p class="text-green-100 text-center text-xs">
                      {{ j.designation }}
                    </p>
                    <p class="text-green-50 text-center text-xs">
                      {{ j.career }}
                    </p>
                    <p class="text-green-50 text-center text-xs">
                      {{ j.batch_id }}
                    </p>
                    <p class="flex w-fit mx-auto gap-3">
                      <GlobeAltIcon class="text-white w-5 mx-auto mt-3" />
                      <LinkIcon class="text-white w-5 mx-auto mt-3" />
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> -->
      <div
        class="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100"
        id="projects"
      >
        <div class="w-11/12 mx-auto max-w-6xl">
          <!-- Section Title -->
          <h2
            class="text-center font-bold uppercase text-3xl sm:text-4xl mb-4 tracking-wide text-gray-800"
          >
            Projects
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

      <!-- <div
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
      </div> -->
     
     
     <div id="calendar">
    <Calendar />


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
