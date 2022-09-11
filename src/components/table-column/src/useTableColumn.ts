import { TableColumn } from "element-ui";
import { createDateFormat } from "./createDateFormat";
import { h, SetupContext } from "vue"
import { extendColumnTypes, TableColumnProps } from "./tableColumnProps";
import { handleColumnType } from "./handleColumnType";
import { GlobalTableColumnProps } from "../../config-provider/src/configProviderProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";

export function useTableColumn(props: TableColumnProps, context: SetupContext<{}>) {
  const globalTableColumnProps = useGlobalProps<GlobalTableColumnProps>('tableColumn')
  let formatter = props.formatter
  if (props.prop && extendColumnTypes.includes(props.type)) {
    formatter = createDateFormat(props)
  }

  return {
    render: () => h(TableColumn, {
      props: {
        type: handleColumnType(props.type),
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
        fixed: props.fixed,
        formatter: formatter,
        selectable: props.selectable,
        reserveSelection: props.reserveSelection,
        filterMethod: props.filterMethod,
        filteredValue: props.filteredValue,
        filters: props.filters,
        filterPlacement: props.filterPlacement,
        filterMultiple: props.filterMultiple,
        index: props.index,
        sortOrders: props.sortOrders,
        ...withDefaultProps<GlobalTableColumnProps>(
          props as GlobalTableColumnProps,
          globalTableColumnProps,
          ['showOverflowTooltip']
        )
      },
      scopedSlots: {
        default: (scope) => context.slots.default?.(scope),
        header: (scope) => context.slots.header?.(scope),
      }
    })
  }
}