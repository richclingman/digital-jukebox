<template>
  <div class="jukebox">
    <div class="left-bar">
      <img src="/img/jukebox_8676230.png" alt="Image of jukebox" />
      <div class="brand">Digital Jukebox</div>

      <button v-for="genre in genres" class="genre" @click="doDecade(genre)">{{genre}}</button>
    </div>
    <div class="fullwidth">
      <button v-for="decade in decades" class="decade" @click="doDecade(decade)">{{ decade }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'clean'
})

const doDecade = (decade) => {
  alert(`decade ${decade}`)
}
const doGenre = (genre) => {
  alert(`genre ${genre}`)
}

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);
const genres = ref(['Top 100', 'Country', 'Rock & Roll', 'R & B']);
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

.left-bar
  width: 225px
  background-color: $left-bar-color

  img
    margin-top: 5px
  .brand
    width: 100%
    text-align: center
    font-weight: bolder
    font-size: 20px
  .genre
    width: 100%
    height: 50px
    background-color: $box-background-color
    border: 1px solid $box-border-color
    box-sizing: border-box
    text-align: center
    vert-align: middle
    font-weight: bold
    font-size: 20px
    padding: 0

.fullwidth
  flex: 1
  display: flex
  justify-content: space-between
  align-items: flex-start
  height: 50px
  background-color: $background-color

  .decade
    flex: 1
    height: 100%
    background-color: $box-background-color
    border: 1px solid $box-border-color
    box-sizing: border-box
    font-weight: bold
</style>
