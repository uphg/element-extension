<template>
  <s-form label-width="80px">
    <s-form-item label="用户名" v-model="formData.name" />
    <s-form-item label="密码" type="password" v-model="formData.password" />
  </s-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  password: ''
})
</script>
