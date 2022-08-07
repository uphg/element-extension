<template>
  <s-form
    :model="formData"
    :rules="rules"
    ref="formRef"
    label-width="100px" class="demo-formData" @submit.native.prevent>
    <s-form-item
      label="活动名称"
      prop="name"
      v-model="formData.name"
    />
    <s-form-item
      label="活动区域"
      prop="region"
      v-model="formData.region"
      type="select"
      placeholder="请选择活动区域"
      :options="[
        { label: '区域一', value: 'shanghai' },
        { label: '区域二', value: 'beijing' },
      ]"
    />
    <s-form-item label="活动时间" required>
      <s-form-item
        prop="date1"
        type="date"
        placeholder="选择日期"
        v-model="formData.date1"
      />
      <span>-</span>
      <s-form-item
        prop="date2"
        type="time"
        placeholder="选择时间"
        v-model="formData.date2"
      />
    </s-form-item>
    <s-form-item
      label="即时配送"
      prop="delivery"
      type="switch"
      v-model="formData.delivery"
    />
    <s-form-item
      v-if="formData.delivery"
      label="配送地址"
      prop="deliveryAddress"
      v-model="formData.deliveryAddress"
    />
    <s-form-item
      label="活动性质"
      prop="type"
      v-model="formData.type"
      type="checkbox"
      :options="[
        { label: '美食/餐厅线上活动', value: 0, name: 'type' },
        { label: '地推活动', value: 1, name: 'type' },
        { label: '线下主题活动', value: 2, name: 'type' },
        { label: '单纯品牌曝光', value: 3, name: 'type' },
      ]"
    />
    <s-form-item
      label="特殊资源"
      prop="resource"
      type="radio"
      v-model="formData.resource"
      :options="[
        { label: '线上品牌商赞助', value: 0 },
        { label: '线下场地免费', value: 1 },
      ]"
    />
    <s-form-item label="活动形式" prop="desc" type="textarea" v-model="formData.desc" />
    <s-form-item>
      <button @click="submitForm">立即创建</button>
      <button @click="resetForm">重置</button>
    </s-form-item>
  </s-form>
</template>

<script setup lang="ts">
import { ElForm } from 'element-ui/types/form.js';
import { ref } from 'vue';

const formRef = ref<ElForm | null>(null)

const formData = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  deliveryAddress: '',
  type: [],
  resource: '',
  desc: ''
})

const rules = {
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  date1: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  date2: [
    { required: true, message: '请选择时间', trigger: 'change' }
  ],
  type: [
    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  ],
  resource: [
    { required: true, message: '请选择活动资源', trigger: 'change' }
  ],
  desc: [
    { required: true, message: '请填写活动形式', trigger: 'blur' }
  ]
}

function submitForm(payload: MouseEvent) {
  console.log('表单提交成功')
  formRef.value?.validate((valid) => {
    console.log(222)
    if (valid) {
      alert('submit!');
    } else {
      console.log('error submit!!');
      return false;
    }
  })
}
function resetForm(payload: MouseEvent) {
  formRef.value?.resetFields();
}
</script>