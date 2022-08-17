import Select from './select'

// @ts-ignore
Select.install = function (Vue) {
  Vue.component(Select.name, Select);
}

export default Select
