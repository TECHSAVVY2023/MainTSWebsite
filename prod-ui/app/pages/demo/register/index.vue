<script setup>
import moment from "moment";
const glossy = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/Vector1.png"
);
const techSavvyLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/TechSavvyLogo.png"
);
const workflowLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/WORKFLOWsinglewhite.png"
);
const codeCampBanner2024B = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/logo/T-SavvyLogo3S.png"
);
const dotsWhite = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/img/bg/circle-dots-white.png"
);

// Get API base URL from runtime config
const config = useRuntimeConfig();
const serverIP = config.public.apiBase;

let formInput = ref(true);

const info = ref({
  team_member_id: "TSCC" + moment().valueOf(),
  fullname: "",
  birth_date: "",
  contact_email: "",
  contact_number: "",
  tech_level: "",
  preferred_topics: [],
  registration_fee: "",
  payment_method: "",
  receipt_url: "",
  data_privacy_consent: ""
});

// Base membership fee
const MEMBERSHIP_FEE = 500;
// Cost per topic
const TOPIC_FEE = 200;

// Calculate total registration fee
const calculateRegistrationFee = () => {
  const topicsCost = info.value.preferred_topics.length * TOPIC_FEE;
  const totalFee = MEMBERSHIP_FEE + topicsCost;
  info.value.registration_fee = totalFee.toString();
  return totalFee;
};

// Modified toggleTopic function to update fee when topics change
const toggleTopic = (topic) => {
  const index = info.value.preferred_topics.indexOf(topic);
  if (index === -1) {
    info.value.preferred_topics.push(topic);
  } else {
    info.value.preferred_topics.splice(index, 1);
  }
  calculateRegistrationFee();
};

// Modified removeTopic function to update fee when topics are removed
const removeTopic = (topic) => {
  info.value.preferred_topics = info.value.preferred_topics.filter(t => t !== topic);
  calculateRegistrationFee();
};

const uploadStatus = ref(null)
const fileToUpload = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  fileToUpload.value = file
  
  try {
    uploadStatus.value = { success: false, message: 'Uploading...' }
    
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(serverIP + '/api/register/upload/', {
      method: 'POST',
      body: formData,
    })
    
    const result = await response.json()
    
    if (response.ok) {
      info.value.receipt_url = result.file
      uploadStatus.value = { success: true, message: 'Upload successful!' }
    } else {
      uploadStatus.value = { success: false, message: 'Upload failed: ' + (result.detail || 'Unknown error') }
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    uploadStatus.value = { success: false, message: 'Upload failed: ' + error.message }
  }
}

// Initialize registration fee on component mount
onMounted(() => {
  calculateRegistrationFee();
});

const dataPrivacy = ref(false);
let description = ref("");
const techLevelSelection = () => {
  const descriptions = {
    Beginner: "New to the community, with no experience, and eager to learn.",
    "Mid Level": "Some experience, needs exploration of new IT tools.",
    Advanced: "Extensive experience, seeking to expand skills and portfolio.",
  };
  description.value = descriptions[info.value.tech_level] || "";
};

const phoneNumberError = ref(false);
const validatePhoneNumber = () => {
  const phoneRegex = /^\+639\d{9}$/;
  phoneNumberError.value = !phoneRegex.test(info.value.contact_number);
  if (info.value.contact_number.startsWith("09")) {
    info.value.contact_number = "+63" + info.value.contact_number.substring(1);
  }
};

const isFormValid = computed(() => {
  return (
    info.value.fullname &&
    info.value.birth_date &&
    info.value.contact_email &&
    info.value.contact_number &&
    !phoneNumberError.value &&
    info.value.tech_level &&
    info.value.preferred_topics.length > 0 &&
    info.value.registration_fee &&
    info.value.payment_method &&
    info.value.data_privacy_consent &&
    info.value.receipt_url &&
    uploadStatus.value?.success === true
  );
});

const submitForm = async () => {
  postAPI();
};

