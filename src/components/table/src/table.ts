import { defineComponent } from "vue"
import { tableProps } from "./tableProps"
import { useTable } from "./useTable"
import { ElementPartComponent } from "../../../../types/component"

const ETable = defineComponent({
  name: 'ETable',
  props: tableProps,
  setup(props, context) {
    const { expose, render } = useTable(props, context)
    context.expose(expose)

    return render
  }
})

export default ETable as ElementPartComponent<typeof ETable>

