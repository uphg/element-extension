<template>
  <header class="navbar">
    <div class="container">
      <div class="logo">
        Element Part
      </div>
      <div class="nav-links">
        <NavLink
          v-for="item, index in navbars"
          :key="index"
          :to="item.link"
        >{{ item.title }}</NavLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import NavLink from './NavLink.vue';

const navbars = [
  {
    title: '文档',
    link: '/docs',
  },
  {
    title: '组件',
    link: '/component',
  }
]
</script>

<style lang="scss" scoped>
.navbar {
  background-color: aliceblue;
  height: var(--navbar-height);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.container {
  height: 100%;
  display: flex;
  align-items: center;
  @media (min-width: 1200px) {
    padding-left: calc((100vw - var(--layout-max-width)) / 2);
    padding-right: calc((100vw - var(--layout-max-width)) / 2);    
  }
}
.logo {
  padding-left: 16px;
  width: calc(var(--sidebar-width));
}
</style>