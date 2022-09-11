import Formulate from './src/Formulate'
import { formulateProps } from './src/formulateProps'
import { useFormulate } from './src/useFormulate'
import { ComponentPlugin } from '../../types/component-plugin';

(Formulate as ComponentPlugin<typeof Formulate>).install = function (Vue) {
  Vue.component(Formulate.name, Formulate);
}

export { Formulate, formulateProps, useFormulate }
