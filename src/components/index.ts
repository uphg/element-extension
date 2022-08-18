import { formGlobalFieldsKey } from '../shared/formProviders'
import { VueConstructor } from 'vue/types/vue'

import Input from './input/index'
import Form from './form'
import FormItem from './form-item'
import Formulate from './formulate'
import Table from './table'

function install(Vue: VueConstructor) {
  [Input, Form, FormItem, Formulate, Table].forEach((item) => {
    // @ts-ignore
    Vue.use(item)
  })
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
