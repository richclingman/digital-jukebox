<script setup lang="ts">
defineProps(['decades', 'selectedDecade', 'isDecadeValid']);
</script>

<template>
  <div class="decades">
    <DecadeButton v-for="decade in decades"
                  @click="$emit('changeDecade', decade)"
                  :decade="decade" :selected="selectedDecade === decade" :is-valid="isDecadeValid(decade)" />
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

</style>
