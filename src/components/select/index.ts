import Select from './src/Select'
import { selectProps } from './src/selectProps'
import { useSelect } from './src/useSelect'

Select.install = function (Vue) {
  Vue.component(Select.name, Select);
}

export { Select, selectProps, useSelect }
