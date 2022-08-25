<template>
  <aside class="sidebar">
    <h2 class="sidebar-logo">Element Part</h2>
    <SidebarGroup
      v-for="item, index in sidebars"
      :key="index"
      :title="item.title"
      :children="item.children"
    />
  </aside>
</template>

<script setup lang="ts">
import SidebarGroup from './SidebarGroup.vue';

const sidebars = [
  {
    title: '开发指南',
    name: '',
    children: [
      {
        title: '快速开始',
        name: 'DocsQuickStart',
        link: '/docs/quick-start'
      },
      {
        title: '组件封装',
        name: 'DocsComponentPackaging',
        link: '/docs/component-packaging'
      }
    ]
  },
  {
    title: '组件',
    children: [
      {
        title: 'Input 输入框',
        name: 'ComponentsInput',
        link: '/components/input'
      },
      {
        title: 'Select 选择器',
        name: 'ComponentsSelect',
        link: '/components/select'
      },
      {
        title: 'Form 表单',
        name: 'ComponentsForm',
        link: '/components/form'
      },
      {
        title: 'Formulate 定制表单',
        name: 'ComponentsFormulate',
        link: '/components/formulate'
      },
      {
        title: 'Table 表格',
        name: 'ComponentsTable',
        link: '/components/table'
      },
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
  @media (min-width: 1200px) {
    transform: translate(0);
    left: calc((100vw - var(--layout-max-width)) / 2);
  }
  @media (min-width: 960px) {
    transform: translate(0);
  }
  .sidebar-logo {
    font-weight: 400;
    margin: 0;
    padding: 76px 16px 12px;
  }
}
</style>