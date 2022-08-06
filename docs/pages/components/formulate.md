# Formulate 定制表单

根据 fields 属性生成定制的表单，

## 基本用法

实现一个基本的表单组件

:::code

formulate/base

:::

## 表单验证

一个包括表单常用项的表单验证，如输入框、选择器、开关、单选框、多选框等

:::code

formulate/validate

:::

<script setup lang="ts">
import FormulateBase from 'docs/demo/formulate/base.vue'
import FormulateValidate from 'docs/demo/formulate/validate.vue'
</script>

<style>
.demo-formulate .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-formulate .el-form {
  width: 460px;
}
.demo-formulate .el-select {
  width: 100%;
}
</style>