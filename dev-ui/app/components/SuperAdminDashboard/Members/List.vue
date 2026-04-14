<template>
  <div class="relative bg-white w-full overflow-hidden flex flex-col items-center">
    <!-- Header Controls (Admin Only) -->
    <div v-if="isAdmin" class="mb-6 flex w-full min-w-0 flex-col justify-between gap-4 px-0 sm:mb-10 sm:gap-6 lg:flex-row lg:items-center lg:px-0">
      <div class="min-w-0 flex-1 space-y-1.5">
        <h1 class="text-2xl font-black uppercase leading-none tracking-tighter text-[#1a0533] sm:text-3xl lg:text-4xl">all Community Members</h1>
        <div class="flex items-center gap-3">
           <span class="text-[10px] font-black text-violet-900 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-lg border border-violet-100">{{ filteredMembers.length }} Community Members</span>
           <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
      
      <div class="flex min-w-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
         <button
           type="button"
           class="h-11 w-full shrink-0 rounded-xl border px-6 text-[10px] font-black uppercase tracking-widest transition-all sm:w-auto"
           :class="roleFilter === 'participants'
             ? 'border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-600/20'
             : 'border-violet-200 bg-white text-violet-700 hover:bg-violet-50'"
           @click="toggleParticipantView"
         >
           {{ roleFilter === 'participants' ? 'View Members' : 'View Participants' }}
         </button>
         <div class="relative min-w-0 flex-1 group sm:max-w-md">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 group-focus-within:text-violet-600 transition-colors" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Filter by name, ID or email..."
              class="w-full h-11 pl-11 pr-4 rounded-xl border-2 border-violet-50 focus:border-violet-200 focus:bg-violet-50/30 transition-all outline-none text-[11px] font-bold uppercase tracking-widest text-[#1a0533] placeholder:text-violet-200"
            />
         </div>
         <button
           type="button"
           class="h-11 w-full shrink-0 rounded-xl bg-violet-600 px-6 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-violet-600/20 transition-all hover:scale-[1.02] active:scale-95 sm:w-auto sm:px-8"
          @click="openAddModal"
         >
           Add Member
         </button>
      </div>
    </div>

    <!-- Member registry: stacked cards (small screens) + table (md+) — no horizontal scroll -->
    <div class="w-full border-2 border-violet-50 overflow-hidden bg-white shadow-sm">
      <div class="md:hidden divide-y divide-violet-50">
        <button
          v-for="member in filteredMembers"
          :key="`card-${member.id}`"
          type="button"
          class="flex w-full min-w-0 flex-col gap-3 p-4 text-left transition-colors hover:bg-violet-50/50"
          :class="{ 'cursor-pointer': isAdmin }"
          @click="isAdmin ? openDetails(member) : null"
        >
          <div class="flex min-w-0 items-center gap-3">
            <img
              :src="cleanImageUrl(member.profilePicture)"
              alt=""
              class="h-12 w-12 shrink-0 rounded-2xl border-2 border-violet-50 object-cover"
            >
            <div class="min-w-0 flex-1">
              <p class="text-sm font-black uppercase tracking-tight text-[#1a0533]">
                {{ member.firstname }} {{ member.lastname }}
              </p>
              <p class="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-violet-400">
                {{ member.idNumber || '—' }}
              </p>
            </div>
            <div class="shrink-0 flex flex-col items-end gap-1.5">
              <span
                class="rounded-lg border px-2 py-1 text-[8px] font-black uppercase tracking-widest"
                :class="getRoleColor(member.role)"
              >
                {{ member.role || 'Member' }}
              </span>
              <button
                v-if="isAdmin && isParticipantRole(member.role)"
                type="button"
                class="rounded-lg border border-violet-200 bg-violet-50 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-violet-700 transition-colors hover:bg-violet-600 hover:text-white"
                @click.stop="promoteParticipant(member)"
              >
                Make Member
              </button>
            </div>
          </div>
          <div class="space-y-1 pl-[3.75rem] text-xs">
            <p class="break-all font-bold text-[#1a0533]">
              <i class="far fa-envelope mr-1 text-violet-300" aria-hidden="true" />
              {{ member.email || '—' }}
            </p>
            <p class="font-black uppercase tracking-wide text-violet-400">
              <i class="fas fa-phone-alt mr-1 text-[8px]" aria-hidden="true" />
              {{ member.mobile || '—' }}
            </p>
          </div>
        </button>
      </div>

      <div class="hidden overflow-x-hidden md:block">
        <table class="w-full table-fixed border-collapse text-left">
          <thead class="border-b border-violet-100 bg-violet-100">
            <tr>
              <th class="w-[38%] py-3 pl-4 pr-2 text-[10px] font-black uppercase tracking-widest text-violet-900 lg:pl-6">
                Member Profile
              </th>
              <th class="w-[28%] py-3 px-2 text-[10px] font-black uppercase tracking-widest text-violet-900 lg:px-4">
                Member Identity
              </th>
              <th class="w-[34%] py-3 pl-2 pr-4 text-[10px] font-black uppercase tracking-widest text-violet-900 lg:pr-6">
                Verified Contact
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-violet-50">
            <tr
              v-for="member in filteredMembers"
              :key="member.id"
              class="group/row transition-colors hover:bg-violet-50/40"
              :class="{ 'cursor-pointer': isAdmin }"
              @click="isAdmin ? openDetails(member) : null"
            >
              <td class="py-4 pl-4 pr-2 align-top lg:pl-6">
                <div class="flex min-w-0 items-center gap-3">
                  <img
                    :src="cleanImageUrl(member.profilePicture)"
                    alt=""
                    class="h-11 w-11 shrink-0 rounded-2xl border-2 border-violet-50 object-cover"
                  >
                  <p class="min-w-0 break-words text-sm font-black uppercase leading-tight tracking-tight text-[#1a0533]">
                    {{ member.firstname }} {{ member.lastname }}
                  </p>
                </div>
              </td>
              <td class="px-2 py-4 align-top lg:px-4">
                <div class="min-w-0 space-y-1.5">
                  <p class="break-all text-[10px] font-bold uppercase tracking-widest text-violet-400">
                    {{ member.idNumber || '—' }}
                  </p>
                  <span
                    class="inline-block rounded-lg border px-2 py-0.5 text-[8px] font-black uppercase tracking-widest"
                    :class="getRoleColor(member.role)"
                  >
                    {{ member.role || 'Member' }}
                  </span>
                  <button
                    v-if="isAdmin && isParticipantRole(member.role)"
                    type="button"
                    class="mt-2 inline-flex rounded-lg border border-violet-200 bg-violet-50 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-violet-700 transition-colors hover:bg-violet-600 hover:text-white"
                    @click.stop="promoteParticipant(member)"
                  >
                    Make Member
                  </button>
                </div>
              </td>
              <td class="py-4 pl-2 pr-4 align-top lg:pr-6">
                <div class="min-w-0 space-y-1.5">
                  <p class="break-all text-xs font-bold leading-snug text-[#1a0533]">
                    <i class="far fa-envelope mr-1 text-violet-300" aria-hidden="true" />
                    {{ member.email || '—' }}
                  </p>
                  <p class="break-all text-[10px] font-black uppercase tracking-wide text-violet-400">
                    <i class="fas fa-phone-alt mr-1 text-[8px]" aria-hidden="true" />
                    {{ member.mobile || '—' }}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 💎 Premium Details Modal -->
    <Teleport to="body">
       <Transition name="overlay">
          <div v-if="showModal" class="fixed inset-0 z-[200] bg-[#1a0533]/20 backdrop-blur-3xl flex items-center justify-center p-6" @click="closeModal">
             <div class="relative bg-white border-2 border-violet-100 rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500" @click.stop>
                <!-- Modal Header -->
                <div class="p-10 border-b border-violet-50 flex items-center justify-between">
                   <div class="flex items-center gap-6">
                      <img :src="cleanImageUrl(selectedMember.profilePicture)" class="w-16 h-16 rounded-[1.5rem] object-cover border-2 border-violet-50" />
                      <div class="space-y-1">
                         <h2 class="text-2xl font-black text-[#1a0533] uppercase tracking-tighter leading-none">{{ selectedMember.firstname }} {{ selectedMember.lastname }}</h2>
                         <p class="text-[10px] font-bold text-violet-900 uppercase tracking-widest">{{ selectedMember.role || 'General Member' }} • ID: {{ selectedMember.idNumber }}</p>
                      </div>
                   </div>
                   <button @click="closeModal" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-violet-50 text-violet-900 hover:text-red-500 transition-all"><i class="fas fa-times text-lg" /></button>
                </div>

                <!-- Modal Content -->
                <div class="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                   <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <!-- Basic Info -->
                      <div class="space-y-6">
                         <h3 class="text-[10px] font-black text-violet-200 uppercase tracking-[0.2em] border-b border-violet-50 pb-2">Profile & Records</h3>
                         <div class="grid gap-4">
                            <div class="space-y-1.5">
                               <label class="text-[9px] font-black text-violet-300 uppercase block">Full Registered Name</label>
                               <input v-model="selectedMember.firstname" class="w-full bg-violet-50/30 border border-transparent focus:border-violet-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1a0533] outline-none" @blur="syncField('firstname')" />
                            </div>
                            <div class="space-y-1.5">
                               <label class="text-[9px] font-black text-violet-300 uppercase block">Email Address</label>
                               <input v-model="selectedMember.email" class="w-full bg-violet-50/30 border border-transparent focus:border-violet-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1a0533] outline-none" @blur="syncField('email')" />
                            </div>
                            <div class="space-y-1.5">
                               <label class="text-[9px] font-black text-violet-300 uppercase block">Birthdate (YYYY-MM-DD)</label>
                               <input v-model="selectedMember.birthdate" class="w-full bg-violet-50/30 border border-transparent focus:border-violet-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1a0533] outline-none" @blur="syncField('birthdate')" />
                            </div>
                         </div>
                      </div>

                      <!-- Points & Projects -->
                      <div class="space-y-6">
                         <h3 class="text-[10px] font-black text-violet-200 uppercase tracking-[0.2em] border-b border-violet-50 pb-2">Account Vault</h3>
                         <div class="grid grid-cols-2 gap-4">
                            <div class="bg-violet-50/30 p-4 rounded-3xl border border-violet-100/50 space-y-2">
                               <label class="text-[8px] font-black text-violet-900 uppercase leading-none">GCash Points</label>
                               <div class="flex items-center gap-1">
                                  <span class="text-xs font-black text-violet-300">₱</span>
                                  <input type="number" v-model.number="selectedMember.gcashPoints" class="bg-transparent border-none p-0 text-lg font-black text-violet-600 w-full focus:ring-0" @blur="syncField('gcashPoints')" />
                               </div>
                            </div>
                            <div class="bg-violet-50/30 p-4 rounded-3xl border border-violet-100/50 space-y-2">
                               <label class="text-[8px] font-black text-violet-900 uppercase leading-none">Bonus Awards</label>
                               <div class="flex items-center gap-1">
                                  <span class="text-xs font-black text-violet-300">₱</span>
                                  <input type="number" v-model.number="selectedMember.bonusPoints" class="bg-transparent border-none p-0 text-lg font-black text-violet-600 w-full focus:ring-0" @blur="syncField('bonusPoints')" />
                               </div>
                            </div>
                            <div class="bg-sky-50/30 p-4 rounded-3xl border border-sky-100/50 space-y-2">
                               <label class="text-[8px] font-black text-sky-400 uppercase leading-none">Voucher Fund</label>
                               <div class="flex items-center gap-1">
                                  <input type="number" v-model.number="selectedMember.voucherPoints" class="bg-transparent border-none p-0 text-lg font-black text-sky-600 w-full focus:ring-0" @blur="syncField('voucherPoints')" />
                               </div>
                            </div>
                            <div class="bg-amber-50/30 p-4 rounded-3xl border border-amber-100/50 space-y-2">
                               <label class="text-[8px] font-black text-amber-400 uppercase leading-none">Global Projects</label>
                               <div class="flex items-center gap-1">
                                  <input type="number" v-model.number="selectedMember.numberOfProjects" class="bg-transparent border-none p-0 text-lg font-black text-amber-600 w-full focus:ring-0" @blur="syncField('numberOfProjects')" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Modal Footer -->
                <div class="p-10 bg-violet-50/30 flex items-center justify-between">
                   <p class="text-[9px] font-bold text-violet-300 uppercase tracking-widest italic">All changes are synced live to the community vault.</p>
                   <button @click="closeModal" class="h-12 px-8 rounded-2xl bg-[#1a0533] text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all">Close Vault</button>
                </div>
             </div>
          </div>
       </Transition>
    </Teleport>

    <!-- ✨ Add Member Modal -->
    <Teleport to="body">
      <Transition name="overlay">
        <div
          v-if="showAddModal"
          class="fixed inset-0 z-[220] flex items-center justify-center bg-[#1a0533]/40 p-4 backdrop-blur-sm sm:p-6"
          @click="closeAddModal"
        >
          <div
            class="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-violet-200/70 bg-white shadow-2xl sm:rounded-[2.5rem]"
            @click.stop
          >
            <div class="border-b border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 px-5 py-4 sm:px-8 sm:py-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-[0.2em] text-violet-500">Member Registry</p>
                  <h2 class="mt-1 text-xl font-black uppercase tracking-tight text-[#1a0533] sm:text-2xl">Add Community Member</h2>
                  <p class="mt-1 text-xs text-violet-700/80">Create a new member profile without leaving this page.</p>
                </div>
                <button
                  type="button"
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-violet-100 transition-colors hover:bg-violet-100 hover:text-violet-900"
                  @click="closeAddModal"
                >
                  <i class="fas fa-times text-sm" />
                </button>
              </div>
            </div>

            <form class="max-h-[72vh] overflow-y-auto p-5 custom-scrollbar sm:p-8" @submit.prevent="submitAddMember">
              <div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                <div class="md:col-span-2">
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Full Name</label>
                  <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <input
                      v-model="addForm.firstname"
                      required
                      placeholder="First Name"
                      class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                    >
                    <input
                      v-model="addForm.middlename"
                      placeholder="Middle Name"
                      class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                    >
                    <input
                      v-model="addForm.lastname"
                      required
                      placeholder="Last Name"
                      class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                    >
                  </div>
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Birthdate</label>
                  <input
                    v-model="addForm.birthdate"
                    type="date"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Mobile Number</label>
                  <input
                    v-model="addForm.mobile"
                    placeholder="09xxxxxxxxx"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Email</label>
                  <input
                    v-model="addForm.email"
                    type="email"
                    placeholder="name@email.com"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Website / GitHub</label>
                  <input
                    v-model="addForm.website"
                    placeholder="https://github.com/username"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Role</label>
                  <input
                    v-model="addForm.role"
                    placeholder="Participant"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div>
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">ID Number</label>
                  <input
                    v-model="addForm.idNumber"
                    required
                    placeholder="Approved ID"
                    class="h-11 w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 text-sm font-semibold text-[#1a0533] outline-none transition-colors focus:border-violet-300 focus:bg-white"
                  >
                </div>

                <div class="md:col-span-2">
                  <label class="mb-1 block text-[10px] font-black uppercase tracking-widest text-violet-500">Profile Picture</label>
                  <input
                    ref="addFileInput"
                    type="file"
                    accept="image/*"
                    class="w-full rounded-xl border border-violet-100 bg-violet-50/40 px-3 py-2 text-xs font-semibold text-violet-900 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-1.5 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:text-white hover:file:bg-violet-700"
                  >
                </div>
              </div>

              <div v-if="addError" class="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 whitespace-pre-wrap">
                {{ addError }}
              </div>
              <div v-if="addSuccess" class="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                Member added successfully.
              </div>

              <div class="mt-6 flex flex-col-reverse items-stretch gap-3 border-t border-violet-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  class="h-11 rounded-xl border border-violet-200 px-5 text-[10px] font-black uppercase tracking-widest text-violet-700 transition-colors hover:bg-violet-50"
                  @click="closeAddModal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="addLoading"
                  class="h-11 rounded-xl bg-violet-600 px-6 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ addLoading ? 'Saving Member...' : 'Create Member' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Hidden Inputs -->
    <div v-if="isAdmin" class="hidden">
       <input 
          v-for="member in members" :key="`file-${member.id}`"
          type="file" :ref="el => fileInputs[member.id] = el"
          accept="image/*" @change="handleProfilePictureUpload(member.id, $event)"
       />
    </div>

    <!-- Status Toast System -->
    <Transition name="toast">
      <div v-if="isSaving" class="fixed bottom-10 right-10 flex items-center gap-4 bg-[#1a0533] text-white px-8 py-5 rounded-[2rem] shadow-2xl z-[300]">
         <div class="relative w-5 h-5 flex items-center justify-center">
            <div class="absolute inset-0 border-2 border-white/20 rounded-full" />
            <div class="absolute inset-0 border-2 border-green-400 rounded-full border-t-transparent animate-spin" />
         </div>
         <div class="space-y-0.5">
            <p class="text-[10px] font-black uppercase tracking-widest leading-none">Vault Synced</p>
            <p class="text-[8px] font-medium text-white/50 uppercase tracking-[0.2em] leading-none">Updating community records...</p>
         </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  isAdmin: { type: Boolean, default: false }
});

