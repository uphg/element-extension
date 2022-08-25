<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <ProvideDemo />
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import ProvideDemo from '../components/provide-demo/provide-demo.vue';

</script>