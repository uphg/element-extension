import { ExtractPropTypes, PropType } from 'vue'
import { ObjectLike } from '../../../../types/_common'
import { commonProps, empty } from '../../../shared/commonProps'

export type GlobalFormProps = ExtractPropTypes<typeof globalFormProps>
export type FormProps = ExtractPropTypes<typeof formProps>

const booleanProp = Boolean as PropType<boolean>
const stringProp = String as PropType<string>

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
  size: commonProps.size
}

export const formProps = {
  model: {
    type: Object as PropType<ObjectLike>
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