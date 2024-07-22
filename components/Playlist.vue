<script setup lang="ts">
const props = defineProps(['playlist', 'song'])

let nowPlaying = {song: {}};

console.log('in playlist', props.playlist, props.song)

if (props.playlist.length > 0) {
  nowPlaying = props.playlist[0];
}

console.log('nowPlaying', nowPlaying);


watch(
    () => props.playlist,
    (newPlaylist) => {
      if (newPlaylist.length > 0) {
        nowPlaying = newPlaylist[0];
      }
      console.log('nowPlaying updated', nowPlaying);
    },
    { immediate: true }
);

watch(
    () => props.song,
    (newSong) => {
      console.log('song updated', newSong);
    },
    { immediate: true }
);


</script>

<template>
  <div v-if="nowPlaying.song.title" class="songs">
    <SongButton :no-play="true" :selected="true" :song="nowPlaying.song" :genre="nowPlaying.genre" :year="nowPlaying.year"/>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

</style>
