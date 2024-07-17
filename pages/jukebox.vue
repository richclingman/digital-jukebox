<script setup>
// const response = await useFetch('/data/songList.json')
// console.log('response', response);
//
// process.exit(1);

import songList from '/static/data/songList.json' // assert {type: 'json'}

// import {readFileSync} from "node:fs";
//
// const songListJson = readFileSync('~/assets/songList.json');
// const songList = JSON.parse(songListJson.toString());
// console.log('songListBuffer', songListBuffer);

// const songList = songListBuffer.toString();
// console.log('songList keys', Object.keys(songListBuffer.value));
console.log('songList', songList);

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
const selectedDecade = ref('');
const selectedYear = ref('');
const selectedSong = ref('');

const validDecades = ref([]);
const validYears = ref([]);

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);
const years = ref([]);

const changeGenre = (genre) => {
  try {
    selectedGenre.value = genre;
    console.log('selectedGenre', selectedGenre.value);

    console.log('selectedGenre.value.key', selectedGenre.value.key);

    validDecades.value = songList[selectedGenre.value.key];
    console.log('validDecades', validDecades.value);
    // changeDecade(selectedDecade);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const isDecadeValid = (decade) => {
  try {
    const valid = validDecades.value[decade] !== undefined;
    console.log('valid decade', decade, valid, validDecades.value[decade]);
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeDecade = (decade) => {
  try {
    selectedDecade.value = decade;

    console.log('songList', songList.country[1970]);
    console.log('G', selectedGenre.value);
    console.log('-', songList[selectedGenre.value.key]);
    console.log('D', selectedDecade.value);
    console.log('-', songList[selectedGenre.value.key][selectedDecade.value]);

    validYears.value = songList[selectedGenre.value.key][selectedDecade.value];
    years.value = [];

    for (let year = decade; year < decade + 10; year++) {
      years.value.push(year);
    }

    // changeYear(decade);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const isYearValid = (year) => {
  try {
    const valid = validYears.value[year] !== undefined;
    // console.log('valid year', year, valid, validYears.value[year]);
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeYear = (year) => {
  selectedYear.value = year;
}

// changeGenre('top-100-songs'); // ************ SET UP ALL BUTTONS

console.warn('COUNTRY EXAMPLE:', songList['country'][1970][1971][32]);

const startupGenre = genres.value[1];
console.log('start up with genre', startupGenre);
changeGenre(startupGenre);
changeDecade(1970);
changeYear(1974);

console.log('selectedGenre', selectedGenre.value);
// console.log('selectedDecade', selectedDecade.value);
// console.log('selectedYear', selectedYear.value);
// console.log('selectedSong', selectedSong.value);

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

      <button v-for="genre in genres" class="genre" @click="changeGenre(genre)">{{ genre.name }}</button>
    </div>

    <div class="main">
      <div class="fullwidth">
        <button v-for="decade in decades" class="decade" @click="changeDecade(decade)"
                :disabled="!isDecadeValid(decade)">{{ decade }}
        </button>
      </div>

      <div class="years">
        <button v-for="year in years" class="decade" @click="changeYear(year)" :disabled="!isYearValid(year)">{{
            year
          }}
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-disabled-background-color: #444
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

      //&:disabled
      //  background-color: $box-disabled-background-color

    .years
      margin-top: 10px

      button
        width: 75px

    .separator
      margin-top: 20px
      text-align: center

</style>
