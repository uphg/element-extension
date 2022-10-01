import { ExtractPropTypes, PropType } from "vue"
import { FormulateFields, MapRules } from "./interface"
import { formProps } from '../../form/src/formProps'
import { numberProp, booleanProp } from "../../../shared/commonProps"

export type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>
export type FormulateProps = ExtractPropTypes<typeof formulateProps>

const formulateDataProps = {
  ...formProps,
  fields: {
    type: [Array, Object] as PropType<FormulateFields | FormulateFields[]>,
    default: () => ({})
  },
  gutter: numberProp, // 多列布局的分栏间隔
  withEnterNext: booleanProp, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
}

export const formulateProps = {
  ...formulateDataProps,
  data: [Object] as PropType<FormulateDataProps>
}
