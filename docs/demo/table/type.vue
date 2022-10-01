<template>
  <e-table
    :data="tableData"
    :columns="tableColumns"
    style="width: 100%"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([{
  date: new Date().getTime(),
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: 1462320000000,
  name: '李小妹',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: 1462060800000,
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: 1462233600000,
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}])

const tableColumns = [{
  type: 'datetime',
  prop: 'date',
  label: '日期',
  width: '160',
}, {
  prop: 'name',
  label: '姓名',
  width: '100'
}, {
  prop: 'address',
  label: '地址',
  width: '260'
}]
</script>