import { computed, h, SetupContext } from "vue"
import { Table, TableColumn } from "element-ui"
import { TableProps, GlobalTableProps, tableBaseProps, globalTableProps, TableObjectColumnProps } from "./tableProps"
import { handleColumnsData } from "./handleColumnsData";
import { useElTable, useElTableEmit } from "../../../composables/useElTable"
import { keys, pick, renderSlot, withDefaultProps } from '../../../utils'
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalTableColumnProps, tableColumnBaseProps, tableColumnProps, globalTableColumnProps as _globalTableColumnProps } from "../../table-column/src/tableColumnProps";
import { ObjectLike } from "../../../../types/_common";
import { ElTable } from "element-ui/types/table";
import { VNode } from "vue/types/umd";

const createKey = () => Symbol()

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
  const columnPropNames = keys(tableColumnBaseProps)
  const columnGlobalPropNames = keys(_globalTableColumnProps)
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames, handleProps })
  const globalTableColumnProps = useGlobalProps<GlobalTableColumnProps>('tableColumn')

  function renderColumns(item: TableObjectColumnProps | (() => VNode)) {
    const props = {
      ...pick(item, columnPropNames),
      ...withDefaultProps(item, globalTableColumnProps, columnGlobalPropNames),
      ...(item as TableObjectColumnProps).children ? { children: (item as TableObjectColumnProps).children } : {}
    } as TableObjectColumnProps

    return typeof item === 'function'
      ? item?.()
      : h(TableColumn, handleColumnsData(globalTableColumnProps ? props : item, createKey())
    )
  }

  return {
    expose: {
      clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load,
      get elTable() {
        return elTable.value
      }
    },
    render: () => h(Table, { ref: handleRef, props: createProps(), on }, context && (
      [...props.columns?.length
        ? props.columns.map(renderColumns)
        : [context.slots.default?.()]]
    ).concat([renderSlot(context, 'append')]))
  }
}
