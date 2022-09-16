import InputNumber from './src/InputNumber'
import { inputNumberProps } from './src/inputNumberProps'
import { useInputNumber } from './src/useInputNumber'

InputNumber.install = function (Vue) {
  Vue.component(InputNumber.name, InputNumber);
}

export { InputNumber, inputNumberProps, useInputNumber }
