<script setup>

import songList from '/static/data/songList.json'

const startupSettings = {
  genreIndex: 1,
  decade: 1970,
  year: 1974,

  location: 'NorthPark Assisted Living',
  city: 'Ozark',
  state: 'Missouri',
}

const emptySong = {
  ytVideoId: "",
}

// const response = await useFetch('/data/songList.json')
// console.log('response', toRaw(response));

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
const selectedSongIndex = ref(-1);
const selectedSong = ref({});

const validDecades = ref([]);
const validYears = ref([]);

const decades = ref([1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]);
const years = ref([]);

const songs = ref([]);
const playlists = computed(() => {
  console.log('computed playlists  selectedSong', selectedSong.value);

  const songInfo = {
    song: Object.assign({}, selectedSong.value),
    genre: selectedGenre.value.name,
    year: selectedYear.value,
  }

  // // TODO: don't clear array so we can build a playlist
  const playlist = [];
  playlist.push(songInfo);

  console.log('computed playList', playlist);
  return playlist;
});

const changeGenre = (genre) => {
  try {
    if (selectedGenre.value === genre) {
      return;
    }

    selectedSongIndex.value = -1;
    selectedSong.value = emptySong;

    selectedGenre.value = genre;
    const selectedGenreKey = selectedGenre.value.key;
    const songListDecades = songList[selectedGenreKey];
    validDecades.value = Object.keys(songListDecades).map(d => parseInt(d));

    changeDecade(selectedDecade.value);
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const isDecadeValid = (decade) => {
  try {
    const valid = validDecades.value.includes(decade);
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeDecade = (decade) => {
  try {
    if (selectedDecade.value === decade) {
      return;
    }

    selectedSongIndex.value = -1;
    selectedSong.value = emptySong;

    if (!isDecadeValid(decade)) {
      decade = validDecades.value[0];
    }

    selectedDecade.value = decade;

    const selectedGenreKey = selectedGenre.value.key;
    const songListYears = songList[selectedGenreKey][selectedDecade.value];
    validYears.value = Object.keys(songListYears).map(d => parseInt(d));
    years.value = [];

    // TODO: use date.year instead of 2024
    for (let year = decade; year < 10 + decade; year++) {
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
    return valid;
  } catch (error) {
    console.error('ERROR:', error);
  }
}

const changeYear = (year) => {
  if (selectedYear.value === year) {
    return;
  }

  selectedSongIndex.value = -1;
  selectedSong.value = emptySong;

  if (!isYearValid(year)) {
    year = validYears.value[0];
  }

  selectedYear.value = year;

  showSongs();
}

const showSongs = () => {
  songs.value = songList[selectedGenre.value.key][selectedDecade.value][selectedYear.value]
  console.log('songs', songs.value)
}

const selectSong = (songIndex) => {
  console.log('selectSong', songIndex);
  selectedSongIndex.value = songIndex;
  selectedSong.value = songs.value[songIndex];
}


// ===================== STARTUP ====================

const startupGenre = genres.value[startupSettings.genreIndex];

changeGenre(startupGenre);
changeDecade(startupSettings.decade);
changeYear(startupSettings.year);

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

    </div>

    <div class="main">

      <Instruction number="1">Select a Genre</Instruction>

      <GenreList :genres="genres" :selectedGenre="selectedGenre"
                  @changeGenre="changeGenre"/>

      <Instruction number="2">Select a Decade</Instruction>

      <DecadeList :decades="decades" :selectedDecade="selectedDecade"
                  @changeDecade="changeDecade" :isDecadeValid="isDecadeValid"/>

      <Instruction number="3">Select a Year</Instruction>

      <YearList :years="years" :selectedYear="selectedYear"
                @changeYear="changeYear" :isYearValid="isYearValid"/>

      <Instruction number="4">Choose a Song</Instruction>

      <div class="songs">
        <SongButton v-for="(song, index) in songs" :song="song" :selected="selectedSongIndex === index"
                    @click="selectSong(index)"/>
      </div>
    </div>

    <div class="right-bar">
      <DementiaClock :location="startupSettings.location"
                     :city="startupSettings.city"
                     :state="startupSettings.state"/>

      <Player :genre="selectedGenre.name" :year="selectedYear" :song="selectedSong"/>

      <Playlist :playlist="playlists" :song="selectedSong"/>
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
  grid-template-columns: 225px 1fr 450px
  column-gap: 0
  height: 100vh
  width: 100vw

  .left-bar
    height: 100vh
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
    display: flex
    flex-direction: column
    height: 100vh


    .years
      margin-bottom: 20px
      flex: 0 0 auto

      button
        height: 50px
        width: 75px
        background-color: $box-background-color
        border: 1px solid $box-border-color

        &.selected
          background-color: $box-selected-background-color

    .songs
      border-top: 4px solid dodgerblue
      display: flex
      flex: 1 1 auto
      overflow-y: auto
      overflow-x: hidden
      align-content: stretch
      flex-direction: row
      flex-wrap: wrap


</style>
