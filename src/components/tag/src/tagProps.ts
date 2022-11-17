import { empty } from "../../../shared/commonProps"
import { ExtractPropTypes } from "vue"

export type GlobalTagProps = ExtractPropTypes<typeof globalTagProps>
export type TagProps = ExtractPropTypes<typeof tagProps>

export const globalTagProps = {
  text: {
    type: String,
    default: empty
  },
  closable: {
    type: Boolean,
    default: empty
  },
  type: {
    type: String,
    default: empty
  },
  hit: {
    type: Boolean,
    default: empty
  },
  disableTransitions: {
    type: Boolean,
    default: empty
  },
  color: {
    type: String,
    default: empty
  },
  size: {
    type: String,
    default: empty
  },
  effect: {
    type: String,
    default: empty
  }
}

export const tagProps = {
  ...globalTagProps,
  onClick: Function,
  onClose: Function,
}