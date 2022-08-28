<template>
  <e-table
    :data="tableData"
    :columns="tableColumns"
    style="width: 100%"
  />
</template>

<script setup lang="ts">
import { Message } from 'element-ui';
import { RowCallbackParams } from 'src/types/table'
import { ref, h } from 'vue';

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
  prop: 'sex',
  label: '性别',
  width: '80',
  formatter: (row: RowCallbackParams['row']) => row.sex ? '女' : '男'
}, {
  label: '地址',
  width: '260',
  children: (scope: RowCallbackParams) => [h('i', { class: 'el-icon-s-flag' }), scope.row.address]
}, {
  children: [{
    type: 'link',
    text: '编辑',
    onClick: (scope: RowCallbackParams) => Message.success('点击编辑')
  }, {
    type: 'button',
    hue: 'danger',
    size: 'mini',
    text: '删除',
    onClick: (scope: RowCallbackParams) => Message.error('点击删除')
  }]
}]
</script>