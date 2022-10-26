import { defineComponent } from "vue"
import { cascaderProps } from "./cascaderProps"
import { useCascader } from "./useCascader"

export default defineComponent({
  name: 'ECascader',
  props: cascaderProps,
  setup(props, context) {
    const { expose, render } = useCascader(props, context)
    context.expose(expose)
    return render
  }
})
