<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <e-formulate :data="data" />
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import { ref } from 'vue';
import { Upload } from 'element-ui';

const data = ref({
  labelWidth: "100px",
  fields: [
    {
      name: {
        label: '活动名称',
        placeholder: '请输入活动名称',
        rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      region: {
        label: '活动区域',
        type: 'select',
        options: [
          { label: '区域一', value: 0 },
          { label: '区域二', value: 1 },
          { label: '区域三', value: 2 },
        ],
        placeholder: '请选择活动区域',
        rules: [{ required: true, message: '请选择活动区域', trigger: 'blur' }]
      }
    },
    {
      date1: {
        label: '活动日期',
        type: 'date',
        placeholder: '选择日期',
        rules: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }]
      },
      date2: {
        label: '活动时间',
        type: 'time',
        placeholder: '请选择时间',
        rules: [{ required: true, message: '请选择时间', trigger: 'change' }]
      }
    }
  ]
})
</script>