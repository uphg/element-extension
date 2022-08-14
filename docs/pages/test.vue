<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <Form ref="formRef" :model="form" :rules="rules">
          <FormItem label="活动时间" required>
            <FormItem prop="date1">
              <DatePicker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" />
            </FormItem>
            <Col class="line" :span="2">-</Col>
            <FormItem prop="date2">
              <TimePicker placeholder="选择时间" v-model="form.date2" style="width: 100%;" />
            </FormItem>
          </FormItem>
        </Form>
        <button @click="onSubmit">验证</button>
      </div>
      
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue';
import { Form, FormItem, Col, DatePicker, TimePicker } from 'element-ui';
import { ElForm } from 'element-ui/types/form';

const formRef = ref<ElForm | null>(null)

const form = ref({
  date1: '',
  date2: ''
})

const rules = ref({
  date1: [
    { required: true, message: '请选择日期', trigger: 'change' }
  ]
})

function onSubmit() {
  formRef.value?.validate((valid) => {
    console.log('valid')
    console.log(valid)
  })
}
</script>