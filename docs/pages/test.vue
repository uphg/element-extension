<template>
  <div class="test">
    <SConfigProvider>
      <HelloWorld msg="hi" />
    </SConfigProvider>
  </div>
</template>

<script setup lang="ts">
import SConfigProvider from '../components/s-config-provider'
import HelloWorld from '../components/HelloWorld.vue'
</script>