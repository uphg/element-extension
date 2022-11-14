import { ExtractPropTypes, PropType } from "vue";
import { ObjectLike } from "../../../../types/_common";
import { empty, booleanProp, stringProp } from "../../../shared/commonProps";

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

const emptyStringProp = {
  type: stringProp,
  default: ''
}

export const elFormItemProps = {
  label: emptyStringProp,
  labelWidth: emptyStringProp,
  prop: stringProp,
  required: {
    type: booleanProp,
    default: empty
  },
  rules: [Object, Array] as PropType<ObjectLike | ObjectLike[]>,
  error: stringProp,
  validateStatus: stringProp,
  for: stringProp,
  inlineMessage: booleanProp,
  showMessage: {
    type: booleanProp,
    default: true
  },
  size: String as PropType<'medium' | 'small' | 'mini'>
}

export const formItemProps = {
  ...elFormItemProps,
  textType: {
    type: String,
    default: ''
  }
}
