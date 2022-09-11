import { VueConstructor } from 'vue/types/vue'

import { Input, inputProps, useInput } from './input'
import { RadioGroup, radioGroupProps, useRadioGroup } from './radio-group'
import { Select, selectProps, useSelect } from './select'
import { Form, formProps, useForm } from './form'
import { FormItem, formItemProps, useFormItem } from './form-item'
import { Formulate, formulateProps, useFormulate } from './formulate'
import { Table, tableProps, useTable } from './table'
import { TableColumn, tableColumnProps, useTableColumn } from './table-column'
import { Pagination, paginationProps, usePagination } from './pagination'
import { StaggeredTransitionGroup } from './staggered-transition-group/index'
import { Upload, uploadProps, useUpload } from './upload'
import { ConfigProvider, configProviderProps, useConfigProvider } from './config-provider'

const components = [Input, Select, Form, FormItem, Formulate, Table, TableColumn, Pagination, StaggeredTransitionGroup, Upload, ConfigProvider]

function install(Vue: VueConstructor) {
  components.forEach((item) => {
    Vue.use(item as any)
  })
}

export {
  install,
  Input,
  RadioGroup,
  Select,
  Form,
  FormItem,
  Formulate,
  Table,
  TableColumn,
  Pagination,
  StaggeredTransitionGroup,
  Upload,
  ConfigProvider,

  useInput,
  useRadioGroup,
  useSelect,
  useForm,
  useFormItem,
  useFormulate,
  useTable,
  useTableColumn,
  usePagination,
  useUpload,
  useConfigProvider,

  inputProps,
  radioGroupProps,
  selectProps,
  formProps,
  formItemProps,
  formulateProps,
  tableProps,
  tableColumnProps,
  paginationProps,
  uploadProps,
  configProviderProps,
}
