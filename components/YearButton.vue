<script setup lang="ts">
defineProps(['year', 'selected', 'isValid']);
</script>

<template>
  <button class="year" :class="{selected: selected}"
          @click="$emit('click')"
          :disabled="!isValid">{{ year }}
  </button>
</template>

<style lang="sass" scoped>
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.year
  flex: 1
  height: 50px
  background: url(/controls/button-icon-5.png) -138px -49px
  background-size: 398px 149px
  color: white
  font-weight: bold

  &.selected
    background: url(/controls/button-icon-5.png) -273px 4px
    background-size: 398px 149px
    color: white

  &:disabled
    background: url(/controls/button-icon-5.png) -137px 3px
    background-size: 398px 149px
    color: lightgray
</style>
