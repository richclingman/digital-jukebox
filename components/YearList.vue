<script setup lang="ts">
defineProps(['years', 'selectedYear', 'isYearValid']);
</script>

<template>
  <div class="years">
    <YearButton v-for="year in years"
                  @click="$emit('changeYear', year)"
                  :year="year" :selected="selectedYear === year" :is-valid="isYearValid(year)" />
  </div>
</template>

<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood

.years
  display: flex
  justify-content: space-between
  align-items: flex-start
  margin-top: 20px

</style>
