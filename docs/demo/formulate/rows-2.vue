<template>
  <div class="formulate">
    <e-formulate ref="formulateRef" :data="data" style="width: 100%"/>
    <div class="formulate-footer" style="width: 100%">
      <button @click="onSubmit">立刻创建</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formulateRef = ref<any>(null)
const data = ref({
  labelWidth: '80px',
  fields: [{
    name: { label: '用户名', placeholder: '请输入用户名' },
    phone: { label: '手机号', placeholder: '请输入手机号' }
  },{
    password: { label: '密码', placeholder: '请输入密码' },
    checkPass: { label: '确认密码', placeholder: '请输入确认密码' }
  }]
})

function onSubmit() {
  formulateRef.value?.submit((formData: any) => console.log(formData))
}
</script>