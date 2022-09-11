import Select from './src/Select'
import { selectProps } from './src/selectProps'
import { useSelect } from './src/useSelect'
import { ComponentPlugin } from '../../types/component-plugin';

(Select as ComponentPlugin<typeof Select>).install = function (Vue) {
  Vue.component(Select.name, Select);
}

export { Select, selectProps, useSelect }
