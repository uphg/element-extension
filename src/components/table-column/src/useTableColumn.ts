import { h, SetupContext } from "vue"
import { TableColumn } from "element-ui";
import { createDateFormat } from "./createDateFormat";
import { extendColumnTypes, TableColumnProps, GlobalTableColumnProps } from "./tableColumnProps";
import { handleColumnType } from "./handleColumnType";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { globalTableColumnPropNames } from '../../../shared/configPropertyMap'
import { ObjectLike } from "../../../types/object-like";
import { VNodeData } from "vue/types/umd";

const propNames = ['label', 'labelClassName', 'property', 'prop', 'width', 'minWidth', 'renderHeader', 'sortable', 'sortMethod', 'sortBy', 'columnKey', 'align', 'headerAlign', 'showTooltipWhenOverflow', 'fixed', 'formatter', 'selectable', 'reserveSelection', 'filterMethod', 'filteredValue', 'filters', 'filterPlacement', 'filterMultiple', 'index', 'sortOrders']

export function useTableColumn(
  props: TableColumnProps,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<TableColumnProps | ObjectLike, GlobalTableColumnProps>
) {
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames: globalTableColumnPropNames, handleProps })
  const type = handleColumnType(props.type)
  let formatter = props.formatter
  if (props.prop && extendColumnTypes.includes(props.type)) {
    formatter = createDateFormat(props)
  }

  return {
    render() {
      const scopedSlots: VNodeData['scopedSlots'] | undefined = context && {
        default: (scope) => context.slots.default?.(scope),
        header: (scope) => context.slots.header?.(scope),
      }
      return h(TableColumn, {
        props: {
          ...createProps(),
          formatter: formatter,
          type
        },
        scopedSlots
      })
    }
  }
}