# Table 表格

拓展 `<el-table>`

## 基本用法

在 `<el-table>` 的基础上添加了 `columns` 属性

::: demo

table/base

:::

<script lang="ts">
export default {
  name: 'ETableDemo'
}
</script>

<script setup lang="ts">
import TableBase from 'docs/demo/table/base.vue'
</script>

<style>
.demo-table .el-table table {
  margin-bottom: 0
}
.demo-table .el-table .el-button--danger {
  margin-left: 12px;
}
</style>