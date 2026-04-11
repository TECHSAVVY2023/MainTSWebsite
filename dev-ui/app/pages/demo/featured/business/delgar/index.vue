<script setup>
import moment from "moment";

useHead({
  title: "Delgar Frozen Products",
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/delgar-frozen-products/delgar-to-remove-bg-removebg-preview.png", // adjust the path and type as needed
    },
  ],
});

const mainLogo = ref(
  "https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/delgar-frozen-products/Delgars%20FB%20Profile.png"
);

// Get API base URL from runtime config
const config = useRuntimeConfig();
const serverIP = config.public.apiBase;

let formInput = ref(true);

onMounted(async () => {
  await fetchListItems();
  // startAutoRefresh();
});


const listItems = ref([]);

const isLoading = ref(false);
const originalListItems = ref([])
const searchQuery = ref("")

const fetchListItems = async () => {
  isLoading.value = true;
  try {
    const response = await $fetch(serverIP + "/api/delgar/product/list").catch(
      (error) => {
        console.error("Fetch error:", error);
        return [];
      }
    );

    // Ensure listItems is always an array
    listItems.value = Array.isArray(response) ? response : [];

    // Reset search state
    originalListItems.value = [];
    searchQuery.value = "";
    
  } catch (error) {
    console.error("Error fetching list items:", error);
    listItems.value = []; // fallback
  } finally {
    isLoading.value = false;
  }
};


const productInfo = ref({
  order_id: "OID" + moment().valueOf(),
  fullname: "",
  address: "-",
  contact_email: "",
  contact_number: "",
  products: [
    {
      product_id: "",
      product_image: "",
      product_name: "",
      kilograms: "",
      quantity: "",
      price: "",
    },
  ],
  system_fee: "20",
  delivery_fee: "50",
  grand_total: "",
  payment_method: "",
  receipt_url: "",
});


