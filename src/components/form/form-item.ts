import { defineComponent, h, PropType, ExtractPropTypes } from "vue"
import { FormItem as ElFormItem } from "element-ui"
import { useCustomInput } from "./use-custom-input"
import { customInputProps } from "../../shared/custom-input-props"

const formItemProps = {
  ...customInputProps,

  // form item attributes
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
  }
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export default defineComponent({
  name: 'SFormItem',
  props: formItemProps,
  setup(props, context) {
    const { render, expose } = useCustomInput(props, context, {
      onKeyup(event) {
        if (event.keyCode !== 13) return
        // 执行回车
      }
    })

    expose && context.expose(expose)

    return () => h(ElFormItem, {
      props: {
        label: props.label,
        labelWidth: props.labelWidth,
        prop: props.prop,
        required: props.required,
        rules: props.rules,
        error: props.error,
        validateStatus: props.validateStatus,
        for: props.for,
        inlineMessage: props.inlineMessage,
        showMessage: props.showMessage,
        size: props.size
      },
      scopedSlots: {
        header: () => context.slots.header?.()
      }
    }, [
      context.slots.itemPrefix && context.slots.itemPrefix(),
      context.slots.default?.() || render(),
      context.slots.itemSuffix && context.slots.itemSuffix(),
    ])
  }
})
