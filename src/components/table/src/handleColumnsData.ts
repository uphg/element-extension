import { h } from "vue"
import type { VNodeData } from "vue"
import { Link, Button, Tag } from "element-ui"
import { isArray, pick } from "../../../utils"
import { extendColumnTypes } from '../../table-column/src/tableColumnProps'
import { TableObjectColumnProps, TableColumnChildrenProps } from "./tableProps"
import { RowCallbackParams } from "../../../../types/_element-ui"
import { handleColumnType } from "../../table-column/src/handleColumnType";
import { createDateFormat } from "../../table-column/src/createDateFormat"

const columnPropNames = ['label', 'className', 'labelClassName', 'property', 'prop', 'width', 'minWidth', 'renderHeader', 'sortable', 'sortMethod', 'sortBy', 'resizable', 'columnKey', 'align', 'headerAlign', 'showTooltipWhenOverflow', 'showOverflowTooltip', 'fixed', 'formatter', 'selectable', 'reserveSelection', 'filterMethod', 'filteredValue', 'filters', 'filterPlacement', 'filterMultiple', 'index', 'sortOrders']

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
      class: item.class,
      style: item.style,
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
      class: item.class,
      style: item.style,
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
      class: item.class,
      style: item.style,
      on: {
        click: onClick!,
        close: onClose!,
      }
    }, [item.text])
  }
}

export function handleColumnsData(props: TableObjectColumnProps, key: string | number | symbol) {
  console.log('handleColumnsData - props')
  console.log(props)
  if (!props) return
  const data: VNodeData = {
    key: key as unknown as string,
    props: {
      type: handleColumnType(props.type),
      ...pick(props, columnPropNames)
    }
  }

  if (props.children) {
    console.log('渲染')
    if (isArray(props.children)) {
      data.scopedSlots = {
        default: (scope) => (props.children as TableColumnChildrenProps[])?.map((item) => renderChildrenNode(item, scope))
      }
    } else {
      console.log('props.children')
      console.log(props.children)
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
