<template>
  <div
    class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#120826] via-[#180b36] to-[#0b041c] flex items-center justify-center px-3 sm:px-4"
  >
    <!-- PARTICLES BACKGROUND -->
    <canvas ref="canvas" class="absolute inset-0 z-0"></canvas>

    <!-- CARD -->
    <div
      class="relative z-10 w-full max-w-5xl rounded-2xl p-4 sm:p-6 text-white backdrop-blur-md shadow-xl print:bg-white print:text-black"
    >
      <!-- HEADER -->
      <div class="flex flex-col items-center text-center">
        <div class="flex items-center gap-x-3">
          <img :src="techSavvyLogo" class="w-20 h-24" />
          <img :src="workflowLogo" class="w-12 h-12" />
        </div>
        <h1 class="text-xs sm:text-lg font-semibold tracking-wide">
          Community ID | Event Organizer
        </h1>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="mt-10 text-center text-purple-300">
        Loading member…
      </div>

      <!-- ERROR -->
      <div v-else-if="error" class="mt-10 text-center text-red-400">
        Member not found
      </div>

      <!-- PROFILE -->
      <div v-else class="mt-4 flex flex-col items-center">
        <div class="group perspective lg:w-[250px] lg:h-[250px]">
          <div
            class="relative lg:w-full lg:h-full w-32 h-32 mx-auto transition-transform duration-500 transform-style-3d group-hover:rotate-y-180"
          >
            <!-- FRONT: Profile Picture -->
            <div
              class="absolute lg:w-full lg:h-full w-32 h-32 backface-hidden rounded-full border-4 border-purple-500 hover:border-amber-500 p-1 shadow-lg overflow-hidden"
            >
              <img
                :src="cleanImageUrl(member.profilePicture)"
                class="h-full w-full object-cover object-[50%_35%] rounded-full"
              />
            </div>
          </div>
        </div>

        <div class="mt-3 sm:mt-4 relative group inline-block">
          <div
            class="rounded-full bg-yellow-400 px-5 py-1 text-xs sm:text-sm font-bold text-black cursor-grab"
          >
            <span
              v-if="
               !member.role.includes('Founder') ||
                member.role.includes('Co-Founder')
              "
            >
              Total Credit Points: {{ totalPoints }}
            </span>

            <span
              v-if="
                member.role.includes('Founder') &&
                !member.role.includes('Co-Founder')
              "
            >
              President & Share Holder
            </span>
          </div>

          <!-- Tooltip -->
          <span
            class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-112.5 rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100 lg:whitespace-nowrap text-center"
          >
            Total points earned across All Categories
          </span>
        </div>
      </div>

      <!-- DETAILS -->
      <div v-if="member" class="mt-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <!-- LEFT COLUMN -->
          <div class="">
            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Fullname</span>
              <span class="text-green-300 text-right lg:order-1 order-2 lg:w-full">
                <input
                  disabled
                  type="text"
                  v-model="fullName"
                  class="lg:w-full lg:text-left text-right bg-transparent outline-none cursor-pointer"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Role</span>
              <span class="text-green-300 text-right lg:order-1 order-2 w-full">
                <input
                  disabled
                  type="text"
                  v-model="member.role"
                  class="lg:w-full lg:text-left text-right bg-transparent outline-none cursor-pointer"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">ID No.</span>
              <span class="text-green-300 text-right lg:order-1 order-2">
                <input
                  disabled
                  :type="hover.id ? 'text' : 'password'"
                  v-model="member.idNumber"
                  class="lg:min-w-75 lg:text-left text-right bg-transparent outline-none cursor-pointer"
                  @mouseenter="hover.id = true"
                  @mouseleave="hover.id = false"
                  @focus="hover.id = true"
                  @blur="hover.id = false"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Mobile</span>
              <span class="text-green-300 text-right lg:order-1 order-2">
                <input
                  disabled
                  :type="hover.mobile ? 'text' : 'password'"
                  v-model="member.mobile"
                  class="lg:min-w-75 lg:text-left text-right bg-transparent outline-none cursor-pointer"
                  @mouseenter="hover.mobile = true"
                  @mouseleave="hover.mobile = false"
                  @focus="hover.mobile = true"
                  @blur="hover.mobile = false"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Email</span>
              <span class="text-green-300 lg:order-1 order-2 lg:w-full">
                <input
                  disabled
                  :type="hover.email ? 'text' : 'password'"
                  v-model="member.email"
                  class="lg:w-full min-w-54 lg:text-left text-right bg-transparent outline-none cursor-pointer truncate"
                  @mouseenter="hover.email = true"
                  @mouseleave="hover.email = false"
                  @focus="hover.email = true"
                  @blur="hover.email = false"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Website</span>
              <span class="text-green-300 lg:order-1 order-2 lg:w-full">
                <input
                  disabled
                  type="text"
                  v-model="member.website"
                  class="lg:w-full min-w-54 lg:text-left text-right bg-transparent outline-none cursor-pointer truncate"
                />
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-purple-300 lg:order-2 order-1">Birthdate</span>
              <span class="text-green-300 text-right lg:order-1 order-2">
                <input
                  disabled
                  :type="hover.birthdate ? 'text' : 'password'"
                  v-model="member.birthdate"
                  class="lg:min-w-75 lg:text-left text-right bg-transparent outline-none cursor-pointer"
                  @mouseenter="hover.birthdate = true"
                  @mouseleave="hover.birthdate = false"
                  @focus="hover.birthdate = true"
                  @blur="hover.birthdate = false"
                />
              </span>
            </div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="">
            <div
              v-if="
             !member.role.includes('Founder') ||
                member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Credit Points</span>
              <span class="relative">
                PHP
                <span class="font-semibold cursor-pointer relative z-10">
                  {{ member.gcashPoints }}
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    Points earned each tasks Accomplished!
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                !member.role.includes('Founder') ||
                member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Annual Bonus</span>
              <span class="relative">
                 $
                <span class="font-semibold cursor-pointer relative z-10">
                  {{ member.bonusPoints }}
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    Year End Bonus Points 
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                !member.role.includes('Founder') ||
                member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Workflow Voucher</span>
              <span class="relative">
                Points
                <span class="font-semibold cursor-pointer relative z-10">
                  {{ member.voucherPoints }}
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    Points redeemable for vouchers at Workflow Cafe
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                !member.role.includes('Founder') ||
                member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Event Honorariums</span>
              <span class="relative">
                PHP
                <span class="font-semibold cursor-pointer relative z-10">
                  {{ member.honorariumPoints }}
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    Honorarium points awarded from Special Events
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                member.role.includes('Founder') &&
                !member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Share Holder</span>
              <span class="relative">
                75%
                <span class="font-semibold cursor-pointer relative z-10">
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    President & Share Holder
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                member.role.includes('Founder') &&
                !member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span> Team Assets</span>
              <span class="relative">
                25%
                <span class="font-semibold cursor-pointer relative z-10">
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    TECHSAVVY ASSETS
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                member.role.includes('Founder') &&
                !member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Team Partners</span>
              <span class="relative">
                3
                <span class="font-semibold cursor-pointer relative z-10">
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    Partners
                  </span>
                </span>
              </span>
            </div>

            <div
              v-if="
                member.role.includes('Founder') &&
                !member.role.includes('Co-Founder')
              "
              class="flex justify-between text-yellow-400 relative group"
            >
              <span>Collaborations</span>
              <span class="relative">
                3
                <span class="font-semibold cursor-pointer relative z-10">
                  <span
                    class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                  >
                    4
                  </span>
                </span>
              </span>
            </div>

            <div class="flex justify-between relative group">
              <span>Projects</span>
              <span class="font-semibold cursor-pointer relative z-10">
                {{ member.numberOfProjects }}
                <span
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-purple-700 text-white text-xs px-2 py-1 opacity-0 scale-90 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:scale-100"
                >
                  Total number of projects handled
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div
        class="mt-6 text-center text-[10px] sm:text-xs text-purple-300 border-t border-white/10 pt-5"
      >
        © TECHSAVVY 2026 | All Rights Reserved
      </div>
    </div>
  </div>
