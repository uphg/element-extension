import { keys } from "../utils"
import { globalRadioGroupBaseProps, globalRadioGroupCustomizeProps } from "../components/radio-group/src/radioGroupProps"
import { globalCheckboxGroupBaseProps, globalCheckboxGroupCustomizeProps } from "../components/checkbox-group/src/checkboxGroupProps"
import { globalInputAttrs, globalInputProps } from '../components/input/src/inputProps'
import { globalInputNumberProps } from "../components/input-number/src/inputNumberProps"
import { globalSelectProps } from "../components/select/src/selectProps"
import { globalCascaderProps } from "../components/cascader/src/cascaderProps"
import { globalSwitchProps } from "../components/switch/src/switchProps"
import { globalSliderProps } from "../components/slider/src/sliderProps"
import { globalDateProps } from "../components/date-picker/src/dateProps"
import { globalUploadProps } from "../components/upload/src/uploadProps"
import { globalTableProps } from "../components/table/src/tableProps"
import { globalTableColumnProps } from "../components/table-column/src/tableColumnProps"
import { globalPaginationProps } from "../components/pagination/src/paginationProps"
import { globalFormProps } from "../components/form/src/formProps"
import { globalFormItemProps } from "../components/form-item/src/formItemProps"
import { globalButtonProps } from "src/components/button/src/buttonProps"

export type ConfigPropertyMap = typeof configPropertyMap
export type ConfigPropertyName = keyof (typeof configPropertyMap)

export const globalButtonKey = Symbol('config-button')
export const globalRadioGroupKey = Symbol('config-radio-group')
export const globalCheckboxGroupKey = Symbol('config-checkbox-group')
export const globalInputKey = Symbol('config-input')
export const globalInputNumberKey = Symbol('config-input-number')
export const globalSelectKey = Symbol('config-select')
export const globalCascaderKey = Symbol('config-select')
export const globalSwitchKey = Symbol('config-switch')
export const globalSliderKey = Symbol('config-slider')
export const globalDatePickerKey = Symbol('config-date-picker')
export const globalTimePickerKey = Symbol('config-time-picker')
export const globalTimeSelectKey = Symbol('config-time-select')
export const globalUploadKey = Symbol('config-upload')
export const globalFormKey = Symbol('config-form')
export const globalFormItemKey = Symbol('config-form-item')
export const globalTableKey = Symbol('config-table')
export const globalTableColumnKey = Symbol('config-table-column')
export const globalPaginationKey = Symbol('config-pagination')

export const globalButtonPropNames = keys(globalButtonProps)
export const globalRadioGroupPropNames = keys(globalRadioGroupBaseProps)
export const globalCheckboxGroupPropNames = keys(globalCheckboxGroupBaseProps)
export const globalInputPropNames = keys(globalInputProps)
export const globalInputAttrNames = keys(globalInputAttrs)
export const globalInputNumberPropNames = keys(globalInputNumberProps)
export const globalSelectPropNames = keys(globalSelectProps)
export const globalCascaderPropNames = keys(globalCascaderProps)
export const globalSwitchPropNames = keys(globalSwitchProps)
export const globalSliderPropNames = keys(globalSliderProps)
export const globalDatePropNames = keys(globalDateProps)
export const globalUploadPropNames = keys(globalUploadProps)
export const globalFormPropNames = keys(globalFormProps)
export const globalFormItemPropNames = keys(globalFormItemProps)
export const globalTablePropNames = keys(globalTableProps)
export const globalTableColumnPropNames = keys(globalTableColumnProps)
export const globalPaginationPropNames = keys(globalPaginationProps)

export const configPropertyMap = {
  button: {
    key: globalButtonKey,
    propNames: globalButtonPropNames
  },
  radioGroup: {
    key: globalRadioGroupKey,
    propNames: globalRadioGroupPropNames.concat(keys(globalRadioGroupCustomizeProps))
  },
  checkboxGroup: {
    key: globalCheckboxGroupKey,
    propNames: globalCheckboxGroupPropNames.concat(keys(globalCheckboxGroupCustomizeProps))
  },
  input: {
    key: globalInputKey,
    propNames: globalInputPropNames.concat(globalInputAttrNames)
  },
  inputNumber: {
    key: globalInputNumberKey,
    propNames: globalInputNumberPropNames
  },
  select: {
    key: globalSelectKey,
    propNames: globalSelectPropNames
  },
  cascader: {
    key: globalCascaderKey,
    propNames: globalCascaderPropNames
  },
  switch: {
    key: globalSwitchKey,
    propNames: globalSwitchPropNames
  },
  slider: {
    key: globalSliderKey,
    propNames: globalSliderPropNames
  },
  datePicker: {
    key: globalDatePickerKey,
    propNames: globalDatePropNames
  },
  timePicker: {
    key: globalTimePickerKey,
    propNames: globalDatePropNames
  },
  timeSelect: {
    key: globalTimeSelectKey,
    propNames: globalDatePropNames
  },
  upload: {
    key: globalUploadKey,
    propNames: globalUploadPropNames.concat(['showFileList'])
  },
  form: {
    key: globalFormKey,
    propNames: globalFormPropNames
  },
  formItem: {
    key: globalFormItemKey,
    propNames: globalFormItemPropNames
  },
  table: {
    key: globalTableKey,
    propNames: globalTablePropNames
  },
  tableColumn: {
    key: globalTableColumnKey,
    propNames: globalTableColumnPropNames
  },
  pagination: {
    key: globalPaginationKey,
    propNames: globalPaginationPropNames
  }
}
