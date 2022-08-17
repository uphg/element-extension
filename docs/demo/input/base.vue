<template>
  <e-input v-model="input" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const input = ref('')
</script>