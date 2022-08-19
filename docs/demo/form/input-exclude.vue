<template>
  <e-form label-width="80px">
    <e-form-item label="联系方式" v-model="form.phone" :exclude="/[^0-9]/"/>
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  phone: ''
})
</script>