import { ExtractPropTypes } from 'vue'
import { commonProps, empty } from '../../../shared/_commonProps'

export type GlobalFormProps = ExtractPropTypes<typeof globalFormProps>
export type FormProps = ExtractPropTypes<typeof formProps>

export const globalFormProps = {
  labelWidth: {
    type: commonProps.labelWidth.type,
    default: empty
  },
  labelPosition: {
    type: commonProps.labelPosition.type,
    default: empty
  },
  inline: {
    type: commonProps.inline.type,
    default: empty
  },
  inlineMessage: {
    type: commonProps.inlineMessage.type,
    default: empty
  },
  size: {
    type: commonProps.size.type,
    default: empty
  }
}

export const formProps = {
  model: commonProps.model,
  rules: commonProps.rules,
  labelSuffix: commonProps.labelSuffix,
  statusIcon: commonProps.statusIcon,
  showMessage: commonProps.showMessage,
  disabled: commonProps.disabled,
  validateOnRuleChange: commonProps.validateOnRuleChange,
  hideRequiredAsterisk: commonProps.hideRequiredAsterisk,
  ...globalFormProps,

  // customize props
  // withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
}