const postAPI = async () => {
  if (!isFormValid.value) return;
  else {
    await $fetch(serverIP + "/api/register/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: info.value,
    }).then((response) => {
      formInput.value = false;
      console.log(response);
      submitToGmail();
    });
  }
};

const submitToGmail = async () => {
  await $fetch(serverIP + "/api/register/email/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: info.value,
  }).then((response) => {
    console.log(response);
  });
};

const topicsDropdownOpen = ref(false);

// const availableTopics = [
//   "JavaScript",
//   "React",
//   "Vue",
//   "Angular",
//   "HTML",
//   "CSS",
//   "XML",
//   "Node.js",
//   "SQL",
//   "Python",
//   "Django",
//   "PHP",
//   "Laravel",
//   "TailwindCSS",
//   "Next.js",
//   "Photoshop",
//   "After Effects",
//   "Canva",
//   "Premiere Pro",
//   "Illustrator",
//   "Figma",
//   "Unity",
//   "Unreal Engine",
//   "Git",
//   "GitHub",
//   "Docker",
//   "AWS",
//   "Azure",
//   "Cybersecurity",
//   "Ethical Hacking",
//   "Machine Learning",
//   "Artificial Intelligence",
//   "Data Science",
// ];

const availableTopics = [
  "JavaScript",
  "React",
  "Vue",
  "Angular",
  "HTML",
  "CSS",
  "XML",
  "Node.js",
  "SQL",
  "Python",
  "Django",
  "PHP",
  "Laravel",
  "TailwindCSS",
  "Next.js",
  "Photoshop",
  "After Effects",
  "Canva",
  "Premiere Pro",
  "Illustrator",
  "Figma",
  "Unity",
  "Unreal Engine",
  "Git",
  "GitHub",
  "Docker",
  "AWS",
  "Azure",
  "Cybersecurity",
  "Ethical Hacking",
  "Machine Learning",
  "Artificial Intelligence",
  "Data Science",
];

</script>
<template>
  <div>
    <div class="bg-[#14082e]">
      <div
        class="relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 z-20 cursor-default"
      >
        <div class="absolute mt-0 mr-0 w-full z-10 flex">
          <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
        </div>
      </div>
      <div class="min-h-screen flex items-center w-full">
        <div class="w-full">
          <div class="flex items-center w-fit mx-auto gap-5 lg:pt-0 pt-5">
            <div class="">
              <img :src="techSavvyLogo" class="lg:w-[100px] w-[70px] mx-auto" />
            </div>
            <div class="">
              <img :src="workflowLogo" class="lg:w-[65px] w-[50px] mx-auto" />
            </div>
          </div>
          <div class="w-full flex cursor-default z-10 lg:-mt-5">
            <div class="w-full mx-auto overflow-hidden">
              <div class="relative z-50">
                <div
                  class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3"
                ></div>
                <div
                  v-if="formInput"
                  class="text-white lg:font-semibold mb-3 w-11/12 text-center mx-auto"
                >
                  <!-- <p class="lg:text-sm text-xs block lg:mb-2">
                  Join Local IT Enthusiasts to Connect and Learn
                 
                  </p> -->
                  <p class="text-sm block">
                   <!-- Join as a Member and Become Part of the Core Team  Be Part of Our Growing Team! -->
