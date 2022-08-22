<template>
  <e-formulate :expands="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  labelWidth: "100px",
  fields: {
    username: { label: '姓名' },
    files: {
      label: '个人简历',
      type: 'file',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      button: { text: '我要上传', hue: 'success', size: 'small', plain: true },
      tips: ['只能上传jpg/png文件，且不超过500kb']
    }
  }
})
</script>