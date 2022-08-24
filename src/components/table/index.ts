import { VueConstructor } from 'vue';
import Table from './src/table'
import { tableProps } from './src/tableProps'
import { useTable } from './src/useTable'

// @ts-ignore
Table.install = function (Vue: VueConstructor) {
  Vue.component(Table.name, Table);
}

export { Table, tableProps, useTable }
