<template>
  <div class="sim-block">
    <h2 v-if="title">{{ title }}</h2>
    <s-demo :style="demoStyle">
      <slot />
    </s-demo>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  demoStyle: [String, Object, Array]
})
</script>
