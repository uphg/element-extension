<template>
  <s-formulate :data="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const data = ref({
  fileds: {
    username: { label: '用户名' },
    password: { label: '密码', type: 'password' },
  }
})
</script>