<template>
  <div
    ref="page"
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-200 via-white to-indigo-100"
    @mousemove="handleMouseMove"
  >
    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <span
        v-for="(p, i) in particles"
        :key="'p'+i"
        class="particle"
        :style="p.style"
      ></span>
    </div>

    <!-- Cursor Sparkles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(s, i) in sparkles"
        :key="'s'+i"
        class="sparkle"
        :style="s.style"
      ></span>
    </div>

    <!-- HERO -->
    <section class="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div class="text-center max-w-3xl">

        <!-- Profile -->
        <div class="relative w-44 h-44 mx-auto mb-6">
          <img
            src="https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/trexcy/profile.jpg"
            alt="Trexcy Torrefiel"
            class="w-full h-full rounded-full object-cover border-4 border-indigo-400 shadow-lg"
          />
          <div class="absolute inset-0 rounded-full border-4 border-indigo-300 animate-pulse"></div>
        </div>

        <h1 class="text-5xl md:text-6xl font-bold text-indigo-800 mb-6">
          Trexcy Fe Torrefiel
        </h1>

    
        <p class="text-lg text-gray-700 mb-4 lg:whitespace-nowrap">
          SOC Analyst • GRC & Incident Response • Helping Organisations Detect, Respond & Recover
        </p>

        <p class="text-gray-600 mb-8">
           Bootcamp 2021 Core Lead •  Cybersecurity Management • MSc Cyber Security Management
        </p>

        <div class="flex justify-center gap-5">
          <button class="btn-primary text-indigo-800 bg-indigo-800 hover:bg-indigo-900 whitespace-nowrap">View Portfolio</button>
          <button class="btn-outline text-indigo-800 border-2 border-indigo-800">Contact</button>
        </div>

      </div>
    </section>

    <!-- ABOUT -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 class="section-title">About</h2>

          <p class="text-gray-700 leading-relaxed mb-4">
            Trexcy Torrefiel is an Information Technology professional specializing
            in Information Security, Governance, Risk, and Compliance (GRC).
          </p>

          <p class="text-gray-700 leading-relaxed mb-4">
            She completed her MSc in Cyber Security Management at Aston
            University in Birmingham, United Kingdom.
          </p>

          <p class="text-gray-700 leading-relaxed">
            Her focus includes cybersecurity governance, cyber risk management,
            regulatory security frameworks, and policy implementation.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-indigo-700 mb-4">Skills</h3>

          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span class="skill">Cyber Security Governance</span>
            <span class="skill">Risk Management</span>
            <span class="skill">Cyber Compliance</span>
            <span class="skill">Cyber Forensics</span>
            <span class="skill">Security Policy</span>
            <span class="skill">Cyber Risk Assessment</span>
            <span class="skill">Information Security</span>
            <span class="skill">Regulatory Security</span>
          </div>
        </div>

      </div>
    </section>

    <!-- EDUCATION -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto">

        <h2 class="section-title text-center mb-12">Education</h2>

        <div class="space-y-6">

          <div class="card">
            <h3 class="job-title">
              MSc Cyber Security Management
            </h3>

            <p class="job-meta">
              Aston University • Sep 2024 – Sep 2025
            </p>

            <p class="job-desc">
              Cyber Security Risk Management, Governance, Cybersecurity
              Regulatory Frameworks, and Security Policy.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Bachelor of Science in Information Technology
            </h3>

            <p class="job-meta">
              La Salle University – Ozamiz
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- CERTIFICATIONS -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto">

        <h2 class="section-title text-center mb-12">
          Certifications
        </h2>

        <div class="space-y-6">

          <div class="card">
            <h3 class="job-title">
              Foundations of Cybersecurity
            </h3>

            <p class="job-meta">
              Google • Issued Sep 2023
            </p>

            <p class="job-desc">
              Credential ID: D2X3ZRWU9FBS
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Programming for Intermediate Users using Python
            </h3>

            <p class="job-meta">
              Department of Information and Communications Technology • Dec 2021
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- ORGANIZATIONS -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto">

        <h2 class="section-title text-center mb-12">
          Organizations
        </h2>

        <div class="space-y-6">

          <div class="card">
            <h3 class="job-title">
              President
            </h3>

            <p class="job-meta">
              SOURCE Organization • La Salle University – Ozamiz
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Senator
            </h3>

            <p class="job-meta">
              College of Computer Studies, Engineering and Architecture
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- HONORS -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto">

        <h2 class="section-title text-center mb-12">
          Honors & Awards
        </h2>

        <div class="space-y-6">

          <div class="card">
            <h3 class="job-title">First Honors</h3>
            <p class="job-meta">La Salle University – Ozamiz • 2022</p>
          </div>

          <div class="card">
            <h3 class="job-title">Third Honors</h3>
            <p class="job-meta">La Salle University – Ozamiz • 2021</p>
          </div>

        </div>

      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="relative z-10 py-8 text-center text-gray-600 border-t border-pink-200 mt-12"
    >
      <div class="mb-2 font-semibold">
        © {{ new Date().getFullYear() }} Trexcy Torrefiel
      </div>

      <div class="mb-2 text-sm text-gray-500">
        Powered by www.techsavvies.space
      </div>

      <div class="text-sm font-bold text-indigo-700">
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

.btn-primary{
  color:white;
  padding:12px 24px;
  border-radius:10px;
  font-weight:600;
  transition:0.3s;
}

.btn-primary:hover{
  transform:translateY(-2px);
}

.btn-outline{
  padding:12px 24px;
  border-radius:10px;
  font-weight:600;
  transition:0.3s;
}

.btn-outline:hover{
  background:#eee5f2;
}

.card{
  background:white;
  padding:28px;
  border-radius:16px;
  box-shadow:0 10px 25px rgba(236,72,153,0.15);
}

.skill{
  background:#f2ddf6;
  padding:8px;
  border-radius:8px;
  text-align:center;
}

.section-title{
  font-size:32px;
  font-weight:700;
  color:#6e18be;
}

.job-title{
  font-weight:600;
  color:#9218be;
}

.job-meta{
  font-size:13px;
  color:#777;
  margin-bottom:8px;
}

.job-desc{
  color:#555;
  font-size:14px;
}

.sparkle{
  position:absolute;
  width:6px;
  height:6px;
  background:#2f1751;
  border-radius:50%;
  animation:sparkle 1s ease-out forwards;
}

@keyframes sparkle{
  0%{opacity:1; transform:scale(1);}
  100%{opacity:0; transform:scale(0);}
}

.particle{
  position:absolute;
  width:6px;
  height:6px;
  background:#340d5a;
  border-radius:50%;
  opacity:0.25;
  animation:float infinite linear;
}

@keyframes float{
  from{transform:translateY(0);}
  to{transform:translateY(-120vh);}
}

</style>