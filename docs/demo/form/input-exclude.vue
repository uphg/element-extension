<template>
  <e-form>
    <e-form-item label="联系方式" v-model="form.phone" :exclude="/[^0-9]/" maxlength="11"/>
  </e-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const form = ref({
  phone: ''
})
</script>