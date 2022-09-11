import CheckboxGroup from './src/CheckboxGroup'
import { checkboxGroupProps } from './src/checkboxGroupProps'
import { useCheckboxGroup } from './src/useCheckboxGroup'
import { ComponentPlugin } from '../../types/component-plugin';

(CheckboxGroup as ComponentPlugin<typeof CheckboxGroup>).install = function (Vue) {
  Vue.component(CheckboxGroup.name, CheckboxGroup);
}

export { CheckboxGroup, checkboxGroupProps, useCheckboxGroup }
