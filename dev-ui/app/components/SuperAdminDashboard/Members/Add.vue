<template>
  <div
    class="relative min-h-screen overflow-hidden flex items-center justify-center lg:p-6 p-2 bg-gradient-to-br from-[#090014] via-[#120024] to-[#1a0033]"
  >
    <!-- ✨ Sparkles (SSR-safe) -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(sparkle, i) in sparkles"
        :key="i"
        class="absolute w-1 h-1 rounded-full bg-violet-200/80 animate-twinkle"
        :style="sparkle"
      ></span>
    </div>

    <!-- 🪟 Card -->
    <div
      class="relative w-full max-w-6xl rounded-3xl lg:p-8 p-3 text-white bg-[#14002b]/80 backdrop-blur-xl border border-violet-500/30"
    >
      <!-- Logos -->
      <div class="flex items-center gap-x-3 w-fit mx-auto">
        <img :src="techSavvyLogo" class="w-20 h-24" />
        <img :src="workflowLogo" class="w-12 h-12" />
      </div>

      <!-- Title -->
      <h1
        class="lg:text-3xl text-lg font-extrabold lg:mb-8 mb-5 text-center bg-gradient-to-r from-violet-300 via-green-400 to-green-600 bg-clip-text text-transparent"
      >
        Tech Savvy Code Camp Membership
      </h1>

      <!-- FORM -->
      <form @submit.prevent="submitForm">
        <!-- NAME + BIRTHDATE -->
        <div class="flex flex-wrap lg:gap-4 gap-2 mb-2 lg:mb-4">
          <div class="flex-1">
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Full Name
            </label>
            <div class="lg:flex gap-2">
              <input
                v-model="form.firstname"
                placeholder="First Name"
                class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
              />
              <input
                v-model="form.middlename"
                placeholder="Middle Name"
                class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
              />
              <input
                v-model="form.lastname"
                placeholder="Last Name"
                class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
              />
            </div>
          </div>

          <div class="lg:w-48 w-full">
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Birthdate
            </label>
            <input
              v-model="form.birthdate"
              type="date"
              class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
            />
          </div>
        </div>

        <!-- CONTACT -->
        <div class="grid md:grid-cols-3 gap-2 lg:gap-4 mb-2 lg:mb-4">
          <div>
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Mobile
            </label>
            <input
              v-model="form.mobile"
              placeholder="09xxxxxxxxx"
              class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
            />
          </div>

          <div>
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Email
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Gmail"
              class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
            />
          </div>

          <div>
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Website / GitHub
            </label>
            <input
              v-model="form.website"
              placeholder="https://github.com/username"
              class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
            />
          </div>
        </div>

        <!-- ROLE + ID + PHOTO -->
        <div class="lg:flex gap-2 lg:gap-4 w-full">
          <div class="lg:w-6/12 w-full mb-2 lg:mb-0">
            <label class="block text-xs mb-1 text-violet-300 font-bold">
              Profile Picture
            </label>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="w-full rounded-lg bg-violet-900/40 border border-violet-500/30 px-2 py-1 text-xs"
            />
          </div>

          <div class="w-full flex gap-x-2">
            <div class="w-full">
              <label class="block text-xs mb-1 text-violet-300 font-bold">
                Role
              </label>
              <input
                v-model="form.role"
                placeholder="Participant"
                class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
              />
            </div>

            <div class="lg:w-6/12 w-full">
              <label class="block text-xs mb-1 text-violet-300 font-bold">
                ID Number
              </label>
              <input
                v-model="form.idNumber"
                required
                placeholder="Approved ID"
                class="w-full px-2 py-1 lg:py-2 lg:text-sm text-[10px] bg-white text-black rounded-sm"
              />
            </div>
          </div>
        </div>

        <!-- SUBMIT -->
        <button
          type="submit"
          :disabled="loading"
          class="lg:mt-10 mt-7 w-full rounded-xl py-2 font-semibold tracking-wide bg-gradient-to-r from-violet-600 via-green-600 to-violet-600 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(139,92,246,0.9)] transition-all disabled:opacity-50 text-xs lg:text-sm"
        >
          <i class="fa fa-paper-plane mr-2"></i>
          {{ loading ? "Saving..." : "Submit Member" }}
        </button>
      </form>

      <!-- SUCCESS -->
      <p v-if="success" class="mt-4 text-green-400 font-medium text-center">
        ✅ Member added successfully!
      </p>
        <p v-if="success" class=" text-green-400 font-medium text-center text-xs">
      Please Check your email. Thank you!
      </p>

      <!-- ERROR -->
      <pre
        v-if="error"
        class="mt-4 text-red-400 text-xs whitespace-pre-wrap text-center"
      >
        ❌ {{ error }}
      </pre>
    </div>
  </div>
</template>

<script setup>
// Get API base URL from runtime config
const config = useRuntimeConfig();
const API_BASE = computed(() => String(config.public.apiBase || '').replace(/\/$/, ''));

const techSavvyLogo =
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png";
const workflowLogo =
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png";

const loading = ref(false);
const success = ref(false);
const error = ref("");
const fileInput = ref(null);

/* ✨ Sparkles (client-only generation) */
const sparkles = ref([]);

onMounted(() => {
  sparkles.value = Array.from({ length: 35 }, () => ({
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animationDelay: Math.random() * 6 + "s",
  }));
});

const form = ref({
  firstname: "",
  middlename: "",
  lastname: "",
  birthdate: "",
  role: "Participant",
  idNumber: "",
  mobile: "",
  email: "",
  website: "",
  gcashPoints: 0,
  bonusPoints: 0,
  voucherPoints: 0,
  honorariumPoints: 0,
  numberOfProjects: 0,
});

function formatMemberCreateError (err) {
  const d = err?.data ?? err?.response?._data;
  if (!d) return err?.message || "Request failed";
  if (typeof d === "string") return d;
  if (d.detail) return typeof d.detail === "string" ? d.detail : JSON.stringify(d.detail);
  if (d.message) return d.message;
  const fieldErrors = d.non_field_errors || d;
  if (typeof fieldErrors === "object") {
    const parts = [];
    for (const [k, v] of Object.entries(fieldErrors)) {
      if (Array.isArray(v)) parts.push(`${k}: ${v.join(", ")}`);
      else if (v) parts.push(`${k}: ${v}`);
    }
    if (parts.length) return parts.join("\n");
  }
  return JSON.stringify(d);
}

const submitForm = async () => {
  loading.value = true;
  success.value = false;
  error.value = "";

  const base = API_BASE.value;
  if (!base) {
    error.value = "NUXT_PUBLIC_API_BASE is not set. Add your API URL to .env.";
    loading.value = false;
    return;
  }

  try {
    const formData = new FormData();

    Object.entries(form.value).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;
      formData.append(key, typeof value === "number" || typeof value === "boolean" ? String(value) : value);
    });

    if (fileInput.value?.files?.length) {
      formData.append("profilePicture", fileInput.value.files[0]);
    }

    await $fetch(`${base}/api/techsavvies/member/create/`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    success.value = true;

    Object.keys(form.value).forEach((key) => {
      if (key.includes("Points") || key === "numberOfProjects") {
        form.value[key] = 0;
      } else if (key === "role") {
        form.value[key] = "Participant";
      } else {
        form.value[key] = "";
      }
    });

    if (fileInput.value) fileInput.value.value = null;
  } catch (err) {
    error.value = formatMemberCreateError(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.25;
    transform: scale(0.6);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

.animate-twinkle {
  animation: twinkle 4s infinite ease-in-out;
}
</style>
