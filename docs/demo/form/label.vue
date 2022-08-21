<template>
  <e-form>
    <e-form-item v-model="form.phone" :exclude="/[^0-9]/">
      <template v-slot:label>
        联系方式<span style="color: #8492a6;">（仅支持数字）</span>
      </template>
    </e-form-item>
  </e-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({ phone: '' })
</script>