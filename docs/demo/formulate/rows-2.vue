<template>
  <e-formulate ref="formulateRef" :data="data" style="width: 100%"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  labelWidth: '80px',
  fields: [{
    name: { label: '用户名', placeholder: '请输入用户名' },
    phone: { label: '手机号', placeholder: '请输入手机号' }
  },{
    password: { label: '密码', placeholder: '请输入密码' },
    checkPass: { label: '确认密码', placeholder: '请输入确认密码' }
  }]
})
</script>