<template>
  <div
    ref="page"
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-[#b8d4ff] via-white to-[#eff6ff]"
    @mousemove="handleMouseMove"
  >
    <!-- FLOATING PARTICLES -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="'p' + i"
        class="absolute w-[6px] h-[6px] rounded-full bg-blue-500/25 animate-float"
        :style="p.style"
      ></span>
    </div>

    <!-- CURSOR SPARKLES -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="'s' + i"
        class="absolute w-[6px] h-[6px] bg-blue-400 rounded-full animate-sparkle"
        :style="s.style"
      ></span>
    </div>

    <!-- HERO -->
    <section
      class="relative z-10 min-h-screen flex items-center justify-center"
    >
      <div class="text-center max-w-3xl">
        <img
          :src="info.profile.image"
          :alt="info.profile.name"
          class="w-44 h-44 rounded-full mx-auto mb-6 shadow-lg object-cover"
        />

        <h1 class="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6">
          {{ info.profile.name }}
        </h1>

        <p class="text-lg text-gray-700 mb-4">
          {{ info.profile.tagline }}
        </p>

        <p class="text-gray-600 mb-8">
          {{ info.profile.subtitle }}
        </p>

        <div class="flex justify-center gap-5">
          <button
            class="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition hover:-translate-y-1 whitespace-nowrap"
          >
            {{ buttons.portfolio }}
          </button>

          <button
            class="border-2 border-blue-600 text-blue-900 px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-100"
          >
            {{ buttons.contact }}
          </button>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="relative z-10 py-20">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-[#1e3a8a] mb-6">
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

        <div class="bg-white p-7 rounded-2xl shadow-lg">
          <h3 class="font-semibold text-[#1e3a8a] mb-4">
            {{ info.skills.title }}
          </h3>

          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span
              v-for="(skill, i) in info.skills.list"
              :key="i"
              class="bg-blue-100 p-2 rounded text-center"
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
        <h2 class="text-3xl font-bold text-[#1e3a8a] mb-12">
          {{ info.education.title }}
        </h2>

        <div class="bg-white p-7 rounded-2xl shadow-lg">
          <h3 class="font-semibold text-[#1e3a8a]">
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
    <section class="relative z-10 py-20">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold text-[#1e3a8a] text-center mb-16">
          {{ info.experience.title }}
        </h2>

        <div class="space-y-8">
          <div
            v-for="(job, i) in info.experience.jobs"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-[#1e3a8a]">
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
      class="relative z-10 py-8 text-center text-gray-600 border-t border-blue-200 mt-12"
    >
      <div class="mb-2 font-semibold">
        © {{ new Date().getFullYear() }} {{ footer.name }}
      </div>

      <div class="mb-2 text-sm text-gray-500">
        {{ footer.powered }}
      </div>

      <div class="text-sm font-bold text-[#1e3a8a]">
        {{ footer.event }}
      </div>
    </footer>
  </div>
</template>

<script setup>
const info = ref({
  profile: {
    name: "Dennis Lugas",
    image:
      "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/dennis/profile2.jpg",
    tagline: "Data Analyst • Bootcamp 2021 Core Lead • Systems Administrator",
    subtitle:
      "TechSavvy Core Lead • Technical Specialist • Microsoft Support Engineer",
  },
  about: {
    title: "About",
    paragraphs: [
      "Dennis Lugas is an Information Technology professional specializing in data analytics, systems analysis, and enterprise technical support.",
      "He currently works at Alliance Software Inc. as an Associate Technical Specialist focusing on enterprise systems, data analytics, and technical operations.",
      "Dennis also contributes to the technology community as a TechSavvy Core Lead and Bootcamp 2021 Core Leader, helping mentor aspiring developers and technology professionals.",
    ],
  },
  skills: {
    title: "Skills",
    list: [
      "Data Analytics",
      "System Analysis",
      "Database Management",
      "Microsoft Support",
      "Technical Documentation",
      "System Administration",
      "Business Analysis",
      "Strategic Communications",
    ],
  },
  experience: {
    title: "Experience",
    jobs: [
      {
        title: "Associate Technical Specialist 1",
        company: "Alliance Software Inc. • Jan 2025 – Present",
        description:
          "Enterprise data analytics, system monitoring, and technical analysis to support business operations.",
      },
      {
        title: "Technical Specialist",
        company: "Alliance Software Inc. • Nov 2023 – Feb 2025",
        description:
          "System analysis, database management using HeidiSQL, and technical support for enterprise applications.",
      },
      {
        title: "SK Chairman",
        company: "Sangguniang Kabataan • Jul 2018 – Nov 2023",
        description:
          "Led youth development programs, community initiatives, and strategic communications projects.",
      },
      {
        title: "Quality Assurance Specialist (Internship)",
        company: "DepEd – Division Office of Ozamiz City • Sep 2022 – Jan 2023",
        description:
          "Assisted in data analysis, root cause analysis, and quality improvement initiatives.",
      },
      {
        title: "Web Developer",
        company: "La Salle University – Ozamiz • Jul 2021 – Dec 2022",
        description:
          "Developed and maintained web applications using Visual Studio and Git.",
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
  name: "Dennis Lugas",
  powered: "Powered by www.techsavvies.space",
  event: "5th Anniversary Bootcamp Celebration",
});
</script>

<style scoped>
@keyframes sparkle {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-120vh);
  }
}

.animate-sparkle {
  animation: sparkle 1s ease-out forwards;
}

.animate-float {
  animation: float infinite linear;
}
</style>
