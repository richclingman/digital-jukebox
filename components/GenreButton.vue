<script setup lang="ts">
defineProps(['genre', 'selected']);
</script>

<template>
  <button class="genre" :class="{selected: selected}"
          @click="$emit('click')">{{ genre.name }}
  </button>
</template>

<style lang="sass" scoped>
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.genre
  width: 150px
  height: 50px
  background: url(/controls/button-icon-5.png) -174px -49px
  background-size: 499px 149px
  color: white
  font-weight: bold

  &.selected
    background: url(/controls/button-icon-5.png) -345px 4px
    background-size: 499px 149px
    color: white
</style>
