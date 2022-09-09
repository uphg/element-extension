import { h, SetupContext } from "vue"
import { Table, TableColumn } from "element-ui"
import { ElTable } from "element-ui/types/table"
import { TableProps } from "./tableProps"
import { useElTable, useElTableEmit } from "../../../composables/useElTable"
import { GlobalTableProps } from "../../config-provider/src/configProviderProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { handleDefaultProps } from "../../../utils/handleDefaultProps"
import { handleColumnsData } from "./handleColumnsData";
import { renderSlot } from '../../../utils/renderSlot'

const globalPropNames = ['maxHeight', 'stripe', 'border', 'size', 'fit', 'showHeader', 'highlightCurrentRow']

export function useTable(props: TableProps, context: SetupContext<{}>) {
  const { elTable, clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load } = useElTable()
  const on = useElTableEmit(context.emit)
  const globalTableProps = useGlobalProps<GlobalTableProps>('table')

  return {
    expose: {
      clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load,
      get elTable() {
        return elTable.value
      }
    },
    render: () => h(Table, {
      // @ts-ignore
      ref: (el: ElTable) => elTable.value = el,
      props: {
        data: props.data,
        width: props.width,
        height: props.height,
        rowKey: props.rowKey,
        context: props.context,
        showSummary: props.showSummary,
        sumText: props.sumText,
        summaryMethod: props.summaryMethod,
        rowClassName: props.rowClassName,
        rowStyle: props.rowStyle,
        cellClassName: props.cellClassName,
        cellStyle: props.cellStyle,
        headerRowClassName: props.headerRowClassName,
        headerRowStyle: props.headerRowStyle,
        headerCellClassName: props.headerCellClassName,
        headerCellStyle: props.headerCellStyle,
        currentRowKey: props.currentRowKey,
        emptyText: props.emptyText,
        expandRowKeys: props.expandRowKeys,
        defaultExpandAll: props.defaultExpandAll,
        defaultSort: props.defaultSort,
        tooltipEffect: props.tooltipEffect,
        spanMethod: props.spanMethod,
        selectOnIndeterminate: props.selectOnIndeterminate,
        indent: props.indent,
        treeProps: props.treeProps,
        lazy: props.lazy,
        load: props.load,
        ...handleDefaultProps<GlobalTableProps>(props as GlobalTableProps, globalTableProps, globalPropNames)
      },
      on,
    }, (
        [...props.columns?.length
          ? props.columns.map(
            item => h(TableColumn, handleColumnsData(item))
          ) : [context.slots.default?.()]]
      ).concat([renderSlot(context, 'append')])
    )
  }
}
