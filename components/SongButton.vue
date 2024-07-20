<script setup lang="ts">
defineProps(['song', 'selected', 'noPlay', 'genre', 'year']);

</script>

<template>

  <div v-if="song.title" class="song" :class="{selected: selected, 'no-play': noPlay}"
       @click="$emit('click', song.rank - 1)">

    <div class="background"></div>

    <div class="foreground">
      <div v-if="!noPlay" class="song-button">
        <div>PLAY</div>
      </div>

      <div v-if="noPlay" class="songTitle ml-6 truncate leading-3">{{ year }}: {{ genre }}</div>

      <div class="songTitle ml-6 truncate text-2xl font-bold">{{ song.rank }}: {{ song.title }}</div>
      <div class="songArtist ml-10 truncate text-2xl">{{ song.artist }}</div>
    </div>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.song
  width: 25%
  height: 150px

  .foreground
    position: relative
    top: -63px

    .songTitle, .songArtist
      color: blue

  .background
    width: 182px
    height: 66px
    background: url(/controls/rectangularButtons.png) -423px -11px
    text-align: center
    vertical-align: middle
    scale: 173% 249%
    position: relative
    left: 66px
    top: 50px

  .song-button
    width: 80px
    height: 46px
    background: url(/controls/UIbottonsKit.png) -296px -138px
    text-align: center

    div
      padding-top: 10px
      color: antiquewhite
      @apply font-bold


  &.selected
    background-color: $box-selected-background-color

    .background
      background: url(/controls/rectangularButtons.png) -423px -85px

    .foreground

      .songTitle, .songArtist
        color: white

      .song-button
        background: url(/controls/UIbottonsKit.png) -492px -138px

        div
          color: greenyellow

.song
  &.no-play
      width: 310px
      height: fit-content

      .foreground
        top: -17px
        left: 7px

</style>
