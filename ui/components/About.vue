<script setup>
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

</script>

<template>
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
          A start-up growing IT community in Misamis Occidental started on April
          30, 2023 at
          <span class="font-bold"> Workflow Co-Working Space Ozamiz </span>
          , conducting code camp activities focusing on full-stack web
          development.
        </p>
        <p
          class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
        >
          Tech Savvy guides aspiring web developers by teaching techniques in
          full-stack web development and encourages individuals or professionals
          by mentoring them with the right techniques that help them upskill
          their knowledge through their journey or during the roadmap code camp
          sessions up to pursuing roles in the IT industry.
        </p>
        <p
          class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
        >
          The <span class="font-bold">vision</span> is to empower and support
          developers in their career growth, foster a vibrant and collaborative
          community, and connect talented individuals with rewarding
          opportunities in the IT industry.
        </p>
        <p
          class="lg:mb-10 mb-3 lg:text-base text-xs lg:indent-10 font-light lg:text-justify"
        >
          The <span class="font-bold">mission</span> is to enhance the skills
          and knowledge of developers, facilitate networking and
          knowledge-sharing among community members, and assist job seekers in
          finding fulfilling roles in the IT industry.
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
</template>
