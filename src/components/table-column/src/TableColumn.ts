import { defineComponent } from "vue"
import { tableColumnProps } from "./tableColumnProps"
import { useTableColumn } from "./useTableColumn"

export default defineComponent({
  name: 'ETableColumn',
  props: tableColumnProps,
  setup(props, context) {
    const { render } = useTableColumn(props, context)
    return render
  }
})

