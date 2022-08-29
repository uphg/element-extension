import { VueConstructor } from 'vue/types/vue'

import { Input, inputProps, useInput } from './input'
import { Select, selectProps, useSelect } from './select'
import { Form, formProps, useForm } from './form'
import { FormItem, formItemProps, useFormItem } from './form-item'
import { Formulate, formulateProps, useFormulate } from './formulate'
import { Table, tableProps, useTable } from './table'
import { Pagination, paginationProps, usePagination } from './pagination'
import { ConfigProvider, configProviderProps, useConfigProvider } from './config-provider'

function install(Vue: VueConstructor) {
  [Input, Select, Form, FormItem, Formulate, Table, Pagination, ConfigProvider].forEach((item) => {
    // @ts-ignore
    Vue.use(item)
  })
}

export {
  install,
  Input,
  Select,
  Form,
  FormItem,
  Formulate,
  Table,
  Pagination,
  ConfigProvider,

  useInput,
  useSelect,
  useForm,
  useFormItem,
  useFormulate,
  useTable,
  usePagination,
  useConfigProvider,

  inputProps,
  selectProps,
  formProps,
  formItemProps,
  formulateProps,
  tableProps,
  paginationProps,
  configProviderProps,
}
