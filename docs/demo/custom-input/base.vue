<template>
  <custom-input v-model="input" @blur="onBlur" />
</template>

<script setup lang="ts">
import { Message } from 'element-ui';
import { ref } from 'vue'

const input = ref('')
const onBlur = () => Message.success(input.value)
</script>