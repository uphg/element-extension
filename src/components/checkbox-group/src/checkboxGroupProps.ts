import { ExtractPropTypes, PropType } from "vue"
import { empty, sizeProp, booleanProp, stringProp, numberProp } from "../../../shared/commonProps"

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
    type: numberProp,
    default: empty
  },
  max: {
    type: numberProp,
    default: empty
  },
  size: sizeProp,
  textColor: {
    type: stringProp,
    default: empty
  },
  fill: {
    type: stringProp,
    default: empty
  },

  // customize props
  withBorder: {
    type: booleanProp,
    default: false
  },
  withButton: {
    type: booleanProp,
    default: false
  }
}

export const checkboxGroupProps = {
  value: Array,
  disabled: booleanProp,
  ...globalCheckboxGroupProps,

  // customize props
  options: {
    type: [Array, Object] as PropType<CheckboxGroupOptions>,
    default: () => []
  }
}