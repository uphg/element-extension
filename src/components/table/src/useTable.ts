import { h, SetupContext } from "vue"
import { Table, TableColumn } from "element-ui"
import { TableProps, GlobalTableProps, tableBaseProps, globalTableProps } from "./tableProps"
import { handleColumnsData } from "./handleColumnsData";
import { useElTable, useElTableEmit } from "../../../composables/useElTable"
import { keys, renderSlot } from '../../../utils'
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalTableColumnProps } from "../../table-column/src/tableColumnProps";
import { ObjectLike } from "../../../../types/_common";
import { ElTable } from "element-ui/types/table";

export function useTable(
  props: TableProps,
  context: SetupContext<{}> | undefined,
  options?: UseComponentParamsOptions<TableProps | ObjectLike, GlobalTableProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elTable, clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load } = useElTable()
  const handleRef = (_handleRef || ((el: ElTable) => elTable.value = el)) as unknown as string
  const on = options?.on ? options?.on : context && useElTableEmit(context.emit) 
  const propNames = keys(tableBaseProps)
  const globalPropNames = keys(globalTableProps)
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames, handleProps })
  const globalTableColumnProps = useGlobalProps<GlobalTableColumnProps>('tableColumn')
  const renderChildren = context?.slots && (() => (
    [...props.columns?.length
      ? props.columns.map((item, index) => h(TableColumn, handleColumnsData(globalTableColumnProps ? {...item, ...globalTableColumnProps} : item, index)))
      : [context.slots.default?.()]]
  ).concat([renderSlot(context, 'append')]))

  return {
    expose: {
      clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load,
      get elTable() {
        return elTable.value
      }
    },
    render: () => h(Table, { ref: handleRef, props: createProps(), on }, renderChildren && renderChildren())
  }
}
