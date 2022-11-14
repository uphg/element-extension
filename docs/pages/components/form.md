# Form 表单

将常用组件与 `<el-form-item>` 组件结合，添加常用属性

**注意**

本页面中的所有 FormItem 组件均已在全局配置 `type="text"`，所以 FormItem 的 type 属性默认均为 `"text"`，配置示例

```vue
<e-config-provider :form-item="{ type: 'text' }">
  <!-- 表单示例组件 -->
</e-config-provider>
```

## 基本用法

添加 input 输入框只需要 绑定 `v-model`

::: demo

form/base

:::

<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
</script>

<style>
.demo-form .el-form-item:last-child {
  margin-bottom: 0;
}
.demo-form .el-form {
  width: 480px;
}
.demo-form .el-input {
  width: 240px;
}
</style>