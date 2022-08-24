import FormItem from './src/formItem'
import { formItemProps } from './src/formItemProps'
import { useFormItem } from './src/useFormItem'

// @ts-ignore
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
}

export { FormItem, formItemProps, useFormItem }
