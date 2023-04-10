<!-- <template>
  <e-config-provider
    :input="{ prefixIcon: 'el-icon-search' }"
    :pagination="{ background: true }"
  >
    <div>
      <e-input placeholder="请输入内容"></e-input>
      <e-pagination :total="50"></e-pagination>
    </div>
  </e-config-provider>
</template> -->

<template>
  <e-config-provider
    :form="{ size: 'small', labelWidth: '80px' }"
    :input="{ prefixIcon: 'el-icon-search' }"
    :date-picker="{ type: 'date', align: 'right', pickerOptions }"
  >
    <e-form>
      <e-form-item label="活动名称">
        <e-input placeholder="请输入内容"/>
      </e-form-item>
      <e-form-item label="活动日期">
        <e-date-picker v-model="date" placeholder="选择日期"/>
      </e-form-item>
    </e-form>
  </e-config-provider>
</template>

<script setup lang="ts">
import { ref, type ComponentInstance } from 'vue'

const date = ref(null)

const pickerOptions = ref({
  disabledDate(time: Date) {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '今天',
    onClick(picker: ComponentInstance) {
      picker.$emit('pick', new Date());
    }
  }, {
    text: '昨天',
    onClick(picker: ComponentInstance) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  }, {
    text: '一周前',
    onClick(picker: ComponentInstance) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }]
})
</script>