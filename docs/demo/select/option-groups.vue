<template>
  <e-select
    label="活动区域"
    v-model="region"
    :option-groups="options"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const region = ref('')
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