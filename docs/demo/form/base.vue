<template>
  <e-form label-width="80px">
    <e-form-item label="用户名" v-model="formData.name" placeholder="请输入用户名" disabled />
    <e-form-item label="密码" v-model="formData.password" placeholder="请输入密码" type="password" />
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  password: ''
})
</script>
