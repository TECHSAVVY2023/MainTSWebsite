<template>
  <div
    class="relative min-h-screen overflow-hidden flex items-center justify-center"
  >
    <!-- ✨ Sparkles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="(sparkle, i) in sparkles"
        :key="i"
        class="absolute w-1 h-1 rounded-full bg-violet-200/80 animate-twinkle"
        :style="sparkle"
      ></span>
    </div>

    <div
      class="relative w-full rounded-3xl text-white bg-[#14002b]/80 backdrop-blur-xl border border-violet-500/30"
    >
      <!-- Logos -->
      <div class="flex items-center gap-x-3 w-fit mx-auto mb-6">
        <img :src="techSavvyLogo" class="w-20 h-24" />
        <img :src="workflowLogo" class="w-12 h-12" />
      </div>

      <h1 class="font-bold text-center text-3xl mb-6 text-violet-300">
        Members List
      </h1>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse">

          <thead>
            <tr class="bg-violet-900/50 border-b-2 border-violet-500">
              <th class="p-3">Profile</th>
              <th class="p-3">ID Number</th>
              <th class="p-3">First</th>
              <th class="p-3">Middle</th>
              <th class="p-3">Last</th>
              <th class="p-3">Birthdate</th>
              <th class="p-3">Role</th>
              <th class="p-3">Speaker topic</th>
              <th class="p-3">Mobile</th>
              <th class="p-3">Email</th>
              <th class="p-3">Website</th>
              <th class="p-3">GCash</th>
              <th class="p-3">Bonus</th>
              <th class="p-3">Voucher</th>
              <th class="p-3">Honorarium</th>
              <th class="p-3">Projects</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="member in members"
              :key="member.id"
              class="border-b border-violet-500/30 hover:bg-violet-900/20 transition"
            >

              <!-- PROFILE -->
              <td class="p-2">
                <div class="flex flex-col items-center gap-2">

                  <div class="relative group">

                    <img
                      :src="cleanImageUrl(member.profilePicture)"
                      class="w-16 h-16 rounded-full object-cover border-2 border-violet-500/50 cursor-pointer hover:border-violet-400 transition"
                      @click="triggerFileUpload(member.id)"
                    />

                    <!-- CAMERA HOVER ICON -->
                    <div
                      class="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
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
                    @change="handleProfilePictureUpload(member.id,$event)"
                  />

                  <span
                    v-if="uploadingStates[member.id]"
                    class="text-xs text-yellow-400"
                  >
                    Uploading...
                  </span>

                </div>
              </td>

              <!-- ID NUMBER -->
              <td class="p-2 flex items-center mt-4 gap-1">

                <a
                  :href="`/${member.idNumber}`"
                  class="text-violet-300 text-sm hover:text-violet-200"
                >
                  <i class="fa fa-link text-xs"></i>
                </a>

                <input
                  v-model="member.idNumber"
                  @blur="updateField(member.id,'idNumber',member.idNumber)"
                  class="w-[130px] bg-transparent border border-violet-500/30 rounded px-2 py-1 text-sm"
                />

              </td>

              <!-- FIRST -->
              <td class="p-2">
                <input v-model="member.firstname"
                  @blur="updateField(member.id,'firstname',member.firstname)"
                  class="input"/>
              </td>

              <!-- MIDDLE -->
              <td class="p-2">
                <input v-model="member.middlename"
                  @blur="updateField(member.id,'middlename',member.middlename)"
                  class="input"/>
              </td>

              <!-- LAST -->
              <td class="p-2">
                <input v-model="member.lastname"
                  @blur="updateField(member.id,'lastname',member.lastname)"
                  class="input"/>
              </td>

              <!-- BIRTHDATE -->
              <td class="p-2">
                <input v-model="member.birthdate"
                  @blur="updateField(member.id,'birthdate',member.birthdate)"
                  class="input"/>
              </td>

              <!-- ROLE -->
              <td class="p-2">
                <input v-model="member.role"
                  @blur="updateField(member.id,'role',member.role)"
                  class="input"/>
              </td>

              <!-- SPEAKER TOPIC (TechSavvy members — shown on community speakers) -->
              <td class="p-2">
                <input
                  v-model="member.speaker_topic"
                  @blur="updateField(member.id,'speaker_topic',member.speaker_topic)"
                  class="input"
                  placeholder="Talk focus (optional)"
                />
              </td>

              <!-- MOBILE -->
              <td class="p-2">
                <input v-model="member.mobile"
                  @blur="updateField(member.id,'mobile',member.mobile)"
                  class="input"/>
              </td>

              <!-- EMAIL -->
              <td class="p-2">
                <input v-model="member.email"
                  @blur="updateField(member.id,'email',member.email)"
                  class="input"/>
              </td>

              <!-- WEBSITE -->
              <td class="p-2">
                <input v-model="member.website"
                  @blur="updateField(member.id,'website',member.website)"
                  class="input"/>
              </td>

              <!-- POINTS -->
              <td class="p-2">
                <input type="number"
                  v-model.number="member.gcashPoints"
                  @blur="updateField(member.id,'gcashPoints',member.gcashPoints)"
                  class="input"/>
              </td>

              <td class="p-2">
                <input type="number"
                  v-model.number="member.bonusPoints"
                  @blur="updateField(member.id,'bonusPoints',member.bonusPoints)"
                  class="input"/>
              </td>

              <td class="p-2">
                <input type="number"
                  v-model.number="member.voucherPoints"
                  @blur="updateField(member.id,'voucherPoints',member.voucherPoints)"
                  class="input"/>
              </td>

              <td class="p-2">
                <input type="number"
                  v-model.number="member.honorariumPoints"
                  @blur="updateField(member.id,'honorariumPoints',member.honorariumPoints)"
                  class="input"/>
              </td>

              <td class="p-2">
                <input type="number"
                  v-model.number="member.numberOfProjects"
                  @blur="updateField(member.id,'numberOfProjects',member.numberOfProjects)"
                  class="input"/>
              </td>

              <!-- DELETE -->
              <td class="p-2 text-center">

                <button
                  @click="deleteMember(member.id)"
                  class="bg-red-600 hover:bg-red-700 text-xs px-3 py-1 rounded"
                  :disabled="deletingStates[member.id]"
                >

                  <span v-if="deletingStates[member.id]">
                    Deleting...
                  </span>

                  <span v-else>
                    Delete
                  </span>

                </button>

              </td>

            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue"

