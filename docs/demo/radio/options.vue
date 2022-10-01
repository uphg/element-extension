<template>
  <e-radio-group v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref(0)

const options = ref([
  { label: '选项一', value: 0 },
  { label: '选项二', value: 1 }
])
</script>