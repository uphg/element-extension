<template>
  <e-config-provider :table="{ stripe: true }" :pagination="{ background: true }">
    <div>
      <e-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          :formatter="dateFormat"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          :formatter="formatter">
        </el-table-column>
      </e-table>
      <e-pagination :total="50"></e-pagination>
      <br />
      <br />
      <button @click="openDialog">打开/关闭弹框</button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        @closed="onClosed"
      >
        <e-form :model="formData" :rules="rules" ref="formRef" label-width="80px">
          <e-form-item label="用户名" v-model="formData.name" prop="name" />
          <template v-if="visibleRegion">
            <e-form-item label="地区" v-model="formData.region" prop="region" type="switch" />
          </template>
          <template v-if="visiblePhone">
            <e-form-item label="手机号" v-model="formData.phone" prop="phone" />
          </template>
          <e-form-item label="密码" v-model="formData.password" prop="password" type="password" />
          <e-form-item>
            <button @click="submit">提交</button>
            <button @click="clickAutoPhone">显示/隐藏手机号</button>
            <button @click="clickAutoRegion">显示/隐藏地区</button>
          </e-form-item>
        </e-form>
      </el-dialog>
    </div>
  </e-config-provider>
</template>

<script setup lang="ts">
  import { Table as ElTable, TableColumn as ElTableColumn } from 'element-ui';
  import { ref } from 'vue';
  import dayjs from 'dayjs'
  import { RowCallbackParams } from '../../../types/_element-ui';
  
  const tableData = ref([{
    date: new Date().getTime(),
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    sex: 0
  }, {
    date: 1462320000000,
    name: '李小妹',
    address: '上海市普陀区金沙江路 1518 弄',
    sex: 1
  }, {
    date: 1462060800000,
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    sex: 0
  }, {
    date: 1462233600000,
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
    sex: 0
  }])
  
  const formRef = ref(null)
  
  const dialogVisible = ref(false)
  const visiblePhone = ref(true)
  const visibleRegion = ref(true)
  
  const formData = ref({
    name: '',
    region: false,
    phone: '123',
    password: ''
  })
  
  const rules = ref({
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    region: [{ required: true, message: '请选择地区', trigger: 'region' }],
    phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  })
  
  const count = ref(0)
  
  function submit() {
    formRef.value.validate((valid) => {
      console.log('valid')
      console.log(valid)
    })
  }
  
  function clickAutoPhone() {
    visiblePhone.value = !visiblePhone.value
  }
  
  function clickAutoRegion() {
    visibleRegion.value = !visibleRegion.value
  }
  
  function openDialog() {
    console.log(count.value % 2)
    console.log(count.value % 2 === 0)
    if (count.value % 2 === 0) {
      visiblePhone.value = true
    } else {
      visibleRegion.value = true
    }
  
    count.value+=1
  
    dialogVisible.value = true
  }
  
  function onClosed() {
    visiblePhone.value = false
    visibleRegion.value = false
  }
  
  function formatter(row: RowCallbackParams['row'], column: ElTableColumn) {
    return row.address;
  }
  
  function dateFormat(row: RowCallbackParams['row']) {
    return dayjs(row.date).format('YYYY-MM-DD') 
  }
  
  function handleClose(done) {
    done()
  }
  </script>