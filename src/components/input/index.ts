import Input from './src/Input'
import { inputProps } from './src/inputProps'
import { useInput } from './src/useInput'

// @ts-ignore
Input.install = function (Vue) {
  Vue.component(Input.name, Input);
}

export { Input, inputProps, useInput }
