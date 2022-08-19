# Form 表单

与 Element 表单用法类似，不同点是将常用组件与 ElFormItem 组件结合，并添加快捷创建属性功能

## 基本用法

FormItem 组件的默认 `type="text"`，添加 input 输入框只需要 绑定 v-model

:::code

form/base

:::

## options 选项

FormItem 可以添加 options 属性选项渲染多种选择类型的组件

:::code

form/options

:::

## 自定义模板

使用 options 插槽给 options 选项自定义模板

:::code

form/options-custom

:::

添加 `withOptionGroup` 可以使用 Select 组件的 OptionsGroup 嵌套功能

:::code

form/option-group

:::

## 表单验证

添加表单验证功能，与 ElFormItem 相同

:::code

form/validate

:::

## exclude 属性

让 Input 组件排除输入指定项，支持字符串、正则、数字

:::code

form/input-exclude

:::

<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
import FormOptions from 'docs/demo/form/options.vue'
import FormValidate from 'docs/demo/form/validate.vue'
import FormRender from 'docs/demo/form/render.vue'
import FormOptionsCustom from 'docs/demo/form/options-custom.vue'
import FormOptionGroup from 'docs/demo/form/option-group.vue'
import FormInputExclude from 'docs/demo/form/input-exclude.vue'

</script>

<style>
.demo-form .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-form .el-form {
  width: 460px;
}
.demo-form .el-select {
  width: 100%;
}
</style>