const techSavvyLogo =
"https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png"

const workflowLogo =
"https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png"

const config = useRuntimeConfig()
const API_BASE = `${config.public.apiBase}/techsavvy_members`

const members = ref([])
const sparkles = ref([])

const uploadingStates = ref({})
const deletingStates = ref({})
const fileInputs = ref({})

onMounted(async()=>{

sparkles.value = Array.from({length:35},()=>({
left:Math.random()*100+"%",
top:Math.random()*100+"%",
animationDelay:Math.random()*6+"s"
}))

await fetchMembers()

})

const fetchMembers = async()=>{
members.value = await $fetch(`${API_BASE}/member/list/`)
}

const cleanImageUrl = (url)=>{

if(!url) return "https://via.placeholder.com/150"

if(url.startsWith("http")) return url

return `${config.public.apiBase}${url}`

}

/* UPDATE */

const updateField = async(memberId,field,value)=>{

const formData = new FormData()
formData.append(field,value)

await $fetch(`${API_BASE}/member/${memberId}/update/`,{
method:"PATCH",
body:formData
})

}

/* DELETE */

const deleteMember = async(memberId)=>{

if(!confirm("Delete this member?")) return

try{

deletingStates.value[memberId] = true

await $fetch(`${API_BASE}/member/${memberId}/delete/`,{
method:"DELETE"
})

members.value = members.value.filter(m=>m.id!==memberId)

}
catch(err){

console.error(err)
alert("Delete failed")

}
finally{

deletingStates.value[memberId] = false

}

}

/* IMAGE UPLOAD */

const triggerFileUpload = (id)=>{
fileInputs.value[id]?.click()
}

const handleProfilePictureUpload = async(memberId,event)=>{

const file = event.target.files[0]
if(!file) return

uploadingStates.value[memberId] = true

const formData = new FormData()
formData.append("profilePicture",file)

await $fetch(`${API_BASE}/member/${memberId}/update/`,{
method:"PATCH",
body:formData
})

uploadingStates.value[memberId] = false
await fetchMembers()

}
</script>

<style scoped>

.input{
width:100%;
background:transparent;
border:1px solid rgba(139,92,246,0.3);
border-radius:6px;
padding:4px 8px;
font-size:13px;
}

@keyframes twinkle{
0%,100%{opacity:.3;transform:scale(.7)}
50%{opacity:1;transform:scale(1.3)}
}

.animate-twinkle{
animation:twinkle 4s infinite ease-in-out
}

</style>