import TableColumn from './src/TableColumn'
import { tableColumnProps } from './src/tableColumnProps'
import { useTableColumn } from './src/useTableColumn'
import { withInstall } from '../../utils'

const ETableColumn = withInstall(TableColumn)

export { TableColumn, ETableColumn, tableColumnProps, useTableColumn }
