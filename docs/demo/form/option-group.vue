<template>
  <e-form label-width="80px">
    <e-form-item
      type="select"
      label="活动区域"
      v-model="select"
      :options="options"
      with-option-group
    >
      <template v-slot:options="slotProps">
        <span style="float: left">{{ slotProps.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ slotProps.value }}</span>
      </template>
    </e-form-item>
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const select = ref('')
const options = ref([{
  label: '热门城市',
  options: [
    { value: 'Shanghai', label: '上海' },
    { value: 'Beijing', label: '北京' }
  ]
}, {
  label: '城市名',
  options: [
    { value: 'Chengdu', label: '成都' },
    { value: 'Shenzhen', label: '深圳' },
    { value: 'Guangzhou', label: '广州' },
    { value: 'Dalian', label: '大连' }
  ]
}])
</script>