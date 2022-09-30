import { ExtractPropTypes, PropType } from "vue";
import { commonProps, empty } from "../../../shared/commonProps";

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
  size: commonProps.size,
  textColor: {
    type: [String, undefined] as PropType<string | undefined>,
    default: empty
  },
  fill: {
    type: [String, undefined] as PropType<string | undefined>,
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
