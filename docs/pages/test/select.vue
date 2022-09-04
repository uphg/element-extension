<template>
  <e-select
    v-model="region"
    placeholder="请选择区域"
    :options="[
      { label: '区域一', value: 0 },
      { label: '区域二', value: 1 },
      { label: '区域三', value: 2 }
    ]"
    @change="onChange"
  />
</template>

<script lang="ts">
export default {
  name: 'HiSelect'
}
</script>

<script setup lang="ts">
import { ref } from 'vue';

const region = ref('')
function onChange(value) {
  console.log('value')
  console.log(value)
}
</script>