<template>
  <custom-input v-model="input" placeholder="输入搜索内容" @blur="onBlur" />
</template>

<script setup lang="ts">
import { Message } from 'element-ui';
import { ref } from 'vue'

const input = ref('')
const onBlur = () => input.value && Message.success(input.value)
</script>