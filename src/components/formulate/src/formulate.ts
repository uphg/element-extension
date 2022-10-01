import { defineComponent } from "vue"
import { formulateProps } from "./formulateProps"
import { useFormulate } from "./useFormulate"
import { ElementPartComponent } from "../../../../types/component"

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

export default EFormulate as ElementPartComponent<typeof EFormulate>