const uploadStatus = ref(null);
const fileToUpload = ref(null);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileToUpload.value = file;

  try {
    uploadStatus.value = { success: false, message: "Uploading..." };

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(serverIP + "/api/register/upload/", {
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

// Initialize registration fee on component mount
onMounted(() => {
  // calculateRegistrationFee();
});

const phoneNumberError = ref(false);
const validatePhoneNumber = () => {
  const phoneRegex = /^\+639\d{9}$/;
  phoneNumberError.value = !phoneRegex.test(info.value.contact_number);
  if (info.value.contact_number.startsWith("09")) {
    info.value.contact_number = "+63" + info.value.contact_number.substring(1);
  }
};

// const isFormValid = computed(() => {
//   return (
//     info.value.fullname &&
//     info.value.birth_date &&
//     info.value.contact_email &&
//     info.value.contact_number &&
//     !phoneNumberError.value &&
//     info.value.tech_level &&
//     info.value.preferred_topics.length > 0 &&
//     info.value.registration_fee &&
//     info.value.payment_method &&
//     info.value.data_privacy_consent &&
//     info.value.receipt_url &&
//     uploadStatus.value?.success === true
//   );
// });

const submitForm = async () => {
  postAPI();
};

const postAPI = async () => {
  if (!isFormValid.value) return;
  else {
    await $fetch(serverIP + "/api/order/create/", {
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
  await $fetch(serverIP + "/api/order/email/", {
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
    <div class="h-screen bg-[#f5f5f5] flex">
      <div class="overflow-y-scroll bg-white w-full">
        <div v-if="formInput" class="w-11/12 mx-auto flex items-center my-8">
          <div class="w-full text-right">
            <p class="text-sm block font-semibold">Easy Online Order 24/7</p>
            <p class="text-xs">
              JP Rizal Avenue Infront of Penshoppe beside Sanbon Enterprises,
              Purok 4 Carmen Annex, Ozamiz City , Ozamiz, Philippines
            </p>
          </div>

          <div class="w-6/12">
            <img
              :src="mainLogo"
              class="lg:w-[100px] w-[70px] mx-auto rounded-full border-[#26aec6] border-2"
            />
          </div>

          <div class="w-full text-sm text-left">
            <ul class="text-xs">
              <li>✅Wholesale and Retail</li>
              <li>
                ✅Frozen Meat Pork, Beef, Chicken, Tuna, Seafoods and etc.
              </li>
              <li>✅We ship in neighboring Towns</li>
            </ul>
          </div>
        </div>

        <div class="w-11/12 mx-auto py-2 shadow">
          <div class="w-full">
            <label class="text-xs block text-center">Grand Total </label>
            <!-- <input
                      class="text-center w-full px-2 lg:text-sm text-xs py-2"
                      type="text"
                      :value="
                        '₱' +
                        info.grand_total +
                        ' Delivery Fee + ₱' +
                        info.delivery_fee.length + 
                        ' System Fee + ₱' +
                        info.system_fee +
                        ' Total Costs per Items '
                      "
                      readonly
                    /> -->
          </div>
        </div>

        <div
          class="gap-x-3 border-[#ebebeb] shadow mt-3 border w-11/12 mx-auto"
        >
          <div class="w-full">
            <p class="font-bold text-center px-2 pt-5 uppercase">
              Select Products
            </p>

            <div class="">
              <ul class="grid grid-cols-3 justify-center my-5">
                <li
                  v-for="(j, i) in listItems"
                  :key="i"
                  class="border shadow-lg px-3 pt-1 pb-3 mx-2 mb-3 relative"
                >
                  <div class="flex justify-between">
                    <p class="font-bold text-green-900">
                      <i class="fa-solid fa-peso-sign"></i> {{ j.price }}
                    </p>
                    <p>
                      <input
                        type="checkbox"
                        v-model="j.selected"
                        class="ml-auto mr-0 block my-1 w-3.5 h-3.5"
                      />
                    </p>
                  </div>
                  <img
                    src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/513758360_738169865629019_5811710172296710755_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFbZ_oVSYZ-nJP3l6mGTNOSw-23rJYXNGrD7beslhc0al-Rf45ACJ898xEsqVuql7KxdMdRrggB3hM-3sCIo7-z&_nc_ohc=BVv07yjrr68Q7kNvwH-5qGT&_nc_oc=Adkd_O4rg4c7VjvxB_EwATL1sAdvWk7DO3xRB0izeipbFS-GEa6jY_N0NcirXLyPHnU&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=IZnvuZYjUiBE84KQWrWp7Q&oh=00_AfSPpdYNqLSJB38yxHFOvCvnk5wEIjGlEBOHOHWf0i097Q&oe=68751D05"
                    class="w-full h-[250px] object-cover border-t-2 border-green-800"
                  />
                  <p
                    class="font-bold py-0.5 -mt-0.5 text-center capitalize text-white bg-green-700 mb-3"
                  >
                    {{ j.product_name }}
                  </p>

                  <div class="">
                    <p class="mb-1" :class="j.type === 'kilo' ? '':'hidden'">
                              <span class="text-xs mr-1.5">Kilograms:</span>
                              <input
                                v-model="j.kilograms"
                                class="border w-[50px] px-2 border-green-500"
                                type="number"
                              />
                            </p>
                    <p class="mb-1" :class="j.type === 'item' ? '':'hidden'">
                      <span class="text-xs mr-[13px]">Quantity:</span>
                      <input
                        v-model="j.kilograms"
                        class="border w-[50px] px-2 border-green-500"
                        type="number"
                      />
                    </p>
                  </div>

                  <!-- <p>Available Stocks:{{ j.stocks }}</p> -->
                  <p
                    class="bg-[#18863d] rounded-xl text-white text-center w-fit px-2.5 text-xs absolute bottom-3 right-2 py-1"
                  >
                    Available
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-y-scroll">
        <div v-if="formInput">
          <div class="lg:w-full">
            <form class="py-5 px-3">
              <div class="">
                <div class="pt-2">
                  <div class="mb-3 uppercase text-center tracking-widest">
                    <i class="fa fa-shopping-cart"></i> Payment Details
                  </div>
                  <div class="gap-x-3 w-full">
                    <div class="w-full mb-2">
                      <label class="text-xs block lg:mb-1"
                        >Full Name
                        <span class="text-md text-red-700">*</span>
                      </label>
                      <input
                        class="w-full border py-1 px-2 lg:text-sm text-xs"
                        type="text"
                        placeholder="Full Name"
                        v-model="productInfo.fullname"
                      />
                    </div>
                    <!-- <div class="w-full mb-2">
                                <label
                                  class="text-xs block lg:mb-1 whitespace-nowrap"
                                  >Address
                                  <span class="text-md text-red-700">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Complete Address"
                                  class="w-full border py-1 px-2 lg:text-sm text-xs"
                                  v-model="productInfo.address"
                                />
                              </div> -->
                  </div>
                  <div class="w-full mb-2">
                    <div class="w-full mb-2">
                      <div class="w-full">
                        <label class="text-xs block lg:mb-1"
                          >Contact Email
                          <span class="text-md text-red-700">*</span>
                        </label>
                        <input
                          class="w-full border py-1 px-2 lg:text-sm text-xs"
                          type="email"
                          placeholder="Contact Email"
                          v-model="productInfo.contact_email"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <div class="w-full">
                        <label class="text-xs block lg:mb-1 whitespace-nowrap"
                          >Contact Number
                          <span class="text-md text-red-700">*</span>
                        </label>
                        <input
                          class="w-full border py-1 px-2 lg:text-sm text-xs"
                          type="tel"
                          placeholder="e.g +639XXXXXXXXX"
                          v-model="productInfo.contact_number"
                          @input="validatePhoneNumber"
                          :class="{
                            'border-red-500': phoneNumberError,
                          }"
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

                <div class="mb-3 border border-transparent">
                  <div>
                    <p class="lg:text-sm text-xs lg:mb-2 mb-1">
                      Payment Method
                      <span class="text-md text-red-700">*</span>
                    </p>
                    <div class="gap-x-3 w-full mb-3">
                      <div class="bg-[#007DFE] pb-3 px-3 mb-2">
                        <div class="flex gap-x-3 w-full py-3">
                          <div class="flex items-center">
                            <input
                              id="gcash"
                              class="border-b-[3px] border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                              type="radio"
                              v-model="productInfo.payment_method"
                              value="GCash"
                            />
                          </div>
                          <label for="gcash" class="flex items-center">
                            <div>
                              <div
                                class="text-xs lg:font-bold w-fit lg:mr-7 whitespace-nowrap cursor-pointer text-white"
                              >
                                GCash Transfer
                              </div>
                            </div>
                          </label>
                        </div>
                        <div class="w-full">
                          <img
                            src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/delgar-frozen-products/GCASH.png"
                            class="lg:max-w-[250px] mx-auto w-full"
                          />
                        </div>
                      </div>
                      <div class="bg-[#B11116] pb-3 px-3">
                        <div class="flex gap-x-3 w-full py-3">
                          <div class="flex items-center">
                            <input
                              id="bankTransfer"
                              class="border-b-[3px] mr-3 border-violet-800 bg-[#ffffff] py-1 lg:px-2 lg:text-sm text-xs cursor-pointer"
                              type="radio"
                              v-model="productInfo.payment_method"
                              value="Bank Transfer"
                            />
                          </div>
                          <label for="bankTransfer" class="flex items-center">
                            <div>
                              <div
                                class="text-xs lg:font-bold w-fit lg:mr-7 whitespace-nowrap cursor-pointer text-white"
                              >
                                BPI Bank Transfer
                              </div>
                            </div>
                          </label>
                        </div>
                        <div class="w-full">
                          <img
                            src="https://lsu-media-styles.sgp1.digitaloceanspaces.com/test/delgar-frozen-products/BPI.png"
                            class="lg:max-w-[250px] mx-auto w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p class="lg:text-sm text-xs">
                      Upload Receipt
                      <span class="text-md text-red-700">*</span>
                    </p>
                    <div class="w-full mb-3">
                      <div class="">
                        <input
                          class="w-full py-1 lg:text-sm text-xs"
                          type="file"
                          @change="handleFileUpload"
                          accept="image/*,.pdf"
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
                        v-if="productInfo.receipt_url"
                        class="text-xs mt-1 text-green-400"
                      >
                        Receipt uploaded successfully
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                :disabled="!isFormValid"
                @click.prevent="submitForm"
                class="mb-5"
                :class="[
                  'font-bold flex py-1 px-10 rounded-lg mx-auto justify-center text-center items-center w-full shadow uppercase hover:bg-[#0f6f2b] hover: mt-3',
                  isFormValid
                    ? 'bg-white text-[#000000]'
                    : 'bg-gray-300 text-[#fff] cursor-not-allowed',
                ]"
              >
                <i class="fa fa-paper-plane mr-2"></i> Submit
              </button>
            </form>
          </div>
        </div>

        <div v-if="!formInput">
          <div
            class="md:w-4/12 gap-10 lg:rounded-4xl lg:px-14 px-3 lg:py-1 lg:my-10 rounded-xl border-4 w-11/12 mx-auto my-5 border-[#3d216d]"
          >
            <div
              class="flex items-center text-center justify-center lg:pt-10 pt-14"
            >
              <i class="fa fa-check font-bold text-5xl" aria-hidden="true"></i>
            </div>
            <div class="text-xl text-center w-fit mx-auto py-5">
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
</template>
