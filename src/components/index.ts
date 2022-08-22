import { VueConstructor } from 'vue/types/vue'

import Input from './input'
import Select from './select'
import Form from './form'
import FormItem from './form-item'
import Formulate from './formulate'
import Table from './table'

function install(Vue: VueConstructor) {
  [Input, Select, Form, FormItem, Formulate, Table].forEach((item) => {
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
  Table
}
