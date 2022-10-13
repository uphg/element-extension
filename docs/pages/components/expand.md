# 功能拓展

拓展 Element UI 部分组件的功能

## RadioGroup 单选框组

添加 `options` 选项，用与以数据方式渲染 `<el-radio>`

::: demo

radio/options

:::

## CheckboxGroup 多选框组

同样支持 `options` 选项

::: demo

checkbox/options

:::

## Input 输入框

添加了 `exclude` 属性，表示要排除的字符串规则，该属性支持字符串、数字、正则

::: demo

input/exclude

:::

## Select 选择器

支持 `options` 数据格式传入（不支持默认插槽）

::: demo

select/base

:::

还可以使用 `option-groups` 添加分组

::: demo

select/option-groups

:::

使用 `v-slot:options` 插槽可自定义每一项的内容

::: demo

select/slot-options

:::

该插槽还支持与分组同时使用

::: demo

select/slot-option-groups

:::

## Table 表格

`<el-table>` 的基础上添加了 `columns` 属性，以数据的方式渲染 `<el-table-column>`

`columns` 还支持 `children` 属性渲染简单的组件或 VNode 节点

::: demo

table/base

:::

拓展了 `<el-table-column>` 的 `type` 属性，支持时间格式化（调用 Element 组件内部方法格式化）

::: demo

table/type

:::

**type 属性时间格式列表**

| 值       | 格式                  |
| -------- | --------------------- |
| date     | `yyyy-MM-dd`          |
| time     | `HH:mm:ss`            |
| datetime | `yyyy-MM-dd HH:mm:ss` |
| month    | `yyyy-MM`             |
| year     | `yyyy`                |

## 其他组件支持

除了上述组件，还支持使用 Element UI 的 Button、InputNumber、Cascader、Switch、Slider、TimePicker、DatePicker、TimeSelect、Upload、TableColumn 使用方法均为把组件 "el" 前缀改为 "e"，所有组件标签示例如下：

```vue
<e-button>
<e-radio-group>
<e-checkbox-group>
<e-input>
<e-input-number>
<e-select>
<e-cascader>
<e-switch>
<e-slider>
<e-time-picker>
<e-date-picker>
<e-time-select>
<e-upload>
<e-table>
<e-table-column>
<e-pagination>
```

<script setup lang="ts">
import RadioOptions from 'docs/demo/radio/options.vue'
import CheckboxOptions from 'docs/demo/checkbox/options.vue'
import InputExclude from 'docs/demo/input/exclude.vue'
import SelectBase from 'docs/demo/select/base.vue'
import SelectOptionGroups from 'docs/demo/select/option-groups.vue'
import SelectSlotOptions from 'docs/demo/select/slot-options.vue'
import SelectSlotOptionGroups from 'docs/demo/select/slot-option-groups.vue'
import TableBase from 'docs/demo/table/base.vue'
import TableType from 'docs/demo/table/type.vue'
</script>

<style>
.demo-input .el-input {
  max-width: 240px;
  margin-right: 20px;
}

.demo-input .el-textarea {
  max-width: 240px;
}
.demo-table .el-table table {
  margin-bottom: 0
}
.demo-table .el-table .el-button--danger {
  margin-left: 12px;
}
</style>