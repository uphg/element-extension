<template>
  <div class="test">
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
      </div>
    </e-config-provider>
  </div>
</template>

<script setup lang="ts">
import { Table as ElTable,TableColumn as ElTableColumn,  } from 'element-ui';
import { ref } from 'vue';
import dayjs from 'dayjs'
import { RowCallbackParams } from 'src/types/table';

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

function formatter(row: RowCallbackParams['row'], column: ElTableColumn) {
  return row.address;
}

function dateFormat(row: RowCallbackParams['row']) {
  return dayjs(row.date).format('YYYY-MM-DD') 
}
</script>