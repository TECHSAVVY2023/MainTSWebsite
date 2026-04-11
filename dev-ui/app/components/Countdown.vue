<template>
  <div id="countdown" class="text-white text-center text-2xl font-bold">
    <div id="days">{{ days }} Days</div>
    <div id="hours">{{ hours }} Hours</div>
    <div id="minutes">{{ minutes }} Minutes</div>
    <div id="seconds">{{ seconds }} Seconds</div>
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

<style scoped>
#countdown div {
  display: inline-block;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
}

#countdown div:not(:last-child):after {
  content: ":";
  margin-left: 10px;
}
</style>
