import { empty } from "../../../shared/commonProps"
import { ExtractPropTypes } from "vue"

export type GlobalSwitchProps = ExtractPropTypes<typeof globalSwitchProps>
export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const globalSwitchProps = {
  // global props
  name: {
    type: String,
    default: empty // ''
  },
  id: {
    type: String,
    default: empty
  },
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

export const switchBaseProps = {
  value: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const switchProps = {
  ...switchBaseProps,
  ...globalSwitchProps
}
