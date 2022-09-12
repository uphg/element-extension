import { ExtractPropTypes } from "vue";

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const inputNumberProps = {
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: false
  },
  max: {
    type: Number,
    default: Infinity
  },
  min: {
    type: Number,
    default: -Infinity
  },
  value: {},
  disabled: Boolean,
  size: String,
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: ''
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator(val: number | string) {
      return val >= 0 && val === parseInt(val as string, 10);
    }
  }
}