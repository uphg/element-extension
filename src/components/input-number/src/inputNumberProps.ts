import { ExtractPropTypes } from "vue";
import { empty } from "../../../shared/commonProps";

export type GlobalInputNumberProps = ExtractPropTypes<typeof globalInputNumberProps>
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const globalInputNumberProps = {
  step: {
    type: Number,
    default: empty
  },
  stepStrictly: {
    type: Boolean,
    default: empty
  },
  max: {
    type: Number,
    default: empty
  },
  min: {
    type: Number,
    default: empty
  },
  precision: {
    type: Number,
    default: empty
  },
  size: {
    type: String,
    default: empty
  },
  controls: {
    type: Boolean,
    default: empty
  },
  controlsPosition: {
    type: String,
    default: empty
  }
}

export const inputNumberProps = {
  value: {
    type: [Number, Boolean, String],
    default: () => ({})
  },
  disabled: Boolean,
  name: String,
  label: String,
  placeholder: String,
  ...globalInputNumberProps
}