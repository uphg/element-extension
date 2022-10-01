<template>
  <e-checkbox-group v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref([])

const options = ref([
  { label: '选项一', value: 0 },
  { label: '选项二', value: 1 },
  { label: '选项三', value: 2 }
])
</script>