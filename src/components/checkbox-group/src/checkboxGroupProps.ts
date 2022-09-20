import { ExtractPropTypes, PropType } from "vue"
import { commonProps, empty } from "../../../shared/_commonProps"

export type CheckboxGroupOption = {
  value:  string | number | boolean;
  label: string | number | boolean,
  indeterminate?: boolean,
  disabled?: boolean,
  checked?: boolean,
  name?: string,
  trueLabel?: string | number,
  falseLabel?: string | number,
  id?: string, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
  controls?: string, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
  border?: boolean,
  size?: string
}

export type CheckboxGroupOptions = Array<CheckboxGroupOption>

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export type GlobalCheckboxGroupProps = ExtractPropTypes<typeof globalCheckboxGroupProps>

export const globalCheckboxGroupProps = {
  min: {
    type: [Number, undefined],
    default: empty
  },
  max: {
    type: [Number, undefined],
    default: empty
  },
  size: {
    type: commonProps.size.type,
    default: empty
  },
  textColor: {
    type: [String, undefined],
    default: empty
  },
  fill: {
    type: [String, undefined],
    default: empty
  },

  // customize props
  withBorder: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  withButton: {
    type: Boolean as PropType<boolean>,
    default: false
  }
}

export const checkboxGroupProps = {
  value: Array,
  disabled: commonProps.disabled,
  ...globalCheckboxGroupProps,

  // customize props
  options: {
    type: [Array, Object] as PropType<CheckboxGroupOptions>,
    default: () => []
  }
}