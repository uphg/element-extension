<template>
  <div class="sim-demo">
    <slot v-if="$slots.default" />
    <component v-else :is="component" />
  </div>
</template>

<script>
export default {
  props: {
    component: Object
  }
}
</script>

<style lang="scss">
.e-demo {
  padding: 22px 24px;
  border-radius: 6px;
  margin-bottom: 1.2em;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  .el-input {
    width: 180px;
  }
  .el-textarea {
    width: 416px;
  }
}
</style>