import { computed, h, SetupContext } from "vue"
import { Table, TableColumn } from "element-ui"
import { TableProps, GlobalTableProps } from "./tableProps"
import { handleColumnsData } from "./handleColumnsData";
import { useElTable, useElTableEmit } from "../../../composables/useElTable"
import { renderSlot } from '../../../utils/renderSlot'
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalTableColumnProps } from "../../table-column/src/tableColumnProps";
import { globalTablePropNames } from "../../../shared/configPropertyMap";
import { ObjectLike } from "../../../../types/_common";
import { ElTable } from "element-ui/types/table";

const propNames = ['data', 'width', 'height', 'rowKey', 'context', 'showSummary', 'sumText', 'summaryMethod', 'rowClassName', 'rowStyle', 'cellClassName', 'cellStyle', 'headerRowClassName', 'headerRowStyle', 'headerCellClassName', 'headerCellStyle', 'currentRowKey', 'emptyText', 'expandRowKeys', 'defaultExpandAll', 'defaultSort', 'tooltipEffect', 'spanMethod', 'selectOnIndeterminate', 'indent', 'treeProps', 'lazy', 'load']

export function useTable(
  props: TableProps,
  context: SetupContext<{}> | undefined,
  options?: UseComponentParamsOptions<TableProps | ObjectLike, GlobalTableProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elTable, clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load } = useElTable()
  const handleRef = (_handleRef || ((el: ElTable) => elTable.value = el)) as unknown as string
  const on = context?.emit ? useElTableEmit(context.emit) : options?.on
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames: globalTablePropNames, handleProps })
  const globalTableColumnProps = useGlobalProps<GlobalTableColumnProps>('tableColumn')

  return {
    expose: {
      clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load,
      get elTable() {
        return elTable.value
      }
    },
    render() {
      const slots = context?.slots && (
        [...props.columns?.length
          ? props.columns.map((item, index) => h(TableColumn, handleColumnsData(globalTableColumnProps ? {...item, ...globalTableColumnProps} : item, index)))
          : [context.slots.default?.()]]
      ).concat([renderSlot(context, 'append')])

      return h(Table, { ref: handleRef, props: createProps(), on }, slots)
    }
  }
}
