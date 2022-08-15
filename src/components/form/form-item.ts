import { defineComponent, h, PropType, ExtractPropTypes, ref } from "vue"
import { FormItem as ElFormItem } from "element-ui"
import { useCustomInput } from "./use-custom-input"
import { customInputProps } from "../../shared/custom-input-props"
import { pick } from "src/utils"

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
    const elFormItem = ref<ElFormItem | null>(null)
    const { render, expose } = useCustomInput(props, context, {
      onKeyup(event) {
        if (event.keyCode !== 13) return
        // 执行回车
      }
    })

    expose && context.expose({
      ...expose,
      get elFormItem() {
        return elFormItem.value
      }
    })

    
    return () => h(ElFormItem, {
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
