import { ExtractPropTypes, PropType } from "vue";
import { sizeProp, empty, booleanProp, stringProp } from "../../../shared/commonProps";

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

export const globalRadioGroupBaseProps = {
  size: sizeProp,
  textColor: {
    type: stringProp,
    default: empty
  },
  fill: {
    type: stringProp,
    default: empty
  }
}

export const globalRadioGroupCustomizeProps = {
  withBorder: {
    type: booleanProp,
    default: false,
  },
  withButton: {
    type: booleanProp,
    default: false,
  }
}

export const radioGroupBaseProps = {
  value: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: empty
  },
  disabled: booleanProp,
}

export const globalRadioGroupProps = {
  ...globalRadioGroupBaseProps,
  ...globalRadioGroupCustomizeProps
}

export const radioGroupProps = {
  ...radioGroupBaseProps,
  ...globalRadioGroupProps,

  // customize props
  options: {
    type: [Array, Object] as PropType<RadioGroupOptions>,
    default: () => []
  }
}
