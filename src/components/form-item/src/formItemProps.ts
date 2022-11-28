import { ExtractPropTypes, PropType } from "vue";
import { ObjectLike } from "../../../../types/_common";
import { empty, booleanProp, stringProp } from "../../../shared/commonProps";

export type GlobalFormItemProps = ExtractPropTypes<typeof globalFormItemProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export const globalFormItemProps = {
  labelWidth: {
    type: stringProp,
    default: empty
  },
  inlineMessage: {
    type: booleanProp,
    default: empty
  },
  showMessage: {
    type: booleanProp, 
    default: empty // true
  },
  size: {
    type: String as PropType<'medium' | 'small' | 'mini'>,
    default: empty
  }
}

export const baseFormItemProps = {
  label: {
    type: stringProp,
    default: ''
  },
  required: {
    type: booleanProp,
    default: empty
  },
  prop: stringProp,
  rules: [Object, Array] as PropType<ObjectLike | ObjectLike[]>,
  error: stringProp,
  validateStatus: stringProp,
  for: stringProp,
  
}

export const formItemProps = {
  ...baseFormItemProps,
  ...globalFormItemProps
}