const config = useRuntimeConfig();

const API_BASE = computed(() => String(config.public.apiBase || '').replace(/\/$/, ''));

const members = ref([]);
const selectedMember = ref(null);
const showModal = ref(false);
const showAddModal = ref(false);
const savingStates = ref({});
const uploadingStates = ref({});
const fileInputs = ref({});
const addFileInput = ref(null);
const searchQuery = ref('');
const roleFilter = ref('members');
const addLoading = ref(false);
const addSuccess = ref(false);
const addError = ref('');
const addForm = ref({
  firstname: '',
  middlename: '',
  lastname: '',
  birthdate: '',
  role: 'Participant',
  idNumber: '',
  mobile: '',
  email: '',
  website: '',
  gcashPoints: 0,
  bonusPoints: 0,
  voucherPoints: 0,
  honorariumPoints: 0,
  numberOfProjects: 0
});

const isSaving = computed(() => Object.keys(savingStates.value).some(k => savingStates.value[k] === 'saving'));

const filteredMembers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  return members.value.filter((m) => {
    const matchesRole = roleFilter.value === 'participants'
      ? isParticipantRole(m.role)
      : !isParticipantRole(m.role);
    if (!matchesRole) return false;
    if (!q) return true;
    return (
      m.firstname?.toLowerCase().includes(q) ||
      m.lastname?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.idNumber?.toLowerCase().includes(q)
    );
  });
});

