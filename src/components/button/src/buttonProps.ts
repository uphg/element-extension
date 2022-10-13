import { ExtractPropTypes, PropType } from "vue"
import { booleanProp, empty, sizeProp, stringProp } from "../../../shared/commonProps"

export type GlobalButtonProps = ExtractPropTypes<typeof globalButtonProps>
export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const globalButtonProps = {
  type: {
    type: stringProp,
    default: empty // 'default'
  },
  icon: {
    type: stringProp,
    default: empty // ''
  },
  nativeType: {
    type: stringProp,
    default: empty // 'button'
  },
  plain: {
    type: booleanProp,
    default: empty
  },
  autofocus: {
    type: booleanProp,
    default: empty
  },
  round: {
    type: booleanProp,
    default: empty
  },
  circle: {
    type: booleanProp,
    default: empty
  },
  size: sizeProp
}

export const buttonBaseProps = {
  loading: {
    type: booleanProp,
    default: empty
  },
  disabled: {
    type: booleanProp,
    default: empty
  }
}

export const buttonProps = {
  ...buttonBaseProps,
  ...globalButtonProps
}