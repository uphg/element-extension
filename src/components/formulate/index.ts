import Formulate from './src/formulate'

// @ts-ignore
Formulate.install = function (Vue) {
  Vue.component(Formulate.name, Formulate);
}

export default Formulate
