<script setup lang="ts">
defineProps(['song', 'selected']);

</script>

<template>

  <div class="song" :class="{selected: selected}"
       @click="$emit('click', song.rank - 1)">

    <div class="song-button">
      <div>PLAY</div>
    </div>

    <div class="songTitle">{{ song.rank }}: {{ song.title }}</div>
    <div class="songArtist">{{ song.artist }}</div>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.song
  width: 20%
  height: 100px
  background-color: $box-background-color
  border: 1px solid $box-border-color

  .song-button
    width: 80px
    height: 46px
    background: url(/controls/UIbottonsKit.png) -296px -138px
    text-align: center
    vertical-align: middle

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
