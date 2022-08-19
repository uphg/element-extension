<template>
  <div>
    <e-input v-model="phone" placeholder="请输入手机号" :exclude="/^0|[^\d]/g"/>
    <e-input v-model="email" placeholder="请输入邮箱" :exclude="/[^a-zA-Z0-9@._-]/g"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phone = ref('')
const email = ref('')
</script>