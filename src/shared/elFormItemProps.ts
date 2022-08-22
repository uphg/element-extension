import { ExtractPropTypes } from "vue"
import { commonProps } from "./_commonProps"

export const elFormItemProps = {
  label: commonProps.label,
  labelWidth: commonProps.labelWidth,
  prop: commonProps.prop,
  required: commonProps.required,
  rules: commonProps.rules,
  error: commonProps.error,
  validateStatus: commonProps.validateStatus,
  for: commonProps.for,
  inlineMessage: commonProps.inlineMessage,
  showMessage: commonProps.showMessage,
  size: commonProps.size
}

export type ElFormItemProps = ExtractPropTypes<typeof elFormItemProps>