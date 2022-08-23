<template>
  <e-select
    v-model="region"
    placeholder="请选择活动区域"
    :options="[
      { label: '区域一', value: 0 },
      { label: '区域二', value: 1 },
      { label: '区域三', value: 2 }
    ]"
  >
    <template v-slot:options="slotProps">
      <span style="float: left">{{ slotProps.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ slotProps.value }}</span>
    </template>
  </e-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const region = ref('')
</script>