onMounted(async () => {
  await fetchMembers();
});

function normalizeMemberList (raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object' && Array.isArray(raw.results)) return raw.results;
  return [];
}

const fetchMembers = async () => {
  const base = API_BASE.value;
  if (!base) return;
  try {
    const raw = await $fetch(`${base}/api/techsavvies/member/list/`);
    members.value = normalizeMemberList(raw);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
};

const openDetails = (member) => {
  selectedMember.value = { ...member };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

function isParticipantRole (role) {
  return String(role || '').toLowerCase().includes('parti');
}

function toggleParticipantView () {
  roleFilter.value = roleFilter.value === 'participants' ? 'members' : 'participants';
}

function resetAddForm () {
  addForm.value = {
    firstname: '',
    middlename: '',
    lastname: '',
    birthdate: '',
    role: 'Participant',
    idNumber: '',
    mobile: '',
    email: '',
    website: '',
    gcashPoints: 0,
    bonusPoints: 0,
    voucherPoints: 0,
    honorariumPoints: 0,
    numberOfProjects: 0
  };
  if (addFileInput.value) addFileInput.value.value = '';
}

function openAddModal () {
  addError.value = '';
  addSuccess.value = false;
  showAddModal.value = true;
}

function closeAddModal () {
  showAddModal.value = false;
  addLoading.value = false;
}

function formatMemberCreateError (err) {
  const d = err?.data ?? err?.response?._data;
  if (!d) return err?.message || 'Request failed';
  if (typeof d === 'string') return d;
  if (d.detail) return typeof d.detail === 'string' ? d.detail : JSON.stringify(d.detail);
  if (d.message) return d.message;
  const fieldErrors = d.non_field_errors || d;
  if (typeof fieldErrors === 'object') {
    const parts = [];
    for (const [k, v] of Object.entries(fieldErrors)) {
      if (Array.isArray(v)) parts.push(`${k}: ${v.join(', ')}`);
      else if (v) parts.push(`${k}: ${v}`);
    }
    if (parts.length) return parts.join('\n');
  }
  return JSON.stringify(d);
}

async function submitAddMember () {
  addLoading.value = true;
  addSuccess.value = false;
  addError.value = '';
  const base = API_BASE.value;
  if (!base) {
    addError.value = 'NUXT_PUBLIC_API_BASE is not set. Add your API URL to .env.';
    addLoading.value = false;
    return;
  }

  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(addForm.value)) {
      if (value === '' || value === null || value === undefined) continue;
      formData.append(key, typeof value === 'number' || typeof value === 'boolean' ? String(value) : value);
    }
    if (addFileInput.value?.files?.length) {
      formData.append('profilePicture', addFileInput.value.files[0]);
    }

    await $fetch(`${base}/api/techsavvies/member/create/`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    });

    await fetchMembers();
    addSuccess.value = true;
    resetAddForm();
    setTimeout(() => {
      closeAddModal();
      addSuccess.value = false;
    }, 900);
  } catch (err) {
    addError.value = formatMemberCreateError(err);
  } finally {
    addLoading.value = false;
  }
}

