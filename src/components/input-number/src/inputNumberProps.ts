import { ExtractPropTypes } from "vue";
import { empty, booleanProp, stringProp, numberProp } from "../../../shared/commonProps";

export type GlobalInputNumberProps = ExtractPropTypes<typeof globalInputNumberProps>
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const globalInputNumberProps = {
  label: {
    type: stringProp,
    default: empty
  },
  name: {
    type: stringProp,
    default: empty
  },
  step: {
    type: numberProp,
    default: empty
  },
  stepStrictly: {
    type: booleanProp,
    default: empty
  },
  max: {
    type: numberProp,
    default: empty
  },
  min: {
    type: numberProp,
    default: empty
  },
  precision: {
    type: numberProp,
    default: empty
  },
  size: {
    type: stringProp,
    default: empty
  },
  controls: {
    type: booleanProp,
    default: empty
  },
  controlsPosition: {
    type: stringProp,
    default: empty
  }
}

export const inputNumberBaseProps = {
  value: {
    type: [Number, Boolean, String],
    default: () => ({})
  },
  disabled: booleanProp,
  placeholder: stringProp,
}

export const inputNumberProps = {
  ...inputNumberBaseProps,
  ...globalInputNumberProps
}