<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <e-table :data="testData" :columns="columns" @selection-change="change" :select-on-indeterminate="false" ref="tableRef"/>
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'
import { onMounted, ref, nextTick } from 'vue';

const tableRef = ref(null)
const testData = ref([
  { id: 1, name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
  { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
  { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
  { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
  { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
])
const columns = ref([
  { type: 'selection' },
  { prop: 'name', label: 'name' },
  { prop: 'release', label: 'release' },
  { prop: 'director', label: 'director' },
  { prop: 'runtime', label: 'runtime' }
])

const selected = ref([])

function change(val: any) {
  console.log('val')
  console.log(val)
  selected.value = val;
}

onMounted(() => {
  tableRef.value.toggleRowSelection(testData.value[0]);

  nextTick(() => {
  const checkbox = tableRef.value.$el.querySelector('.el-checkbox')
  console.log('tableRef.value')
  console.log(tableRef.value)
  checkbox.click();
  })

})
</script>