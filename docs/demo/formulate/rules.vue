<template>
  <div class="formulate">
    <e-formulate ref="formulateRef" :data="data" />
    <div class="formulate-footer">
      <button @click="onSubmit">立刻创建</button>
      <button @click="onReset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const formulateRef = ref<any>(null)

const rules = {
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
}

const data = ref({
  labelWidth: "100px",
  rules,
  fields: {
    name: {
      label: '活动名称',
    },
    desc: {
      label: '活动形式',
      type: 'textarea',
    }
  }
})

function onSubmit() {
  formulateRef.value?.submit((formData: any, options: { valid: boolean, errors: object }) => {
    const { valid } = options
    if (valid) {
      console.log(formData)
    }
  })
}

function onReset() {
  formulateRef.value?.clearValidate()
}
</script>

<style>
.formulate-footer {
  max-width: 460px;
  margin-top: 22px;
  text-align: center;
}
.formulate-footer button:first-child {
  margin-right: 16px;
}
</style>