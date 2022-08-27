import { defineComponent } from "vue"
import { selectProps } from "./selectProps"
import { useSelect } from "./useSelect"

export default defineComponent({
  name: 'ESelect',
  props: selectProps,
  setup(props, context) {
    const { expose, render } = useSelect(props, context)
    context.expose(expose)
    return render
  }
})
