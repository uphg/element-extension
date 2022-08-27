import { ElementUIComponentSize } from "element-ui/types/component"
import { ExtractPropTypes, PropType } from "vue"
import { empty,commonProps } from '../../../shared/_commonProps'
import { InputType } from '../../../types/input'

export type InputProps = ExtractPropTypes<typeof inputProps>

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
  autosize: commonProps.autosize,
  autocomplete: commonProps.autocomplete,
  validateEvent: commonProps.validateEvent,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,
  label: String as PropType<string>,
  showPassword: commonProps.showPassword,
  clearable: {
    type: [Boolean, undefined] as PropType<boolean | undefined>,
    default: empty
  },
  showWordLimit: {
    type: [Boolean, undefined] as PropType<boolean | undefined>,
    default: empty
  },
  size: {
    type: [String, undefined] as PropType<ElementUIComponentSize | undefined>,
    default: empty
  },
  tabindex: commonProps.tabindex,
  exclude: commonProps.exclude,
}