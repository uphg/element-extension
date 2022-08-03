import { formGlobalFieldsKey } from '../shared/form-providers'
import { VueConstructor } from 'vue/types/vue'

import Input from './input/index'
import Form from './form'
import FormItem from './form-item'
import Formulate from './formulate'
import Table from './table'

function install(Vue: VueConstructor) {
  // @ts-ignore
  Vue.use(Input)
  // @ts-ignore
  Vue.use(Form)
  // @ts-ignore
  Vue.use(FormItem)
  // @ts-ignore
  Vue.use(Formulate)
  // @ts-ignore
  Vue.use(Table)
}

export {
  install,
  Input,
  Form,
  FormItem,
  Formulate,
  Table,
  formGlobalFieldsKey
}
