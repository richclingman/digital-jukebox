<script setup lang="ts">
defineProps(['decades', 'selectedDecade', 'isDecadeValid']);
</script>

<template>
  <div class="decades">
    <button v-for="decade in decades" class="decade" :class="{selected: selectedDecade === decade}"
            @click="$emit('changeDecade', decade)"
            :disabled="!isDecadeValid(decade)">{{ decade }}
    </button>
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.decades
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-top: 20px
  background-color: $background-color

  button.decade
    flex: 1
    height: 50px
    background-color: $box-background-color
    border: 1px solid $box-border-color
    box-sizing: border-box
    font-weight: bold

    &.selected
      background-color: $box-selected-background-color
</style>
