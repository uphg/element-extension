import { defineComponent } from "vue"
import { inputNumberProps } from "./inputNumberProps"
import { useInputNumber } from "./useInputNumber"

export default defineComponent({
  name: 'EInputNumber',
  props: inputNumberProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useInputNumber(props, context)
    context.expose(expose)
    return render
  }
})
