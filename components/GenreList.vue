<script setup lang="ts">
defineProps(['genres', 'selectedGenre']);
</script>

<template>
  <div class="genres">
    <GenreButton v-for="genre in genres"
                  @click="$emit('changeGenre', genre)"
                  :genre="genre" :selected="selectedGenre === genre" />
    <div class="takeup"></div>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.genres
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-top: 5px

  .takeup
    flex: 1

</style>
