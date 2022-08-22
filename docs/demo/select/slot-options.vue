<template>
  <e-select
    v-model="region"
    placeholder="请选择活动区域"
    :options="withOptions(['区域一', '区域二'])"
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

const withOptions = (options: string[]) => options.map(
  (item, index) => ({ label: item, value: index })
) 
</script>