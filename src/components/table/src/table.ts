import { defineComponent } from "vue"
import { tableProps } from "./tableProps"
import { useTable } from "./useTable"

const ETable = defineComponent({
  name: 'ETable',
  props: tableProps,
  setup(props, context) {
    const { expose, render } = useTable(props, context)
    context.expose(expose)

    return render
  }
})

export default ETable

