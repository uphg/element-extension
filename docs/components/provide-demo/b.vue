<template>
  <div class="b">
    I am B
    <DemoC />
  </div>
</template>

<script lang="ts">
export default { name: 'DemoB' }
</script>

<script setup lang="ts">
import { provide } from 'vue';
import DemoC from './c.vue'

// provide('config', { p1: '123' })
</script>

<style>
.b {
  border: 1px solid #ff7043;
  padding: 20px
}
</style>