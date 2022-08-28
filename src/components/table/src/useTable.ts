import { h, SetupContext } from "vue"
import type { VNodeData } from "vue"
import { Table, TableColumn, Link, Button } from "element-ui"
import { ElTable } from "element-ui/types/table"
import { formatDate } from 'element-ui/src/utils/date-util';
import { isArray } from "../../../utils"
import { defaultFormats, TableColumnChildrenProps, TableColumnExtendsType, TableColumnProps, TableProps } from "./tableProps"
import { useElTable, useElTableEmit } from "../../../composables/useElTable"
import { RowCallbackParams } from "../../../types/table"
import { GlobalTableProps } from "../../../components/config-provider/src/configProviderProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { handleDefaultProps } from "../../../utils/handleDefaultProps"

const elTableColumnTypes = ['selection','index','expand']
const extendColumnTypes = ['date', 'time', 'datetime', 'month', 'year']

function createDateFormat(props: TableColumnProps) {
  const format = defaultFormats[props.type as TableColumnExtendsType]
  return (row: RowCallbackParams['row']) => formatDate(row[props.prop!], format)
}

function handleColumnsType(type: string) {
  return elTableColumnTypes.includes(type) ? type : void 0
}

function handleColumnsData(props: TableColumnProps) {
  if (!props) return
  const data: VNodeData = {
    props: {
      type: handleColumnsType(props.type),
      label: props.label,
      className: props.className,
      labelClassName: props.labelClassName,
      property: props.property,
      prop: props.prop,
      width: props.width,
      minWidth: props.minWidth,
      renderHeader: props.renderHeader,
      sortable: props.sortable,
      sortMethod: props.sortMethod,
      sortBy: props.sortBy,
      resizable: props.resizable,
      columnKey: props.columnKey,
      align: props.align,
      headerAlign: props.headerAlign,
      showTooltipWhenOverflow: props.showTooltipWhenOverflow,
      showOverflowTooltip: props.showOverflowTooltip,
      fixed: props.fixed,
      formatter: props.formatter,
      selectable: props.selectable,
      reserveSelection: props.reserveSelection,
      filterMethod: props.filterMethod,
      filteredValue: props.filteredValue,
      filters: props.filters,
      filterPlacement: props.filterPlacement,
      filterMultiple: props.filterMultiple,
      index: props.index,
      sortOrders: props.sortOrders,
    }
  }

  if (props.children) {
    if (isArray(props.children)) {
      data.scopedSlots = {
        default: (scope) => (props.children as TableColumnChildrenProps[])?.map((item) => renderChildrenNode(item, scope))
      }
    } else {
      data.scopedSlots = {
        default: props.children
      }
    }

  } else if (props.scopedSlots) {
    data.scopedSlots = props.scopedSlots
  }

  if (props.prop && extendColumnTypes.includes(props.type)) {
    data.props!.formatter = createDateFormat(props)
  }

  return data
}

function renderChildrenNode(item: TableColumnChildrenProps, scope: RowCallbackParams) {
  const { hue='primary', size } = item
  const onClick = () => item?.onClick(scope)
  if (item.type === 'link') {
    return h(Link, {
      props: {
        type: hue,
        size
      },
      on: {
        click: onClick
      }
    }, [item.text])
  } else if (item.type === 'button') {
    return h(Button, {
      props: {
        type: hue,
        size
      },
      on: {
        click: onClick
      }
    }, [item.text])
  }
}

export function useTable(props: TableProps, context: SetupContext<{}>) {
  const { elTable, clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load } = useElTable()
  const on = useElTableEmit(context.emit)
  const globalTableProps = useGlobalProps<GlobalTableProps>('table')

  context.expose({
    clearSelection, toggleRowSelection, toggleAllSelection, toggleRowExpansion, setCurrentRow, clearSort, clearFilter, doLayout, sort, load,
    get elTable() {
      return elTable.value
    }
  })

  return () => h(Table, {
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
      ...handleDefaultProps<GlobalTableProps>(
        props as GlobalTableProps,
        globalTableProps,
        ['maxHeight', 'stripe', 'border', 'size', 'fit', 'showHeader', 'highlightCurrentRow']
      )
    },
    on,
  }, props.columns?.length ? props.columns.map(
      item => h(TableColumn, handleColumnsData(item))
    ) : context.slots.default?.()
  )
}
