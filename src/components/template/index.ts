import xxx from './src/xxx'
import { xxxProps } from './src/xxxProps'
import { usexxx } from './src/usexxx'
import { ComponentPlugin } from '../../types/component-plugin'

(xxx as ComponentPlugin<typeof xxx>).install = function (Vue) {
  Vue.component(xxx.name, xxx);
}

export { xxx, xxxProps, usexxx }
