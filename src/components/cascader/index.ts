import Cascader from './src/Cascader'
import { cascaderProps } from './src/cascaderProps'
import { useCascader } from './src/useCascader'

Cascader.install = function (Vue) {
  Vue.component(Cascader.name, Cascader);
}

export { Cascader, cascaderProps, useCascader }
