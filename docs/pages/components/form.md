# Form 表单

附带默认配置的 form 组件

## 基本用法

::: demo

form/base

:::

<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
</script>

<style>
.demo-form .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-form .el-form {
  width: 480px;
}
.demo-form .el-input {
  width: 240px;
}
</style>