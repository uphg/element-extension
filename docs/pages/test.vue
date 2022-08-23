<template>
  <div class="test">
    <EConfigProvider>
      <div>
        <e-table :data="testData" :columns="columns" :row-style="tableRowStyle"/>
      </div>
    </EConfigProvider>
  </div>
</template>

<script setup lang="ts">
import EConfigProvider from '../components/e-config-provider'

import { RowCallbackParams } from 'src/types/table';

const testData = [
  { id: 1, name: 'Toy Story', release: '1995-11-22', director: 'John Lasseter', runtime: 80 },
  { id: 2, name: 'A Bug\'s Life', release: '1998-11-25', director: 'John Lasseter', runtime: 95 },
  { id: 3, name: 'Toy Story 2', release: '1999-11-24', director: 'John Lasseter', runtime: 92 },
  { id: 4, name: 'Monsters, Inc.', release: '2001-11-2', director: 'Peter Docter', runtime: 92 },
  { id: 5, name: 'Finding Nemo', release: '2003-5-30', director: 'Andrew Stanton', runtime: 100 }
]
const columns = [
  { prop: 'id' },
  { prop: 'name', label: '片名' },
  { prop: 'release', label: '发行日期' },
  { prop: 'director', label: '导演' },
  { prop: 'runtime', label: '时长（分）' },
]

const tableRowStyle = (options: { row: RowCallbackParams, rowIndex: number} ) => {
  const { rowIndex } = options
  if (rowIndex === 1) {
    return { height: '60px', display: 'none' };
  }

  return null;
}
</script>