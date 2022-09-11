import { defineComponent } from "vue"
import { formulateProps } from "./formulateProps"
import { useFormulate } from "./useFormulate"

const EFormulate = defineComponent({
  name: 'EFormulate',
  props: formulateProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useFormulate(props, context)
    context.expose(expose)
    return render
  }
})

export default EFormulate
