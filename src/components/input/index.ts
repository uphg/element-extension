import Input from './src/Input'
import { inputProps } from './src/inputProps'
import { useInput } from './src/useInput'
import { ComponentPlugin } from '../../types/component-plugin'

(Input as ComponentPlugin<typeof Input>).install = function (Vue) {
  Vue.component(Input.name, Input);
}

export { Input, inputProps, useInput }
