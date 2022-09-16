import Table from './src/Table'
import { tableProps } from './src/tableProps'
import { useTable } from './src/useTable'

Table.install = function (Vue) {
  Vue.component(Table.name, Table);
}

export { Table, tableProps, useTable }
