import { h, PropType, defineComponent } from "vue"
import type { VNodeData } from "vue"
import { Table as ElTable, TableColumn as ElTableColumn, Link as ElLink, Button as ElButton } from "element-ui"
import { rowCallbackParams } from "element-ui/types/table"
import { find } from "../../utils"

type Options = {
  value: any,
  label: string
}


interface TableColumnProps {
  options?: Options[];
  children?: TableColumnProps[];
  [key: string]: any;
}

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
  } else if (props.options && props.options.length > 0) {
    data.scopedSlots = {
      default: (scope) => find<Options>(
        (props as { options: Options[] }).options,
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
  if (item.type === 'link') {
    return h(ElLink, {
      props: {
        type: hue,
        size
      },
      on: {
        click: () => item?.onClick(scope.row)
      }
    }, [item.text])
  } else if (item.type === 'button') {
    return h(ElButton, {
      props: {
        type: hue,
        size
      },
      on: {
        click: () => item?.onClick(scope.row)
      }
    }, [item.text])
  }
}

export default defineComponent({
  name: 'STable',
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
    return () => h(ElTable, {
      props: {
        data: props.data,
        stripe: props.stripe
      }
    }, props.columns.map(item => h(ElTableColumn, handleColumnsData(item)))
    )
  }
})
