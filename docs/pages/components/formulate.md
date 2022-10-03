# Formulate 定制表单

根据 fields 属性生成定制的表单

## 基本用法

实现一个基本的表单组件

::: demo

formulate/base

:::

## 前缀/后缀

可以使用 `itemPrefix`/`itemSuffix` 添加每个字段的 FormItem 前缀/后缀

::: demo

formulate/prefix-or-suffix

:::

## 多列

可传入数组设置多列

::: demo

formulate/rows-2

:::

列宽会根据 ElCol 的 `span` 属性与 `fields.length` 相除进行计算，所以列数必须能被 24 整除

::: demo

formulate/rows-3

:::

## 表单验证

与 ElForm 表单的 rules 属性相同

::: demo

formulate/rules

:::

完整的表单验证示例

::: demo

formulate/validate

:::

## 文件上传组件

使用上传组件时，可以设置默认按钮格式和提示内容

::: demo

formulate/file

:::

## Fields Attributes

`fields` 字段支持的**公共属性**

| 参数          | 说明                                                         | 类型                       | 可选值   | 默认值 |
| ------------- | ------------------------------------------------------------ | -------------------------- | -------- | ------ |
| label         | `FormItem`标签文本                                           | string                     | —        | —      |
| labelWidth    | 表单域标签的的宽度，例如 '50px'。支持 `auto`。               | string                     | —        | —      |
| required      | 是否必填，如不设置，则会根据校验规则自动生成                 | boolean                    | —        | false  |
| rules         | 当前组件表单验证规则                                         | object                     | —        | —      |
| error         | 表单域验证错误信息, 设置该值会使表单验证状态变为`error`，并显示该错误信息 | string                     | —        | —      |
| showMessage   | 是否显示校验错误信息                                         | boolean                    | —        | true   |
| inlineMessage | 以行内形式展示校验信息                                       | boolean                    | —        | false  |
| itemPrefix    | `FormItem` 内组件前的渲染内容                                | `() => VNodeChildren`      | —        | —      |
| itemSuffix    | `FormItem` 内组件后的渲染内容                                | `() => VNodeChildren`      | —        | —      |
| type          | 表单内渲染的组件类型                                         | string                     | string   | —      |
| ref           | 表单内组件的 ref 引用函数                                    | `(el) => void `            | Function | —      |
| default       | 表单内组件的默认值                                           | —                          | —        | —      |
| vIf           | if 处理函数，判断该 `FormItem` 组件是否渲染                  | `(formData) => boolean`    | Function | —      |
| options       | Select / RadioGroup / CheckboxGroup / Cascader 的 options 属性 | array                      | array    | —      |
| children      | `FormItem` 内组件插槽内的内容（优先级高于 button 属性）      | `() => VNode[]`            | Function | —      |
| scopedSlots   | VNodeData 的 scopedSlots 属性（命名插槽）                    | `VNodeData['scopedSlots']` | object   | —      |
| extra         | 在组件下展示更多说明信息，可以是 html string，也可以是一个返回 `VNode[]` 的函数 | `string | (() => VNode[])` | —        | —      |
| disabled      | 是否禁用组件                                                 | boolean                    | —        | —      |

## Formulate Attributes

除了支持 `<el-form>` 组件的默认属性，还支持以下属性

| 参数     | 说明                                                         | 类型     | 可选值 | 默认值 |
| -------- | ------------------------------------------------------------ | -------- | ------ | ------ |
| fields   | 字段描述，用于渲染表单内容                                   | object   | —      | —      |
| data     | 允许除 data 外的 props 以对象形式绑定在 data 属性中          | object   | —      | {}     |
| gutter   | 多列布局的分栏间隔                                           | number   | —      | —      |
| mapRules | 是否添加 map rules 函数，添加后自动根据返回值添加表单验证，mapRules({ type, key, label }) | Function | —      | —      |

## Formulate Methods

| 方法名      | 说明                    | 参数                                        |
| :---------- | :---------------------- | :------------------------------------------ |
| resetValues | 重置表单内所有 Value 值 | Function()                                  |
| setValues   | 设置表单部分内容值      | `(object: FormData) => void`                |
| getValues   | 获取表单所有值          | `() => { [key: string]: CustomInputValue }` |

## Formulate Readonly Attributes

| 参数     | 说明                 |
| -------- | -------------------- |
| formData | 当前表单值组成的对象 |
| elForm   | `<el-form>` 组件实例 |

<script setup lang="ts">
import FormulateBase from 'docs/demo/formulate/base.vue'
import FormulatePrefixOrSuffix from 'docs/demo/formulate/prefix-or-suffix.vue'
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
  width: 480px;
}
.demo-formulate .el-input {
  width: 240px;
}
.demo-formulate .el-row .el-input {
  width: 100%;
}
</style>