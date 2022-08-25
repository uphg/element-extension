# 组件封装

组件支持通过 use 函数自定义封装


## use 函数

每个组件都有一个对应的 props 对象和 use 函数，props 对象为当前组件的 Vue Options Props，use 函数返回一个渲染当前组件的函数

你可以使用它们封装一个自定义的 input 组件，如下：

```vue
<script lang="ts">
import { inputProps, useInput } from 'src/index'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'CustomInput',
  props: inputProps,
  inheritAttrs: false,
  setup(props, context) {
    const renderInput = useInput(props, context)

    return () => h('div',
      { class: 'custom-input' },
      [
        renderInput(),
        h('i', { class: 'el-icon-search' })
      ]
    )
  }
})
</script>

<style lang="scss">
.custom-input {
  width: 240px;
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  .el-input__inner {
    border: none;
    padding: 0;
    border-radius: 0;
    padding-right: 4px;
  }
}
</style>
```

使用该组件

:::code

custom-input/base

:::

<script setup lang="ts">
import CustomInputBase from 'docs/demo/custom-input/base.vue'
</script>
