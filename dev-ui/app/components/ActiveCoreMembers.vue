<script setup>
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



const dotsWhite = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png",
);

</script>

<template>
      <div class="w-full flex cursor-default z-10">
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
      </div>
</template>