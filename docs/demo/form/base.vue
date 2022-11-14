<template>
  <e-form label-width="80px">
    <e-form-item label="用户名">
      <e-input v-model="formData.name" placeholder="请输入用户名" disabled></e-input>
    </e-form-item>
    <e-form-item label="密码">
      <e-input v-model="formData.password" type="password" placeholder="请输入密码"></e-input>
    </e-form-item>
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  password: ''
})
</script>
