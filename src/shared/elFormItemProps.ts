import { PropType } from "vue"

export const elFormItemProps = {
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