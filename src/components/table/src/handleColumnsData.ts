import { h } from "vue"
import type { VNodeData } from "vue"
import { Link, Button } from "element-ui"
import { isArray } from "../../../utils"
import { extendColumnTypes } from '../../table-column/src/tableColumnProps'
import { TableObjectColumnProps, TableColumnChildrenProps } from "./tableProps"
import { RowCallbackParams } from "../../../../types/_element-ui"
import { handleColumnType } from "../../table-column/src/handleColumnType";
import { createDateFormat } from "../../table-column/src/createDateFormat"

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

export function handleColumnsData(props: TableObjectColumnProps, key: string | number) {
  if (!props) return
  const data: VNodeData = {
    key: key,
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

  if (props.renderChildren) {
    if (isArray(props.renderChildren)) {
      data.scopedSlots = {
        default: (scope) => (props.renderChildren as TableColumnChildrenProps[])?.map((item) => renderChildrenNode(item, scope))
      }
    } else {
      data.scopedSlots = {
        default: props.renderChildren
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
