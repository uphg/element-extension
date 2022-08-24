import { ExtractPropTypes, PropType } from "vue"
import { commonProps } from '../../shared/_commonProps'
import { InputType } from '../../types/input'

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputProps = {
  value: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  size: commonProps.size,
  resize: commonProps.resize,
  form: commonProps.form,
  disabled: commonProps.disabled,
  readonly: commonProps.readonly,
  autosize: commonProps.autosize,
  autocomplete: commonProps.autocomplete,
  validateEvent: commonProps.validateEvent,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,
  label: String as PropType<string>,
  clearable: commonProps.clearable,
  showPassword: commonProps.showPassword,
  showWordLimit: commonProps.showWordLimit,
  tabindex: commonProps.tabindex,
  exclude: commonProps.exclude,
}