import RadioGroup from './src/RadioGroup'
import { radioGroupProps } from './src/radioGroupProps'
import { useRadioGroup } from './src/useRadioGroup'
import { ComponentPlugin } from '../../types/component-plugin';

(RadioGroup  as ComponentPlugin<typeof RadioGroup>).install = function (Vue) {
  Vue.component(RadioGroup.name, RadioGroup);
}

export { RadioGroup, radioGroupProps, useRadioGroup }
