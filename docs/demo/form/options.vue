<template>
  <s-form label-width="80px">
    <s-form-item
      label="活动区域"
      prop="region"
      v-model="formData.region"
      type="select"
      placeholder="请选择活动区域"
      :options="withOptions(['区域一', '区域二'])"
    />
    <s-form-item
      label="活动性质"
      prop="type"
      v-model="formData.type"
      type="checkbox"
      :options="withOptions(['美食/餐厅线上活动', '地推活动', '线下主题活动'])"
    />
    <s-form-item
      label="特殊资源"
      prop="resource"
      type="radio"
      v-model="formData.resource"
      :options="withOptions(['选项1', '选项2', '选项3'])"
    />
  </s-form>
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
