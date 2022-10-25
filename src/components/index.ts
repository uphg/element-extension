import { VueConstructor } from 'vue/types/vue'
import { Button, buttonProps, useButton } from './button'
import { RadioGroup, radioGroupProps, useRadioGroup } from './radio-group'
import { CheckboxGroup, checkboxGroupProps, useCheckboxGroup } from './checkbox-group'
import { Input, inputProps, useInput } from './input'
import { InputNumber, inputNumberProps, useInputNumber } from './input-number'
import { Select, selectProps, useSelect } from './select'
import { Cascader, cascaderProps, useCascader } from './cascader'
import { Switch, switchProps, useSwitch } from './switch'
import { Slider, sliderProps, useSlider } from './slider'
import { DatePicker, datePickerProps, TimePicker, timePickerProps, TimeSelect, timeSelectProps, useDatePicker } from './date-picker'
import { Upload, uploadProps, useUpload } from './upload'
import { Form, formProps, useForm } from './form'
import { FormItem, formItemProps, useFormItem } from './form-item'
import { Formulate, formulateProps, useFormulate } from './formulate'
import { Table, tableProps, useTable } from './table'
import { TableColumn, tableColumnProps, useTableColumn } from './table-column'
import { Pagination, paginationProps, usePagination } from './pagination'
import { StaggeredTransitionGroup } from './staggered-transition-group/index'
import { ConfigProvider, configProviderProps, useConfigProvider } from './config-provider'

// utils
import { renderSlot, renderSlots } from '../utils/renderSlot'
import { useGlobalProps } from '../composables/useGlobalProps'

const components = [Button, RadioGroup, CheckboxGroup, Input, InputNumber, Select, Cascader, Switch, Slider, DatePicker, TimePicker, TimeSelect, Form, FormItem, Formulate, Table, TableColumn, Pagination, StaggeredTransitionGroup, Upload, ConfigProvider]

function install(Vue: VueConstructor) {
  components.forEach((item) => {
    Vue.use(item as any)
  })
}

export {
  install,
  Button,
  RadioGroup,
  CheckboxGroup,
  Input,
  InputNumber,
  Select,
  Cascader,
  Switch,
  Slider,
  DatePicker,
  TimePicker,
  TimeSelect,
  Upload,
  Form,
  FormItem,
  Formulate,
  Table,
  TableColumn,
  Pagination,
  StaggeredTransitionGroup,
  ConfigProvider,

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
  configProviderProps,

  // utlis
  renderSlot,
  renderSlots,
  useGlobalProps
}
