<script setup>
import moment from "moment";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

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
const endpoint = config.public.apiBase;

let formInput = ref(true);

const sponsors = ref([]);

const topSponsors = computed(() => {
  return [...sponsors.value]
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 10);
});

const fetchAndCleanSponsorList = async () => {
  try {
    const allSponsors = await $fetch(endpoint + "/api/register/donation/list");

    if (!Array.isArray(allSponsors)) {
      sponsors.value = [];
      return;
    }

    const uniqueSponsors = [];
    const donationIds = new Set();
    const duplicateIds = [];

    for (const sponsor of allSponsors) {
      if (!donationIds.has(sponsor.donation_id)) {
        donationIds.add(sponsor.donation_id);
        uniqueSponsors.push(sponsor);
      } else {
        // Collect duplicate record ID (assuming each sponsor has unique id or donation_id)
        duplicateIds.push(sponsor.id); // or sponsor.donation_id if your API deletes by that
      }
    }

    sponsors.value = uniqueSponsors;

    // Delete duplicates from the database
    for (const id of duplicateIds) {
      // Replace with your actual DELETE endpoint/method
      await $fetch(`${endpoint}/api/register/donation/delete/${id}`, {
        method: "DELETE",
      }).catch(() => {});
    }
  } catch (error) {
    console.error("Error in fetchAndCleanSponsorList:", error);
  }
};

onMounted(() => {
  fetchAndCleanSponsorList(); // Initial run

  // Repeat every 1 second
  setInterval(() => {
    fetchAndCleanSponsorList();
  }, 1000);
});

const info = ref({
  donation_id: "SID" + moment().valueOf(),
  fullname: "",
  contact_email: "",
  amount: "",
  payment_method: "",
  receipt_url: "",
});

const pieChartOptions = {
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context) {
          // Only show the label (e.g., "GCash") — omit the value
          return context.label;
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

const total = computed(() => {
  return sponsors.value.reduce(
    (sum, sponsor) => sum + Number(sponsor.amount),
    0
  );
});

const gcashPercentage = computed(() => {
  const gcashTotal = sponsors.value
    .filter((sponsor) => sponsor.payment_method === "GCash")
    .reduce((sum, sponsor) => sum + Number(sponsor.amount), 0);
  return total.value > 0 ? (gcashTotal / total.value) * 100 : 0;
});

const bankPercentage = computed(() => {
  const bankTotal = sponsors.value
    .filter((sponsor) => sponsor.payment_method === "Bank Transfer")
    .reduce((sum, sponsor) => sum + Number(sponsor.amount), 0);
  return total.value > 0 ? (bankTotal / total.value) * 100 : 0;
});

const gcashCount = computed(() => {
  return sponsors.value.filter((sponsor) => sponsor.payment_method === "GCash")
    .length;
});

const bpiCount = computed(() => {
  return sponsors.value.filter(
    (sponsor) => sponsor.payment_method === "Bank Transfer"
  ).length;
});

const pieChartData = computed(() => {
  const gcashCountValue = gcashCount.value;
  const bankTransferCountValue = bpiCount.value;

  return {
    labels: ["GCash", "Bank Transfer"],
    datasets: [
      {
        label: "Donation Method",
        data: [gcashCountValue, bankTransferCountValue],
        backgroundColor: ["#002CB8", "#B11116"],
      },
    ],
  };
});

const uploadStatus = ref(null);
const fileToUpload = ref(null);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size
  const minWidth = 600;
  const minHeight = 600;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    if (img.width < minWidth || img.height < minHeight) {
      uploadStatus.value = {
        success: false,
        message: `Image must be at least ${minWidth}x${minHeight} pixels.`,
      };
      fileToUpload.value = null;
      return;
    }

    fileToUpload.value = file;
  };

  try {
    uploadStatus.value = { success: false, message: "Uploading..." };

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(endpoint + "/api/register/upload/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      info.value.receipt_url = result.file;
      uploadStatus.value = { success: true, message: "Upload successful!" };
    } else {
      uploadStatus.value = {
        success: false,
        message: "Upload failed: " + (result.detail || "Unknown error"),
      };
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    uploadStatus.value = {
      success: false,
      message: "Upload failed: " + error.message,
    };
  }
};

