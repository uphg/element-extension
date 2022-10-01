import { defineComponent } from "vue"
import { formItemProps } from "./formItemProps"
import { useFormItem } from "./useFormItem"
import { ElementPartComponent } from "../../../../types/component"

const EFormItem = defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useFormItem(props, context)
    context.expose(expose)
    return render
  }
})

export default EFormItem as ElementPartComponent<typeof EFormItem>
