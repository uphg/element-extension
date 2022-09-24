<template>
  <el-form :rules="rules" :model="formData" ref="formRef" @validate="onValidate">
    <el-form-item prop="username">
      <el-input v-model="formData.username"/>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="formData.password"/>
    </el-form-item>
    <el-form-item>
      <button @click="submit">提交</button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Form as ElForm, FormItem as ElFormItem, Input as ElInput } from 'element-ui'
import { ref } from 'vue';

const formRef = ref<ElForm | null>(null)
const formData = ref({
  username: '',
  password: ''
})
const rules = ref({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
})

const submit = () => {
  formRef.value?.validate((valid) => {
    if(valid) {
      console.log('验证通过')
    }
  })
}

const onValidate = (prop: string, errors: boolean, validateMessage: string | null) => {
  console.log(prop, errors, validateMessage)
}
</script>

<script lang="ts">
export default {
  name: 'TestForm'
}
</script>