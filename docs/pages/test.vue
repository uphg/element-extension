<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <e-formulate ref="formulateRef" :expands="data"/>
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import { ref } from 'vue';
import { Upload } from 'element-ui';

const data = ref({
  fields: {
    name: {
      label: '用户名',
      placeholder: '请输入用户名',
      extra: '<span class="extra" style="color: #e74856;">用户名只支持英文、数字、下划线</span>'
    }
  }
})
</script>