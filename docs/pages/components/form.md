# Form 表单

与 Element 表单用法类似，不同的地方是将常用组件与 FormItem 组件结合在了一起，并添加了一些快捷创建属性

## 基本用法

FormItem 组件的默认 `type="text"`，添加 input 输入框只需要 绑定 v-model

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