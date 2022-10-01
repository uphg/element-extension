import { ExtractPropTypes, PropType } from 'vue'
import { ObjectLike } from '../../../../types/_common'
import { sizeProp, empty, booleanProp, stringProp, objectProp } from '../../../shared/commonProps'

export type GlobalFormProps = ExtractPropTypes<typeof globalFormProps>
export type FormProps = ExtractPropTypes<typeof formProps>

export const globalFormProps = {
  labelWidth: {
    type: stringProp,
    default: empty
  },
  labelPosition: {
    type: stringProp,
    default: empty
  },
  inline: {
    type: booleanProp,
    default: empty
  },
  inlineMessage: {
    type: booleanProp,
    default: empty
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
  showMessage: booleanProp,
  disabled: booleanProp,
  validateOnRuleChange: {
    type: booleanProp,
    default: true // el 默认 true
  },
  hideRequiredAsterisk: booleanProp,
  ...globalFormProps,

  // customize props
  // withEnterNext: booleanProp // 是否开启回车换行
}