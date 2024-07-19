<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <div>{{ props.song }}</div>
</template>
<script setup>

const props = defineProps(['song']);

console.log('video props', props.value);

</script>
<style scoped lang="sass">
$background-color: #f0f0f0
$box-background-color: #ccc
$box-selected-background-color: aliceblue
$box-border-color: #999
$left-bar-color: burlywood


</style>
