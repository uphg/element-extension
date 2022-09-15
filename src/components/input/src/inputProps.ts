import { ElementUIComponentSize } from "element-ui/types/component"
import { ExtractPropTypes, PropType } from "vue"
import { empty,commonProps } from '../../../shared/_commonProps'
import { InputType } from '../../../types/input'

export type InputProps = ExtractPropTypes<typeof inputProps>
export type GlobalInputProps = ExtractPropTypes<typeof globalInputProps> & { maxlength?: number; }

export const globalInputProps = {
  clearable: {
    type: [Boolean] as PropType<boolean>,
    default: empty
  },
  showWordLimit: {
    type: [Boolean] as PropType<boolean>,
    default: empty
  },
  size: {
    type: commonProps.size,
    default: empty
  },
  autosize: {
    type: commonProps.autosize.type,
    default: empty
  }
}

export const inputProps = {
  value: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  resize: commonProps.resize,
  form: commonProps.form,
  disabled: commonProps.disabled,
  readonly: commonProps.readonly,

  autocomplete: commonProps.autocomplete,
  validateEvent: commonProps.validateEvent,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,
  label: String as PropType<string>,
  showPassword: commonProps.showPassword,

  tabindex: commonProps.tabindex,
  exclude: commonProps.exclude,
}