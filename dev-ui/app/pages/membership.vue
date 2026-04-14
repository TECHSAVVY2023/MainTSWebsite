<template>
  <div class="membership-page">
    <!-- Background blobs -->
    <div class="blob blob-tl" />
    <div class="blob blob-br" />

    <!-- Sparkles -->
    <span
      v-for="(sp, i) in sparkles"
      :key="i"
      class="sparkle"
      :style="sp"
    />

    <!-- Back to Home — fixed top-left -->
    <NuxtLink to="/" class="back-btn">
      <i class="fas fa-arrow-left" /> Back to Home
    </NuxtLink>

    <div class="page-inner">

      <!-- ── LEFT: hero copy ── -->
      <aside class="hero-col">
        <span class="season-badge">
          <span class="badge-dot" />
          Season 4 · 2026
        </span>

        <h1 class="hero-title">
          Join Tech Savvy<br />
          <span class="hero-gradient">Code Camp</span>
        </h1>

        <p class="hero-sub">
          Become part of the community, get hands-on with real projects, and
          build your full-stack journey with us.
        </p>

        <ul class="perk-list">
          <li v-for="perk in perks" :key="perk.text">
            <span class="perk-icon"><i :class="perk.icon" /></span>
            {{ perk.text }}
          </li>
        </ul>
      </aside>

      <!-- ── RIGHT: form card ── -->
      <main class="form-card">

        <!-- Card header strip -->
        <div class="card-header">
          <div class="card-header-icon"><i class="fas fa-user-plus" /></div>
          <div>
            <p class="card-header-label">Application</p>
            <h2 class="card-header-title">Tech Savvy Code Camp Membership</h2>
          </div>
        </div>

        <form class="form-body" @submit.prevent="submitForm">

          <!-- Row 1: two columns -->
          <div class="form-grid">

            <!-- LEFT COLUMN -->
            <div class="form-col">
              <p class="col-heading"><i class="fas fa-id-card" /> Personal Info</p>

              <div class="field-group">
                <label>First Name</label>
                <div class="field-wrap">
                  <i class="fas fa-user field-icon" />
                  <input v-model="form.firstname" type="text" placeholder="Enter first name" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Middle Name</label>
                <div class="field-wrap">
                  <i class="fas fa-user field-icon" />
                  <input v-model="form.middlename" type="text" placeholder="Enter middle name" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Last Name</label>
                <div class="field-wrap">
                  <i class="fas fa-user field-icon" />
                  <input v-model="form.lastname" type="text" placeholder="Enter last name" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Birthdate</label>
                <div class="field-wrap">
                  <i class="fas fa-calendar field-icon" />
                  <input v-model="form.birthdate" type="date" class="field-input" />
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="form-col">
              <p class="col-heading"><i class="fas fa-address-book" /> Contact & Online</p>

              <div class="field-group">
                <label>Mobile Number</label>
                <div class="field-wrap">
                  <i class="fas fa-phone field-icon" />
                  <input v-model="form.mobile" type="text" placeholder="09xxxxxxxxx" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Email Address</label>
                <div class="field-wrap">
                  <i class="fas fa-envelope field-icon" />
                  <input v-model="form.email" type="email" placeholder="you@example.com" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Website / GitHub / Social</label>
                <div class="field-wrap">
                  <i class="fas fa-link field-icon" />
                  <input v-model="form.website" type="url" placeholder="https://github.com/username" class="field-input" />
                </div>
              </div>

              <div class="field-group">
                <label>Profile Picture</label>
                <label class="file-drop" :class="{ 'file-drop--has': selectedFileName }">
                  <input ref="fileInput" type="file" accept="image/*" class="file-native" @change="onFileChange" />
                  <i class="fas fa-cloud-upload-alt file-drop-icon" />
                  <span class="file-drop-text">
                    {{ selectedFileName || 'Click or drag image here' }}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <button type="submit" :disabled="loading" class="submit-btn">
            <span v-if="loading" class="btn-inner">
              <i class="fas fa-spinner fa-spin" /> Processing…
            </span>
            <span v-else class="btn-inner">
              <i class="fas fa-paper-plane" /> Submit Application
            </span>
          </button>

          <!-- Feedback -->
          <transition name="fade">
            <div v-if="success" class="feedback feedback--ok">
              <i class="fas fa-check-circle" />
              Member added! Please check your email.
            </div>
          </transition>

          <transition name="fade">
            <div v-if="error" class="feedback feedback--err">
              <i class="fas fa-exclamation-circle" />
              {{ error }}
            </div>
          </transition>

        </form>
      </main>

    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const API_BASE = computed(() => String(config.public.apiBase || '').replace(/\/$/, ''));