</template>

<script setup>
import QRCode from "qrcode";

// Get API base URL from runtime config
const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

const dollarConversion = ref(60);

const route = useRoute();
const idNumber = route.params.idNumber;

const member = ref(null);
const loading = ref(true);
const error = ref(false);

const canvas = ref(null);
let ctx;
let particles = [];
let animationId;
const PARTICLE_COUNT = 120; // more particles
const SPARKLE_CHANCE = 0.02; // chance for sparkle trail

const qrCanvas = ref(null);
const verified = ref(false);

const hover = reactive({
  id: false,
  mobile: false,
  email: false,
  birthdate: false,
});

const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png",
);
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png",
);

const fullName = computed(() =>
  [member.value?.firstname, member.value?.middlename, member.value?.lastname]
    .filter(Boolean)
    .join(" "),
);

const totalPoints = computed(
  () =>
    Number(member.value?.gcashPoints || 0) +
    Number(member.value?.bonusPoints * dollarConversion.value || 0) +
    Number(member.value?.voucherPoints || 0) +
    Number(member.value?.honorariumPoints || 0),
);

// PARTICLES
const resizeCanvas = () => {
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
};

const createParticles = () => {
  particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
    x: Math.random() * canvas.value.width,
    y: Math.random() * canvas.value.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    opacity: Math.random() * 0.6 + 0.2,
    sparkle: Math.random() < SPARKLE_CHANCE,
  }));
};

const animate = () => {
  // subtle trails
  ctx.fillStyle = "rgba(12,5,27,0.25)";
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.value.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.value.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.sparkle
      ? `rgba(255,255,255,${Math.random()})` // sparkle effect
      : `rgba(168,85,247,${p.opacity})`;
    ctx.fill();
  });

  animationId = requestAnimationFrame(animate);
};

// FETCH MEMBER DATA
onMounted(async () => {
  try {
    const encoded = encodeURIComponent(idNumber);
    member.value = await $fetch(
      `${API_BASE}/api/techsavvies/member/id/${encoded}/`,
    );
  } catch (e) {
    console.error("FETCH ERROR:", e);
    error.value = true;
  } finally {
    loading.value = false;
  }

  ctx = canvas.value.getContext("2d");
  resizeCanvas();
  createParticles();
  animate();
  window.addEventListener("resize", resizeCanvas);

  // QR CODE
  await QRCode.toCanvas(qrCanvas.value, member.value.idNumber, { width: 140 });
  setTimeout(() => {
    verified.value = true;
  }, 1500);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", resizeCanvas);
});

function cleanImageUrl(url) {
  return url.match(/^.*\.(jpg|jpeg|png|gif|webp)/i)?.[0] || url;
}
</script>
