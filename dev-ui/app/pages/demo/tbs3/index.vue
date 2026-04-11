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

// Countdown timer to May 17, 2025
const targetDate = new Date("June 21, 2025 00:00:00").getTime();
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});
const countdownActive = ref(true);

const ticket = ref(true);
const toggleTicket = () => {
  console.log('click')
  ticket.value = !ticket.value;
};

// Update countdown
const updateCountdown = () => {
  if (!countdownActive.value) return;

  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdownActive.value = false;
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }

  countdown.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
};

// Get API base URL from runtime config
const config = useRuntimeConfig();
const endpoint = config.public.apiBase;

let formInput = ref(true);

const allGuests = ref(
  await $fetch(endpoint + "/api/register/registration/list")
);

onMounted(() => {
  // Auto-refresh every 1 second

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

  // Clean up interval on component unmount
  onUnmounted(() => {
    clearInterval(timer);
  });

  setInterval(async () => {
    allGuests.value = await $fetch(
      endpoint + "/api/register/registration/list"
    );
  }, 1000);
});

// Function to refresh the guest list
const refreshGuestList = async () => {
  allGuests.value = await $fetch(endpoint + "/api/register/registration/list");
};

const info = ref({
  registration_id: "TID" + moment().valueOf(),
  fullname: "",
  contact_email: "",
  contact_number: "",
  payment_method: "",
  base_amount: null,
  member: "YES", // "yes" = Member, "no" = Non-Member
  add_ons: ["N/A"],
  receipt_url: "https://techsavvies.space/",
});

const base_amount = computed(() => {
  let amount = 0; // base amount for Members

  if (info.value.member !== "YES") {
    amount += 530; // Non-members add ₱250
  }

  if (info.value.add_ons.some((item) => item.startsWith("T-SHIRT"))) {
    amount += 175;
  }

  if (info.value.add_ons.includes("RAFFLE")) {
    amount += 500;
  }

  return amount;
});

const shirtSizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
const selectedShirtSize = ref("");

const toggleAddOn = (addOn) => {
  const isTShirt = info.value.add_ons.some((item) =>
    item.startsWith("T-SHIRT")
  );

  if (addOn === "T-SHIRT") {
    if (isTShirt) {
      // Remove all T-SHIRT entries and reset size
      info.value.add_ons = info.value.add_ons.filter(
        (item) => !item.startsWith("T-SHIRT")
      );
      selectedShirtSize.value = "";
    } else {
      if (info.value.add_ons.includes("N/A")) info.value.add_ons = [];
      info.value.add_ons.push("T-SHIRT");
    }
  } else {
    const index = info.value.add_ons.indexOf(addOn);
    if (index > -1) {
      info.value.add_ons.splice(index, 1);
    } else {
      if (info.value.add_ons.includes("N/A")) info.value.add_ons = [];
      info.value.add_ons.push(addOn);
    }
  }

  if (info.value.add_ons.length === 0) {
    info.value.add_ons = ["N/A"];
  }
};

watch(selectedShirtSize, (newSize) => {
  if (!newSize) return;

  const index = info.value.add_ons.findIndex((item) =>
    item.startsWith("T-SHIRT")
  );
  const newEntry = `T-SHIRT-${newSize}`;

  if (index !== -1) {
    info.value.add_ons[index] = newEntry;
  } else {
    if (info.value.add_ons.includes("N/A")) info.value.add_ons = [];
    info.value.add_ons.push(newEntry);
  }
});

watch(base_amount, (newAmount) => {
  info.value.base_amount = newAmount;
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
    info.value.contact_number &&
    info.value.member
  );
});

const submitForm = async () => {
  postAPI();
};

const postAPI = async () => {
  if (info.value.add_ons.includes("T-SHIRT")) {
    info.value.add_ons = info.value.add_ons.filter(
      (addOn) => addOn !== "T-SHIRT"
    );
  }

  if (!isFormValid.value) return;
  else {
    await $fetch(endpoint + "/api/register/registration/create/", {
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
      refreshGuestList(); // Refresh the guest list after successful submission
    });
  }
};