const loading = ref(false);
const success = ref(false);
const error = ref("");
const fileInput = ref(null);
const selectedFileName = ref("");

const sparkles = ref([]);
onMounted(() => {
  sparkles.value = Array.from({ length: 28 }, () => ({
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animationDelay: Math.random() * 7 + "s",
    width: Math.random() * 3 + 1 + "px",
    height: Math.random() * 3 + 1 + "px",
  }));
});

const perks = [
  { icon: "fas fa-laptop-code", text: "Hands-on fullstack workshops & bootcamps" },
  { icon: "fas fa-users",       text: "50+ active community members" },
  { icon: "fas fa-rocket",      text: "Real-world project mentoring" },
  { icon: "fas fa-certificate", text: "Certificates for completed tracks" },
];

const form = ref({
  firstname: "", middlename: "", lastname: "",
  birthdate: "", role: "Participant",
  idNumber: "ID" + Date.now(),
  mobile: "", email: "", website: "",
  gcashPoints: 0, bonusPoints: 0, voucherPoints: 0,
  honorariumPoints: 0, numberOfProjects: 0,
});

const onFileChange = () => {
  selectedFileName.value = fileInput.value?.files?.[0]?.name || "";
};

function formatMemberCreateError (err) {
  const d = err?.data ?? err?.response?._data;
  if (!d) return err?.message || 'Request failed';
  if (typeof d === 'string') return d;
  if (d.detail) return typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail);
  if (d.message) return d.message;
  if (typeof d === 'object') {
    const parts = [];
    for (const [k, v] of Object.entries(d)) {
      if (Array.isArray(v)) parts.push(`${k}: ${v.join(', ')}`);
      else if (v != null) parts.push(`${k}: ${v}`);
    }
    if (parts.length) return parts.join('\n');
  }
  return JSON.stringify(d);
}

