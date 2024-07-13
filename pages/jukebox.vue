<template>
  <div class="jukebox">
    <div class="left-bar">
      <img src="/img/jukebox_8676230.png" alt="Image of jukebox" />
      <div class="brand">Digital Jukebox</div>
    </div>
    <div class="fullwidth">
      <div v-for="decade in decades" class="box">{{ decade }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'clean'
})

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);

</script>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-border-color: #999
$left-bar-color: burlywood

.jukebox
  display: flex
  height: 100vw
  width: 100hw

  img
    margin-top: 5px
  .brand
    width: 100%
    text-align: center
    font-weight: bolder
    font-size: 20px

.left-bar
  width: 225px
  background-color: $left-bar-color

.fullwidth
  flex: 1
  display: flex
  justify-content: space-between
  align-items: flex-start
  height: 50px
  background-color: $background-color

  .box
    flex: 1
    height: 100%
    background-color: $box-background-color
    border: 1px solid $box-border-color
    box-sizing: border-box
</style>
