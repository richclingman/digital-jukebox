<script setup lang="ts">
const props = defineProps(['location', 'city', 'state']);

console.log('in Clock', props);
</script>

<template>
  <div class="clock">
    <div class="day-of-week">Wednesday</div>
    <div class="part-of-day">Evening</div>
    <div class="time">9:35 PM</div>
    <div class="date">September 28, 2024</div>

    <div class="location">{{ location }}</div>
    <div class="city-state">{{ city }}, {{ state }}</div>
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
  height: 250px
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
