<script setup lang="ts">
const props = defineProps(['location', 'city', 'state']);

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayOfWeek = ref("");
const partOfDay = ref("");
const time = ref("");
const date = ref("");

// TODO: get these values once every minute. adjust timer to trigger at next minute change (60 - now.getSeconds())

const now = new Date();
const hour = now.getHours();
const amPm = hour > 11 ? "PM" : "AM";
const hour12 = hour > 12 ? hour - 12 : hour;

time.value = `${hour12}:${now.getMinutes()} ${amPm}`;

date.value = new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric', 'year': 'numeric'}).format(now);
console.log('df', date.value)

const getPartOfDay = (hour:number) : string => {
  if (hour > 21 || hour < 6) {
    return 'Night';
  }
  if (hour < 12) {
    return 'Morning';
  }
  if (hour < 18) {
    return 'Afternoon';
  }

  return "Evening";
}

dayOfWeek.value = days[now.getDay()];
partOfDay.value = getPartOfDay(hour);

</script>

<template>
  <div class="clock">
    <div class="text-5xl">{{ dayOfWeek}}</div>
    <div class="text-3xl">{{partOfDay}}</div>
    <div class="text-5xl pt-3">{{time}}</div>
    <div class="text-3xl">{{date}}</div>

    <div class="text-xl pt-3">{{ location }}</div>
    <div class="text-xl">{{ city }}, {{ state }}</div>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.clock
  border: 5px solid $box-border-color
  height: 270px
  text-align: center
  font-weight: bold
  font-size: 1.2em
  line-height: 1.5em

  .time
    font-size: 3em
    line-height: 1.5em

  .day-of-week
    font-size: 1.5em

  .part-of-day
    font-size: 1.5em
</style>
