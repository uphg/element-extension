<template>
  <div class="a">
    I am A
    <DemoB />
  </div>
</template>

<script lang="ts">
export default { name: 'DemoA' }
</script>

<script setup lang="ts">
import { provide } from 'vue';
import DemoB from './b.vue'

provide('config', { p1: 'hi' })
</script>

<style>
.a {
  border: 1px solid royalblue;
  padding: 20px
}
</style>