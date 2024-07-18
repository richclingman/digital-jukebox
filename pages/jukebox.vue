<script setup>
// const response = await useFetch('/data/songList.json')
// console.log('response', toRaw(response));

import songList from '/static/data/songList.json' // assert {type: 'json'}

// import {readFileSync} from "node:fs";
//
// const songListJson = readFileSync('~/assets/songList.json');
// const songList = JSON.parse(songListJson.toString());
// console.log('songListBuffer', songListBuffer);

// const songList = songListBuffer.toString();
// console.log('songList keys', Object.keys(songListBuffer.value));
// console.log('songList', songList);

definePageMeta({
  layout: 'clean'
})

const genres = ref([
  {name: 'Top 100', key: 'top-100-songs'},
  {name: 'Country', key: 'country'},
  {name: 'Rock & Roll', key: 'rock'},
  {name: 'R & B', key: 'rnb'},
]);
const selectedGenre = ref({});
const selectedDecade = ref(0);
const selectedYear = ref(0);
const selectedSong = ref('');

const validDecades = ref([]);
const validYears = ref([]);

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);
const years = ref([]);

const changeGenre = (genre) => {
  try {
    selectedGenre.value = genre;
    console.log('selectedGenre', selectedGenre.value);

    const selectedGenreKey = selectedGenre.value.key;
    console.log('selectedGenre.value.key', selectedGenreKey);

    const songListDecades = songList[selectedGenreKey];
    console.log('songListDecades', songListDecades);

    validDecades.value = Object.keys(songListDecades).map(d => parseInt(d));
    console.log('validDecades', validDecades.value);

    changeDecade(selectedDecade.value);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const isDecadeValid = (decade) => {
  try {
    const valid = validDecades.value.includes(decade);
    console.log('valid decade', decade, typeof decade, valid, validDecades.value[decade]);
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeDecade = (decade) => {
  try {
    console.log('new decade', decade, typeof decade)

    if (!isDecadeValid(decade)) {
      decade = validDecades.value[0];
      console.error('isDecadeValid?', decade, validDecades.value);
    }

    selectedDecade.value = decade;

    const selectedGenreKey = selectedGenre.value.key;
    console.log('selectedGenre.value.key', selectedGenreKey);

    const songListYears = songList[selectedGenreKey][selectedDecade.value];
    console.log('songListYears', songListYears);

    validYears.value = Object.keys(songListYears).map(d => parseInt(d));
    years.value = [];

    // TODO: use date.year instead of 2024
    for (let year = decade; year < 10 + decade && year <= 2024; year++) {
      years.value.push(year);
    }

    if (!years.value.includes(selectedYear.value)) {
      selectedYear.value = years.value[0];
    }

    changeYear(selectedYear.value);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const isYearValid = (year) => {
  try {
    const valid = validYears.value.includes(year);
    console.log('valid year', year, valid);
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeYear = (year) => {

  console.log('changeYear', year);

  if (!isYearValid(year)) {
    year = validYears.value[0];
    console.error('isDecadeValid?', year, validYears.value);
  }

  selectedYear.value = year;
}

console.warn('COUNTRY EXAMPLE:', songList['country'][1970][1971][32]);

const startupGenre = genres.value[1];
console.log('start up with genre', startupGenre);
changeGenre(startupGenre);
changeDecade(1970);
changeYear(1974);

</script>

<template>
  <div class="jukebox">
    <div class="left-bar">
      <img src="/img/jukebox_8676230.png" alt="Image of jukebox"/>
      <div class="brand">
        Gene &amp; Gigi's
        <br>
        Digital Jukebox
      </div>

      <div class="selected-values">
        <div>{{ selectedGenre.name }}</div>
        <div>{{ selectedDecade }}'s</div>
        <div>{{ selectedYear }}</div>
      </div>

      <button v-for="genre in genres" class="genre" :class="{selected: selectedGenre === genre}" @click="changeGenre(genre)">{{ genre.name }}</button>
    </div>

    <div class="main">
      <div class="fullwidth">
        <button v-for="decade in decades" class="decade" :class="{selected: selectedDecade === decade}" @click="changeDecade(decade)"
                :disabled="!isDecadeValid(decade)">{{ decade }}
        </button>
      </div>

      <div class="years">
        <button v-for="year in years" class="decade" :class="{selected: selectedYear === year}" @click="changeYear(year)" :disabled="!isYearValid(year)">
          {{ year }}
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
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

    .selected-values
      margin: 20px
      border: 2px solid green
      border-radius: 10px

      div
        font-size: 1.2em
        text-align: center
        font-weight: bold

    .genre
      width: 100%
      height: 50px
      background-color: $box-background-color
      border: 1px solid $box-border-color
      box-sizing: border-box
      text-align: center
      vert-align: middle
      font-weight: bold
      font-size: 1.5em
      padding: 0

      &.selected
        background-color: $box-selected-background-color

  .main
    width: 100%

    .fullwidth
      display: flex
      justify-content: space-between
      align-items: flex-start
      height: 50px
      background-color: $background-color

      button.decade
        flex: 1
        height: 100%
        background-color: $box-background-color
        border: 1px solid $box-border-color
        box-sizing: border-box
        font-weight: bold

        &.selected
          background-color: $box-selected-background-color

    .years
      margin-top: 10px

      button
        width: 75px
        background-color: $box-background-color
        border: 1px solid $box-border-color

        &.selected
          background-color: $box-selected-background-color


    .separator
      margin-top: 20px
      text-align: center

</style>
