import { ExtractPropTypes, PropType } from "vue";
import { commonProps, empty } from "../../../shared/_commonProps";

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export type RadioGroupOption = {
  label: string | number | boolean;
  value: string | number | boolean;
  name?: string;
  disabled?: boolean;
  border?: boolean;
}

export type RadioGroupOptions = Array<RadioGroupOption>

export const radioGroupProps = {
  value: {
    type: String,
    default: empty
  },
  size: commonProps.size,
  disabled: commonProps.disabled,
  textColor: {
    type: String,
    default: empty
  },
  fill: {
    type: String,
    default: empty
  },

  border: Boolean as PropType<boolean>,
  withButton: Boolean as PropType<boolean>,
  options: {
    type: [Array, Object] as PropType<RadioGroupOptions>,
    default: () => []
  },
}