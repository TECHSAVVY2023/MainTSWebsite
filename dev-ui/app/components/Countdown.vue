<template>
  <div id="countdown" class="flex flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold text-white sm:gap-3">
    <div class="rounded bg-black/50 px-3 py-2 after:ml-2 after:content-[':']">{{ days }} Days</div>
    <div class="rounded bg-black/50 px-3 py-2 after:ml-2 after:content-[':']">{{ hours }} Hours</div>
    <div class="rounded bg-black/50 px-3 py-2 after:ml-2 after:content-[':']">{{ minutes }} Minutes</div>
    <div class="rounded bg-black/50 px-3 py-2">{{ seconds }} Seconds</div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import moment from 'moment';

export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const countdownActive = ref(true);

    const targetDate = moment('2025-06-21T00:00:00');

    const updateCountdown = () => {
      if (!countdownActive.value) return;

      const now = moment();
      const duration = moment.duration(targetDate.diff(now));

      days.value = duration.days();
      hours.value = duration.hours();
      minutes.value = duration.minutes();
      seconds.value = duration.seconds();
    };

    onMounted(() => {
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);

      // Clean up interval on component unmount
      onUnmounted(() => {
        clearInterval(timer);
      });
    });

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
};
</script>
