<script setup lang="ts">
const props = defineProps(['song', 'selected']);

console.log('in SongButton', props);
</script>

<template>
  <button :class="{selected: selectedSongIndex === index}"
          @click="playSong(index)">
    <div class="songTitle">{{ song.rank }}: {{ song.title }}</div>
    <div class="songArtist">{{ song.artist }}</div>
  </button>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.songs

  button
    width: 20%
    height: 100px
    background-color: $box-background-color
    border: 1px solid $box-border-color

    &.selected
      background-color: $box-selected-background-color
</style>
