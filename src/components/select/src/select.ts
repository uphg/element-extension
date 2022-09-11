import { defineComponent } from "vue"
import { selectProps } from "./selectProps"
import { useSelect } from "./useSelect"

const ESelect = defineComponent({
  name: 'ESelect',
  props: selectProps,
  setup(props, context) {
    const { expose, render } = useSelect(props, context)
    context.expose(expose)

    return render
  }
})

export default ESelect
