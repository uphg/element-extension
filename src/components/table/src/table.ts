import { defineComponent } from "vue"
import { tableProps } from "./tableProps"
import { useTable } from "./useTable"

export default defineComponent({
  name: 'ETable',
  props: tableProps,
  setup(props, context) {
    return useTable(props, context)
  }
})

