<template>
  <div
    ref="page"
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5e6d3] via-white to-[#efe2d1]"
    @mousemove="handleMouseMove"
  >
    <!-- Animated Background Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="'p' + i"
        class="particle"
        :style="p.style"
      ></span>
    </div>

    <!-- Sparkle Cursor -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="'s' + i"
        class="sparkle"
        :style="s.style"
      ></span>
    </div>

    <!-- HERO -->
    <section
      class="relative z-10 min-h-screen flex items-center justify-center px-6"
    >
      <div class="text-center max-w-3xl">
        <div class="">
          <div>
            <img
              src="https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/niel/profile2.jpg"
              alt="Niel Villarejo"
              class="w-44 h-44 rounded-full mx-auto mt-3 mb-6"
            />
          </div>
          <div>
            <h1 class="text-5xl md:text-6xl font-bold text-[#7a4e2b] mb-6">
              Niel Villarejo
            </h1>

            <p class="text-lg text-gray-700 mb-6">
              Systems Analyst • Bootcamp 2021 Core Lead • Project Lead
            </p>

            <p class="text-gray-600 mb-8">
              TechSavvy Leader • Code Camp Core Lead • Theatre Actor
            </p>

            
        <div class="flex justify-center gap-x-5">
          <button class="btn-primary whitespace-nowrap">View Portfolio</button>

          <button class="btn-outline">Contact</button>
        </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ABOUT -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title">About</h2>

          <p class="text-gray-700 leading-relaxed mb-4">
            During my internship at the Educational Technology Center of La
            Salle University, I joined the LSU Project Team responsible for
            revamping the Daluyan ng Dulaang Pilipino: Philippine Theater Portal
            Website.
          </p>

          <p class="text-gray-700 leading-relaxed">
            Today I work as a Systems Analyst at Alliance Software Inc. in Cebu
            while continuing to contribute to the tech community through
            TechSavvy programs and theatre arts.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-[#7a4e2b] mb-4">Skills</h3>

          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span class="skill">Systems Analysis</span>
            <span class="skill">Technical Documentation</span>
            <span class="skill">Microsoft Products</span>
            <span class="skill">WordPress</span>
            <span class="skill">Project Management</span>
            <span class="skill">Stakeholder Coordination</span>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <h2 class="section-title text-center mb-16">Experience</h2>

        <div class="space-y-8">
          <div class="card">
            <h3 class="job-title">
              Associate Technical Specialist / Project Lead
            </h3>

            <p class="job-meta">Alliance Software Inc. • Jul 2024 – Present</p>

            <p class="job-desc">
              Enterprise system maintenance, systems analysis, and project
              leadership.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">Technical Specialist | Systems Analyst</h3>

            <p class="job-meta">Alliance Software Inc. • Apr 2023 – Jun 2024</p>

            <p class="job-desc">
              Application maintenance and technical documentation.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">IT Documenter</h3>

            <p class="job-meta">
              La Salle University – Ozamiz • Apr 2022 – Apr 2023
            </p>

            <p class="job-desc">
              Assistant project coordinator for Daluyan ng Dulaang Pilipino
              website.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
<footer class="relative z-10 py-8 text-center text-gray-600 border-t border-gray-300 mt-12">
  <div class="mb-2 font-semibold">
    © {{ new Date().getFullYear() }} Niel Villarejo
  </div>

  <div class="mb-2 text-sm text-gray-500">
      Powered by www.techsavvies.space
  </div>

  <div class="text-sm font-bold text-[#7a4e2b]">
    5th Anniversary Bootcamp Celebration
  </div>
</footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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

onMounted(() => {
  generateParticles();
});

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
</script>

<style scoped>
/* Buttons */

.btn-primary {
  background: #c28b5a;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #a87141;
  transform: translateY(-2px);
}

.btn-outline {
  border: 2px solid #c28b5a;
  color: #7a4e2b;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  transition: 0.3s;
}

.btn-outline:hover {
  background: #f5e6d3;
}

/* Cards */

.card {
  background: white;
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(6px);
}

/* Skills */

.skill {
  background: #f5e6d3;
  padding: 8px;
  border-radius: 8px;
  text-align: center;
}

/* Titles */

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #7a4e2b;
}

.job-title {
  font-weight: 600;
  color: #7a4e2b;
}

.job-meta {
  font-size: 13px;
  color: #777;
  margin-bottom: 8px;
}

.job-desc {
  color: #555;
  font-size: 14px;
}

/* Sparkles */

.sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ffd9a8;
  border-radius: 50%;
  animation: sparkle 1s ease-out forwards;
}

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

/* Floating particles */

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #c28b5a;
  border-radius: 50%;
  opacity: 0.25;
  animation: float infinite linear;
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-120vh);
  }
}
</style>
