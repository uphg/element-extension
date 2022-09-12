import InputNumber from './src/InputNumber'
import { inputNumberProps } from './src/inputNumberProps'
import { useInputNumber } from './src/useInputNumber'
import { ComponentPlugin } from '../../types/component-plugin'

(InputNumber as ComponentPlugin<typeof InputNumber>).install = function (Vue) {
  Vue.component(InputNumber.name, InputNumber);
}

export { InputNumber, inputNumberProps, useInputNumber }
