import { ExtractPropTypes } from 'vue'
import { elFormProps } from '../../../shared/_commonProps'

export type FormProps = ExtractPropTypes<typeof formProps>

export const formProps = {
  ...elFormProps,
  
  // customize props
  // withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
}