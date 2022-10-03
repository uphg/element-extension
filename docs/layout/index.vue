<template>
  <e-config-provider :form-item="{ type: 'text' }">
    <div class="layout">
    <!-- <Navbar /> -->
    <Sidebar />
    <Content />
    </div>
  </e-config-provider>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue';
</script>
