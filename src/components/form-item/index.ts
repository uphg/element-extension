import FormItem from './src/FormItem'
import { formItemProps } from './src/formItemProps'
import { useFormItem } from './src/useFormItem'
import { ComponentPlugin } from '../../types/component-plugin';

(FormItem as ComponentPlugin<typeof FormItem>).install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
}

export { FormItem, formItemProps, useFormItem }
