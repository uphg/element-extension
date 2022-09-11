import TableColumn from './src/TableColumn'
import { tableColumnProps } from './src/tableColumnProps'
import { useTableColumn } from './src/useTableColumn'
import { ComponentPlugin } from '../../types/component-plugin';

(TableColumn as ComponentPlugin<typeof TableColumn>).install = function (Vue) {
  Vue.component(TableColumn.name, TableColumn);
}

export { TableColumn, tableColumnProps, useTableColumn }
