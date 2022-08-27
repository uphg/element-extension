# Select 选择器

拓展 Select 选择器

## 基本用法

将 options 改为数据格式传入（去除对默认插槽的支持）

::: demo

select/base

:::

## 分组

使用 option-groups 可添加分组

::: demo

select/option-groups

:::

## 自定义内容

使用 `v-slot:options` 插槽可自定义每一项的内容

::: demo

select/slot-options

:::

该插槽还支持与分组同时使用

::: demo

select/slot-option-groups

:::


## Select Attributes

除了支持 [`<el-select>`](https://element.eleme.io/#/zh-CN/component/select) 的属性，还支持以下属性

| 参数    | 说明                               | 类型   | 可选值 | 默认值 |
| ------- | ---------------------------------- | ------ | ------ | ------ |
| options | 下拉列表数组                       | object | —      | —      |
| options | `el-option-group` 分组下拉列表数组 | object | —      | —      |

## Select Slots

仅支持支持以下插槽（不包含默认插槽）

| name    | 说明                                                         |
| :------ | :----------------------------------------------------------- |
| options | 自定义每一项 `<el-options>` 的内容，参数为 `{ label, value }` |
| prefix  | Select 组件头部内容                                          |
| empty   | 无选项时的列表                                               |



<script lang="ts">
export default {
  name: 'ESelectDemo'
}
</script>

<script setup lang="ts">
import SelectBase from 'docs/demo/select/base.vue'
import SelectOptionGroups from 'docs/demo/select/option-groups.vue'
import SelectSlotOptions from 'docs/demo/select/slot-options.vue'
import SelectSlotOptionGroups from 'docs/demo/select/slot-option-groups.vue'
</script>

<style>
.demo-select .el-select {
  max-width: 240px;
  margin-right: 20px;
}
</style>