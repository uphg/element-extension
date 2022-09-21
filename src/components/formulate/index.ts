import Formulate from './src/Formulate'
import { formulateProps } from './src/formulateProps'
import { useFormulate } from './src/useFormulate'

Formulate.install = function (Vue) {
  Vue.component(Formulate.name, Formulate);
}

export { Formulate, formulateProps, useFormulate }
