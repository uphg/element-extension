import Input from './src/input'

// @ts-ignore
Input.install = function (Vue) {
  Vue.component(Input.name, Input);
}

export default Input
