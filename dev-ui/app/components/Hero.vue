<template>
  <div
    class="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-violet-50 to-purple-100 text-[#2d0a3a]"
    @mousemove="handleMouseMove"
  >
    <!-- Cursor Glow -->
    <div
      class="pointer-events-none fixed w-40 h-40 rounded-full blur-3xl opacity-30 bg-violet-500 z-10"
      :style="{
        transform: `translate(${mouseX - 80}px, ${mouseY - 80}px)`
      }"
    ></div>

    <!-- Sparkle Layer -->
    <div class="absolute inset-0 z-0">
      <span
        v-for="i in 60"
        :key="i"
        class="absolute rounded-full bg-[radial-gradient(circle,#a78bfa,transparent)] opacity-70 animate-twinkle-soft"
        :style="randomStyle()"
      ></span>
    </div>

    <!-- Background Gloss -->
    <div class="absolute top-0 w-full z-0 opacity-70">
      <img :src="glossy" class="w-full" />
    </div>

    <!-- Floating Glow Blobs -->
    <div class="absolute -top-32 -left-32 w-[400px] h-[400px] bg-violet-300 opacity-30 blur-3xl rounded-full animate-pulse"></div>
    <div class="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-400 opacity-30 blur-3xl rounded-full animate-pulse"></div>

    <!-- Main Content -->
    <div class="relative z-20 flex items-center justify-center min-h-screen px-6">
      <div class="text-center max-w-4xl">

        <!-- Logos -->
        <div class="flex justify-center items-center gap-4 mb-6">
          <img :src="techSavvyLogo" class="lg:w-[120px] w-[70px]" />
          <img :src="workflowLogo" class="lg:w-[80px] w-[50px]" />
        </div>

        <!-- Glass Card -->
        <div class="backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl rounded-3xl p-8">

          <!-- Title -->
          <h1 class="uppercase font-black tracking-widest text-3xl md:text-5xl text-violet-900">
            Tech Savvy
          </h1>

          <h2 class="uppercase font-extrabold text-5xl md:text-7xl bg-gradient-to-r from-violet-700 to-purple-500 bg-clip-text text-transparent">
            Code Camp
          </h2>

          <!-- Tagline -->
          <p class="mt-3 text-lg text-gray-700">
            Code • Create • Connect
          </p>

          <!-- Season -->
          <p class="mt-6 text-xl font-semibold text-violet-700">
            SEASON 4 • 2026
          </p>

          <!-- Theme -->
          <p class="mt-2 text-sm md:text-base text-violet-600 font-medium">
            Think Smarter • Business • Technology
          </p>

          <!-- CTA -->
          <div class="mt-8">
            <button class="px-8 py-3 rounded-full bg-violet-600 text-white font-bold shadow-lg hover:bg-violet-700 transition hover:scale-105">
              Join Community
            </button>
          </div>

          <!-- Coming Soon -->
          <p class="mt-4 text-sm text-gray-500 animate-pulse">
            Road to Fullstack Development
          </p>

        </div>

        <!-- Bottom Logo -->
        <img :src="codeCampBanner2024" class="w-[90px] mx-auto mt-6 opacity-80" />
      </div>
    </div>
  </div>
</template>

<script setup>
const glossy = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png"
);

const codeCampBanner2024 = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo1W.png"
);

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png"
);

const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png"
);

// Cursor Glow
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};

// Sparkles
const randomStyle = () => {
  const size = Math.random() * 4 + 2 + "px";
  return {
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    width: size,
    height: size,
    animationDelay: Math.random() * 5 + "s",
  };
};
</script>
