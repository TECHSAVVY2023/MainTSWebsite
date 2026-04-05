<template>
  <div
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-200 via-white to-indigo-100"
    @mousemove="handleMouseMove"
  >
    <!-- FLOATING PARTICLES -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <span
        v-for="(p, i) in particles"
        :key="i"
        class="absolute rounded-full bg-indigo-700/30"
        :style="{
          left: p.x + 'px',
          top: p.y + 'px',
          width: p.size + 'px',
          height: p.size + 'px',
        }"
      />
    </div>

    <!-- CURSOR SPARKLES -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="i"
        class="absolute rounded-full bg-indigo-900"
        :style="{
          left: s.x + 'px',
          top: s.y + 'px',
          opacity: s.life,
          transform: 'scale(' + s.life + ')',
          width: '6px',
          height: '6px',
        }"
      />
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

        <h1 class="text-5xl md:text-6xl font-bold text-indigo-800 mb-6">
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
            class="bg-indigo-800 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold transition hover:-translate-y-1 whitespace-nowrap"
          >
            {{ buttons.portfolio }}
          </button>

          <button
            class="border-2 border-indigo-800 text-indigo-800 px-6 py-3 rounded-lg font-semibold transition hover:bg-indigo-100"
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
          <h2 class="text-3xl font-bold text-indigo-700 mb-6">
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
          <h3 class="font-semibold text-indigo-700 mb-4">Skills</h3>
          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span
              v-for="(skill, i) in info.about.skills"
              :key="i"
              class="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-md text-center"
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
        <h2 class="text-3xl font-bold text-indigo-700 mb-12">
          {{ info.education.title }}
        </h2>
        <div class="space-y-6">
          <div
            v-for="(edu, i) in info.education.list"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-indigo-800">{{ edu.degree }}</h3>
            <p class="text-sm text-gray-500 mb-2">
              {{ edu.school }} {{ edu.year ? "• " + edu.year : "" }}
            </p>
            <p v-if="edu.details" class="text-gray-700">{{ edu.details }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CERTIFICATIONS -->
    <section class="relative z-10 py-20">
      <div class="lg:w-8/12 mx-auto">
        <h2 class="text-3xl font-bold text-indigo-700 text-center mb-12">
          Certifications
        </h2>
        <div class="space-y-6">
          <div
            v-for="(cert, i) in info.certifications"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-indigo-800">{{ cert.title }}</h3>
            <p class="text-sm text-gray-500 mb-2">
              {{ cert.issuer }} {{ cert.date ? "• " + cert.date : "" }}
            </p>
            <p v-if="cert.credential" class="text-gray-700">
              Credential ID: {{ cert.credential }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ORGANIZATIONS -->
    <section class="relative z-10 py-20">
      <div class="lg:w-8/12 mx-auto">
        <h2 class="text-3xl font-bold text-indigo-700 text-center mb-12">
          Organizations
        </h2>
        <div class="space-y-6">
          <div
            v-for="(org, i) in info.organizations"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-indigo-800">{{ org.role }}</h3>
            <p class="text-sm text-gray-500">{{ org.organization }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HONORS -->
    <section class="relative z-10 py-20">
      <div class="lg:w-8/12 mx-auto">
        <h2 class="text-3xl font-bold text-indigo-700 text-center mb-12">
          Honors & Awards
        </h2>
        <div class="space-y-6">
          <div
            v-for="(honor, i) in info.honors"
            :key="i"
            class="bg-white p-7 rounded-2xl shadow-lg"
          >
            <h3 class="font-semibold text-indigo-800">{{ honor.title }}</h3>
            <p class="text-sm text-gray-500">
              {{ honor.institution }} {{ honor.year ? "• " + honor.year : "" }}
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

      <div class="text-sm font-bold text-indigo-700">
        {{ footer.event }}
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const info = ref({
  profile: {
    name: "Trexcy Fe Torrefiel",
    image:
      "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/trexcy/profile.jpg",
    tagline:
      "SOC Analyst • GRC & Incident Response • Helping Organisations Detect, Respond & Recover",
    subtitle:
      "Bootcamp 2021 Core Lead • Cybersecurity Management • MSc Cyber Security Management",
  },
  about: {
    title: "About",
    paragraphs: [
      "Trexcy Torrefiel is an Information Technology professional specializing in Information Security, Governance, Risk, and Compliance (GRC).",
      "She completed her MSc in Cyber Security Management at Aston University in Birmingham, United Kingdom.",
      "Her focus includes cybersecurity governance, cyber risk management, regulatory security frameworks, and policy implementation.",
    ],
    skills: [
      "Cyber Security Governance",
      "Risk Management",
      "Cyber Compliance",
      "Cyber Forensics",
      "Security Policy",
      "Cyber Risk Assessment",
      "Information Security",
      "Regulatory Security",
    ],
  },
  education: {
    title: "Education",
    list: [
      {
        degree: "MSc Cyber Security Management",
        school: "Aston University",
        year: "Sep 2024 – Sep 2025",
        details:
          "Cyber Security Risk Management, Governance, Cybersecurity Regulatory Frameworks, and Security Policy.",
      },
      {
        title: "Education",
        degree: "Bachelor of Science in Information Technology",
        school: "La Salle University – Ozamiz • 2018 – 2023",
      },
    ],
  },

  certifications: [
    {
      title: "Foundations of Cybersecurity",
      issuer: "Google",
      date: "Sep 2023",
      credential: "D2X3ZRWU9FBS",
    },
    {
      title: "Programming for Intermediate Users using Python",
      issuer: "Department of Information and Communications Technology",
      date: "Dec 2021",
    },
  ],
  organizations: [
    {
      role: "President",
      organization: "SOURCE Organization • La Salle University – Ozamiz",
    },
    {
      role: "Senator",
      organization: "College of Computer Studies, Engineering and Architecture",
    },
  ],
  honors: [
    {
      title: "First Honors",
      institution: "La Salle University – Ozamiz",
      year: "2022",
    },
    {
      title: "Third Honors",
      institution: "La Salle University – Ozamiz",
      year: "2021",
    },
  ],
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
  name: "Trexcy Fe Torrefiel",

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
