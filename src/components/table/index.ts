import Table from './src/Table'
import { tableProps } from './src/tableProps'
import { useTable } from './src/useTable'
import { ComponentPlugin } from '../../types/component-plugin';

(Table  as ComponentPlugin<typeof Table>).install = function (Vue) {
  Vue.component(Table.name, Table);
}

export { Table, tableProps, useTable }
