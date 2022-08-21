<template>
  <div class="content">
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.content {
  padding-top: var(--navbar-height);
  display: flex;
  @media (min-width: 960px) {
    padding-left: var(--sidebar-width);
  }
  @media (min-width: 1200px) {
    padding-left: calc((100vw - var(--layout-max-width)) / 2 + var(--sidebar-width));
    padding-right: calc((100vw - var(--layout-max-width)) / 2);;
  }
  &.isHome {
    @media (min-width: 960px) {
      padding-left: 0;
    }
    @media (min-width: 1200px) {
      padding-left: calc((100vw - var(--layout-max-width)) / 2);
    }
  }
}
.container {
  flex: 1;
  padding: 2.5rem 1.5rem;
}
</style>