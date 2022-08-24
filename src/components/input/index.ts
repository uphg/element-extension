import Input from './src/input'
import { inputProps } from './src/inputProps'
import { useInput } from './src/useInput'

// @ts-ignore
Input.install = function (Vue) {
  Vue.component(Input.name, Input);
}

export { Input, inputProps, useInput }
