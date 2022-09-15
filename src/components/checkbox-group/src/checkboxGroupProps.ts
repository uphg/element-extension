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
    type: Number,
    default: empty
  },
  max: {
    type: Number,
    default: empty
  },
  size: {
    type: commonProps.size,
    default: empty
  },
  textColor: {
    type: String,
    default: empty
  },
  fill: {
    type: String,
    default: empty
  },
}

export const checkboxGroupProps = {
  value: Array,
  disabled: commonProps.disabled,

  // global props
  ...globalCheckboxGroupProps,

  border: Boolean as PropType<boolean>,
  withButton: Boolean as PropType<boolean>,
  options: {
    type: [Array, Object] as PropType<CheckboxGroupOptions>,
    default: () => []
  }
}