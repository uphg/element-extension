import { ExtractPropTypes, PropType } from "vue";
import { commonProps, empty } from "../../../shared/_commonProps";

export type GlobalRadioGroupProps = ExtractPropTypes<typeof globalRadioGroupProps>
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export type RadioGroupOption = {
  label: string | number | boolean;
  value: string | number | boolean;
  name?: string;
  disabled?: boolean;
  border?: boolean;
}

export type RadioGroupOptions = Array<RadioGroupOption>

export const globalRadioGroupProps = {
  size: {
    type: [commonProps.size.type, undefined],
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
    default: false,
  },
  withButton: {
    type: Boolean as PropType<boolean>,
    default: false,
  }
}

export const radioGroupProps = {
  value: {
    type: String,
    default: empty
  },
  disabled: commonProps.disabled,
  ...globalRadioGroupProps,

  options: {
    type: [Array, Object] as PropType<RadioGroupOptions>,
    default: () => []
  }
}
