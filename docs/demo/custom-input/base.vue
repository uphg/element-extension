<template>
  <custom-input v-model="value" @blur="onBlur" />
</template>

<script setup lang="ts">
import { Message } from 'element-ui';
import { ref } from 'vue'

const value = ref('')
const onBlur = (value: string) => Message.success(value)
</script>