async function promoteParticipant (member) {
  if (!member?.id || !isParticipantRole(member.role)) return;
  await updateField(member.id, 'role', 'Member');
  member.role = 'Member';
  if (selectedMember.value?.id === member.id) {
    selectedMember.value.role = 'Member';
  }
}

const syncField = async (fieldName) => {
  if (!selectedMember.value) return;
  await updateField(selectedMember.value.id, fieldName, selectedMember.value[fieldName]);
};

const cleanImageUrl = (url) => {
  if (!url) return 'https://ui-avatars.com/api/?background=f1f5f9&color=1a0533&name=User';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = API_BASE.value;
  if (!base) return 'https://ui-avatars.com/api/?background=f1f5f9&color=1a0533&name=User';
  if (url.startsWith('/')) return `${base}${url}`;
  return `${base}/media/${url}`;
};

const getRoleColor = (role) => {
  const r = (role || '').toLowerCase();
  if (r.includes('admin')) return 'bg-violet-50 text-violet-600 border-violet-100';
  if (r.includes('mentor') || r.includes('lead')) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (r.includes('parti')) return 'bg-sky-50 text-sky-600 border-sky-100';
  if (r.includes('spons')) return 'bg-rose-50 text-rose-600 border-rose-100';
  return 'bg-gray-50 text-gray-500 border-gray-100';
};

