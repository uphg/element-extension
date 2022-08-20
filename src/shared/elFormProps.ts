import { ExtractPropTypes, PropType } from 'vue'
import { ElementUIComponentSize } from 'element-ui/types/component'
import { FormRules } from '../types/form'

export const elFormProps = {
  model: Object as PropType<object>,
  rules: {
    type: [Object, Array] as PropType<FormRules>,
    default: () => ({})
  },
  labelPosition: String as PropType<string>,
  labelWidth: String as PropType<string>,
  labelSuffix: {
    type: String as PropType<string>,
    default: ''
  },
  inline: Boolean as PropType<boolean>,
  inlineMessage: Boolean as PropType<boolean>,
  statusIcon: Boolean as PropType<boolean>,
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: String as PropType<ElementUIComponentSize>,
  disabled: Boolean as PropType<boolean>,
  validateOnRuleChange: {
    type: Boolean as PropType<boolean>,
    default: true // el 默认 true
  },
  hideRequiredAsterisk: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

export type ElFormProps = ExtractPropTypes<typeof elFormProps>