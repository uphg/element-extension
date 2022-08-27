# Input 输入框

拓展 `<el-input>`

## 基本用法

与 `<el-input>` 相同

::: demo

input/base

:::

## exclude 排除

相比 `<el-input>` 添加了 `exclude` 属性，表示要排除的字符串规则，该属性支持字符串、数字、正则

::: demo

input/exclude

:::

## 多行文本输入框

同样支持 `type="textarea"` 属性

::: demo

input/textarea

:::



## Input Attributes

除了支持 [`<el-input>`](https://element.eleme.io/#/zh-CN/component/input#input-attributes) 的属性，还支持以下属性

| 参数    | 说明                                 | 类型            | 可选值 | 默认值 |
| ------- | ------------------------------------ | --------------- | ------ | ------ |
| exclude | 要排除的字符串规则，支持字符串、正则 | string / regexp | —      | —      |

<script lang="ts">
export default {
  name: 'EInputDemo'
}
</script>

<script setup lang="ts">
import InputBase from 'docs/demo/input/base.vue'
import InputExclude from 'docs/demo/input/exclude.vue'
import InputTextarea from 'docs/demo/input/textarea.vue'
</script>

<style>
.demo-input .el-input {
  max-width: 180px;
  margin-right: 20px;
}

.demo-input .el-textarea {
  max-width: 240px;
}
</style>