<script setup lang="ts">
defineProps(['song', 'selected']);

</script>

<template>

  <div class="song" :class="{selected: selected}"
       @click="$emit('click', song.rank - 1)">

    <div class="background"></div>

    <div class="foreground">
      <div class="song-button">
        <div>PLAY</div>
      </div>

      <div class="text-white songTitle ml-6 truncate text-2xl font-bold">{{ song.rank }}: {{ song.title }}</div>
      <div class="text-white songArtist ml-10 truncate text-2xl">{{ song.artist }}</div>
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

  .foreground
    position: relative
    top: -63px

  .background
    width: 182px
    height: 66px
    border: 1px solid #999
    background: url(/controls/rectangularButtons.png) -423px -85px
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

    .song-button
      background: url(/controls/UIbottonsKit.png) -492px -138px

      div
        color: greenyellow


</style>
