import FormItem from './form-item'

// @ts-ignore
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
}

export default FormItem
