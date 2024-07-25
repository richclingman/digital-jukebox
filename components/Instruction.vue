<script setup lang="ts">
defineProps(['number'])

</script>

<template>
  <div class="instruction">
    <span>{{number}}:</span>
    <slot></slot>
  </div>
</template>

<style scoped lang="sass">
.instruction
  margin: 10px 0 0 10px
  font-size: 1.6em
  font-weight: bold
  color: blue
</style>
