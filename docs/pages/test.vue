<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <e-select
          v-model="region"
          placeholder="请选择地区"
          :option-groups="optionGroups"
        >
          <template v-slot:options="slotProps">
            <span class="slot-label">{{ slotProps.label }}</span>
            <span class="slot-value">{{ slotProps.value }}</span>
          </template>
        </e-select>
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import { ref } from 'vue';
import { Upload } from 'element-ui';

const region = ref('')
const optionGroups = ref([{
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