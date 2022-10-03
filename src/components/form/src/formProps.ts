import { ExtractPropTypes, PropType } from 'vue'
import { ObjectLike } from '../../../../types/_common'
import { sizeProp, empty, booleanProp, stringProp, objectProp } from '../../../shared/commonProps'

export type GlobalFormProps = ExtractPropTypes<typeof globalFormProps>
export type FormProps = ExtractPropTypes<typeof formProps>

export const globalFormProps = {
  inline: {
    type: booleanProp,
    default: empty
  },
  labelPosition: {
    type: stringProp,
    default: empty
  },
  labelWidth: {
    type: stringProp,
    default: empty
  },
  hideRequiredAsterisk: {
    type: booleanProp,
    default: empty
  },
  showMessage: {
    type: booleanProp,
    default: empty
  },
  inlineMessage: {
    type: booleanProp,
    default: empty
  },
  validateOnRuleChange: {
    type: booleanProp,
    default: empty // true
  },
  size: sizeProp
}

export const formProps = {
  model: {
    type: objectProp
  },
  rules: {
    type: [Object, Array] as PropType<ObjectLike>
  },
  labelSuffix: {
    type: stringProp,
    default: ''
  },
  statusIcon: booleanProp,
  disabled: booleanProp,
  ...globalFormProps,

  // customize props
  // withEnterNext: booleanProp // 是否开启回车换行
}