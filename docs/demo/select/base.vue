<template>
  <e-select
    v-model="select"
    placeholder="请选择区域"
    :options="[
      { label: '区域1', value: 0 },
      { label: '区域2', value: 1 },
      { label: '区域3', value: 2 }
    ]"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const select = ref('')
</script>