const submitForm = async () => {
  loading.value = true;
  success.value = false;
  error.value = '';
  const base = API_BASE.value;
  if (!base) {
    error.value = 'NUXT_PUBLIC_API_BASE is not set. Add your API URL to .env.';
    loading.value = false;
    return;
  }
  try {
    const fd = new FormData();
    // Membership signup always lands as Participant in members table.
    form.value.role = 'Participant';
    Object.entries(form.value).forEach(([k, v]) => {
      if (v === '' || v === null || v === undefined) return;
      fd.append(k, typeof v === 'number' || typeof v === 'boolean' ? String(v) : v);
    });
    if (fileInput.value?.files?.length)
      fd.append('profilePicture', fileInput.value.files[0]);

    await $fetch(`${base}/api/techsavvies/member/create/`, {
      method: 'POST', body: fd, headers: { Accept: 'application/json' },
    });

    success.value = true;
    Object.keys(form.value).forEach((k) => {
      if (k.includes('Points') || k === 'numberOfProjects') {
        form.value[k] = 0;
      } else if (k === 'role') {
        form.value[k] = 'Participant';
      } else if (k === 'idNumber') {
        form.value[k] = 'ID' + Date.now();
      } else {
        form.value[k] = '';
      }
    });
    if (fileInput.value) fileInput.value.value = null;
    selectedFileName.value = "";
  } catch (err) {
    error.value = formatMemberCreateError(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* ─── Page shell ─────────────────────────────── */
.membership-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f6ff 0%, #ede9fe 40%, #f0fdf4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 14px 20px;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', sans-serif;
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.blob-tl  { width: 420px; height: 420px; top: -120px; left: -120px; background: rgba(124,58,237,.18); }
.blob-br  { width: 520px; height: 520px; bottom: -140px; right: -140px; background: rgba(168,85,247,.13); }

.sparkle {
  position: absolute;
  border-radius: 50%;
  background: rgba(124,58,237,.5);
  pointer-events: none;
  animation: twinkle 5s ease-in-out infinite;
}
@keyframes twinkle {
  0%,100% { opacity:.15; transform:scale(.7); }
  50%      { opacity:.8;  transform:scale(1.4); }
}

/* ─── Two-column wrapper ─────────────────────── */
.page-inner {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1120px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  align-items: start;
}
@media (min-width: 900px) {
  .page-inner { grid-template-columns: 1fr 1.55fr; gap: 48px; align-items: center; }
}

/* ─── Hero left column ───────────────────────── */
.hero-col { display: flex; flex-direction: column; gap: 16px; text-align: center; align-items: center; }


.back-btn {
  position: fixed; top: calc(env(safe-area-inset-top, 0px) + 10px); left: 12px; z-index: 100;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: .72rem; font-weight: 700; color: #7c3aed;
  background: rgba(255,255,255,.85);
  border: 1.5px solid rgba(124,58,237,.25);
  padding: 6px 12px; border-radius: 999px;
  text-decoration: none;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(124,58,237,.12);
  transition: background .2s, transform .2s, border-color .2s, box-shadow .2s;
}
.back-btn:hover {
  background: rgba(255,255,255,1);
  border-color: rgba(124,58,237,.5);
  box-shadow: 0 6px 20px rgba(124,58,237,.2);
  transform: translateX(-3px);
}

.season-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: #7c3aed; color: #fff;
  font-size: .7rem; font-weight: 800; letter-spacing: .15em; text-transform: uppercase;
  padding: 6px 14px; border-radius: 999px;
  box-shadow: 0 4px 14px rgba(124,58,237,.35);
  width: fit-content;
}
.badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #fbbf24; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }

.hero-title {
  font-size: clamp(1.75rem, 7vw, 2.9rem);
  font-weight: 900;
  line-height: 1.15;
  color: #1a0533;
  margin: 0;
}
.hero-gradient {
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-size: .92rem;
  color: #6b7280;
  line-height: 1.6;
  max-width: 38ch;
  margin: 0;
}

.perk-list { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 420px; }
.perk-list li {
  display: flex; align-items: center; gap: 12px;
  font-size: .84rem; font-weight: 600; color: #374151;
  text-align: left;
}
.perk-icon {
  width: 34px; height: 34px; border-radius: 10px;
  background: linear-gradient(135deg,#ede9fe,#ddd6fe);
  display: flex; align-items: center; justify-content: center;
  color: #7c3aed; font-size: .85rem; flex-shrink: 0;
}

/* ─── Form card ──────────────────────────────── */
.form-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 16px 36px rgba(124,58,237,.1), 0 3px 12px rgba(124,58,237,.05);
  overflow: hidden;
}

.card-header {
  display: flex; align-items: center; gap: 14px;
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  padding: 14px 16px;
  position: relative; overflow: hidden;
}
.card-header::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,.1) 50%, transparent 70%);
  animation: shine 3s linear infinite;
}
@keyframes shine { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

.card-header-icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: rgba(255,255,255,.2);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 1rem; flex-shrink: 0;
}
.card-header-label { font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.7); margin: 0 0 2px; }
.card-header-title { font-size: .92rem; font-weight: 800; color: #fff; margin: 0; }

/* ─── Form body ──────────────────────────────── */
.form-body { padding: 14px; display: flex; flex-direction: column; gap: 16px; }

.form-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; gap: 18px; } }

