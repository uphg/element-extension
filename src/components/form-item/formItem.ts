import { defineComponent, h, PropType, ExtractPropTypes } from "vue"
import { FormItem } from "element-ui"
import { useCustomInput } from "./useCustomInput"
import { customInputProps } from "../../shared/customInputProps"
import { pick } from "../../utils"
import useElFormItem from "../../composables/useElFormItem"
import { ElFormItem } from "element-ui/types/form-item"

const propNames = ['label', 'labelWidth', 'prop', 'required', 'rules', 'error', 'validateStatus', 'for', 'inlineMessage', 'showMessage', 'size']

const formItemProps = {
  ...customInputProps,
  label: String as PropType<string>,
  labelWidth: String as PropType<string>,
  prop: String as PropType<string>,
  required: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  rules: [Object, Array] as PropType<object | unknown[]>,
  error: String as PropType<string>,
  validateStatus: String as PropType<string>,
  for: String as PropType<string>,
  inlineMessage: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: ''
  },
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: String as PropType<string>,
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export default defineComponent({
  name: 'EFormItem',
  props: formItemProps,
  setup(props, context) {
    const { elFormItem, clearValidate } = useElFormItem()
    const { render, expose } = useCustomInput(props, context, {
      onKeyup(event) {
        if (event.keyCode !== 13) return
        // 执行回车
      }
    })

    context.expose({
      ...(expose ? expose : {}),
      get elFormItem() {
        return elFormItem.value
      },
      clearValidate
    })

    
    return () => h(FormItem, {
      // @ts-ignore
      ref: (el: ElFormItem) => elFormItem.value = el,
      props: pick(props, propNames),
      scopedSlots: {
        error: (params) => context.slots.error?.(params),
      }
    }, [
      context.slots.itemPrefix?.(),
      context.slots.default?.() || render(),
      context.slots.itemSuffix?.(),
    ])
  }
})
