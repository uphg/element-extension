import { CascaderOption } from "element-ui/types/cascader-panel";
import { cascaderProps } from "../../cascader";
import { CheckboxGroupOptions, checkboxGroupProps } from "../../checkbox-group/src/checkboxGroupProps";
import { datePickerProps, dateProps, timePickerProps } from "../../date-picker/src/dateProps";
import { inputProps } from "../../input";
import { inputNumberProps } from "../../input-number";
import { RadioGroupOptions, radioGroupProps } from "../../radio-group/src/radioGroupProps";
import { SelectOptions, selectProps } from "../../select/src/selectProps";
import { sliderProps } from "../../slider";
import { switchProps } from "../../switch";
import { uploadProps } from "../../upload";
import { ExtractPropTypes, PropType } from "vue";
import { ObjectLike } from "../../../../types/_common";
import { commonProps, sizeProp, empty, booleanProp, stringProp } from "../../../shared/commonProps";

export type FormItemBaseProps = ExtractPropTypes<typeof formItemBaseProps>
export type FormItemExtendsProps = ExtractPropTypes<typeof formItemExtendsProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemType = 'radio' | 'radio-group' | 'checkbox' | 'checkbox-group' | 'input' | 'text' | 'password' | 'textarea' | 'number' | 'input-number' | 'select' | 'cascader' | 'date' | 'date-picker' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker' | 'switch' | 'slider' | 'file' | 'upload'

const emptyStringProp = {
  type: stringProp,
  default: ''
}

export const formItemBaseProps = {
  type: {
    type: String as PropType<FormItemType>,
    default: 'text'
  },
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  options: {
    type: [Array] as PropType<RadioGroupOptions | CheckboxGroupOptions | SelectOptions | CascaderOption[]>
  },
  loading: booleanProp,
  clearable: booleanProp,
  disabled: booleanProp,
  readonly: booleanProp,
  showPassword: booleanProp,
  showWordLimit: booleanProp,
  validateEvent: {
    type: booleanProp,
    default: empty
  },
  size: sizeProp,

  // --- Switch
  activeValue: switchProps.activeValue,
  inactiveValue: switchProps.inactiveValue,

  // --- Date
  format: dateProps.format,
  pickerOptions: dateProps.pickerOptions,

  // --- Upload
  action: uploadProps.action,
  multiple: uploadProps.multiple,
  headers: uploadProps.headers,
  fileList: uploadProps.fileList,
  accept: uploadProps.accept,

  // custom props
  exclude: inputProps.exclude,
  optionGroups: selectProps.optionGroups,
  withBorder: {
    type: booleanProp,
    default: empty
  },
  withButton: {
    type: booleanProp,
    default: empty
  }
}

