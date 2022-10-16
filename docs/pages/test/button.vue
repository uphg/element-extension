<template>
  <div>
    <e-button @click="onClick"></e-button>
    <e-button :on-click="onClick"></e-button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TestButton'
}
</script>

<script setup lang="ts">
function onClick() {
  console.log('我被点击了')
}
</script>