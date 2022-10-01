import { ExtractPropTypes, PropType } from "vue"
import { ObjectLike } from "../../../../types/_common";
import { empty, sizeProp, booleanProp, stringProp } from '../../../shared/commonProps'

export type GlobalInputProps = ExtractPropTypes<typeof globalInputProps> & { maxlength?: number; }
export type InputProps = ExtractPropTypes<typeof inputProps>

export const globalInputProps = {
  clearable: {
    type: booleanProp,
    default: empty
  },
  showWordLimit: {
    type: booleanProp,
    default: empty
  },
  size: sizeProp,
  autosize: {
    type: [Boolean, Object] as PropType<boolean | ObjectLike>,
    default: empty // false
  }
}

export const inputProps = {
  value: [String, Number] as PropType<string | number>,
  type: {
    type: stringProp,
    default: 'text'
  },
  resize: stringProp,
  form: stringProp,
  disabled: booleanProp,
  readonly: booleanProp,
  autocomplete: {
    type: stringProp,
    default: 'off'
  },
  validateEvent: {
    type: booleanProp,
    default: true
  },
  suffixIcon: stringProp,
  prefixIcon: stringProp,
  label: stringProp,
  showPassword: {
    type: booleanProp,
    default: false
  },
  tabindex: stringProp,
  ...globalInputProps,

  // customize props
  exclude: {
    type: [String, Number, RegExp] as PropType<string | number | RegExp>,
    default: null
  },
}
