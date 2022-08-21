<template>
  <div class="e-code">
    <div class="demo">
      <component :is="componentIs" />
    </div>
    <el-collapse-transition>
      <div v-show="visible" class="code-source language-vue" v-html="decodeURIComponent(source)" />
    </el-collapse-transition>
    <div class="control" @click="visible = !visible">{{ `${visible ? '收起' : '展开'}源码` }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { CollapseTransition as ElCollapseTransition } from 'element-ui'

export default {
  components: { ElCollapseTransition },
  props: {
    source: String,
    componentName: String,
    part: [Object]
  },
  setup(props) {
    const visible = ref(false)
    return { visible, componentIs: { ...props.part, name: props.componentName } }
  }
}
</script>

<style lang="scss" scoped>
.e-code {
  // padding: 22px 24px;
  border-radius: 6px;
  margin-bottom: 1.2em;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  overflow: hidden;
}

.demo {
  padding: 22px 24px;
}

.code-source {
  max-width: 875px;
  border-top: 1px solid rgba(60, 60, 60, .12);
  background-color: #282c34;
  color: #fff;
  overflow-x: auto;
}

:deep(.code-source) {
  pre {
    padding: 20px 24px;
  }
  pre, code {
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
    margin: 0;
  }
}
// .e-code .code-source {
//   pre, code {
//     font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
//     margin: 0;
//   }
// }

.control {
  border-top: 1px solid rgba(60, 60, 60, .12);
  font-size: 14px;
  cursor: pointer;
  height: 42px;
  line-height: 42px;
  text-align: center;
  user-select:none;
}
</style>
