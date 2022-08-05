<template>
  <s-formulate :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  labelWidth: "100px",
  fileds: {
    username: { label: '用户名' },
    password: { label: '密码', showPassword: true },
  }
})
</script>