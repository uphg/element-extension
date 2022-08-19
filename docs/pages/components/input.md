# input 输入框

拓展 ElInput

## 基本用法

与 ElInput 相同

:::code

input/base

:::

## exclude 排除

相比 ElInput 添加了 exclude 属性，表示要排除的规则，该属性支持字符串、数字、正则

:::code

input/exclude

:::

<script lang="ts">
export default {
  name: 'EInputDemo'
}
</script>

<script setup lang="ts">
import InputBase from 'docs/demo/input/base.vue'
import InputExclude from 'docs/demo/input/exclude.vue'
</script>

<style>
.demo-input .el-input {
  max-width: 180px;
  margin-right: 20px;
}
</style>