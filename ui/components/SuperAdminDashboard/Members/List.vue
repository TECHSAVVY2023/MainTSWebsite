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
      class="relative w-full max-w-[95%] rounded-3xl lg:p-8 p-3 text-white bg-[#14002b]/80 backdrop-blur-xl border border-violet-500/30"
    >
      <!-- Logos -->
      <div class="flex items-center gap-x-3 w-fit mx-auto mb-6">
        <img :src="techSavvyLogo" class="w-20 h-24" />
        <img :src="workflowLogo" class="w-12 h-12" />
      </div>

      <h1 class="font-bold text-center text-3xl mb-6 text-violet-300">
        Members List
      </h1>

      <!-- Table Container -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-violet-900/50 border-b-2 border-violet-500">
              <th class="p-3 text-left text-sm font-semibold">Profile</th>
              <th class="p-3 text-left text-sm font-semibold">ID Number</th>
              <th class="p-3 text-left text-sm font-semibold">First Name</th>
              <th class="p-3 text-left text-sm font-semibold">Middle Name</th>
              <th class="p-3 text-left text-sm font-semibold">Last Name</th>
              <th class="p-3 text-left text-sm font-semibold">Birthdate</th>
              <th class="p-3 text-left text-sm font-semibold">Role</th>
              <th class="p-3 text-left text-sm font-semibold">Mobile</th>
              <th class="p-3 text-left text-sm font-semibold">Email</th>
              <th class="p-3 text-left text-sm font-semibold">Website</th>
              <th class="p-3 text-left text-sm font-semibold">GCash Points</th>
              <th class="p-3 text-left text-sm font-semibold">Bonus Points</th>
              <th class="p-3 text-left text-sm font-semibold">Voucher Points</th>
              <th class="p-3 text-left text-sm font-semibold">Honorarium Points</th>
              <th class="p-3 text-left text-sm font-semibold">Projects</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="member in members"
              :key="member.id"
              class="border-b border-violet-500/30 hover:bg-violet-900/20 transition-colors"
            >
              <!-- Profile Picture -->
              <td class="p-2">
                <div class="flex flex-col items-center gap-2">
                  <div class="relative group">
                    <img
                      :src="cleanImageUrl(member.profilePicture)"
                      class="w-16 h-16 rounded-full object-cover border-2 border-violet-500/50 cursor-pointer hover:border-violet-400 transition-colors"
                      @click="triggerFileUpload(member.id)"
                      :title="`Click to update ${member.firstname}'s profile picture`"
                    />
                    <div
                      class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      @click="triggerFileUpload(member.id)"
                    >
                      <span class="text-white text-xs">📷</span>
                    </div>
                  </div>
                  <input
                    type="file"
                    :ref="el => fileInputs[member.id] = el"
                    accept="image/*"
                    class="hidden"
                    @change="handleProfilePictureUpload(member.id, $event)"
                  />
                  <span
                    v-if="uploadingStates[member.id]"
                    class="text-xs text-yellow-400"
                  >
                    Uploading...
                  </span>
                </div>
              </td>

              <!-- ID Number (Read-only) -->
              <td class="p-2 whitespace-nowrap">
                <i class="fa fa-link text-xs mr-1"></i>
                <a :href="`/${member.idNumber}`" class="text-violet-300 text-sm font-mono hover:font-bold">
                  {{ member.idNumber }}
                </a>
              </td>

              <!-- First Name -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.firstname"
                  @blur="updateField(member.id, 'firstname', member.firstname)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-firstname`] === 'saved' }"
                />
              </td>

              <!-- Middle Name -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.middlename"
                  @blur="updateField(member.id, 'middlename', member.middlename)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-middlename`] === 'saved' }"
                />
              </td>

              <!-- Last Name -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.lastname"
                  @blur="updateField(member.id, 'lastname', member.lastname)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-lastname`] === 'saved' }"
                />
              </td>

              <!-- Birthdate -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.birthdate"
                  @blur="updateField(member.id, 'birthdate', member.birthdate)"
                  @keyup.enter="$event.target.blur()"
                  placeholder="YYYY-MM-DD"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-birthdate`] === 'saved' }"
                />
              </td>

              <!-- Role -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.role"
                  @blur="updateField(member.id, 'role', member.role)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-role`] === 'saved' }"
                />
              </td>

              <!-- Mobile -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.mobile"
                  @blur="updateField(member.id, 'mobile', member.mobile)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-mobile`] === 'saved' }"
                />
              </td>

              <!-- Email -->
              <td class="p-2">
                <input
                  type="email"
                  v-model="member.email"
                  @blur="updateField(member.id, 'email', member.email)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-email`] === 'saved' }"
                />
              </td>

              <!-- Website -->
              <td class="p-2">
                <input
                  type="text"
                  v-model="member.website"
                  @blur="updateField(member.id, 'website', member.website)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-website`] === 'saved' }"
                />
              </td>

              <!-- GCash Points -->
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="member.gcashPoints"
                  @blur="updateField(member.id, 'gcashPoints', member.gcashPoints)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-gcashPoints`] === 'saved' }"
                />
              </td>

              <!-- Bonus Points -->
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="member.bonusPoints"
                  @blur="updateField(member.id, 'bonusPoints', member.bonusPoints)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-bonusPoints`] === 'saved' }"
                />
              </td>

              <!-- Voucher Points -->
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="member.voucherPoints"
                  @blur="updateField(member.id, 'voucherPoints', member.voucherPoints)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-voucherPoints`] === 'saved' }"
                />
              </td>

              <!-- Honorarium Points -->
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="member.honorariumPoints"
                  @blur="updateField(member.id, 'honorariumPoints', member.honorariumPoints)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-honorariumPoints`] === 'saved' }"
                />
              </td>

              <!-- Number of Projects -->
              <td class="p-2">
                <input
                  type="number"
                  v-model.number="member.numberOfProjects"
                  @blur="updateField(member.id, 'numberOfProjects', member.numberOfProjects)"
                  @keyup.enter="$event.target.blur()"
                  class="w-full bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm focus:border-violet-400 focus:outline-none transition-colors"
                  :class="{ 'border-green-500': savingStates[`${member.id}-numberOfProjects`] === 'saved' }"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Status Messages -->
      <div class="mt-4 text-center text-sm">
        <p v-if="Object.keys(savingStates).some(k => savingStates[k] === 'saving')" class="text-yellow-400">
          💾 Saving changes...
        </p>
        <p v-else-if="Object.keys(savingStates).some(k => savingStates[k] === 'saved')" class="text-green-400">
          ✅ All changes saved
        </p>
        <p v-else-if="Object.keys(savingStates).some(k => savingStates[k] === 'error')" class="text-red-400">
          ❌ Error saving some changes
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const techSavvyLogo =
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png";
const workflowLogo =
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png";

