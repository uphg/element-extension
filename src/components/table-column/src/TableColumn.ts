import { defineComponent } from "vue"
import { tableColumnProps } from "./tableColumnProps"
import { useTableColumn } from "./useTableColumn"

const ETableColumn = defineComponent({
  name: 'ETableColumn',
  props: tableColumnProps,
  setup(props, context) {
    const { render } = useTableColumn(props, context)
    return render
  }
})

export default ETableColumn

