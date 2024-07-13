<template>
  <div class="jukebox">
    <div class="left-bar">
      <img src="/img/jukebox_8676230.png" alt="Image of jukebox"/>
      <div class="brand">
        Gene &amp; Gigi's
        <br>
        Digital Jukebox
      </div>

      <button v-for="genre in genres" class="genre" @click="doGenre(genre)">{{ genre }}</button>
    </div>

    <div class="main">
      <div class="fullwidth">
        <button v-for="decade in decades" class="decade" @click="doDecade(decade)">{{ decade }}</button>
      </div>

      <div class="years">
        <button v-for="year in years" class="decade" @click="doYear(year)">{{ year }}</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'clean'
})

const doDecade = (decade) => {
  years.value = [];
  for (let year = decade; year < decade + 10; year++) {
    years.value.push(year);
  }
}

const doYear = (year) => {
  alert(`year ${year}`)
}


const doGenre = (genre) => {
  alert(`genre ${genre}`)
}

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);
const years = ref([]);

const genres = ref(['Top 100', 'Country', 'Rock & Roll', 'R & B']);
</script>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-border-color: #999
$left-bar-color: burlywood

.jukebox
  display: grid
  grid-template-columns: 225px 1fr
  column-gap: 0
  height: 100vw
  width: 100vw

  .left-bar
    background-color: $left-bar-color

    img
      margin-top: 5px

    .brand
      width: 100%
      text-align: center
      font-weight: bolder
      font-size: 20px
      margin-bottom: 15px

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

  .main
    width: 100%

    .fullwidth
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

    .years
      margin-top: 10px

      button
        width: 75px

    .separator
      margin-top: 20px
      text-align: center

</style>
