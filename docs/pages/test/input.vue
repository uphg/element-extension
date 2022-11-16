<template>
  <div style="max-width: 320px;">
    <input ref="inputRef" v-model="input1" />
    <e-input ref="inputRef" v-model="input2" prefix-icon="el-icon-search"/>
    <!-- <e-input placeholder="请选择日期" v-model="input3">
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
    </e-input>
    <e-input placeholder="请输入内容" v-model="input4">
      <template #prefix>
        <i class="el-input__icon el-icon-search"></i>
      </template>
    </e-input>
    <br>
    <e-form>
      <e-form-item label="用户名">
        <e-input v-model="username"></e-input>
      </e-form-item>
    </e-form> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'TestInput'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref(null)
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const input4 = ref('')
const username = ref('')

console.log('inputRef')
console.log(inputRef)

input1.value = 'hi'
</script>