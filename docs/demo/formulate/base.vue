<template>
  <e-formulate :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  labelWidth: "100px",
  fields: {
    username: { label: '用户名', default: 'Jack' },
    password: { label: '密码', showPassword: true },
  }
})
</script>