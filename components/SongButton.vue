<script setup lang="ts">
defineProps(['song', 'selected']);

</script>

<template>
  <div class="song-button">
    PLAY
  </div>


  <button :class="{selected: selected}"
          @click="$emit('click', song.rank - 1)">
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

  .song-button
    width: 80px
    height: 46px
    background: url(/controls/UIbottonsKit-grid20.png) -296px -191px

  button
    width: 20%
    height: 100px
    background-color: $box-background-color
    border: 1px solid $box-border-color

    &.selected
      background-color: $box-selected-background-color
</style>
