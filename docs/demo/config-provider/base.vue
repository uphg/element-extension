<template>
  <e-config-provider
    :form="{ size: 'small', labelWidth: '80px' }"
    :input="{ prefixIcon: 'el-icon-search', placeholder: '请输入内容', clearable: true }"
    :button="{ type: 'primary' }"
  >
    <e-form>
      <e-form-item label="活动名称">
        <e-input v-model="input1"/>
      </e-form-item>
      <e-form-item label="活动区域">
        <e-input v-model="input2"/>
      </e-form-item>
      <e-form-item label="活动形式">
        <e-input v-model="input3"/>
      </e-form-item>
      <e-form-item>
        <e-button>提交</e-button>
      </e-form-item>
    </e-form>
  </e-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
</script>