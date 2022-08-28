# 组件封装

组件支持通过 use 函数自定义封装

## 自定义组件封装

每个组件都有一个对应的 props 对象和 use 函数，props 对象为对应组件的 Vue Options Props，use 函数会处理指定组件的事件/方法并返回一个包括方法/渲染函数的对象，例如封装一个自定义的 input 组件：

::: code

docs/components/custom-input.vue

:::

使用该组件

::: demo

custom-input/base

:::

<script setup lang="ts">
import CustomInputBase from 'docs/demo/custom-input/base.vue'
</script>
