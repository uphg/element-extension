import Table from './src/Table'
import { tableProps } from './src/tableProps'
import { useTable } from './src/useTable'
import { withInstall } from '../../utils'

const ETable = withInstall(Table)

export { Table, ETable, tableProps, useTable }
