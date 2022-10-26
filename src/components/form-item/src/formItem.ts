import { defineComponent } from "vue"
import { formItemProps } from "./formItemProps"
import { useFormItem } from "./useFormItem"

export default defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useFormItem(props, context)
    context.expose(expose)
    return render
  }
})
