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

与 ElForm 表单的 rules 属性相同

:::code

formulate/rules

:::

完整的表单验证示例

:::code

formulate/validate

:::

## 文件上传组件

使用上传组件时，可以设置默认按钮格式和提示内容

:::code

formulate/file

:::

## Formulate Fields

fields 字段的类型

```ts
export type FormulateField =  {
  label: string;
  type?: CustomInputTypes;
  rules?: FormRule[];
  required?: boolean;
  options?: CustomInputOptions;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  itemPrefix?: VNodeChildren;
  itemSuffix?: VNodeChildren;
  ref: string;
  children: VNode[];
  extra: string | VNode;
  tips: string[];
  key: string;
  placeholder: string;
  name: string;
  autofocus: string;
  rows: string;
  minlength: string;
  maxlength: string;
  scopedSlots: VNodeData['scopedSlots'];
  tipClass: string;
  tipItemClass: string;
  button: {
    hue: string;
    size: string;
    plain: boolean;
    round: boolean;
    circle: boolean;
    autofocus: boolean;
    icon: string;
    text: string;
  }
  onClick: (event: MouseEvent) => void
}
```

## Formulate Attributes

除了支持 `<el-form>` 组件的默认属性，还支持以下属性

| 参数    | 说明                                               | 类型   | 可选值 | 默认值 |
| ------- | -------------------------------------------------- | ------ | ------ | ------ |
| fields  | 字段描述，用于渲染表单内容                         | object | —      | —      |
|         |                                                    |        |        |        |
|         |                                                    |        |        |        |
| expands | 允许除 expands 外的 props 以对象形式绑定在当前属性 | object | —      | {}     |



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
  width: 480px;
}
.demo-formulate .el-input {
  width: 240px;
}
.demo-formulate .el-row .el-input {
  width: 100%;
}
</style>