const triggerFileUpload = (memberId) => {
  const input = fileInputs.value[memberId];
  if (input) input.click();
};

const handleProfilePictureUpload = async (memberId, event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    uploadingStates.value[memberId] = true;
    const formData = new FormData();
    formData.append("profilePicture", file);
    await $fetch(`${API_BASE.value}/api/techsavvies/member/${memberId}/update/`, { method: 'PATCH', body: formData });
    await fetchMembers();
  } catch (error) {
    console.error("Error uploading profile picture:", error);
  } finally {
    uploadingStates.value[memberId] = false;
  }
};

const updateField = async (memberId, fieldName, value) => {
  const stateKey = `${memberId}-${fieldName}`;
  try {
    savingStates.value[stateKey] = 'saving';
    const formData = new FormData();
    formData.append(fieldName, value === null || value === undefined ? '' : String(value));
    await $fetch(`${API_BASE.value}/api/techsavvies/member/${memberId}/update/`, { method: 'PATCH', body: formData });
    savingStates.value[stateKey] = 'saved';
    
    // Update local members list
    const mIdx = members.value.findIndex(m => m.id === memberId);
    if (mIdx !== -1) members.value[mIdx][fieldName] = value;

    setTimeout(() => { delete savingStates.value[stateKey]; }, 2000);
  } catch (error) {
    console.error(`Error updating ${fieldName}:`, error);
    savingStates.value[stateKey] = 'error';
  }
};
</script>

<style scoped>
.font-roboto { font-family: 'Roboto', sans-serif; }
.custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 10px; }

.overlay-enter-active, .overlay-leave-active { transition: opacity 0.4s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.toast-enter-active, .toast-leave-active { transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
.toast-enter-from { opacity: 0; transform: translateX(50px); }
.toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
