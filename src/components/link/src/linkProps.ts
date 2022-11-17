import { empty } from "../../../shared/commonProps"
import { ExtractPropTypes } from "vue"

export type GlobalLinkProps = ExtractPropTypes<typeof globalLinkProps>
export type LinkProps = ExtractPropTypes<typeof linkProps>

export const globalLinkProps = {
  type: {
    type: String,
    default: empty // 'default'
  },
  underline: {
    type: Boolean,
    default: empty // true
  },
  href: {
    type: String,
    default: empty
  },
  icon: {
    type: String,
    default: empty
  }
}

export const linkBaseProps = {
  disabled: Boolean,
}

export const linkProps = {
  ...globalLinkProps,
  ...linkBaseProps,
  onClick: Function
}