import { VueConstructor } from 'vue/types/vue'
import { Button, EButton, buttonProps, useButton } from './button'
import { RadioGroup, ERadioGroup, radioGroupProps, useRadioGroup } from './radio-group'
import { CheckboxGroup, ECheckboxGroup, checkboxGroupProps, useCheckboxGroup } from './checkbox-group'
import { Input, EInput, inputProps, useInput } from './input'
import { InputNumber, EInputNumber, inputNumberProps, useInputNumber } from './input-number'
import { Select, ESelect, selectProps, useSelect } from './select'
import { Cascader, ECascader, cascaderProps, useCascader } from './cascader'
import { Switch, ESwitch, switchProps, useSwitch } from './switch'
import { Slider, ESlider, sliderProps, useSlider } from './slider'
import { DatePicker, EDatePicker, datePickerProps, TimePicker, ETimePicker, timePickerProps, TimeSelect, ETimeSelect, timeSelectProps, useDatePicker } from './date-picker'
import { Upload, EUpload, uploadProps, useUpload } from './upload'
import { Form, EForm, formProps, useForm } from './form'
import { FormItem, EFormItem, formItemProps, useFormItem } from './form-item'
import { Formulate, EFormulate, formulateProps, useFormulate } from './formulate'
import { Table, ETable, tableProps, useTable } from './table'
import { TableColumn, ETableColumn, tableColumnProps, useTableColumn } from './table-column'
import { Pagination, EPagination, paginationProps, usePagination } from './pagination'
import { StaggeredTransitionGroup, EStaggeredTransitionGroup } from './staggered-transition-group/index'
import { Link, ELink, linkProps, useLink } from './link'
import { Tag, ETag, tagProps, useTag } from './tag'
import { ConfigProvider, EConfigProvider, configProviderProps, useConfigProvider } from './config-provider'
import { zhCN, en } from '../lang/index'

// utils
import { renderSlot, renderSlots, withDefaultProps, generateEmits } from '../utils'
import { useGlobalProps } from '../composables/useGlobalProps'

const components = [EButton, ERadioGroup, ECheckboxGroup, EInput, EInputNumber, ESelect, ECascader, ESwitch, ESlider, EDatePicker, ETimePicker, ETimeSelect, EUpload, EForm, EFormItem, EFormulate, ETable, ETableColumn, EPagination, EStaggeredTransitionGroup, ELink, ETag, EConfigProvider]

function install(Vue: VueConstructor) {
  components.forEach((item) => {
    Vue.use(item as any)
  })
}

export {
  install,
  Button,
  EButton,
  RadioGroup,
  ERadioGroup,
  CheckboxGroup,
  ECheckboxGroup,
  Input,
  EInput,
  InputNumber,
  EInputNumber,
  Select,
  ESelect,
  Cascader,
  ECascader,
  Switch,
  ESwitch,
  Slider,
  ESlider,
  DatePicker,
  EDatePicker,
  TimePicker,
  ETimePicker,
  TimeSelect,
  ETimeSelect,
  Upload,
  EUpload,
  Form,
  EForm,
  FormItem,
  EFormItem,
  Formulate,
  EFormulate,
  Table,
  ETable,
  TableColumn,
  ETableColumn,
  Pagination,
  EPagination,
  StaggeredTransitionGroup,
  EStaggeredTransitionGroup,
  Link,
  ELink,
  Tag,
  ETag,
  ConfigProvider,
  EConfigProvider,

  useButton,
  useRadioGroup,
  useCheckboxGroup,
  useInput,
  useInputNumber,
  useSelect,
  useCascader,
  useSwitch,
  useSlider,
  useDatePicker,
  useUpload,
  useForm,
  useFormItem,
  useFormulate,
  useTable,
  useTableColumn,
  usePagination,
  useLink,
  useTag,
  useConfigProvider,

  buttonProps,
  radioGroupProps,
  checkboxGroupProps,  
  inputProps,
  inputNumberProps,
  selectProps,
  cascaderProps,
  switchProps,
  sliderProps,
  datePickerProps,
  timePickerProps,
  timeSelectProps,
  uploadProps,
  formProps,
  formItemProps,
  formulateProps,
  tableProps,
  tableColumnProps,
  paginationProps,
  linkProps,
  tagProps,
  configProviderProps,

  // utlis
  renderSlot,
  renderSlots,
  useGlobalProps,
  withDefaultProps,
  generateEmits,

  // lang
  zhCN, en
}
