import { ExtractPropTypes } from 'vue'
import { commonProps } from './_commonProps'

export const elFormProps = {
  model: commonProps.model,
  rules: commonProps.rules,
  labelPosition: commonProps.labelPosition,
  labelWidth: commonProps.labelWidth,
  labelSuffix: commonProps.labelSuffix,
  inline: commonProps.inline,
  inlineMessage: commonProps.inlineMessage,
  statusIcon: commonProps.statusIcon,
  showMessage: commonProps.showMessage,
  size: commonProps.size,
  disabled: commonProps.disabled,
  validateOnRuleChange: commonProps.validateOnRuleChange,
  hideRequiredAsterisk: commonProps.hideRequiredAsterisk
}

export type ElFormProps = ExtractPropTypes<typeof elFormProps>