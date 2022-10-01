# 组件封装

每个封装过的组件都会导出一个 use 方法和 prop 属性对象，可以利用 use 函数重新封装，从而避免多次嵌套封装组件

## 自定义组件封装

使用对应的 props 对象（Vue Options Props）+ use 函数处理指定组件的事件/方法，会返回一个包括导出方法、渲染函数的对象。例如封装一个自定义的 input 组件：

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
