<template>
  <div class="relative bg-white w-full overflow-hidden flex flex-col items-center">
    <!-- Header Controls (Admin Only) -->
    <div v-if="isAdmin" class="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6 px-4 lg:px-0">
      <div class="space-y-1.5 flex-1 min-w-0">
        <h1 class="text-3xl lg:text-4xl font-black text-[#1a0533] uppercase tracking-tighter leading-none">all Community Members</h1>
        <div class="flex items-center gap-3">
           <span class="text-[10px] font-black text-violet-900 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-lg border border-violet-100">{{ members.length }} Community Members</span>
           <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
         <div class="relative group min-w-[280px]">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-violet-300 group-focus-within:text-violet-600 transition-colors" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Filter by name, ID or email..."
              class="w-full h-11 pl-11 pr-4 rounded-xl border-2 border-violet-50 focus:border-violet-200 focus:bg-violet-50/30 transition-all outline-none text-[11px] font-bold uppercase tracking-widest text-[#1a0533] placeholder:text-violet-200"
            />
         </div>
         <button class="h-11 px-8 rounded-xl bg-violet-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-violet-600/20 hover:scale-105 active:scale-95 transition-all">Add Member</button>
      </div>
    </div>

    <!-- 💻 Member Registry Table -->
    <div class="w-full border-2 border-violet-50 overflow-hidden bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[800px]">
          <thead class="bg-violet-100 border-b border-violet-100">
            <tr>
              <th class="py-2 px-10 text-[10px] font-black text-violet-900 uppercase tracking-widest">Member Profile</th>
              <th class="py-2 px-6 text-[10px] font-black text-violet-900 uppercase tracking-widest">Member Identity</th>
              <th class="py-2 px-6 text-[10px] font-black text-violet-900 uppercase tracking-widest">Verified Contact</th>
            
            </tr>
          </thead>
          <tbody class="divide-y divide-violet-50">
            <tr v-for="member in filteredMembers" :key="member.id" class="group/row hover:bg-violet-50/40 transition-colors" :class="{'hover:cursor-pointer': isAdmin}">
              <!-- Member Profile (Avatar + Name) -->
              <td class="py-6 px-10">


                <div class="flex items-center gap-5" @click="isAdmin ? openDetails(member) : null">
                   <div class="relative w-12 h-12 shrink-0 group/photo">
                      <img :src="cleanImageUrl(member.profilePicture)" class="w-full h-full rounded-[1.25rem] object-cover border-2 border-violet-50 p-0.5 bg-white shadow-sm" />
                   </div>
                   <div class="min-w-0">
                      <p class="text-[15px] font-black text-[#1a0533] uppercase tracking-tighter truncate leading-none">{{ member.firstname }} {{ member.lastname }}</p>
                   </div>
                </div>
              </td>

              <!-- Member Identity (ID + Role) -->
              <td class="py-6 px-6">
                <div class="space-y-1.5">
                  <p class="text-[11px] font-bold text-violet-300 uppercase tracking-widest leading-none">{{ member.idNumber || '0000-000' }}</p>
                  <div class="inline-block">
                    <span 
                      class="px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border"
                      :class="getRoleColor(member.role)"
                    >
                      {{ member.role || 'Member' }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Verified Contact (Email + Contact) -->
              <td class="py-6 px-6">
                 <div class="space-y-1.5 min-w-[180px]">
                    <div class="flex items-center gap-2 group/mail cursor-pointer">
                       <i class="far fa-envelope text-[9px] text-violet-200" />
                       <p class="text-[12px] font-bold text-[#1a0533] font-roboto truncate leading-none">{{ member.email || '—' }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                       <i class="fas fa-phone-alt text-[8px] text-violet-200" />
                       <p class="text-[10px] font-black text-violet-300 tracking-wider leading-none">{{ member.mobile || '—' }}</p>
                    </div>
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
import { ref, onMounted, computed } from "vue";

const props = defineProps({
  isAdmin: { type: Boolean, default: false }
});

const config = useRuntimeConfig();
const API_BASE = `${config.public.apiBase}`;

const members = ref([]);
const selectedMember = ref(null);
const showModal = ref(false);
const savingStates = ref({});
const uploadingStates = ref({});
const fileInputs = ref({});
const searchQuery = ref('');

const isSaving = computed(() => Object.keys(savingStates.value).some(k => savingStates.value[k] === 'saving'));

const filteredMembers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return members.value;
  return members.value.filter(m => 
    m.firstname?.toLowerCase().includes(q) ||
    m.lastname?.toLowerCase().includes(q) ||
    m.email?.toLowerCase().includes(q) ||
    m.idNumber?.toLowerCase().includes(q)
  );
});

onMounted(async () => {
  await fetchMembers();
});

const fetchMembers = async () => {
  try {
    members.value = await $fetch(`${API_BASE}/techsavvy_members/member/list/`);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};

const openDetails = (member) => {
  selectedMember.value = { ...member };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const syncField = async (fieldName) => {
  if (!selectedMember.value) return;
  await updateField(selectedMember.value.id, fieldName, selectedMember.value[fieldName]);
};

const cleanImageUrl = (url) => {
  if (!url) return "https://ui-avatars.com/api/?background=f1f5f9&color=1a0533&name=User";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${config.public.apiBase}${url.startsWith("/") ? "" : "/media/"}${url}`;
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
    await $fetch(`${API_BASE}/member/${memberId}/update/`, { method: "PATCH", body: formData });
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
    formData.append(fieldName, value);
    await $fetch(`${API_BASE}/member/${memberId}/update/`, { method: 'PATCH', body: formData });
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
