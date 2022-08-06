# Form 表单

与 Element 表单用法类似，不同的地方是将常用组件与 FormItem 组件结合在了一起，并添加了一些快捷创建属性

## 基本用法

:::code

form/base

:::

## 表单验证

:::code

form/validate

:::

<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
import FormValidate from 'docs/demo/form/validate.vue'
</script>

<style>
.demo-form .el-form {
  width: 460px;
}
.demo-form .el-select {
  width: 100%;
}
</style>