export const formItemExtendsProps = {
  popperClass: commonProps.popperClass,
  debounce: commonProps.debounce,

  // --- Mixin Popper
  placement: cascaderProps.placement,
  appendToBody: cascaderProps.appendToBody,
  visibleArrow: cascaderProps.visibleArrow,
  arrowOffset: cascaderProps.arrowOffset,
  offset: cascaderProps.offset,
  boundariesPadding: cascaderProps.boundariesPadding,
  popperOptions: cascaderProps.popperOptions,
  transformOrigin: cascaderProps.transformOrigin,

  // --- Radio
  size: sizeProp,
  textColor: radioGroupProps.textColor,
  fill: radioGroupProps.fill,

  // --- Checkout
  min: checkboxGroupProps.min,
  max: checkboxGroupProps.max,

  // --- Input
  tabindex: inputProps.tabindex,
  resize: inputProps.resize,
  form: inputProps.form,
  autocomplete: inputProps.autocomplete,
  autosize: inputProps.autosize,
  suffixIcon: inputProps.suffixIcon,
  prefixIcon: inputProps.prefixIcon,

  // --- InputNumber
  step: inputNumberProps.step,
  stepStrictly: inputNumberProps.stepStrictly,
  precision: inputNumberProps.precision,
  controls: inputNumberProps.controls,
  controlsPosition: inputNumberProps.controlsPosition,

  // --- Select
  id: selectProps.id,
  automaticDropdown: selectProps.automaticDropdown,
  filterable: selectProps.filterable,
  allowCreate: selectProps.allowCreate,
  loading: selectProps.loading,
  remote: selectProps.remote,
  loadingText: selectProps.loadingText,
  noMatchText: selectProps.noMatchText,
  noDataText: selectProps.noDataText,
  remoteMethod: selectProps.remoteMethod,
  filterMethod: selectProps.filterMethod,
  multipleLimit: selectProps.multipleLimit,
  defaultFirstOption: selectProps.defaultFirstOption,
  reserveKeyword: selectProps.reserveKeyword,
  valueKey: selectProps.valueKey,
  collapseTags: selectProps.collapseTags,
  popperAppendToBody: selectProps.popperAppendToBody,

  // --- Cascader
  props: cascaderProps.props,
  separator: cascaderProps.separator,
  showAllLevels: cascaderProps.showAllLevels,
  beforeFilter: cascaderProps.beforeFilter,

  // --- Date
  defaultValue: dateProps.defaultValue,
  defaultTime: dateProps.defaultTime,
  valueFormat: dateProps.valueFormat,
  startPlaceholder: dateProps.startPlaceholder,
  endPlaceholder: dateProps.endPlaceholder,
  clearIcon: dateProps.clearIcon,
  editable: dateProps.editable,
  align: dateProps.align,
  rangeSeparator: dateProps.rangeSeparator,
  unlinkPanels: dateProps.unlinkPanels,

  // --- DatePicker
  timeArrowControl: datePickerProps.timeArrowControl,

  // --- TimePicker
  isRange: timePickerProps.isRange,
  arrowControl: timePickerProps.arrowControl,

  // --- Switch
  width: switchProps.width,
  activeIconClass: switchProps.activeIconClass,
  inactiveIconClass: switchProps.inactiveIconClass,
  activeText: switchProps.activeText,
  inactiveText: switchProps.inactiveText,
  activeColor: switchProps.activeColor,
  inactiveColor: switchProps.inactiveColor,

  // --- Slider
  // value - default: 0
  // min - default: 0
  // max - default: 100
  // step - default: 1
  label: sliderProps.label,
  showInput: sliderProps.showInput,
  showInputControls: sliderProps.showInputControls,
  inputSize: sliderProps.inputSize,
  showStops: sliderProps.showStops,
  showTooltip: sliderProps.showTooltip,
  formatTooltip: sliderProps.formatTooltip,
  range: sliderProps.range,
  vertical: sliderProps.vertical,
  height: sliderProps.height,
  tooltipClass: sliderProps.tooltipClass,
  marks: sliderProps.marks,

  // --- Upload
  limit: uploadProps.limit,
  drag: uploadProps.drag,
  data: uploadProps.data,
  dragger: uploadProps.dragger,
  withCredentials: uploadProps.withCredentials,
  showFileList: uploadProps.showFileList,
  beforeUpload: uploadProps.beforeUpload,
  beforeRemove: uploadProps.beforeRemove,
  onRemove: uploadProps.onRemove,
  onChange: uploadProps.onChange,
  onPreview: uploadProps.onPreview,
  onSuccess: uploadProps.onSuccess,
  onProgress: uploadProps.onProgress,
  onError: uploadProps.onError,
  autoUpload: uploadProps.autoUpload,
  listType: uploadProps.listType,
  httpRequest: uploadProps.httpRequest,
  onExceed: uploadProps.onExceed,
}

export const elFormItemProps = {
  label: emptyStringProp,
  labelWidth: emptyStringProp,
  prop: stringProp,
  required: {
    type: booleanProp,
    default: empty
  },
  rules: [Object, Array] as PropType<ObjectLike | ObjectLike[]>,
  error: stringProp,
  validateStatus: stringProp,
  for: stringProp,
  inlineMessage: booleanProp,
  showMessage: {
    type: booleanProp,
    default: true
  },

  // ?...
  size: String as PropType<'medium' | 'small' | 'mini'>
}


export const formItemProps = {
  ...elFormItemProps,
  ...formItemBaseProps,
  extends: {
    type: Object as PropType<FormItemExtendsProps>,
    default: () => ({})
  }
}

console.log('FormItem Props Number')
console.log(Object.keys(formItemProps).length)