const submitToGmail = async () => {
  await $fetch(endpoint + "/api/register/thank-you-registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: info.value,
  }).then((response) => {
    console.log(response);
  });
};
</script>

<template>
  <div>
    <div class="bg-[#14082e]">
      <div
        class="relative mt-0 bg-gradient-to-bl from-[#17132B] via-[#17132B] lg:to-[#17132B] to-[#17132B] lg:pb-2 cursor-default"
      >
        <div class="absolute mt-0 mr-0 w-full flex">
          <img :src="glossy" class="lg:w-4/6 w-full mx-auto mr-0" />
        </div>
      </div>
      <div class="lg:min-h-screen flex items-center w-full z-50">
        <div class="w-full z-50">
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
            <button class="lg:text-lg text-sm font-bold uppercase py-1 cursor-pointer" @click="toggleTicket()">
              Tech Savvy Code Camp Season 3
            </button>

            <p class="lg:text-sm text-xs block">Team Building Registration</p>
            <p class="lg:text-sm text-xs block uppercase">June 6 to 18, 2025</p>
          </div>

          <div class="w-full flex cursor-default z-10">
            <div class="w-full mx-auto overflow-hidden">
              <div class="relative z-50">
                <div
                  class="text-[#ffffff] font-semibold w-11/12 text-center mx-auto lg:mb-3"
                ></div>

                <div class="lg:flex w-11/12 mx-auto gap-10" v-if="ticket">
                  <div class="w-full">
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
                            Ticket Details
                          </p>
                        </div>

                        <form class="py-5 px-1 pt-5">
                          <div class="">
                            <div class="mb-2">
                              <div class="w-full gap-x-3">
                                <div class="w-full shadow-lg mb-3">
                                  <label
                                    class="text-white text-xs block lg:mb-1"
                                    >Full Name
                                    <span class="text-md text-red-700">*</span>
                                  </label>
                                  <input
                                    class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 capitalize lg:text-sm text-xs border-[#64398f] border-b mt-1"
                                    type="text"
                                    placeholder="Full Name"
                                    v-model="info.fullname"
                                  />
                                </div>
                                <div class="flex gap-x-3">
                                  <div class="w-full">
                                    <div class="w-full shadow-lg mb-3">
                                      <label
                                        class="text-white text-xs block lg:mb-1"
                                        >Contact Email
                                        <span class="text-md text-red-700"
                                          >*</span
                                        >
                                      </label>
                                      <input
                                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs border-[#64398f] border-b mt-1"
                                        type="email"
                                        placeholder="Contact Email"
                                        v-model="info.contact_email"
                                      />
                                    </div>
                                  </div>

                                  <div class="w-full">
                                    <div class="w-full shadow-lg mb-3">
                                      <label
                                        class="text-white text-xs block lg:mb-1"
                                        >Contact Number
                                        <span class="text-md text-red-700"
                                          >*</span
                                        >
                                      </label>
                                      <input
                                        class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] py-1 px-2 lg:text-sm text-xs border-[#64398f] border-b mt-1"
                                        type="tel"
                                        placeholder="e.g +639211231234"
                                        v-model="info.contact_number"
                                        maxlength="13"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="flex bg-[#927cc8] shadow-lg">
                                <div class="lg:flex w-full">
                                  <div
                                    class="flex items-center px-2 w-full py-2"
                                    :class="
                                      info.member === 'YES'
                                        ? 'bg-[#795bcd]'
                                        : 'bg-[#271457] '
                                    "
                                  >
                                    <div class="flex lg:w-fit mx-auto w-full">
                                      <input
                                        type="radio"
                                        v-model="info.member"
                                        value="YES"
                                        id="member"
                                      />
                                      <label
                                        class="text-white text-xs block ml-2 tracking-tight"
                                        for="member"
                                      >
                                        Core Members or Facilitators ( Free Food
                                        & Snacks )
                                      </label>
                                    </div>
                                  </div>

                                  <div
                                    class="flex items-center px-2 w-full py-2"
                                    :class="
                                      info.member === 'NO'
                                        ? 'bg-[#795bcd]'
                                        : 'bg-[#271457] '
                                    "
                                  >
                                    <div class="flex lg:w-fit mx-auto w-full">
                                      <input
                                        type="radio"
                                        v-model="info.member"
                                        value="NO"
                                        id="non-member"
                                      />
                                      <label
                                        class="text-white text-xs block ml-2 tracking-tight"
                                        for="non-member"
                                      >
                                        Non-Members : 250 + ( 280 for Food &
                                        Snacks )
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="text-xs my-3">
                                <div class="w-full border border-[#30288b]">
                                  <label
                                    class="text-white block uppercase text-center bg-[#461d76] py-1"
                                  >
                                    Add-ons
                                  </label>

                                  <div class="w-full flex text-white">
                                    <div
                                      class="flex items-center w-full gap-x-3 shadow-lg py-0.5 px-2"
                                    >
                                      <div
                                        class="mx-auto w-fit flex items-center gap-x-2 py-2"
                                      >
                                        <input
                                          type="checkbox"
                                          :checked="
                                            info.add_ons.some((a) =>
                                              a.startsWith('T-SHIRT')
                                            )
                                          "
                                          @change="toggleAddOn('T-SHIRT')"
                                          id="t-shirt"
                                        />
                                        <label class="" for="t-shirt">
                                          T-shirt (175)
                                        </label>
                                      </div>
                                    </div>

                                    <div
                                      class="flex items-center w-full gap-x-3 shadow-lg py-0.5 px-2"
                                    >
                                      <div
                                        class="mx-auto w-fit flex items-center gap-x-2 py-2"
                                      >
                                        <input
                                          type="checkbox"
                                          :checked="
                                            info.add_ons.includes('RAFFLE')
                                          "
                                          @change="toggleAddOn('RAFFLE')"
                                          id="raffle"
                                        />
                                        <label class="" for="raffle">
                                          Raffle Entry (500)
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    class="bg-[#454046]"
                                    v-if="
                                      info.add_ons.some((a) =>
                                        a.startsWith('T-SHIRT')
                                      )
                                    "
                                  >
                                    <p class="text-white text-center pt-4">
                                      Shirt Sizes
                                    </p>
                                    <ul
                                      class="flex flex-wrap gap-x-3 text-white py-2 justify-evenly"
                                    >
                                      <li
                                        v-for="size in shirtSizes"
                                        :key="size"
                                        id="list-size"
                                      >
                                        <label
                                          class="px-3 flex items-center gap-x-1 py-2 font-bold"
                                        >
                                          <input
                                            type="radio"
                                            v-model="selectedShirtSize"
                                            :value="size"
                                            name="shirtSize"
                                          />
                                          {{ size }}
                                        </label>
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div
                                  class="w-full gap-x-3 border mt-5"
                                  v-if="
                                    info.add_ons.some((a) =>
                                      a.startsWith('T-SHIRT')
                                    ) || info.base_amount > 0
                                  "
                                >
                                  <label
                                    class="text-white text-xs block uppercase text-center bg-[#1c7020]"
                                    >Total</label
                                  >
                                  <input
                                    class="text-white w-full lg:bg-[#8f62ff08] bg-[#8f62ff08] px-2 py-0.5 lg:text-sm text-xs text-center font-bold"
                                    type="text"
                                    :value="base_amount"
                                    readonly
                                  />
                                </div>
                              </div>
                            </div>

                            <div
                              class=""
                              v-if="
                                info.base_amount > 0 ||
                                info.add_ons.some((addOn) =>
                                  addOn.startsWith('T-SHIRT')
                                )
                              "
                            >
                              <p class="text-white text-xs lg:mb-2 mb-1">
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
                                            Juvanee Luna | 09367302618
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
                            <div class="w-full" v-if="info.base_amount > 0">
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
                                  v-if="
                                    info.receipt_url !==
                                    'https://techsavvies.space/'
                                  "
                                  class="text-xs mt-1 text-green-400"
                                >
                                  <i class="fa fa-check"></i>
                                </div>
                              </div>

                              <p class="text-white text-[10px] mb-2">
                                Note: Receipts from unverified donations are
                                deleted within the same day.
                              </p>
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="w-full mb-5 mx-auto shadow-2xl lg:bg-[#00000014] bg-[#00000036] border-4 border-[#20072e6f]"
                  >
                    <!-- <div
                      class="bg-[#21053c] w-full text-white text-center text-xs tracking-widest font-bold"
                    >
                      <p class="text-lg capitalize tracking-tight py-1">
                        real time stats total registrations
                      </p>
                    </div> -->

                    <!-- <div
                      class="lg:flex items-center lg:gap-x-5 w-fit lg:mt-4 mx-auto"
                    >
                      <div
                        class="text-white text-sm lg:my-5 my-1 shadow-lg px-1 pt-4 rounded-xl w-fit mx-auto"
                      >
                        <p class="flex">
                          <span class="font-bold w-[60px] text-right px-2"
                            >GCASH</span
                          >
                          : {{ gcashCount }} of {{ guests.length }}
                        </p>
                        <p class="flex">
                          <span class="font-bold w-[60px] text-right px-2"
                            >BPI</span
                          >
                          : {{ bpiCount }} of {{ guests.length }}
                        </p>
                      </div>

                      <div class="min-h-[300px] flex items-center w-fit my-5">
                        <Pie :data="pieChartData" :options="pieChartOptions" />
                      </div>
                    </div> -->

                    <div class="text-white text-sm mx-auto border border-[#ffffff23]">
                      <div
                        class="lg:uppercase text-center py-2 bg-[#451977] lg:font-bold lg:text-sm text-xs"
                      >
                        <p>All List <span class="font-bold">({{ allGuests.length }})</span> of  Facilitators | Participants | Guests </p>
                      </div>

                      <div class="w-full">
                        <ul class="flex flex-wrap bg-[#00000028]">
                          <li
                            class="lg:w-4/12 w-full justify-center flex lg:py-2 px-5 border-b border-[#ffffff23]"
                            v-for="(j, i) in allGuests"
                            :key="i"
                          >
                            <span class="ml-2 capitalize">{{
                              j.fullname
                            }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              class="flex justify-center items-center lg:space-x-4 space-x-2 py-3"
            >
              <div class="flex flex-col items-center">
                <div
                  class="lg:text-4xl text-2xl font-bold bg-[#e9ec33] text-[#3c1147] lg:w-20 lg:h-20 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#E0DDFF]"
                >
                  {{ countdown.days }}
                </div>
                <span class="text-white mt-2 lg:text-base text-xs">Days</span>
              </div>

              <div class="lg:text-2xl text-xl font-bold text-white">:</div>

              <div class="flex flex-col items-center">
                <div
                  class="lg:text-4xl text-2xl font-bold bg-[#e9ec33] text-[#3c1147] lg:w-20 lg:h-20 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#E0DDFF]"
                >
                  {{ countdown.hours }}
                </div>
                <span class="text-white mt-2 lg:text-base text-xs">Hours</span>
              </div>

              <div class="lg:text-2xl text-xl font-bold text-white">:</div>

              <div class="flex flex-col items-center">
                <div
                  class="lg:text-4xl text-2xl font-bold bg-[#e9ec33] text-[#3c1147] lg:w-20 lg:h-20 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#E0DDFF]"
                >
                  {{ countdown.minutes }}
                </div>
                <span class="text-white mt-2 lg:text-base text-xs"
                  >Minutes</span
                >
              </div>

              <div class="lg:text-2xl text-xl font-bold text-white">:</div>

              <div class="flex flex-col items-center">
                <div
                  class="lg:text-4xl text-2xl font-bold bg-[#e9ec33] text-[#3c1147] lg:w-20 lg:h-20 w-16 h-16 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#E0DDFF] animate-pulse"
                >
                  {{ countdown.seconds }}
                </div>
                <span class="text-white mt-2 lg:text-base text-xs"
                  >Seconds</span
                >
              </div>
            </div>
          </div>

          <div
            class="w-11/12 mx-auto lg:mb-10 mb-5 bg-[#60ff2139] rounded-lg lg:py-5 py-2 lg:px-10 px-2"
          >
            <h1 class="text-white text-center text-2xl font-bold">TEAMS</h1>
            <ul class="lg:flex gap-5 justify-center">
              <li>
                <img
                  class="shadow-lg border border-[#30c844] lg:rounded-lg rounded-md my-3"
                  src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/TECH_SAVVY_TeamBuildingS3_2025_TeamRenz.png"
                />
              </li>
              <li>
                <img
                  class="shadow-lg border border-[#30c844] lg:rounded-lg rounded-md my-3"
                  src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/TECH_SAVVY_TeamBuildingS3_2025_TeamJasper.png"
                />
              </li>
              <li>
                <img
                  class="shadow-lg border border-[#30c844] lg:rounded-lg rounded-md my-3"
                  src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/TECH_SAVVY_TeamBuildingS3_2025_TeamKeith.png"
                />
              </li>
              <li>
                <img
                  class="shadow-lg border border-[#30c844] lg:rounded-lg rounded-md my-3"
                  src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/TECH_SAVVY_TeamBuildingS3_2025_TeamKylah.png"
                />
              </li>
            </ul>
          </div>

          <div
            class="text-white text-sm mx-auto border-[#501b68] w-11/12 border mb-5"
          >
            <div class="text-center text-xs py-5 px-5">
              <p>Team Building Schedule : June 21, 2025 (Saturday)</p>

              <p class="font-bold my-2">Call Time : 7 AM to 8 AM</p>

              <p class="lg:w-full w-10/12 mx-auto">
                Workflow Co-Working Space Ozamiz to Lala's Eco Park Montol
              </p>

              <p>Transport Van will be provided vice versa.</p>
            </div>

            <div class="text-center bg-[#a154f4]">
              <p class="tracking-wider uppercase font-bold lg:py-1 py-0.5">
                9 AM to 5 PM
              </p>
            </div>

            <div class="w-10/12 mx-auto lg:my-4 my-2 lg:text-sm text-[10px]">
              <p
                class="tracking-wider w-full shadow-lg flex items-center lg:my-2"
              >
                <span class="lg:w-11/12 w-8/12 text-right lg:pr-10 pr-5">
                  9 to 11 AM
                </span>
                <span class="w-full">Opening Program</span>
              </p>

              <p
                class="tracking-wider w-full shadow-lg flex items-center lg:my-2"
              >
                <span class="lg:w-11/12 w-8/12 text-right lg:pr-10 pr-5">
                  11 to 1:30 PM
                </span>
                <span class="w-full">Lunch Break</span>
              </p>

              <p
                class="tracking-wider w-full shadow-lg flex items-center lg:my-2"
              >
                <span class="lg:w-11/12 w-8/12 text-right lg:pr-10 pr-5">
                  1:30 to 4:30 PM
                </span>
                <span class="w-full">TEAM BUILDING GAMES</span>
              </p>
              <p
                class="tracking-wider w-full shadow-lg flex items-center lg:my-2"
              >
                <span class="lg:w-11/12 w-8/12 text-right lg:pr-10 pr-5">
                  4:30 to 5 PM
                </span>
                <span class="w-full leading-tight">
                  Community Announcements and Raffle Games</span
                >
              </p>
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