.form-col { display: flex; flex-direction: column; gap: 14px; }

.col-heading {
  font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase;
  color: #7c3aed;
  padding-bottom: 8px;
  border-bottom: 2px solid #ede9fe;
  margin: 0 0 2px;
  display: flex; align-items: center; gap: 6px;
}

.field-group { display: flex; flex-direction: column; gap: 5px; }
.field-group label { font-size: .75rem; font-weight: 700; color: #4b5563; }

.field-wrap { position: relative; }
.field-icon {
  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
  color: #a78bfa; font-size: .8rem; pointer-events: none;
}
.field-input {
  width: 100%;
  min-height: 44px;
  padding: 10px 12px 10px 36px;
  border: 1.5px solid #e9d5ff;
  border-radius: 10px;
  font-size: .875rem;
  color: #1a0533;
  background: #faf9ff;
  outline: none;
  transition: border-color .2s, box-shadow .2s, background .2s;
  box-sizing: border-box;
}
.field-input:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 3px rgba(124,58,237,.15);
  background: #fff;
}
.field-input::placeholder { color: #c4b5fd; }

/* file drop zone */
.file-drop {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  border: 2px dashed #ddd6fe;
  border-radius: 12px;
  min-height: 86px;
  padding: 14px 12px;
  background: #faf9ff;
  cursor: pointer;
  transition: border-color .2s, background .2s;
  position: relative;
}
.file-drop:hover, .file-drop--has { border-color: #7c3aed; background: #f5f3ff; }
.file-native {
  position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%;
}
.file-drop-icon { font-size: 1.4rem; color: #a78bfa; }
.file-drop-text { font-size: .75rem; font-weight: 600; color: #7c3aed; text-align: center; word-break: break-all; }

/* submit */
.submit-btn {
  width: 100%;
  min-height: 46px;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #7c3aed, #a855f7);
  color: #fff;
  font-size: .95rem;
  font-weight: 800;
  letter-spacing: .03em;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(124,58,237,.35);
  transition: transform .2s, box-shadow .2s, opacity .2s;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(124,58,237,.45); }
.submit-btn:disabled { opacity: .6; cursor: not-allowed; }
.btn-inner { display: flex; align-items: center; justify-content: center; gap: 8px; }

/* feedback */
.feedback {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; border-radius: 10px;
  font-size: .85rem; font-weight: 600;
}
.feedback--ok  { background: #dcfce7; color: #16a34a; }
.feedback--err { background: #fee2e2; color: #dc2626; white-space: pre-wrap; align-items: flex-start; }

.fade-enter-active, .fade-leave-active { transition: opacity .35s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

@media (max-width: 640px) {
  .sparkle { opacity: .55; }
  .blob-tl { width: 280px; height: 280px; top: -90px; left: -90px; }
  .blob-br { width: 320px; height: 320px; bottom: -100px; right: -100px; }
  .card-header-title { line-height: 1.25; }
}

@media (min-width: 900px) {
  .membership-page { padding: 32px 18px; }
  .hero-col { text-align: left; align-items: flex-start; gap: 20px; }
  .form-card { border-radius: 24px; box-shadow: 0 24px 60px rgba(124,58,237,.12), 0 4px 16px rgba(124,58,237,.06); }
  .card-header { padding: 20px 24px; }
  .card-header-icon { width: 44px; height: 44px; border-radius: 12px; font-size: 1.1rem; }
  .card-header-title { font-size: 1rem; }
  .form-body { padding: 24px; gap: 20px; }
  .back-btn { top: 20px; left: 20px; font-size: .8rem; padding: 7px 16px; }
}
</style>
