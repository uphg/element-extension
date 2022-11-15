import { h } from "vue"
import type { VNodeData } from "vue"
import { Link, Button, Tag } from "element-ui"
import { isArray } from "../../../utils"
import { extendColumnTypes } from '../../table-column/src/tableColumnProps'
import { TableObjectColumnProps, TableColumnChildrenProps } from "./tableProps"
import { RowCallbackParams } from "../../../../types/_element-ui"
import { handleColumnType } from "../../table-column/src/handleColumnType";
import { createDateFormat } from "../../table-column/src/createDateFormat"

function renderChildrenNode(item: TableColumnChildrenProps, scope: RowCallbackParams) {
  const { hue, size } = item
  const onClick = item?.onClick && ((event: MouseEvent) => item?.onClick!(scope, event))
  if (item.type === 'link') {
    return h(Link, {
      props: {
        type: hue,
        underline: item.underline,
        href: item.href,
        icon: item.icon,
        disabled: item.disabled
      },
      on: { click: onClick! }
    }, [item.text])
  } else if (item.type === 'button') {
    return h(Button, {
      props: {
        type: hue,
        icon: item.icon,
        nativeType: item.nativeType,
        plain: item.plain,
        autofocus: item.autofocus,
        round: item.round,
        circle: item.circle,
        loading: item.loading,
        disabled: item.disabled,
        size,
      },
      on: {
        click: onClick!
      }
    }, [item.text])
  } else if (item.type === 'tag') {
    const onClose = item?.onClose && (() => item?.onClose!(scope))
    return h(Tag, {
      props: {
        type: hue,
        text: item.text,
        closable: item.closable,
        hit: item.hit,
        disableTransitions: item.disableTransitions,
        color: item.color,
        effect: item.effect,
        size,
      },
      on: {
        click: onClick!,
        close: onClose!,
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
