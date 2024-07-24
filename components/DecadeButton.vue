<script setup lang="ts">
defineProps(['decade', 'selected', 'isValid']);
</script>

<template>
  <button class="decade" :class="{selected: selected}"
          @click="$emit('click')"
          :disabled="!isValid">{{ decade }}
  </button>
</template>

<style lang="sass" scoped>
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.decade
  flex: 1
  height: 50px
  background: url(/controls/button-icon-5.png) -107px -49px
  background-size: 305px 149px
  color: white
  font-weight: bold

  &.selected
    background: url(/controls/button-icon-5.png) -210px 4px
    background-size: 305px 149px
    color: white

  &:disabled
    background: url(/controls/button-icon-5.png) -107px 3px
    background-size: 305px 149px
    color: lightgray
</style>
