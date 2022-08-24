import Select from './src/select'

// @ts-ignore
Select.install = function (Vue) {
  Vue.component(Select.name, Select);
}

export default Select