// Get API base URL from runtime config
const config = useRuntimeConfig();
const API_BASE = `${config.public.apiBase}`;

/* ✨ Sparkles (client-only generation) */
const sparkles = ref([]);
const members = ref([]);
const savingStates = ref({});
const uploadingStates = ref({});
const fileInputs = ref({});

onMounted(async () => {
  sparkles.value = Array.from({ length: 35 }, () => ({
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animationDelay: Math.random() * 6 + "s",
  }));

  await fetchMembers();
});

// Fetch members from API
const fetchMembers = async () => {
  try {
    members.value = await $fetch(`${API_BASE}/techsavvy_members/member/list/`);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
};

// Clean image URL to handle relative paths
const cleanImageUrl = (url) => {
  if (!url) {
    return "https://via.placeholder.com/150?text=No+Image";
  }

  // If URL starts with http/https, return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, prepend the API base URL
  if (url.startsWith("/")) {
    return `${config.public.apiBase}${url}`;
  }

  // Otherwise, assume it's a media file path
  return `${config.public.apiBase}/media/${url}`;
};

// Trigger file input click
const triggerFileUpload = (memberId) => {
  const input = fileInputs.value[memberId];
  if (input) {
    input.click();
  }
};

// Handle profile picture upload
const handleProfilePictureUpload = async (memberId, event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file");
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert("File size must be less than 5MB");
    return;
  }

  try {
    uploadingStates.value[memberId] = true;

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("profilePicture", file);

    // Send PATCH request with file
    const response = await $fetch(`${API_BASE}/member/${memberId}/update/`, {
      method: "PATCH",
      body: formData,
    });

    // Update the member's profile picture in the local state
    const memberIndex = members.value.findIndex((m) => m.id === memberId);
    if (memberIndex !== -1 && response.profilePicture) {
      members.value[memberIndex].profilePicture = response.profilePicture;
    }

    // Show success feedback
    savingStates.value[`${memberId}-profilePicture`] = "saved";
    setTimeout(() => {
      delete savingStates.value[`${memberId}-profilePicture`];
    }, 2000);

    // Refresh the member data to get the updated image URL
    await fetchMembers();
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    alert("Failed to upload profile picture. Please try again.");
    savingStates.value[`${memberId}-profilePicture`] = "error";
    setTimeout(() => {
      delete savingStates.value[`${memberId}-profilePicture`];
    }, 3000);
  } finally {
    uploadingStates.value[memberId] = false;
    // Clear the file input
    if (fileInputs.value[memberId]) {
      fileInputs.value[memberId].value = "";
    }
  }
};

// Update a single field in real-time
const updateField = async (memberId, fieldName, value) => {
  const stateKey = `${memberId}-${fieldName}`;

  try {
    // Set saving state
    savingStates.value[stateKey] = 'saving';

    // Prepare FormData (Django expects multipart/form-data)
    const formData = new FormData();
    formData.append(fieldName, value);

    // Send PATCH request to update the field
    await $fetch(`${API_BASE}/member/${memberId}/update/`, {
      method: 'PATCH',
      body: formData,
    });

    // Set saved state
    savingStates.value[stateKey] = 'saved';

    // Clear the saved indicator after 2 seconds
    setTimeout(() => {
      if (savingStates.value[stateKey] === 'saved') {
        delete savingStates.value[stateKey];
      }
    }, 2000);

  } catch (error) {
    console.error(`Error updating ${fieldName}:`, error);
    savingStates.value[stateKey] = 'error';

    // Clear error state after 3 seconds
    setTimeout(() => {
      delete savingStates.value[stateKey];
    }, 3000);
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

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: rgba(139, 92, 246, 0.1);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.5);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 92, 246, 0.7);
}
</style>
