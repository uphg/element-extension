import { defineComponent, h } from "vue"
import { formItemProps } from "./formItemProps"
import { useFormItem } from "./useFormItem"

export default defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  inheritAttrs: false,
  setup(props, context) {
    return useFormItem(props, context)
  }
})
