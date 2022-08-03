---
title: 'Form 表单'
---

# Form 表单

## 基本用法

:::code

form/base

:::

## 表单验证

:::code

form/validate

:::

<script lang="ts">
export default {
  name: 'DocsForm'
}
</script>

<script setup lang="ts">
import FormBase from 'docs/demo/form/base.vue'
import FormValidate from 'docs/demo/form/validate.vue'
</script>

<style>
.demo-form .el-form {
  width: 460px;
}
.demo-form .el-select {
  width: 100%;
}
</style>