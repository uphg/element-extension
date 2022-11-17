<template>
  <div class="test">
    <!-- <TestConfig /> -->
    <!-- <TestTransition /> -->
    <!-- <TestUpload /> -->
    <!-- <TestSelect /> -->
    <!-- <TestInput /> -->
    <!-- <e-switch v-model="value" /> -->
    <!-- <TestForm /> -->
    <!-- <TestButton></TestButton> -->
    <!-- <e-form>
      <e-form-item type="switch" v-model="value" />
    </e-form> -->
    <TestTable />
  </div>
</template>

<script setup lang="ts">
import TestConfig from './config.vue'
import TestUpload from './upload.vue'
import TestSelect from './select.vue'
import TestTransition from './transition.vue'
import TestInput from './input.vue'
import TestForm from './form.vue'
import TestButton from './button.vue'
import TestTable from './table.vue'
import { ref } from 'vue'
const value = ref(false)
</script>
