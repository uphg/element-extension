import FormItem from './src/formItem'

// @ts-ignore
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
}

export default FormItem
