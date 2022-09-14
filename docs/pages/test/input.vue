<template>
  <div style="max-width: 320px;">
    <e-input placeholder="请选择日期" v-model="input3">
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
    </e-input>
    <e-input placeholder="请输入内容" v-model="input4">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </e-input>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TestInput'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
const input3 = ref('')
const input4 = ref('')
</script>