<template>
  <div
    ref="page"
    class="relative min-h-screen overflow-hidden bg-linear-to-br from-[#b8d4ff] via-white to-[#eff6ff]"
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

        <img
          src="https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.techsavvies.space/pioneers/dennis/profile2.jpg"
          alt="Dennis Lugas"
          class="w-44 h-44 rounded-full mx-auto mb-6"
        />

        <h1 class="text-5xl md:text-6xl font-bold text-[#1e3a8a] mb-6">
          Dennis Lugas
        </h1>

        <p class="text-lg text-gray-700 mb-6">
          Data Analyst • Bootcamp 2021 Core Lead • Systems Administrator
        </p>

        <p class="text-gray-600 mb-8">
           TechSavvy Core Lead • Technical Specialist • Microsoft Support Engineer
        </p>



        <div class="flex justify-center gap-5">
          <button class="btn-primary whitespace-nowrap">View Portfolio</button>
          <button class="btn-outline">Contact</button>
        </div>

      </div>
    </section>

    <!-- ABOUT -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h2 class="section-title">About</h2>

          <p class="text-gray-700 leading-relaxed mb-4">
            Dennis Lugas is an Information Technology professional specializing
            in data analytics, systems analysis, and enterprise technical
            support.
          </p>

          <p class="text-gray-700 leading-relaxed mb-4">
            He currently works at Alliance Software Inc. as an Associate
            Technical Specialist focusing on enterprise systems, data analytics,
            and technical operations.
          </p>

          <p class="text-gray-700 leading-relaxed">
            Dennis also contributes to the technology community as a TechSavvy
            Core Lead and Bootcamp 2021 Core Leader, helping mentor aspiring
            developers and technology professionals.
          </p>
        </div>

        <div class="card">
          <h3 class="font-semibold text-[#1e3a8a] mb-4">Skills</h3>

          <div class="grid lg:grid-cols-2 gap-3 text-sm">
            <span class="skill">Data Analytics</span>
            <span class="skill">System Analysis</span>
            <span class="skill">Database Management</span>
            <span class="skill">Microsoft Support</span>
            <span class="skill">Technical Documentation</span>
            <span class="skill">System Administration</span>
            <span class="skill">Business Analysis</span>
            <span class="skill">Strategic Communications</span>
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
              Associate Technical Specialist 1
            </h3>

            <p class="job-meta">
              Alliance Software Inc. • Jan 2025 – Present
            </p>

            <p class="job-desc">
              Enterprise data analytics, system monitoring, and technical
              analysis to support business operations.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Technical Specialist
            </h3>

            <p class="job-meta">
              Alliance Software Inc. • Nov 2023 – Feb 2025
            </p>

            <p class="job-desc">
              System analysis, database management using HeidiSQL, and technical
              support for enterprise applications.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              SK Chairman
            </h3>

            <p class="job-meta">
              Sangguniang Kabataan • Jul 2018 – Nov 2023
            </p>

            <p class="job-desc">
              Led youth development programs, community initiatives, and
              strategic communications projects.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Quality Assurance Specialist (Internship)
            </h3>

            <p class="job-meta">
              DepEd – Division Office of Ozamiz City • Sep 2022 – Jan 2023
            </p>

            <p class="job-desc">
              Assisted in data analysis, root cause analysis, and quality
              improvement initiatives.
            </p>
          </div>

          <div class="card">
            <h3 class="job-title">
              Web Developer
            </h3>

            <p class="job-meta">
              La Salle University – Ozamiz • Jul 2021 – Dec 2022
            </p>

            <p class="job-desc">
              Developed and maintained web applications using Visual Studio and
              Git.
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- EDUCATION -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">

        <h2 class="section-title mb-12">
          Education
        </h2>

        <div class="card">
          <h3 class="job-title">
            Bachelor of Science in Information Technology
          </h3>

          <p class="job-meta">
            La Salle University – Ozamiz • 2018 – 2023
          </p>

          <p class="job-desc">
            Major in Analytics with focus on Data Analytics and Quality
            Assurance.
          </p>
        </div>

      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="relative z-10 py-8 text-center text-gray-600 border-t border-blue-200 mt-12"
    >
      <div class="mb-2 font-semibold">
        © {{ new Date().getFullYear() }} Dennis Lugas
      </div>

      <div class="mb-2 text-sm text-gray-500">
       Powered by www.techsavvies.space
      </div>

      <div class="text-sm font-bold text-[#1e3a8a]">
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
  background:#2563eb;
  color:white;
  padding:12px 24px;
  border-radius:10px;
  font-weight:600;
  transition:0.3s;
}

.btn-primary:hover{
  background:#1e40af;
  transform:translateY(-2px);
}

.btn-outline{
  border:2px solid #2563eb;
  color:#1e3a8a;
  padding:12px 24px;
  border-radius:10px;
  font-weight:600;
  transition:0.3s;
}

.btn-outline:hover{
  background:#dbeafe;
}

.card{
  background:white;
  padding:28px;
  border-radius:16px;
  box-shadow:0 10px 25px rgba(37,99,235,0.15);
}

.skill{
  background:#e0edff;
  padding:8px;
  border-radius:8px;
  text-align:center;
}

.section-title{
  font-size:32px;
  font-weight:700;
  color:#1e3a8a;
}

.job-title{
  font-weight:600;
  color:#1e3a8a;
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
  background:#60a5fa;
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
  background:#2563eb;
  border-radius:50%;
  opacity:0.25;
  animation:float infinite linear;
}

@keyframes float{
  from{transform:translateY(0);}
  to{transform:translateY(-120vh);}
}

</style>