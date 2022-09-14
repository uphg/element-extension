<template>
  <div>
    <e-switch v-model="value" :active-value="1" :inactive-value="0" />
    <p>{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0)
</script>