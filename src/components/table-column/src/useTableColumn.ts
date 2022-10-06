import { h, SetupContext } from "vue"
import { TableColumn } from "element-ui";
import { VNodeData } from "vue/types/umd";
import { createDateFormat } from "./createDateFormat";
import { handleColumnType } from "./handleColumnType";
import { extendColumnTypes, TableColumnProps, GlobalTableColumnProps, globalTableColumnProps, tableColumnBaseProps } from "./tableColumnProps";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";
import { ObjectLike } from "../../../../types/_common";
import { keys } from "../../../utils"

export function useTableColumn(
  props: TableColumnProps,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<TableColumnProps | ObjectLike, GlobalTableColumnProps>
) {
  const { handleProps } = options || {}
  const propNames = keys(tableColumnBaseProps)
  const globalPropNames = keys(globalTableColumnProps)
  const { createProps } = useComponentProps(props, 'table', { propNames, globalPropNames, handleProps })
  const type = handleColumnType(props.type)
  let formatter = props.formatter
  if (props.prop && extendColumnTypes.includes(props.type)) {
    formatter = createDateFormat(props)
  }

  return {
    render() {
      const scopedSlots: VNodeData['scopedSlots'] | undefined = context?.slots && {
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