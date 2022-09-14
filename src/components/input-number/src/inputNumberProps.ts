import { ExtractPropTypes } from "vue";
import { empty } from "../../../shared/_commonProps";

export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>

export const inputNumberProps = {
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
  value: {
    type: [Number, Boolean, String],
    default: () => ({})
  },
  disabled: Boolean,
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
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    default: empty
  }
}