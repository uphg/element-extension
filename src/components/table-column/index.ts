import TableColumn from './src/TableColumn'
import { tableColumnProps } from './src/tableColumnProps'
import { useTableColumn } from './src/useTableColumn'

TableColumn.install = function (Vue) {
  Vue.component(TableColumn.name, TableColumn);
}

export { TableColumn, tableColumnProps, useTableColumn }
