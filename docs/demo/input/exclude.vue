<template>
  <e-input v-model="phone" placeholder="请输入手机号" :exclude="/^0|[^\d]/g"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const phone = ref('')
</script>