import FormItem from '../form/form-item'

// @ts-ignore
FormItem.install = function (Vue) {
  Vue.component(FormItem.name, FormItem);
}

export default FormItem
