# Formulate 定制表单

根据 fields 属性生成定制的表单，

## 基本用法

实现一个基本的表单组件

:::code

formulate/base

:::

## 多列

可传入数组设置多列

:::code

formulate/rows-2

:::

列宽会根据 ElCol 的 `span` 属性与 `fields.length` 相除进行计算，所以列数必须能被 24 整除

:::code

formulate/rows-3

:::

## 表单验证

完整的表单验证示例

:::code

formulate/validate

:::

也可以单独定义 rules 属性，与 Form 表单的 rules 属性相同

:::code

formulate/rules

:::

## 文件上传组件

使用上传组件时，可以设置默认按钮格式和提示内容

:::code

formulate/file

:::

<script setup lang="ts">
import FormulateBase from 'docs/demo/formulate/base.vue'
import FormulateRows2 from 'docs/demo/formulate/rows-2.vue'
import FormulateRows3 from 'docs/demo/formulate/rows-3.vue'
import FormulateValidate from 'docs/demo/formulate/validate.vue'
import FormulateRules from 'docs/demo/formulate/rules.vue'
import FormulateFile from 'docs/demo/formulate/file.vue'
</script>

<style>
.demo-formulate .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-formulate .el-form {
  width: 320px;
}
.demo-formulate .el-select {
  width: 100%;
}
</style>