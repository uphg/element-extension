<template>
  <div>
    <!-- <el-form :rules="rules" :model="formData" ref="formRef" @validate="onValidate">
      <el-form-item prop="username">
        <el-input v-model="formData.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password"/>
      </el-form-item>
      <el-form-item>
        <button @click="submit">提交</button>
      </el-form-item>
    </el-form> -->
    <el-dialog :visible.sync="visible1">
      <el-form label-width="100px">
        <el-form-item v-if="type === 1" label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item v-if="type === 2" label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="visible2">
      <e-form label-width="100px">
        <e-form-item v-if="type === 1" label="活动名称" v-model="form.name" type="text"></e-form-item>
        <e-form-item v-if="type === 2" label="活动区域" v-model="form.region" type="select" :options="[
          { label: '区域一', value: 'shanghai' },
          { label: '区域二', value: 'beijing' },
        ]" placeholder="请选择活动区域"></e-form-item>
        <e-form-item label="活动时间" v-model="form.date" type="date" placeholder="选择日期"></e-form-item>
        <e-form-item label="活动形式" v-model="form.desc" type="textarea"></e-form-item>
      </e-form>
    </el-dialog>
    <div>
      <button @click="openDialog1">打开弹框1</button>
      <button @click="openDialog2">打开弹框2</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form as ElForm, FormItem as ElFormItem, Input as ElInput, Dialog as ElDialog } from 'element-ui'
import { ref } from 'vue';

// const formRef = ref<ElForm | null>(null)
// const formData = ref({
//   username: '',
//   password: ''
// })
// const rules = ref({
//   username: [
//     { required: true, message: '用户名不能为空', trigger: 'blur' }
//   ],
//   password: [
//     { required: true, message: '密码不能为空', trigger: 'blur' }
//   ]
// })

const type = ref(1)
const visible1 = ref(false)
const visible2 = ref(false)

const form = ref({
  name: '',
  region: '',
  date: '',
  desc: ''
})

function openDialog1() {
  type.value = type.value === 1 ? 2 : 1
  visible1.value = true
}
function openDialog2() {
  type.value = type.value === 1 ? 2 : 1
  visible2.value = true
}

// const submit = () => {
//   formRef.value?.validate((valid) => {
//     if(valid) {
//       console.log('验证通过')
//     }
//   })
// }

// const onValidate = (prop: string, errors: boolean, validateMessage: string | null) => {
//   console.log(prop, errors, validateMessage)
// }
</script>

<script lang="ts">
export default {
  name: 'TestForm'
}
</script>