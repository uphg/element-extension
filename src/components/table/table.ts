import { h, PropType, defineComponent } from "vue"
import type { VNodeData } from "vue"
import { Table, TableColumn, Link, Button } from "element-ui"
import { rowCallbackParams } from "element-ui/types/table"
import { find } from "../../utils"
import { TableColumnOptions, TableColumnProps } from "../../types/table"

export default defineComponent({
  name: 'ETable',
  props: {
    columns: {
      type: Array as PropType<Array<TableColumnProps>>,
      default: () => []
    },
    data: {
      type: Array as PropType<Array<TableColumnProps>>,
      default: () => []
    },
    stripe: Boolean,
  },
  setup(props, context) {
    return () => h(Table, {
      props: {
        data: props.data,
        stripe: props.stripe
      }
    }, props.columns.map(item => h(TableColumn, handleColumnsData(item)))
    )
  }
})


function handleColumnsData(props: TableColumnProps) {
  if (!props) return

  const data: VNodeData = {
    props: {
      prop: props.prop,
      label: props.label,
      width: props.width,
      fixed: props.fixed,
      showOverflowTooltip: props.showOverflowTooltip
    }
  }

  if (props.children) {
    data.scopedSlots = {
      default: (scope) => props.children?.map((item) => renderChildrenNode(item, scope))
    }
  } else if (props.options) {
    data.scopedSlots = {
      default: (scope) => find(
        props.options as TableColumnOptions[],
        ({ value }) => scope.row?.[props.prop] === value
      )?.label || props?.emptyText
    }
  } else if (props.scopedSlots) {
    data.scopedSlots = props.scopedSlots
  }

  return data
}

function renderChildrenNode(item: TableColumnProps, scope: rowCallbackParams) {
  const { hue='primary', size } = item
  const onClick = () => item?.onClick(scope.row)
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
