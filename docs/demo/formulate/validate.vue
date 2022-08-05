<template>
  <s-formulate :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  labelWidth: "100px",
  fileds: {
    name: {
      label: '活动名称',
      rules: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
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
      rules: [
        { required: true, message: '请选择活动区域', trigger: 'blur' }
      ]
    },
    date: {
      label: '活动日期',
      type: 'date',
      placeholder: '选择日期',
      rules: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      ]
    },
    delivery: {
      label: '即时配送',
      type: 'switch'
    },
    deliveryAddress: {
      vIf: (formData: any) => formData.delivery, 
    },
    type: {
      label: '活动性质',
      type: 'checkbox',
      options: [
        { label: '美食/餐厅线上活动', value: 0, name: 'type' },
        { label: '地推活动', value: 1, name: 'type' },
        { label: '线下主题活动', value: 2, name: 'type' },
        { label: '单纯品牌曝光', value: 3, name: 'type' },
      ]
    }
  }
})
</script>