const isFormValid = computed(() => {
  return (
    info.value.fullname &&
    info.value.contact_email &&
    info.value.amount &&
    info.value.payment_method &&
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
    await $fetch(endpoint + "/api/register/donation/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: info.value,
    }).then((response) => {
      formInput.value = false;
      console.log(response);
      submitToGmail();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};

const submitToGmail = async () => {
  await $fetch(endpoint + "/api/register/thank-you-donation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: info.value,
  }).then((response) => {
    console.log(response);
  });
};

const truncateName = (str) => {
  if (str && str.length > 2) {
    return str.substring(0, 2) + "*".repeat(str.length - 2);
  }
  return str;
};

const truncateAmount = (str) => {
  if (str && str.length > 2) {
    return "*".repeat(str.length - 2) + str.substring(str.length - 2);
  }
  return str;
};
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
          <div class="flex items-center w-fit mx-auto gap-x-5 lg:pt-0 pt-5">
            <div class="">
              <img :src="techSavvyLogo" class="lg:w-[100px] w-[70px] mx-auto" />
            </div>
            <div class="">
              <img :src="workflowLogo" class="lg:w-[65px] w-[50px] mx-auto" />
            </div>
          </div>

          <div
            class="text-white lg:font-semibold w-11/12 text-center mx-auto -mt-5 mb-5"
          >
            <p class="lg:text-lg text-sm font-bold uppercase py-1">
              Tech Savvy Code Camp Season 3
            </p>

            <p class="lg:text-sm text-xs block">
              Every little bit counts. Thank you for supporting us!
            </p>
          </div>

          <div class="w-full flex cursor-default z-10">
            <div class="w-full mx-auto overflow-hidden">
              <div class="relative z-50">
                <div
                  class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3"
                ></div>

                <div class="lg:flex w-11/12 mx-auto gap-10">
                  <div class="lg:w-8/12">
                    <div v-if="formInput">
                      <div
                        class="w-full mb-5 mx-auto shadow-2xl lg:bg-[#00000014] bg-[#00000036] border-4 border-[#20072e6f]"
                      >
                        <div
                          class="bg-[#21053c] w-full text-white text-center text-xs tracking-widest font-bold"
                        >
                          <p
                            class="lg:text-lg text-sm font-bold tracking-tight uppercase py-1"
                          >
                            Donation Box
                          </p>
                        </div>

                        <form class="py-5 px-3 pt-5">
                          <div class="mb-10">
                            <div class="mb-2">
                              <div class="w-full gap-x-3">
                                <div
                                  class="w-full shadow-lg  mb-3"
                                >
                                  <label
                                    class="text-white text-xs block lg:mb-1"
                                    >Name
                                    <span class="text-md text-red-700">*</span>
                                  </label>
                                  <input
                                    class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                                    type="text"
                                    placeholder="Name"
                                    v-model="info.fullname"
                                    pattern="^[a-zA-Z\\s]*$"
                                  />
                                </div>
                                <div class="w-full">
                                  <div
                                    class="w-full shadow-lg  mb-3"
                                  >
                                    <label
                                      class="text-white text-xs block lg:mb-1"
                                      >Contact Email
                                      <span class="text-md text-red-700"
                                        >*</span
                                      >
                                    </label>
                                    <input
                                      class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                                      type="email"
                                      placeholder="Contact Email"
                                      v-model="info.contact_email"
                                      :pattern="'[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div class="w-full gap-x-3">
                                <div
                                  class="w-full shadow-lg  mb-3"
                                >
                                  <label
                                    class="text-white text-xs block lg:mb-1"
                                    >Amount
                                    <span class="text-md text-red-700">*</span>
                                  </label>
                                  <input
                                    class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs"
                                    type="number"
                                    placeholder="Amount"
                                    v-model="info.amount"
                                    min="1"
                                    oninput="validity.valid||(value='1');"
                                  />
                                </div>
                              </div>
                            </div>

                            <div class="">
                              <p
                                class="text-white text-xs lg:mb-2 mb-1"
                              >
                                Payment Method
                                <span class="text-md text-red-700">*</span>
                              </p>
                              <div class="gap-x-3 w-full mb-2">
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
                                          <p class="text-sm">
                                            <!--Juvanee Luna | 09367302618-->
                                            Althea Danna Luna | 09055569171
                                          </p>
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                                <div class="w-full">
                                  <div
                                    class="gap-x-3 w-full shadow-lg lg:py-3 mb-3"
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
                                      <img
                                        :src="'/img/BPI.jpeg'"
                                        class="lg:max-w-[300px] mx-auto w-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="w-full">
                              <p class="text-white text-xs font-bold mb-2">
                                Upload Receipt / Screenshot Proof
                                <span class="text-md text-red-700">*</span>
                              </p>

                             
                              <div class="w-full mb-3">
                                <div class="">
                                  <input
                                    class="hover:border shadow-lg border-[#fff] text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] lg:text-sm text-xs"
                                    type="file"
                                    @change="handleFileUpload"
                                    accept="image/*"
                                  />
                                </div>
                                <div
                                  v-if="uploadStatus"
                                  class="text-xs mt-1"
                                  :class="
                                    uploadStatus.success
                                      ? 'text-green-400'
                                      : 'text-red-400'
                                  "
                                >
                                  {{ uploadStatus.message }}
                                </div>
                                <div
                                  v-if="info.receipt_url"
                                  class="text-xs mt-1 text-green-400"
                                >
                                  <i class="fa fa-check"></i>
                                </div>
                              </div>


                               <p class="text-white text-[10px] mb-2 lg:text-right">Note: Receipts from unverified donations are deleted
                            within the same day.</p>
                            </div>
                          </div>

                          <button
                            type="submit"
                            :disabled="!isFormValid"
                            @click.prevent="submitForm"
                            :class="[
                              'font-bold flex py-0.5 px-10 rounded-lg mx-auto justify-center text-center items-center w-full shadow-2xl border-2 border-[#562482] uppercase hover:bg-[#562482] hover:text-white',
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
                        class="gap-10 lg:rounded-4xl lg:px-14 px-3 lg:py-1 lg:my-10 rounded-xl border-4 w-11/12 mx-auto my-5 shadow-lg border-[#3d216d]"
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
                          class="text-xl text-white text-center w-fit mx-auto lg:py-5 py-10"
                        >
                          <h1 class="font-bold text-3xl">
                            Thanks for submitting!
                          </h1>
                          <p class="font-light pt-3 pb-10">See you soon!</p>
                          <p class="font-bold text-sm mb-3">
                            Please check your email.
                          </p>
                          <!-- <a
                            href="/"
                            class="bg-white text-[#320a3c] rounded-3xl py-1.5 font-bold px-10 lg:mb-3 mb-5 mx-auto w-fit"
                            >Back to Home</a
                          > -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-full mb-5 mx-auto shadow-2xl lg:bg-[#00000014] bg-[#00000036] border-4 border-[#20072e6f]"
                  >
                    <div
                      class="bg-[#21053c] w-full text-white text-center text-xs tracking-widest font-bold"
                    >
                      <p class="text-lg capitalize tracking-tight py-1">
                        real time stats total donations
                      </p>
                    </div>

                    <div class="lg:flex items-center lg:gap-x-5 w-fit lg:mt-4 mx-auto">
                      <div
                        class="text-white text-sm lg:my-5 my-1 shadow-lg px-1 pt-4 rounded-xl w-fit mx-auto"
                      >
                        <p class="flex">
                          <span class="font-bold w-[60px] text-right px-2"
                            >GCASH</span
                          >
                          : {{ gcashCount }} of {{ sponsors.length }}
                        </p>
                        <p class="flex">
                          <span class="font-bold w-[60px] text-right px-2"
                            >BPI</span
                          >
                          : {{ bpiCount }} of {{ sponsors.length }}
                        </p>
                      </div>

                      <div class="min-h-[300px] flex items-center w-fit my-5">
                        <Pie :data="pieChartData" :options="pieChartOptions" />
                      </div>
                    </div>

                    <div
                      class="shadow-lg w-11/12 mx-auto rounded-xl py-5 lg:border-0 border border-[#351564] px-3"
                    >
                      <div>
                        <p
                          class="text-white text-center text-xs tracking-widest font-bold uppercase"
                        >
                          Funds Raised
                        </p>
                      </div>
                      <div
                        class="lg:w-11/12 mx-auto text-white font-bold lg:text-right lg:pt-4 pt-2"
                      >
                        <div class="lg:flex mb-2">
                          <label class="w-2/12 mr-5 text-xs">GCASH</label>
                          <div
                            class="lg:w-9/12 w-full border border-[#fff] h-5"
                          >
                            <div
                              class="h-[18px] bg-[#002CB8] text-center text-xs"
                              :style="{ width: gcashPercentage + '%' }"
                            >
                              {{ gcashPercentage.toFixed(2) }}%
                            </div>
                          </div>
                        </div>

                        <div class="lg:flex mb-2">
                          <label class="w-2/12 mr-5 text-xs"
                            >Bank Transfer</label
                          >
                          <div
                            class="lg:w-9/12 w-full border border-[#fff] h-5"
                          >
                            <div
                              class="h-[18px] bg-[#B11116] text-center text-xs"
                              :style="{
                                width: bankPercentage.toFixed(2) + '%',
                              }"
                            >
                              {{ bankPercentage.toFixed(2) }}%
                            </div>
                          </div>
                        </div>

                        <!-- <div class="flex">
                        <label class="w-2/12 mr-5">Total</label>
                        <div class="w-9/12 border border-[#fff] h-5">
                          <div
                            class="h-[18.5px] bg-[#4CAF50] text-center text-xs"
                            :style="{ width: 100 + '%' }"
                          >
                            ₱{{ total.toFixed(2) }}
                          </div>
                        </div>
                      </div> -->
                      </div>
                    </div>

                    <div class="text-white text-sm w-11/12 mx-auto my-5 border">
                      <div
                        class="uppercase text-center py-1 bg-[#451977] font-bold"
                      >
                        <p>Top 10 Sponsors</p>
                      </div>
                      <div class="w-full">
                        <ul
                          class="flex lg:gap-x-10 gap-x-5 uppercase border-b border-white py-1 text-[10px]"
                        >
                          <li class="w-full text-right">Name</li>
                          <li class="lg:w-full w-4/12">Amount</li>
                        </ul>
                      </div>
                      <div class="w-full">
                        <ul>
                          <li
                            class="w-full flex lg:gap-x-10 gap-x-5 py-1 bg-[#00000028]"
                            v-for="(j, i) in topSponsors"
                            :key="i"
                          >
                            <span class="w-full text-right">
                              {{ truncateName(j.fullname) }}
                            </span>
                            <span class="lg:w-full w-4/12">
                              {{ truncateAmount(j.amount.toString()) }}
                            </span>
                          </li>
                        </ul>
                      </div>
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
