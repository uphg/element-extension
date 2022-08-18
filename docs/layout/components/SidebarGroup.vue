<template>
  <section class="sidebar-group">
    <h2 class="title">{{ title }}</h2>
    <RouterLink
      class="link"
      :class="{ active: item.name === route?.name }"
      v-for="item, index in children"
      :key="index"
      :to="item.link"
    >{{ item.title }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'docs/router';
import { PropType } from 'vue';

const props = defineProps({
  title: String as PropType<string>,
  children: Array as PropType<Array<{ title: string; name: string; link: string }>>
})

const route = useRoute()
</script>

<style lang="scss" scoped>
.sidebar-group {
  font-size: 14px;
}
.title {
  font-weight: 400;
  margin: 0;
  padding: 6px 16px;
  font-size: 16px;
}
.link {
  display: block;
  padding: 6px 16px;
  color: var(--c-text-light-2);
  &.active {
    color: #409EFF;
  }
}
</style>