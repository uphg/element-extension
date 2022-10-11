<template>
  <e-config-provider
    :input="{ prefixIcon: 'el-icon-search' }"
    :pagination="{ background: true }"
  >
    <div>
      <e-input placeholder="请输入内容"></e-input>
      <e-pagination :total="50"></e-pagination>
    </div>
  </e-config-provider>
</template>