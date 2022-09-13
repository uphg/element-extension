import { empty } from "../../../shared/_commonProps"
import { ExtractPropTypes } from "vue"

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchProps = {
  value: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  id: String,

  // global props
  width: {
    type: Number,
    default: empty
  },
  activeIconClass: {
    type: String,
    default: empty
  },
  inactiveIconClass: {
    type: String,
    default: empty
  },
  activeText: {
    type: String,
    default: empty
  },
  inactiveText: {
    type: String,
    default: empty
  },
  activeColor: {
    type: String,
    default: empty
  },
  inactiveColor: {
    type: String,
    default: empty
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: empty
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: empty
  },
  validateEvent: {
    type: Boolean,
    default: empty
  }
}