<template>
  <aside class="sidebar">
    <SidebarGroup v-for="item in sidebars" :title="item.title" :children="item.children" />
  </aside>
</template>

<script setup lang="ts">
import SidebarGroup from './SidebarGroup.vue';

const sidebars = [
  {
    title: '开发指南',
    children: [
      { title: '安装', link: '/docs/install' }
    ]
  },
  {
    title: '组件',
    children: [
      { title: 'Button 按钮', link: '/components/button' },
      { title: 'Input 输入框', link: '/components/input' },
      { title: 'Form 表单', link: '/components/form' },
    ]
  }
]
</script>

<style lang="scss" scoped>
.sidebar {
  width: 260px;
  height: calc(100vh - var(--navbar-height));
  padding: 12px 16px;
  position: fixed;
  top: var(--navbar-height);
  bottom: 0;
  left: 0;
  transition: transform 0.3s;
  transform: translate(-100%);
  @media (min-width: 1080px) {
    transform: translate(0);
    left: calc((100vw - var(--layout-max-width)) / 2);
  }
  @media (min-width: 960px) {
    transform: translate(0);
  }
}
</style>