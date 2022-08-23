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
import { ref } from 'vue';
import dayjs from 'dayjs'

const tableData = ref([{
  date: 1462147200000,
  name: '王小虎',
  sex: 0
}, {
  date: 1462320000000,
  name: '李小妹',
  sex: 1
}, {
  date: 1462060800000,
  name: '王小虎',
  sex: 0
}, {
  date: 1462233600000,
  name: '王小虎',
  sex: 0
}])

const tableColumns = [{
  prop: 'date',
  label: '日期',
  width: '160',
  children: (scope: RowCallbackParams) => dayjs(scope.row.date).format('YYYY-MM-DD') 
}, {
  prop: 'name',
  label: '姓名',
  width: '160'
}, {
  prop: 'sex',
  label: '性别',
  width: '160',
  children: (scope: RowCallbackParams) => scope.row.sex ? '女' : '男'
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