Empower, Collaborate, and Thrive – Join Our Growing Community
                  </p>
                  <p class="text-lg capitalize font-bold tracking-tight">
                    Tech Savvy Code Camp : Season 3
                  </p>
                </div>

                <div v-if="formInput">
                  <div
                    class="lg:w-fit mb-5 max-w-[600px] w-11/12 mx-auto shadow-2xl lg:bg-[#00000014] bg-[#00000036] border-4 border-[#20072e6f]"
                    :class="dataPrivacy ? 'lg:mb-10 mb-5' : ''"
                  >
                    <div
                      class="bg-[#21053c] w-full text-white text-center text-xs py-2 tracking-widest font-bold"
                    >
                      <a href="/" class="hover:underline">Home</a> |
                      Registration Form
                    </div>
                    <form class="py-5 lg:px-7 px-3 pt-5">
                      <div class="">
                        <div class="bg-[#8f62ff08] p-3 rounded-lg mb-5">
                          
                        
                        <div class="lg:flex gap-x-3 w-full">
                          <div
                            class="w-full shadow-lg  mb-3"
                          >
                            <label class="text-white text-xs block lg:mb-1"
                              >Full Name
                              <span class="text-md text-red-700">*</span>
                            </label>
                            <input
                              class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                              type="text"
                              placeholder="Full Name"
                              v-model="info.fullname"
                            />
                          </div>
                          <div
                            class="lg:w-fit w-full shadow-lg  mb-3"
                          >
                            <label
                              class="text-white text-xs block lg:mb-1 whitespace-nowrap"
                              >Date of Birth
                              <span class="text-md text-red-700">*</span>
                            </label>
                            <input
                              type="date"
                              min="1970-01-01"
                              max="2015-12-31"
                              class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] lg:py-0.5 pt-[3px] pb-2 px-2 lg:text-sm text-xs"
                              v-model="info.birth_date"
                            />
                          </div>
                        </div>
                        <div class="lg:flex gap-x-3 w-full mb-2">
                         <div class="w-full"> 
                           <div
                            class="w-full shadow-lg"
                          >
                            <label class="text-white text-xs block lg:mb-1"
                              >Contact Email
                              <span class="text-md text-red-700">*</span>
                            </label>
                            <input
                              class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                              type="email"
                              placeholder="Contact Email"
                              v-model="info.contact_email"
                            />
                          </div>
                         </div>
                         <div class="w-full"> 
                           <div
                            class="w-full shadow-lg"
                          >
                            <label
                              class="text-white text-xs block lg:mb-1 whitespace-nowrap"
                              >Contact Number
                              <span class="text-md text-red-700">*</span>
                            </label>
                            <input
                              class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                              type="tel"
                              placeholder="e.g +639XXXXXXXXX"
                              v-model="info.contact_number"
                              @input="validatePhoneNumber"
                              :class="{ 'border-red-500': phoneNumberError }"
                              maxlength="13"
                            />
                           
                          </div>
                           <!-- <span
                              v-if="phoneNumberError"
                              class="text-red-500 text-xs"
                            >
                              Enter valid phone number in format:
                              +639XXXXXXXXX
                            </span> -->
                         </div>
                        </div>
                      
                      
                      </div>
 <div class="bg-[#8f62ff08] p-3 rounded-lg mb-5">




                        <div class="gap-x-3 w-full shadow border-[#fff]">
                          <div class="w-full">
                            <div>
                              <label class="text-white text-xs block lg:mb-1"
                                >Experience Level in Tech Development
                                <span class="text-md text-red-700">*</span>
                              </label>
                            </div>
                            <div
                              class="lg:bg-[#8f62ff08] bg-[#8f62ff08] lg:px-2 py-2"
                            >
                              <div class="lg:gap-x-3 w-full flex">
                                <div
                                  class="lg:w-fit mx-auto flex items-center lg:gap-x-3 gap-x-1 cursor-pointer hover:font-bold"
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="Beginner"
                                      class="border-b-[3px] shadow-lg border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                                      type="radio"
                                      v-model="info.tech_level"
                                      value="Beginner"
                                      @change="techLevelSelection()"
                                    />
                                  </div>
                                  <label
                                    for="Beginner"
                                    class="flex items-center"
                                  >
                                    <div
                                      class="text-white text-xs  w-fit lg:mr-7 whitespace-nowrap cursor-pointer"
                                    >
                                      Beginner
                                    </div>
                                  </label>
                                </div>
                                <div
                                  class="lg:w-fit mx-auto flex items-center lg:gap-x-3 gap-x-1 cursor-pointer hover:font-bold"
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="Mid Level"
                                      class="border-b-[3px] shadow-lg border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                                      type="radio"
                                      v-model="info.tech_level"
                                      value="Mid Level"
                                      @change="techLevelSelection()"
                                    />
                                  </div>
                                  <label
                                    for="Mid Level"
                                    class="flex items-center"
                                  >
                                    <div
                                      class="text-white text-xs  w-fit lg:mr-7 whitespace-nowrap cursor-pointer"
                                    >
                                      Mid Level
                                    </div>
                                  </label>
                                </div>
                                <div
                                  class="lg:w-fit mx-auto flex items-center lg:gap-x-3 gap-x-1 cursor-pointer hover:font-bold"
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="Advanced"
                                      class="border-b-[3px] shadow-lg border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                                      type="radio"
                                      v-model="info.tech_level"
                                      value="Advanced"
                                      @change="techLevelSelection()"
                                    />
                                  </div>
                                  <label
                                    for="Advanced"
                                    class="flex items-center"
                                  >
                                    <div
                                      class="text-white text-xs  w-fit lg:mr-7 whitespace-nowrap cursor-pointer"
                                    >
                                      Advanced
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div
                              class="lg:text-center text-white lg:py-4 py-2 text-xs lg:w-full w-11/12 mx-auto"
                              v-if="description"
                            >
                              {{ description }}
                            </div>
                          </div>
                        </div>
                        <div class="gap-x-3 w-full shadow border-[#fff] mt-3">
                          <div class="w-full">
                            <div>
                              <label class="text-white text-xs block lg:mb-1">
                                Course Topics for the Full-Stack or Specialized Development Roadmap (Select All That Apply)
                                <span class="text-md text-red-700">*</span>
                              </label>
                            </div>
                            <div class="relative">
                              <!-- Selected topics display box -->
                              <div
                                @click="
                                  topicsDropdownOpen = !topicsDropdownOpen
                                "
                                class="flex flex-wrap items-center min-h-[40px] w-full text-white bg-[#8f62ff08] border-b-[3px] shadow-lg border-violet-800 py-1 px-2 cursor-pointer"
                              >
                                <div
                                  v-if="info.preferred_topics.length === 0"
                                  class="text-gray-400 text-xs"
                                >
                                  Select topics...
                                </div>
                                <div v-else class="flex flex-wrap gap-1">
                                  <div
                                    v-for="topic in info.preferred_topics"
                                    :key="topic"
                                    class="bg-[#562482] text-white text-xs px-2 py-1 rounded-md flex items-center"
                                  >
                                    {{ topic }}
                                    <button
                                      @click.stop="removeTopic(topic)"
                                      class="ml-1 text-white hover:text-red-300"
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                                <div class="ml-auto">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-4 w-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    :class="{
                                      'rotate-180': topicsDropdownOpen,
                                    }"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>

                              <!-- Dropdown options -->
                              <div
                                v-if="topicsDropdownOpen"
                                class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
                              >
                                <div
                                  v-for="topic in availableTopics"
                                  :key="topic"
                                  @click="toggleTopic(topic)"
                                  class="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                                >
                                  <span class="text-gray-800 text-sm">{{
                                    topic
                                  }}</span>
                                  <svg
                                    v-if="info.preferred_topics.includes(topic)"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-5 w-5 text-[#562482]"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                            class="w-full mt-3"
                          >
                            <label class="text-white text-xs block lg:mb-1 text-center"
                              >Total Registration Fee (Calculated from your selected topics)
                            
                            </label>
                            <input
                              class="text-center text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] px-2 lg:text-sm text-xs shadow-lg  py-2"
                              type="text"
                              :value="'₱' + info.registration_fee + ' (₱500 membership + ₱' + (info.preferred_topics.length * TOPIC_FEE) + ' for ' + info.preferred_topics.length + ' topics)'"
                              readonly
                            />
                            <input type="hidden" v-model="info.registration_fee" />
                        
                             <p class="text-xs text-gray-300 mt-1 italic text-center">
                              Students are eligible for a 50% discount. Refunds, certificates, and perks/incentives will be processed after the event, upon confirmation. Base membership fee: ₱500 + ₱{{ TOPIC_FEE }} per selected topic.


                          
                            </p>
                          </div>



</div>

 <div class="bg-[#8f62ff08] p-3 rounded-lg">





                            <div> 
                            <p class="text-white lg:text-sm text-xs lg:mb-2 mb-1">
                              Payment Method
                              <span class="text-md text-red-700">*</span>
                            </p>
                            <div class=" gap-x-3 w-full mb-2">
                              <div class="w-full">
                                <div
                                  class="flex gap-x-3 w-full shadow-lg lg:py-3 pt-2 pb-2 lg:mb-3"
                                >
                                  <div class="flex items-center">
                                    <input
                                      id="gcash"
                                      class="border-b-[3px] shadow-lg border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                                      type="radio"
                                      v-model="info.payment_method"
                                      value="GCash"
                                    />
                                  </div>
                                  <label
                                    for="gcash"
                                    class="flex items-center"
                                  >
                                    <div> 
                                      <div
                                      class="text-white text-xs lg:font-bold w-fit lg:mr-7 whitespace-nowrap cursor-pointer"
                                    >
                                      GCash
                                    </div>

                                     <div class="text-white"> 
                                      <p class="text-sm">Juvanee Luna | 09367302618</p>
                                    </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div class="w-full">
                                <div
                                  class=" gap-x-3 w-full shadow-lg lg:py-3 mb-3"
                                >
                                 <div class="flex mb-4"> 
                                   <div class="flex items-center">
                                    <input
                                      id="bankTransfer"
                                      class="border-b-[3px] mr-3 shadow-lg border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                                      type="radio"
                                      v-model="info.payment_method"
                                      value="Bank Transfer"
                                    />
                                  </div>
                                  <label
                                    for="bankTransfer"
                                    class="flex items-center"
                                  >
                                    <div> 
                                      <div
                                        class="text-white text-xs lg:font-bold w-fit lg:mr-7 whitespace-nowrap cursor-pointer"
                                      >
                                        Bank Transfer
                                      </div>
                                      
                                    </div>
                                  </label>
                                 </div>

                                  <div class="w-full"> 
                                        <img src="/img/BPI.jpeg" class="lg:max-w-[250px] mx-auto w-full" />
                                      </div>
                                </div>
                              </div>
                            </div>
                          </div>


                   <div> 
                     <p class=" text-white lg:text-sm text-xs lg:mb-2 mb-1">
                              Upload Receipt
                              <span class="text-md text-red-700">*</span>
                            </p>
                     <div class="w-full mb-3">
                      <div class="shadow-lg"> 
                         <input
                         class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 lg:text-sm text-xs"
                         type="file"
                         @change="handleFileUpload"
                         accept="image/*,.pdf"
                       />
                      </div>
                       <div v-if="uploadStatus" class="text-xs mt-1" :class="uploadStatus.success ? 'text-green-400' : 'text-red-400'">
                         {{ uploadStatus.message }}
                       </div>
                       <div v-if="info.receipt_url" class="text-xs mt-1 text-green-400">
                         Receipt uploaded successfully
                       </div>
                     </div>
                   </div>

</div>

                        <div class="mt-4 mb-10 w-full">
                          <p class=" text-white lg:text-sm text-xs lg:mb-2 mb-1">
                            Data Privacy Policy
                          </p>
                          <div id="privacyParagraph">
                            <div
                              class="flex w-fit whitespace-nowrap text-white mb-3 lg:text-sm text-xs"
                            >
                              <input
                                id="privacyCheckbox"
                                class="border-b-[4px] mr-2 shadow-lg border-violet-800 w-full bg-[#ffffffdf] py-1 px-2"
                                type="checkbox"
                                @change="dataPrivacy = !dataPrivacy"
                                v-model="info.data_privacy_consent"
                              />
                              <label
                                for="privacyCheckbox"
                                class="hover:font-bold"
                              >
                                Yes, I consent.
                              </label>
                            </div>
                            <div
                              v-if="dataPrivacy"
                              class="text-white lg:text-xs text-[10px] text-left mb-5"
                            >
                              <p class="mb-3">
                                REPUBLIC ACT NO. 10173 also known as the "Data
                                Privacy Act of 2012," is a Philippine law that
                                aims to protect the fundamental human right to
                                privacy and ensure the security of personal data
                                in the Philippines. It provides guidelines and
                                standards for the collection, processing, and
                                storage of personal data by both government and
                                private sectors, as well as the rights and
                                responsibilities of data subjects and data
                                controllers. The law sets forth the principles
                                of transparency, legitimate purpose, and
                                proportionality in data processing, and
                                establishes the National Privacy Commission
                                (NPC) as the primary regulatory authority tasked
                                with enforcing the provisions of the Act. The
                                Data Privacy Act of 2012 is designed to foster a
                                culture of privacy and data protection in the
                                Philippines and promote trust in the use of
                                personal information in various sectors such as
                                business, government, and other organizations.
                              </p>
                              <p class="mb-3">
                                Tech Savvy Code Camp is committed to protecting
                                your personal information and respecting your
                                privacy rights. By filling out and submitting
                                this form, you are providing your explicit
                                consent for the collection, use, and processing
                                of your personal data for the purpose of
                                contacting and documenting:
                              </p>
                              <ul class="mb-3 list-disc ml-10">
                                <li>Basic Contact Information</li>
                                <!-- <li>FB or LinkedIn</li> -->
                                <li>Pictures or Videos during Events</li>
                              </ul>
                              <p class="mb-3">
                                I, hereby confirm that I have read and
                                understood the above information, and I
                                voluntarily consent to the collection, use, and
                                processing of my personal data. I understand
                                that I have the right to withdraw my consent at
                                any time.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- :disabled="!isFormValid" -->
                      <!-- @click.prevent="submitForm" -->

                      <!-- <p class="text-sm text-white text-center">Registration starts on May 15, 2025, at 7 PM.</p> -->
                      <button
                        type="submit"
                        :disabled="!isFormValid"
                        @click.prevent="submitForm"
                        :class="[
                          'font-bold flex py-1 px-10 rounded-lg mx-auto justify-center text-center items-center w-full shadow-2xl border-2 border-[#562482] uppercase hover:bg-[#562482] hover:text-white mt-3',
                          isFormValid
                            ? 'bg-white text-[#562482]'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed',
                        ]"
                      >
                        <i class="fa fa-paper-plane mr-2"></i> Submit
                      </button>
                    </form>
                  </div>
                </div>

                <div v-if="!formInput">
                  <div
                    class="md:w-4/12 gap-10 lg:rounded-4xl lg:px-14 px-3 lg:py-1 lg:my-10 rounded-xl border-4 w-11/12 mx-auto my-5 shadow-lg border-[#3d216d]"
                  >
                    <div
                      class="flex items-center text-center justify-center lg:pt-10 pt-14"
                    >
                      <i
                        class="fa fa-check font-bold text-5xl text-white"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div
                      class="text-xl text-white text-center w-fit mx-auto py-5"
                    >
                      <h1 class="font-bold text-3xl">Thanks for submitting!</h1>
                      <p class="font-light pt-3 pb-10">See you soon!</p>
                      <p class="font-light text-xs italic mb-10">
                        Please check your email.
                      </p>
                      <a
                        href="/"
                        class="bg-white text-[#320a3c] rounded-3xl py-1.5 font-bold px-10 lg:mb-3 mb-5 mx-auto w-fit lg:block hidden"
                        >Back to Home</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-black cursor-default overflow-hidden relative">
        <div
          class="absolute lg:mt-0 mt-14 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/6 lg:h-2/6 w-5/6 h-auto mx-auto lg:-mr-16 -mr-24 lg:my-10 my-0 opacity-5"
          />
        </div>
        <div
          class="absolute lg:mt-0 mt-80 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/5 lg:h-auto w-1/2 h-auto mx-auto lg:-ml-16 -ml-14 lg:my-20 my-0 opacity-[.07]"
          />
        </div>
        <div
          class="absolute lg:mt-0 mt-44 mr-0 w-full z-10 overflow-hidden lg:block md:hidden block"
        >
          <img
            :src="dotsWhite"
            class="lg:w-1/5 lg:h-auto w-full h-3/6 mx-auto lg:mr-80 mr-0 lg:my-40 opacity-10"
          />
        </div>
        <div class="relative z-50 w-11/12 mx-auto lg:flex lg:pt-7 pt-16">
          <div class="lg:w-full w-10/12 mx-auto lg:flex items-center">
            <div class="lg:mr-32 md:mb-10 mb-20 lg:ml-auto">
              <div class="text-[#EEEAFF] text-sm text-center">
                <img
                  :src="codeCampBanner2024B"
                  class="lg:w-[300px] w-[240px] lg:mt-7 -mb-20 -mt-10 font-bold rounded-md lg:mx-0 mx-auto"
                />
                <span class="block">
                  For more inquiries email us at
                  <span class="block font-bold text-[#B5A3FF] hover:text-white">
                    info@techsavvies.space
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div
            class="w-full justify-center flex items-center lg:mr-32 lg:pb-1 pb-10"
          >
            <div class="">
              <div class="lg:mb-10 mb-7">
                <div
                  class="text-[#EEEAFF] font-bold lg:text-4xl text-2xl lg:text-left text-center"
                >
                  Contact Us
                </div>
                <div class="text-[#EEEAFF]">
                  <span
                    class="block lg:text-sm text-xs lg:text-left text-center"
                  ></span>
                </div>
                <div
                  class="text-[#EEEAFF] lg:text-sm text-xs lg:text-left text-center lg:w-full w-7/12 lg:mx-0 mx-auto"
                >
                  <span>Through Social Media Page </span>
                  <a
                    href="https://www.facebook.com/TechSavvyCodeCamp"
                    target="_blank"
                    class="font-bold mr-1 hover:cursor-pointer text-[#B5A3FF] hover:text-white whitespace-nowrap"
                    >fb.com/TechSavvyCodeCamp</a
                  >
                </div>
              </div>
              <div class="lg:pt-0 pt-10">
                <div
                  class="text-[#fff] font-semibold tracking-tighter lg:text-2xl text-lg lg:text-left text-center"
                >
                  Join the
                  <span class="font-bold lg:text-4xl text-xl text-[#B5A3FF]">
                    Code Camp 2025
                  </span>
                </div>
                <div class="text-[#fff] lg:text-sm text-xs lg:flex">
                  <div
                    class="lg:inline-block block lg:text-left text-center lg:w-full w-10/12 mx-auto"
                  >
                    Join the Community and Connect with other Aspiring IT
                    Developers <span class="block">in Misamis Occidental</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-black w-full pt-14 cursor-default">
          <div class="lg:flex lg:w-9/12 mx-auto">
            <div
              class="text-[#fff] font-semibold text-sm text-center mx-auto pt-10 lg:pb-10 pb-4 block"
            >
               TECH SAVVY © 2025
            </div>
            <div
              class="flex w-fit lg:gap-5 gap-2 mx-auto lg:pt-5 md:pt-6 pb-10"
            >
              <div
                class="bg-black w-[58px] h-[58px] rounded-full mx-auto lg:border-none border-2 border-white"
              >
                <img
                  :src="techSavvyLogo"
                  class="w-[58px] mx-auto bg-[#320d39] rounded-full px-1.5"
                />
              </div>
              <div
                class="bg-[#084725] w-[55px] h-[55px] rounded-full mx-auto lg:border-none border-2 border-white"
              >
                <img :src="workflowLogo" class="w-[33px] mt-3 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
