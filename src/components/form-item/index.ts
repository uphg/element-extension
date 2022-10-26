import FormItem from './src/FormItem'
import { formItemProps } from './src/formItemProps'
import { useFormItem } from './src/useFormItem'
import { withInstall } from '../../utils'

const EFormItem = withInstall(FormItem)

export { FormItem, EFormItem, formItemProps, useFormItem }
