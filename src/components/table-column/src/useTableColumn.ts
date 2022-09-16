import { TableColumn } from "element-ui";
import { createDateFormat } from "./createDateFormat";
import { h, SetupContext } from "vue"
import { extendColumnTypes, TableColumnProps, GlobalTableColumnProps } from "./tableColumnProps";
import { handleColumnType } from "./handleColumnType";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";

const propNames = ['label', 'labelClassName', 'property', 'prop', 'width', 'minWidth', 'renderHeader', 'sortable', 'sortMethod', 'sortBy', 'columnKey', 'align', 'headerAlign', 'showTooltipWhenOverflow', 'fixed', 'formatter', 'selectable', 'reserveSelection', 'filterMethod', 'filteredValue', 'filters', 'filterPlacement', 'filterMultiple', 'index', 'sortOrders']
const globalPropNames = ['className', 'resizable', 'showOverflowTooltip']

export function useTableColumn(
  props: TableColumnProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<TableColumnProps, GlobalTableColumnProps>
) {
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames, handleProps })
  const type = handleColumnType(props.type)
  let formatter = props.formatter
  if (props.prop && extendColumnTypes.includes(props.type)) {
    formatter = createDateFormat(props)
  }

  return {
    render: () => h(TableColumn, {
      props: {
        ...createProps(),
        formatter: formatter,
        type
      },
      scopedSlots: {
        default: (scope) => context.slots.default?.(scope),
        header: (scope) => context.slots.header?.(scope),
      }
    })
  }
}