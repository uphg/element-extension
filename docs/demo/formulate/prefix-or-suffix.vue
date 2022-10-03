<template>
  <e-formulate :data="data" />
</template>

<script setup lang="ts">
import { h, ref } from 'vue';

const data = ref({
  labelWidth: "80px",
  fields: {
    user: {
      label: '审批人',
      default: '张三',
      itemPrefix: () => h('span', ['（@_@）']),
      itemSuffix: () => '20个字符以内'
    }
  }
})
</script>