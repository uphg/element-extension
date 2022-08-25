<template>
  <div class="c">
    I am C
  </div>
</template>

<script lang="ts">
export default { name: 'DemoC' }
</script>

<script setup lang="ts">
import { inject } from 'vue';

const config = inject('config')

console.log('config')
console.log(config)
</script>

<style>
.c {
  border: 1px solid #41b883;
  padding: 20px
}
</style>