<script setup lang="ts">
defineProps(['decade', 'selected', 'isValid']);
</script>

<template>
  <button class="decade" :class="{selected: selected}"
          @click="$emit('click')"
          :disabled="!isValid">{{ decade }}
  </button>
</template>

<style lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.decade
  flex: 1
  height: 50px
  background-color: $box-background-color
  border: 1px solid $box-border-color
  box-sizing: border-box
  font-weight: bold

  &.selected
    background-color: $box-selected-background-color
</style>
