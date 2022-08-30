import { VueConstructor } from 'vue';
import TableColumn from './src/TableColumn'
import { tableColumnProps } from './src/tableColumnProps'
import { useTableColumn } from './src/useTableColumn'

// @ts-ignore
Table.install = function (Vue: VueConstructor) {
  Vue.component(TableColumn.name, TableColumn);
}

export { TableColumn, tableColumnProps, useTableColumn }
