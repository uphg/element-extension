<template>
  <e-form label-width="80px">
    <e-form-item
      label="活动区域"
      prop="region"
      v-model="formData.region"
      type="select"
      placeholder="请选择活动区域"
      :options="withOptions(['区域一', '区域二'])"
    >
      <template v-slot:options="slotProps">
        <span>{{ slotProps.label }}</span>
        {{ ' --- ' }}
        <span style="color: #8492a6;">{{ slotProps.value }}</span>
      </template>
    </e-form-item>
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  region: '',
  type: [],
  resource: 0
})

const withOptions = (options: string[]) => options.map(
  (item, index) => ({ label: item, value: index })
) 
</script>
