<template>
  <div
    ref="page"
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-[#f5e6d3] via-white to-[#efe2d1]"
    @mousemove="handleMouseMove"
  >
    <!-- Floating Background Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="'p' + i"
        class="absolute h-[6px] w-[6px] rounded-full bg-[#c28b5a]/25 animate-[float-up_linear_infinite]"
        :style="p.style"
      ></span>
    </div>

    <!-- Cursor Sparkles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="'s' + i"
        class="absolute h-[6px] w-[6px] rounded-full bg-[#ffd9a8] animate-sparkle-burst"
        :style="s.style"
      ></span>
    </div>

    <!-- HERO -->
    <section
      class="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <div class="text-center max-w-3xl">
        <img
          :src="info.profile.image"
          :alt="info.profile.name"
          class="w-44 h-44 rounded-full mx-auto mb-6 shadow-lg object-cover"
        />

        <h1 class="text-5xl md:text-6xl font-bold text-[#7a4e2b] mb-6">
          {{ info.profile.name }}
        </h1>

        <p class="text-lg text-gray-700 mb-4">
          {{ info.profile.tagline }}
        </p>

        <p class="text-gray-600 mb-8">
          {{ info.profile.subtitle }}
        </p>

        <div class="flex justify-center gap-x-5">
          <button
            class="bg-[#7a4e2b] hover:bg-[#a87141] text-white px-6 py-3 rounded-lg font-semibold transition hover:-translate-y-1 whitespace-nowrap"
          >
            {{ buttons.portfolio }}
          </button>

          <button
            class="border-2 border-[#c28b5a] text-[#7a4e2b] px-6 py-3 rounded-lg font-semibold transition hover:bg-[#f5e6d3]"
          >
            {{ buttons.contact }}
          </button>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-[#7a4e2b] mb-6">
            {{ info.about.title }}
          </h2>

          <p
            v-for="(p, i) in info.about.paragraphs"
            :key="i"
            class="text-gray-700 leading-relaxed mb-4"
          >
            {{ p }}
          </p>
        </div>

        <div class="bg-white p-7 rounded-2xl shadow-lg backdrop-blur">
          <h3 class="font-semibold text-[#7a4e2b] mb-4">
            {{ info.skills.title }}
          </h3>

          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span
              v-for="(skill, i) in info.skills.list"
              :key="i"
              class="bg-[#f5e6d3] p-2 rounded text-center"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION -->
    <section class="relative z-10 py-20">
      <div class="lg:w-8/12 mx-auto">
        <h2 class="text-3xl font-bold text-[#7a4e2b] mb-12">
          {{ info.education.title }}
        </h2>

        <div class="bg-white p-7 rounded-2xl shadow-lg">
          <h3 class="font-semibold text-[#7a4e2b]">
            {{ info.education.degree }}
          </h3>

          <p class="text-xs text-gray-500 mb-2">
            {{ info.education.school }}
          </p>

          <p class="text-sm text-gray-600">
            {{ info.education.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-[#7a4e2b] text-center mb-16">
          {{ info.experience.title }}
        </h2>

        <div class="space-y-8">
          <div
            v-for="(job, i) in info.experience.jobs"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-[#7a4e2b]">
              {{ job.title }}
            </h3>

            <p class="text-xs text-gray-500 mb-2">
              {{ job.company }}
            </p>

            <p class="text-sm text-gray-600">
              {{ job.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="relative z-10 py-8 text-center text-gray-600 border-t border-gray-300 mt-12"
    >
      <div class="mb-2 font-semibold">
        © {{ new Date().getFullYear() }} {{ footer.name }}
      </div>

      <div class="mb-2 text-sm text-gray-500">
        {{ footer.powered }}
      </div>

      <div class="text-sm font-bold text-[#7a4e2b]">
        {{ footer.event }}
      </div>
    </footer>
  </div>
</template>

<script setup>
const info = ref({
  profile: {
    name: "Niel Villarejo",

    image:
      "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/niel/profile2.jpg",

    tagline: "Systems Analyst • Bootcamp 2021 Core Lead • Project Lead",

    subtitle: "TechSavvy Leader • Code Camp Core Lead • Theatre Actor",
  },
  about: {
    title: "About",

    paragraphs: [
      "During my internship at the Educational Technology Center of La Salle University, I joined the LSU Project Team responsible for revamping the Daluyan ng Dulaang Pilipino: Philippine Theater Portal Website.",

      "Today I work as a Systems Analyst at Alliance Software Inc. in Cebu while continuing to contribute to the tech community through TechSavvy programs and theatre arts.",
    ],
  },
  skills: {
    title: "Skills",

    list: [
      "Systems Analysis",
      "Technical Documentation",
      "Microsoft Products",
      "WordPress",
      "Project Management",
      "Stakeholder Coordination",
    ],
  },
  experience: {
    title: "Experience",

    jobs: [
      {
        title: "Associate Technical Specialist / Project Lead",
        company: "Alliance Software Inc. • Jul 2024 – Present",
        description:
          "Enterprise system maintenance, systems analysis, and project leadership.",
      },

      {
        title: "Technical Specialist | Systems Analyst",
        company: "Alliance Software Inc. • Apr 2023 – Jun 2024",
        description: "Application maintenance and technical documentation.",
      },

      {
        title: "IT Documenter",
        company: "La Salle University – Ozamiz • Apr 2022 – Apr 2023",
        description:
          "Assistant project coordinator for Daluyan ng Dulaang Pilipino website.",
      },
    ],
  },
  education: {
    title: "Education",
    degree: "Bachelor of Science in Information Technology",
    school: "La Salle University – Ozamiz • 2018 – 2023",
    description:
      "Major in Analytics with focus on Data Analytics and Quality Assurance.",
  },
});
const sparkles = ref([]);
const particles = ref([]);
const handleMouseMove = (e) => {
  sparkles.value.push({
    style: {
      left: e.clientX + "px",
      top: e.clientY + "px",
    },
  });

  if (sparkles.value.length > 40) {
    sparkles.value.shift();
  }
};
function generateParticles() {
  const arr = [];

  for (let i = 0; i < 35; i++) {
    arr.push({
      style: {
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animationDuration: 8 + Math.random() * 10 + "s",
        transform: `scale(${0.5 + Math.random()})`,
      },
    });
  }

  particles.value = arr;
}
onMounted(() => generateParticles());
const buttons = ref({
  portfolio: "View Portfolio",

  contact: "Contact",
});
const footer = ref({
  name: "Niel Villarejo",

  powered: "Powered by www.techsavvies.space",

  event: "5th Anniversary Bootcamp Celebration",
});
</script>
