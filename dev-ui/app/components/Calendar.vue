<template>
  <div class="p-4">
    <div class="">
      <!-- Calendar Title -->
      <h2 class="text-center text-xl lg:text-2xl font-bold mb-4 uppercase">
        Community Calendar
      </h2>

      <!-- Embedded Calendar (Admin + Group + PH Holidays) -->
      <div>
        <iframe
          class="w-11/12 mx-auto h-screen"
          :src="iframeSrc"
          referrerpolicy="no-referrer"
          loading="lazy"
          style="border: solid 1px #777"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  </div>
</template>
<script setup>
// ✅ Public Google Calendars
const publicCalendars = [
  "info@techsavvies.space", // Admin calendar
  "c_2b5ebfe1234755ee894fb469a4ac49f41f01697b8ec0e70579d60cf504645e8f@group.calendar.google.com", // Group calendar
  "en.philippines%23holiday@group.v.calendar.google.com" // Philippine holidays
];

// Build iframe URL dynamically with all calendars
const baseCalendarUrl = `https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FManila&showPrint=0&showTabs=0&showTitle=0&showCalendars=0&showTz=0&mode=MONTH${publicCalendars
  .map((id) => `&src=${id}`)
.join("")}&color=%23039be5&color=%233f51b5&color=%230b8043`; // indigo


const iframeSrc = ref(`${baseCalendarUrl}&t=${Date.now()}`);

let interval;

onMounted(() => {
  // Refresh iframe every 1 minute
  interval = setInterval(() => {
    iframeSrc.value = `${baseCalendarUrl}&t=${Date.now()}`;
  }, 60000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.bg-green-800 {
  background-color: #096b2e;
}
</style>
